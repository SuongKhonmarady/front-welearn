import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUser } from "../../context/user/UserAction";
import Spinner from "./Spinner";

const AdminPrivateRoute = () => {
  const [isAdmin, setIsAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        // Check localStorage first for token-based auth
        const storedUserData = localStorage.getItem('user_data');
        const isAdminStored = localStorage.getItem('is_admin');
        
        if (storedUserData && isAdminStored) {
          try {
            const userData = JSON.parse(storedUserData);
            const adminStatus = isAdminStored === 'true' || 
                             userData.is_admin === true || 
                             userData.is_admin === 1 ||
                             userData.isAdmin === true || 
                             userData.isAdmin === 1 ||
                             userData.role === 'admin' ||
                             userData.role === 'Admin';
            setIsAdmin(adminStatus);
            setIsLoading(false);
            return;
          } catch (error) {
            console.error("Error parsing stored user data:", error);
          }
        }
        
        // Fallback to API call for session-based auth
        const user = await getUser();
        if (user) {
          const adminStatus = user.is_admin === true || 
                            user.is_admin === 1 ||
                            user.isAdmin === true || 
                            user.isAdmin === 1 ||
                            user.role === 'admin' ||
                            user.role === 'Admin';
          setIsAdmin(adminStatus);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminStatus();
  }, []);

  if (isLoading) {
    return <Spinner isFull={true} />;
  }

  return isAdmin ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default AdminPrivateRoute;
