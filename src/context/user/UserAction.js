import { toast } from "react-toastify";
import apiClient from "../../utils/apiClient/apiClient";
import authClient from "../../utils/apiClient/authClient";

export const signin = async (email, password) => {
  try {
    if (email.length > 0 && password.length > 0) {
      await authClient.get(`/sanctum/csrf-cookie`);
      const res = await authClient.post(`/login`, {
        email,
        password,
      });

      if (res.status === 200) {
        toast.success("Welcome to our website");
        return true;
      }
    }
    return false;
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.message || "An error occurred";
      toast.error(`Error: ${errorMessage}`);
    } else if (error.request) {
      toast.error("No response received from server");
    } else {
      toast.error("An unexpected error occurred");
    }
    return false;
  }
};

export const signup = async (
  username,
  email,
  isGraduate,
  currentPassword,
  confirmPassword
) => {
  try {
    await authClient.get(`/sanctum/csrf-cookie`);
    const response = await authClient.post(`/register`, {
      name: username,
      email,
      is_graduate: isGraduate,
      password: currentPassword,
      password_confirmation: confirmPassword,
    });

    if (response.status === 204) {
      toast.success("Welcome to our website");
      return true;
    }
    return false;
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.message || "An error occurred";
      toast.error(`Error: ${errorMessage}`);
    } else if (error.request) {
      toast.error("No response received from server");
    } else {
      toast.error("An unexpected error occurred");
    }
    return false;
  }
};

export const getUser = async () => {
  try {
    // First try to get user from localStorage (token-based auth)
    const storedUserData = localStorage.getItem('user_data');
    const authToken = localStorage.getItem('auth_token');
    
    if (storedUserData && authToken) {
      try {
        const userData = JSON.parse(storedUserData);
        return userData;
      } catch (error) {
        console.error("Error parsing stored user data:", error);
        // Clear invalid data
        localStorage.removeItem('user_data');
        localStorage.removeItem('auth_token');
        localStorage.removeItem('is_admin');
        localStorage.removeItem('token_type');
      }
    }
    
    // Fallback to API call for session-based auth
    const response = await apiClient.get(`/currentUser`);
    const data = response.data.data;
    return data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
export const editUser = async (userId, username, isGraduate) => {
  try {
    const response = await apiClient.put(`/user/${userId}`, {
      name: username,
      is_graduate: isGraduate,
    });
    if (response.status === 200) {
      toast.success("Update successful");
      return true;
    }
    return false;
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.message || "An error occurred";
      toast.error(`Error: ${errorMessage}`);
    } else {
      toast.error("An unexpected error occurred");
    }
    return false;
  }
};
export const logOut = async () => {
  try {
    // Clear token-based auth data
    const authToken = localStorage.getItem('auth_token');
    
    if (authToken) {
      // Clear localStorage for token-based auth
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      localStorage.removeItem('is_admin');
      localStorage.removeItem('token_type');
      toast.success("Logout successful");
      return true;
    }
    
    // Fallback to session-based logout
    const res = await authClient.post("/logout");
    if (res.status === 204) {
      toast.success("Logout successful");
      return true;
    }
    return false;
  } catch (error) {
    // Even if API call fails, clear localStorage
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    localStorage.removeItem('is_admin');
    localStorage.removeItem('token_type');
    
    if (error.response) {
      const errorMessage = error.response.data.message || "An error occurred";
      toast.error(`Error: ${errorMessage}`);
    } else {
      toast.error("An unexpected error occurred");
    }
    return false;
  }
};
export const savePointUser = async (
  point,
  category_id,
  level_id,
  listQuestions
) => {
  try {
    // Extract question IDs from the listQuestions array
    const questions = listQuestions.map((question) => question.id);
    const res = await apiClient.post("/rank", {
      point,
      category_id,
      level_id,
      questions,
    });

    if (res.status === 200) {
      return true;
    }
    return false;
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.message || "An error occurred";
      toast.error(`Error: ${errorMessage}`);
    } else if (error.request) {
      toast.error("No response received from server");
    } else {
      toast.error("An unexpected error occurred");
    }
    return false;
  }
};
export const tokenSignin = async (email, password) => {
  try {
    if (email.length > 0 && password.length > 0) {
      const res = await apiClient.post(`/api/auth/login`, {
        email,
        password,
      });

      if (res.status === 200 && res.data.user && res.data.token) {
        const { token, user, token_type } = res.data;
        
        // Store token and user data in localStorage
        localStorage.setItem("auth_token", token);
        localStorage.setItem("user_data", JSON.stringify(user));
        localStorage.setItem("token_type", token_type || "Bearer");
        localStorage.setItem("is_admin", (user.is_admin === 1 || user.is_admin === true).toString());

        toast.success("Welcome to our website");
        return { success: true, user, token };
      }
    }
    return { success: false };
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.message || "An error occurred";
      toast.error(`Error: ${errorMessage}`);
    } else if (error.request) {
      toast.error("No response received from server");
    } else {
      toast.error("An unexpected error occurred");
    }
    return { success: false };
  }
};

export const adminTokenSignin = async (email, password) => {
  try {
    if (email.length > 0 && password.length > 0) {
      const res = await apiClient.post(`/api/auth/token-login`, {
        email,
        password,
      });

      if (res.status === 200 && res.data.user && res.data.token) {
        const { token, user, token_type } = res.data;

        // Verify admin status
        if (user.is_admin === 1 || user.is_admin === true) {
          // Store token and user data in localStorage
          localStorage.setItem("auth_token", token);
          localStorage.setItem("user_data", JSON.stringify(user));
          localStorage.setItem("token_type", token_type || "Bearer");
          localStorage.setItem("is_admin", "true");

          toast.success("Admin login successful!");
          return { success: true, user, token };
        } else {
          toast.error("Access denied. Admin privileges required.");
          return { success: false };
        }
      }
    }
    return { success: false };
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.message || "An error occurred";
      toast.error(`Error: ${errorMessage}`);
    } else if (error.request) {
      toast.error("No response received from server");
    } else {
      toast.error("An unexpected error occurred");
    }
    return { success: false };
  }
};
