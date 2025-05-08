import { useContext, useEffect, useState, useCallback } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { editUser, getUser, logOut } from "../../../context/user/UserAction";
import Button from "../../../ui/shared/Button";
import Input from "../../../ui/shared/Input";
import Logo from "../../../assets/Logo.png";
import editUserIcon from "../../../assets/svg/editUser.svg";
import close from "../../../assets/svg/close.svg";
import UserDataContext from "../../../context/user/UserContext";
import Spinner from "../../../ui/shared/Spinner";

export default function Account() {
  const navigate = useNavigate();
  const { dispatch, currentUser, loading } = useContext(UserDataContext);
  const [isEdit, setIsEdit] = useState(false);
  const [inputData, setInputData] = useState({
    username: "",
    isGraduate: currentUser?.isGraduate || false,
  });
  const [saveLoading, setSaveLoading] = useState(false);

  const handleLogout = async (e) => {
    e.preventDefault();
    const res = await logOut();
    if (res) {
      navigate("/");
    }
  };

  const fetchCurrentUser = useCallback(async () => {
    const data = await getUser();
    dispatch({ type: "SET_USER", payload: data });
    setInputData({ username: data.name, isGraduate: data.isGraduate });
  }, [dispatch]);

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  const onTextChange = (e) => {
    const { id, value } = e.target;
    setInputData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleGraduateToggle = () => {
    setInputData((prevState) => ({
      ...prevState,
      isGraduate: !prevState.isGraduate
    }));
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    setSaveLoading(true);
    try {
      const { username, isGraduate } = inputData;
      if (isGraduate !== currentUser.isGraduate) {
        if (
          window.confirm(
            "Are you sure you want to change your identity? Your score will be reset to zero."
          )
        ) {
          const res = await editUser(currentUser.id, username, isGraduate);
          if (res) {
            await fetchCurrentUser();
            setIsEdit(false);
          }
        }
      } else {
        const res = await editUser(currentUser.id, username, isGraduate);
        if (res) {
          await fetchCurrentUser();
          setIsEdit(false);
        }
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setSaveLoading(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (!currentUser) {
    return <Navigate to="/authentication" />;
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="relative bg-gradient-to-r from-[#283d50] to-[#1e2d3d] text-white p-8">
          <div className="absolute top-4 right-4">
            <Button
              customClass="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              type="button"
              onClick={handleLogout}
            >
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Log out
              </span>
            </Button>
          </div>
          <h1 className="text-3xl font-bold mb-2">My Profile</h1>
          <p className="text-white/80">Manage your account settings and preferences</p>
        </div>

        <form className="p-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-[#283d50]/10 bg-white">
                  <img
                    src={Logo}
                    alt="Profile avatar"
                    className="object-cover w-full h-full transition-transform duration-200 group-hover:scale-110"
                  />
                </div>
                <Button 
                  onClick={() => setIsEdit(!isEdit)} 
                  type="button"
                  customClass="absolute bottom-0 right-0 p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <img
                    src={isEdit ? close : editUserIcon}
                    alt={isEdit ? "Cancel edit" : "Edit profile"}
                    className="w-5 h-5"
                  />
                </Button>
              </div>
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-900">{currentUser.name}</h2>
                <p className="text-sm text-gray-500">{currentUser.email}</p>
              </div>
            </div>

            <div className="flex-1 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-700">{currentUser.email}</div>
                </div>

                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                  </label>
                  {isEdit ? (
                    <Input
                      type="text"
                      id="username"
                      value={inputData.username}
                      style="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#283d50] focus:border-transparent transition-colors duration-200"
                      onChange={onTextChange}
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-700">
                      {currentUser.name}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Identity Status</label>
                  {isEdit ? (
                    <div className="flex items-center gap-4">
                      <div className="relative inline-flex items-center cursor-pointer">
                        <Input
                          type="checkbox"
                          id="graduate"
                          checked={inputData.isGraduate}
                          onChange={handleGraduateToggle}
                          style="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#283d50]"></div>
                      </div>
                      <span className="text-gray-700">
                        {inputData.isGraduate ? "Graduate" : "Under Graduate"}
                      </span>
                    </div>
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-700">
                      {currentUser.isGraduate ? "Graduate" : "Under Graduate"}
                    </div>
                  )}
                </div>
              </div>

              {isEdit && (
                <div className="pt-4">
                  <Button
                    customClass="w-full bg-[#283d50] text-white py-3 rounded-lg hover:bg-[#1e2d3d] transition-colors duration-200 flex items-center justify-center gap-2"
                    type="submit"
                    onClick={handleEdit}
                    disabled={saveLoading}
                  >
                    {saveLoading ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
