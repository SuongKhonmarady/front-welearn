// Google Analytics utility functions for scholarship tracking

// Track scholarship views
export const trackScholarshipView = (scholarshipId, scholarshipTitle) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'scholarship_view', {
      event_category: 'Scholarship',
      event_label: scholarshipTitle,
      custom_parameter_1: scholarshipId
    });
  }
};

// Track scholarship clicks/external links
export const trackScholarshipClick = (scholarshipId, scholarshipTitle, externalUrl) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'scholarship_click', {
      event_category: 'Outbound Link',
      event_label: scholarshipTitle,
      custom_parameter_1: scholarshipId,
      custom_parameter_2: externalUrl
    });
  }
};

// Track search queries
export const trackSearch = (searchQuery, resultsCount) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'search', {
      search_term: searchQuery,
      custom_parameter_1: resultsCount
    });
  }
};

// Track filter usage
export const trackFilterUsage = (filterType, filterValue) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'filter_usage', {
      event_category: 'Filter',
      event_label: `${filterType}: ${filterValue}`
    });
  }
};

// Track chatbot interactions
export const trackChatbotUsage = (interactionType) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'chatbot_interaction', {
      event_category: 'Chatbot',
      event_label: interactionType
    });
  }
};

// Track page timing for performance monitoring
export const trackPageTiming = (timingCategory, timingVar, timingValue) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'timing_complete', {
      name: timingVar,
      value: timingValue,
      event_category: timingCategory
    });
  }
};
