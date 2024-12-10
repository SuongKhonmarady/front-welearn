import apiClient from "../../utils/apiClient/apiClient";

export const getRank = async (category_id , isGraduate) => {
  try {
    const res = await apiClient.get(`api/rank/${category_id}/${isGraduate}`);
    if (res.status === 200) {
      const data = await res.data.data;
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
