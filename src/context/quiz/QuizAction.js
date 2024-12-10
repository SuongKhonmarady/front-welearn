import apiClient from "../../utils/apiClient/apiClient";
import { toast } from "react-toastify";

export const getQuestion = async (categoryId, levelId) => {
  try {
    const res = await apiClient.get(
      `api/question/${categoryId}/${levelId}`
    );
    if (res.status === 200) {
      const data = await res.data.data
      return data
    }
  } catch (error) {
    console.log(error);
  }
};

export const listQuestion = async (categoryId, levelId , isGraduate) => {
  try {
    const res = await apiClient.get(
      `api/quesionList/${categoryId}/${levelId}/${isGraduate}`
    );
    if (res.status === 200) {
      const data = await res.data.data;
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const createQuestion = async (
  questionName,
  categoryId,
  isGraduate,
  levelId,
  choices
) => {
  try {
    if (
      categoryId !== null ||
      isGraduate !== null ||
      levelId !== null ||
      questionName !== null ||
      choices !== null
    ) {
      const res = await apiClient.post("api/question", {
        name: questionName,
        category_id: categoryId,
        is_graduate : isGraduate,
        level_id: levelId,
        choices: choices,
      });
      if (res.status === 200) {
        toast.success("create question success");
        return true;
      }
    } else {
      toast.error("Some field are null please check");
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
export const removeQuestion = async (id) => {
  try {
    const res = await apiClient.delete(`api/question/${id}`);
    if (res.status === 200) {
      const message = await res.data.message;
      toast.success(message);
      return true;
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateQuestion = async (questionId, updatedQuestion) => {
  try {
    const res = await apiClient.put(
      `api/question/${questionId}`,
      updatedQuestion
    );
    if (res.status === 200) {
      console.log(res);
      const message = res.data.message;
      toast.success(message);
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
