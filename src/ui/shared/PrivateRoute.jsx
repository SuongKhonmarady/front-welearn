import { Outlet, Navigate } from "react-router-dom";
import UseAuth from "../../hook/UseAuth";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";

export default function PrivateRout() {
  const [isLogin, setLogin] = useState(null);

  useEffect(() => {
    const isLogged = async () => {
      const isLogin = await UseAuth();
      setLogin(isLogin);
    };
    isLogged();
  }, []);

  if (isLogin === null) {
    return <Spinner isFull />;
  }

  return isLogin ? <Outlet /> : <Navigate to="/authentication" />;
}
