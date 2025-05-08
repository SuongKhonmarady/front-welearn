import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import Homepage from "./page/user/home/Homepage";
import UserAppLayout from "./ui/user/AppLayout";
import AdminAppLayout from "./ui/admin/Applayout";
import Scholarship from "./page/user/scholarship/ScholarshipList";
import Authentication from "./page/user/auth/Authentication";
import Account from "./page/user/account/Account";
import { UserDataProvider } from "./context/user/UserContext";
import { ScholarshipDataProvider } from "./context/scholarship/ScholarshipContext";
import PrivateRoutes from "./ui/shared/PrivateRoute";
import { useEffect, useState } from "react";
import { getUser } from "./context/user/UserAction";
import Spinner from "./ui/shared/Spinner";
import RouteNotFound from "./ui/shared/RouteNotFound";
import { ToastContainer } from "react-toastify";
import ScholarshipList from "./page/admin/manageScholarship/ScholarshipList";

export default function App() {
  const [isAdmin, setAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getUser();
      if (res) {
        setAdmin(res.isAdmin);
        setIsLoading(false);
      } else {
        setAdmin(false);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <Spinner isFull={true} />;
  }

  return (
    <Router>
      <UserDataProvider>
        <ScholarshipDataProvider>
          <Routes>
            {isAdmin ? (
              <Route element={<AdminAppLayout />}>
                <Route path="/" element={<ScholarshipList />} />
                <Route path="/manageScholarship" element={<ScholarshipList />} />
                <Route path="/*" element={<RouteNotFound />} />
              </Route>
            ) : (
              <Route element={<UserAppLayout />}>
                <Route index element={<Homepage />} />
                <Route path="/scholarship" element={<Scholarship />} />
                <Route path="/authentication" element={<Authentication />} />
                <Route element={<PrivateRoutes />}>
                  <Route path="/account" element={<Account />} />
                </Route>
                <Route path="/*" element={<RouteNotFound />} />
              </Route>
            )}
          </Routes>
        </ScholarshipDataProvider>
      </UserDataProvider>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Router>
  );
}
