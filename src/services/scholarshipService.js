import apiClient from '../utils/apiClient/apiClient';

export const scholarshipService = {
  // Get all scholarships with pagination and filters
  getScholarships: async (params = {}) => {
    try {
      const response = await apiClient.get('/api/scholarship', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching scholarships:', error);
      throw error;
    }
  },  // Get latest scholarships (limited to specific number)
  getLatestScholarships: async (limit = 10) => {
    try {
      // First try to get upcoming scholarships (which are already limited)
      const upcomingResponse = await apiClient.get('/api/scholarship/upcoming');
      if (upcomingResponse.data && upcomingResponse.data.success && upcomingResponse.data.data && upcomingResponse.data.data.length > 0) {
        return upcomingResponse.data;
      }
      
      // Fallback to regular scholarships with limit
      const response = await apiClient.get('/api/scholarship', {
        params: {
          limit: limit,
          sort: 'post_at',
          order: 'desc'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching latest scholarships:', error);
      throw error;
    }
  },

  // Get upcoming scholarships
  getUpcomingScholarships: async () => {
    try {
      const response = await apiClient.get('/api/scholarship/upcoming');
      return response.data;
    } catch (error) {
      console.error('Error fetching upcoming scholarships:', error);
      throw error;
    }
  },

  // Get single scholarship by ID
  getScholarshipById: async (id) => {
    try {
      const response = await apiClient.get(`/api/scholarship/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching scholarship:', error);
      throw error;
    }
  },

  // Search scholarships
  searchScholarships: async (query) => {
    try {
      const response = await apiClient.get('/api/scholarship/search', {
        params: { query }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching scholarships:', error);
      throw error;
    }
  },

  // Filter scholarships by region
  filterByRegion: async (region) => {
    try {
      const response = await apiClient.get(`/api/scholarship/region/${region}`);
      return response.data;
    } catch (error) {
      console.error('Error filtering scholarships by region:', error);
      throw error;
    }
  },

  // Filter scholarships by degree
  filterByDegree: async (degree) => {
    try {
      const response = await apiClient.get(`/api/scholarship/degree/${degree}`);
      return response.data;
    } catch (error) {
      console.error('Error filtering scholarships by degree:', error);
      throw error;
    }
  },

  // Filter scholarships by country
  filterByCountry: async (country) => {
    try {
      const response = await apiClient.get(`/api/scholarship/country/${country}`);
      return response.data;
    } catch (error) {
      console.error('Error filtering scholarships by country:', error);
      throw error;
    }
  }
};
