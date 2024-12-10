import { useEffect, useState } from "react";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import UseAuth from "../../../hook/UseAuth";
import { Navigate } from "react-router-dom";

export default function Authentication() {
  const [isLogin, setLogin] = useState(null);

  useEffect(() => {
    const isLogged = async () => {
      const isLogin = await UseAuth();
      setLogin(isLogin);
    };
    isLogged();
  }, []);

  const [authOption, setAuthOption] = useState("Sign In");
  let authToShow = null;
  switch (authOption) {
    case "Sign In":
      authToShow = <SignIn setAuthOption={setAuthOption} />;
      break;
    case "Sign Up":
      authToShow = <SignUp setAuthOption={setAuthOption} />;
      break;
    default:
      break;
  }

  if (isLogin) {
    return <Navigate to="/" />;
  }
  return (
    <div className="flex justify-center items-center p-5 md:p-0 h-full md:h-[80vh]">
      <div className="max-w-5xl mx-auto">
        <div className="flex shadow-2xl rounded-xl">{authToShow}</div>
      </div>
    </div>
  );
}
