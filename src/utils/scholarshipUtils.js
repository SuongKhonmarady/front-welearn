/**
 * Generate the correct URL for a scholarship based on available data
 * @param {Object} scholarship - The scholarship object
 * @param {string|number} scholarship.id - The scholarship ID
 * @param {string} scholarship.slug - The scholarship slug
 * @returns {string} The URL for the scholarship
 */
export const getScholarshipUrl = (scholarship) => {
  if (!scholarship) return '/';
  
  // Prefer slug over ID for SEO-friendly URLs
  if (scholarship.slug) {
    return `/${scholarship.slug}`;
  }
  
  // Fallback to ID-based URL
  if (scholarship.id) {
    return `/scholarship/${scholarship.id}`;
  }
  
  return '/';
};

/**
 * Generate a slug from a title
 * @param {string} title - The title to convert to slug
 * @returns {string} The generated slug
 */
export const generateSlug = (title) => {
  if (!title) return '';
  
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};

/**
 * Check if a string is a valid slug format
 * @param {string} str - The string to check
 * @returns {boolean} True if the string is a valid slug
 */
export const isValidSlug = (str) => {
  if (!str) return false;
  
  // Check if string contains only lowercase letters, numbers, and hyphens
  const slugPattern = /^[a-z0-9-]+$/;
  return slugPattern.test(str);
};

/**
 * Check if a string is numeric (for ID detection)
 * @param {string} str - The string to check
 * @returns {boolean} True if the string is numeric
 */
export const isNumericId = (str) => {
  return /^\d+$/.test(str);
};
