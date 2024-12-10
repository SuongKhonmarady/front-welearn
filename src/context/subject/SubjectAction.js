import apiClient from "../../utils/apiClient/apiClient";
import { toast } from "react-toastify";

export const getSubjectPdf = async (examDateId, categoryId) => {
  try {
    const res = await apiClient.get(`api/pdf/${examDateId}/${categoryId}`);
    if (res.status === 200) {
      const data = await res.data;
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
export const createSubject = async (categoryId, examDateId, file) => {
  try {
    const formData = new FormData();
    formData.append("category_id", parseInt(categoryId));
    formData.append("exam_date_id", parseInt(examDateId));
    formData.append("file", file);

    const res = await apiClient.post(`api/subject`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (res.status === 200) {
      toast.success("subject created successfully!");
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

export const getSubject = async (typeId, examDateId) => {
  try {
    const res = await apiClient.get(`api/subject/${typeId}/${examDateId}`);
    if (res.status === 200) {
      const data = await res.data.data;
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateSubject = async (
  file,
  selectedCategory,
  selectedExamDate,
  id
) => {
  try {
    const formData = new FormData();
    formData.append("categoryId", parseInt(selectedCategory));
    formData.append("subjectId", parseInt(id));
    formData.append("examDateId", parseInt(selectedExamDate));
    formData.append("file", file);
    const res = await apiClient.post(`api/subject`, {
      formData,
    });

    if (res === 200) {
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

export const removeSubject = async (id) => {
  try {
    const res = await apiClient.delete(`api/subject/${id}`);
    if (res.status === 200) {
      console.log(res);
      const message = await res.data.message;
      toast.success(message);
      return true;
    }
  } catch (error) {
    console.log(error);
  }
};
export const getType = async (typeId) => {
  try {
    const res = await apiClient.get(`api/type/${typeId}`);
    if (res.status === 200) {
      const data = await res.data.data.categories;
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getExamDate = async () => {
  try {
    const res = await apiClient.get(`api/examDate`);
    if (res.status === 200) {
      const data = await res.data.data;
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getCategory = async () => {
  try {
    const res = await apiClient("api/category");
    if (res.status === 200) {
      const data = await res.data.data;
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
