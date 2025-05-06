import { toast } from "react-toastify";
import apiClient from "../../utils/apiClient/apiClient";
import axios from "axios";

export const createScholarship = async (data, link, deadline, country) => {
  try {
    // Format created time (post_at)
    const createdTime = new Date(data.created_time);
    const formattedDate = `${createdTime.getFullYear()}-${String(createdTime.getMonth() + 1).padStart(2, '0')}-${String(createdTime.getDate()).padStart(2, '0')} ${String(createdTime.getHours()).padStart(2, '0')}:${String(createdTime.getMinutes()).padStart(2, '0')}:${String(createdTime.getSeconds()).padStart(2, '0')}`;
    
    // Ensure the deadline is in the correct format (YYYY-MM-DD)
    const formattedDeadline = new Date(deadline).toISOString().split('T')[0]; // Convert to YYYY-MM-DD

    // Send API request to create scholarship
    const res = await apiClient.post("api/scholarship/", {
      description: data.message,
      post_at: formattedDate,
      link,
      deadline: formattedDeadline,  // Include the formatted deadline
      country: country.trim().toUpperCase(),
    });

    if (res.status === 200) {
      const message = res.data.message;
      toast.success(message);
      return true;
    }
  } catch (error) {
    if (error.response && error.response.status === 422) {
      // Capture validation error message from backend
      const errorMessage = error.response.data.errors.deadline
        ? error.response.data.errors.deadline[0]
        : 'An error occurred.';

      toast.error(errorMessage);  // Show error message from backend
    } else {
      console.log(error);
      toast.error(error.message || 'An error occurred.');
    }
  }
};

export const getScholarship = async () => {
  try {
    const res = await apiClient.get("api/scholarship");
    if (res.status === 200) {
      const data = res.data.data;
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const scrabData = async (accessToken, link) => {
  try {
    const pageAndPostId = extractFacebookIds(link);
    if (!pageAndPostId) {
      toast.error(
        "Invalid post URL. Please provide a valid Facebook post link."
      );
      return null;
    }

    const { pageId, postId } = pageAndPostId;
    const res = await axios.get(
      `https://graph.facebook.com/v12.0/${pageId}_${postId}?access_token=${accessToken}`
    );

    if (res.status === 200) {
      const data = res.data;
      return data;
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      const fbError = error.response.data.error;
      if (fbError.code === 190 && fbError.error_subcode === 463) {
        toast.error("Access token has expired. Please provide a valid token.");
      } else {
        toast.error(`Error: ${fbError.message}`);
      }
    } else {
      console.error(error);
      toast.error("An unexpected error occurred.");
    }
    return null;
  }
};

const extractFacebookIds = (url) => {
  const pageIdMatch = url.match(/facebook\.com\/(\d+)/);
  const postIdMatch = url.match(/\/posts\/([^/?]+)/);
  if (pageIdMatch && postIdMatch) {
    return { pageId: pageIdMatch[1], postId: postIdMatch[1] };
  } else {
    return null;
  }
};
export const updateScholarship = async (id, updated) => {
  try {
    const res = await apiClient.put(`api/scholarship/${id}`, updated);
    if (res.status === 200) {
      const message = res.data.message;
      toast.success(message);
      return true;
    }
  } catch (error) {
    if (error.response) {
      toast.error(error.response.data.message || 'An error occurred.');
    } else {
      console.log(error);
      toast.error('An unexpected error occurred.');
    }
  }
};
export const removeScholarship = async (id) => {
  try {
    const res = await apiClient.delete(`api/scholarship/${id}`);
    if (res.status === 200) {
      const message = await res.data.message;
      toast.success(message);
      return true;
    }
  } catch (error) {
    console.log(error);
  }
};
