import { toast } from "react-toastify";
import apiClient from "../../utils/apiClient/apiClient";
import axios from "axios";

export const createScholarship = async (scholarshipData) => {
  try {
    // Send API request to create scholarship
    const res = await apiClient.post("api/scholarship/", scholarshipData);

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
    console.log("Making API call to: api/scholarship");
    const res = await apiClient.get("api/scholarship");
    console.log("getScholarship API Response status:", res.status);
    console.log("getScholarship API Response data:", res.data);
    if (res.status === 200) {
      const data = res.data.data;
      return data;
    }
  } catch (error) {
    console.log("Error in getScholarship:", error);
    if (error.response) {
      console.log("Error response:", error.response.data);
      console.log("Error status:", error.response.status);
    }
  }
};

// Get scholarship by ID
export const getScholarshipById = async (id) => {
  try {
    const res = await apiClient.get(`api/scholarship/${id}`);
    if (res.status === 200) {
      return res.data.data;
    }
  } catch (error) {
    console.log(error);
    if (error.response && error.response.status === 404) {
      toast.error("Scholarship not found.");
    } else {
      toast.error("Failed to fetch scholarship details.");
    }
    throw error;
  }
};
// Get upcoming scholarships
export const getUpcomingScholarships = async () => {
  try {
    console.log("Making API call to: api/scholarship/upcoming");
    const res = await apiClient.get("api/scholarship/upcoming");
    console.log("API Response status:", res.status);
    console.log("API Response data:", res.data);
    if (res.status === 200) {
      return res.data.data;
    }
  } catch (error) {
    console.log("Error in getUpcomingScholarships:", error);
    if (error.response) {
      console.log("Error response:", error.response.data);
      console.log("Error status:", error.response.status);
    }
    toast.error("Failed to fetch upcoming scholarships.");
  }
};

// Get scholarships by degree
export const getScholarshipsByDegree = async (degree) => {
  try {
    const res = await apiClient.get(`api/scholarship/degree/${degree}`);
    if (res.status === 200) {
      return res.data.data;
    }
  } catch (error) {
    console.log(error);
    toast.error("Failed to fetch scholarships by degree.");
  }
};

// Get scholarships by country
export const getScholarshipsByCountry = async (country) => {
  try {
    const res = await apiClient.get(`api/scholarship/country/${country}`);
    if (res.status === 200) {
      return res.data.data;
    }
  } catch (error) {
    console.log(error);
    toast.error("Failed to fetch scholarships by country.");
  }
};

// Get scholarships by region
export const getScholarshipsByRegion = async (region) => {
  try {
    const res = await apiClient.get(`api/scholarship/region/${region}`);
    if (res.status === 200) {
      return res.data.data;
    }
  } catch (error) {
    console.log(error);
    toast.error("Failed to fetch scholarships by region.");
  }
};

// Get scholarships by title
export const getScholarshipsByTitle = async (title) => {
  try {
    const res = await apiClient.get(`api/scholarship/search-by-title?title=${encodeURIComponent(title)}`);
    if (res.status === 200) {
      return res.data.data;
    }
  } catch (error) {
    console.log(error);
    toast.error("Failed to fetch scholarships by title.");
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
