import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../../../assets/Logo.png";
import { signup } from "../../../../context/user/UserAction";
import Input from "../../../../ui/shared/Input";
import Button from "../../../../ui/shared/Button";
import SelectOption from "../../../../ui/shared/SelectOption";
import { userIndentity } from "../../../../data/dummyData";

export default function SignUp({ setAuthOption }) {
  const navigate = useNavigate();
  const [isGraduate, setGraduate] = useState(0);
  const [inputData, setInputData] = useState({
    email: "",
    currentPassword: "",
    username: "",
    confirmPassword: "",
  });
  const handleSelectChange = (event) => {
    const selectedOption = parseInt(event.target.value);
    setGraduate(selectedOption);
  };
  const onChange = (e) => {
    setInputData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const { username, email, currentPassword, confirmPassword } = inputData;
    const signUpStatus = await signup(
      username,
      email,
      isGraduate,
      currentPassword,
      confirmPassword
    );
    if (signUpStatus) {
      navigate("/");
    }
  };

  return (
    <>
      <div className="w-1/2 md:flex hidden justify-center items-center">
        <img src={Logo} alt="Reading a Book" className="rounded-xl" />
      </div>
      <div className="w-full md:w-1/2 p-5">
        <h1 className="text-xl md:text-3xl font-semibold">Sign Up</h1>
        <p className="mt-5 uppercase">Please provide us</p>
        <form onSubmit={onSubmit} className="flex flex-col gap-4 py-5">
          {/* Form Inputs */}
          <Input
            onChange={onChange}
            type="text"
            placeholder="Username"
            id="username"
            style="p-2 border rounded-2xl"
            autoComplete="off"
            required
          />

          <Input
            onChange={onChange}
            type="text"
            placeholder="Example@gmail.com"
            id="email"
            style="p-2 border rounded-xl"
            autoComplete="off"
            required
          />
          <Input
            onChange={onChange}
            type="password"
            placeholder="Password"
            id="currentPassword"
            style="p-2 border rounded-xl"
            autoComplete="off"
            required
          />
          <Input
            onChange={onChange}
            type="password"
            placeholder="Confrim Password"
            id="confirmPassword"
            style="p-2 border rounded-xl"
            autoComplete="off"
            required
          />
          <div>
            <label htmlFor="userIndetity">Identity : </label>
            <SelectOption
              options={userIndentity}
              onSelectChange={handleSelectChange}
            />
          </div>

          <Button type="submit" customClass="bg-[#283d50] text-white">
            Sign Up
          </Button>
        </form>
        <div className="mt-5 grid grid-cols-3 items-center text-gray-400">
          <hr className="border-gray-600" />
          <p className="text-center text-">Or</p>
          <hr className="border-gray-600" />
        </div>

        <div className="mt-6 text-black flex justify-between gap-2 items-center">
          <p>Already have an account ?</p>
          <Button
            customClass="bg-[#283d50] text-white"
            onClick={() => setAuthOption("Sign In")}
          >
            Log in
          </Button>
        </div>
      </div>
    </>
  );
}
