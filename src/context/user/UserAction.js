import { toast } from "react-toastify";
import apiClient from "../../utils/apiClient/apiClient";

export const signin = async (email, password) => {
  try {
    if (email.length > 0 && password.length > 0) {
      await apiClient.get(`/sanctum/csrf-cookie`);
      const res = await apiClient.post(`login`, {
        email,
        password,
      });

      if (res.status === 204) {
        toast.success("Welcome to our website");
        return true;
      }
    }
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.message || "An error occurred";
      toast.error(`Error: ${errorMessage}`);
    } else if (error.request) {
      toast.error("No response received from server");
    }
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
    await apiClient.get(`/sanctum/csrf-cookie`);
    const response = await apiClient.post(`register`, {
      name: username,
      email,
      is_graduate: isGraduate,
      password: currentPassword,
      password_confirmation: confirmPassword,
    });

    if (response.status === 204) {
      toast.success("welcome to our website");
      return true;
    }
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.message || "An error occurred";
      toast.error(`Error: ${errorMessage}`);
    } else if (error.request) {
      toast.error("No response received from server");
    }
  }
};

export const getUser = async () => {
  try {
    const response = await apiClient.get(`api/currentUser`);
    const data = await response.data.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const editUser = async (userId, username, isGraduate) => {
  try {
    const response = await apiClient.put(`api/user/${userId}`, {
      name: username,
      is_graduate : isGraduate,
    });
    if (response.status === 200) {
      toast.success("update succesful");
      return true;
    }
  } catch (error) {
    console.log(error);
  }
};
export const logOut = async () => {
  try {
    const res = await apiClient.post("logout");
    if (res.status === 204) {
      toast.success("logout successful");
      return true;
    }
  } catch (error) {
    console.log(error);
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
    const res = await apiClient.post("api/rank", {
      point,
      category_id,
      level_id,
      questions,
    });

    if (res.status === 200) {
      return true;
    }
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.message || "An error occurred";
      toast.error(`Error: ${errorMessage}`);
    } else if (error.request) {
      toast.error("No response received from server");
    }
  }
};
