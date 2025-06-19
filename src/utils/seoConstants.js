// Sitemap data for SEO
export const sitemapData = {
  pages: [
    {
      url: '/',
      title: 'Homepage - OpenScholarships',
      description: 'Discover global scholarship opportunities and educational funding',
      changefreq: 'daily',
      priority: '1.0',
      lastmod: new Date().toISOString()
    },
    {
      url: '/browse',
      title: 'Browse Scholarships - OpenScholarships',
      description: 'Search and filter through thousands of scholarship opportunities',
      changefreq: 'daily',
      priority: '0.9',
      lastmod: new Date().toISOString()
    },
    {
      url: '/scholarship-timeline',
      title: 'Scholarship Timeline - OpenScholarships',
      description: 'Track scholarship deadlines and important dates',
      changefreq: 'weekly',
      priority: '0.8',
      lastmod: new Date().toISOString()
    },
    {
      url: '/chatbot',
      title: 'AI Assistant - OpenScholarships',
      description: 'Get personalized scholarship recommendations from our AI assistant',
      changefreq: 'monthly',
      priority: '0.7',
      lastmod: new Date().toISOString()
    },
    {
      url: '/authentication',
      title: 'Login - OpenScholarships',
      description: 'Sign in to your OpenScholarships account',
      changefreq: 'monthly',
      priority: '0.5',
      lastmod: new Date().toISOString()
    }
  ]
};

// SEO constants
export const SEO_CONSTANTS = {
  SITE_NAME: 'OpenScholarships',
  SITE_URL: 'https://openscholarships.me',
  SITE_DESCRIPTION: 'Discover thousands of global scholarship opportunities. Track deadlines, manage applications, and connect with universities worldwide.',
  SITE_KEYWORDS: 'scholarships, education funding, study abroad, university scholarships, financial aid, student grants, global education opportunities',
  SOCIAL_HANDLES: {
    twitter: '@openscholarships',
    facebook: 'openscholarships',
    linkedin: 'company/openscholarships'
  },
  CONTACT_EMAIL: 'openscholarships@gmail.com',
  LOGO_URL: '/logo_.png',
  DEFAULT_IMAGE: '/logo_.png'
};

// Schema.org types for different pages
export const SCHEMA_TYPES = {
  HOMEPAGE: 'WebSite',
  SCHOLARSHIP_LIST: 'ItemList',
  SCHOLARSHIP_DETAIL: 'ScholarshipGrant',
  ABOUT: 'AboutPage',
  CONTACT: 'ContactPage',
  FAQ: 'FAQPage'
};
