import { Helmet } from "react-helmet-async";
import Hero from "./components/Hero";
// import TeamWork from "./components/TeamWork";
// import WhoWeAre from "./components/WhoWeAre";
import WhyYouChoose from "./components/WhyYouChoose";
import LatestScholarships from "./components/LatestScholarships";

export default function Homepage() {
  const currentYear = new Date().getFullYear();
  const canonicalUrl = "https://openscholarships.me";
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "OpenScholarships",
    "alternateName": ["OpenScholarships Platform", "WeLearn Scholarships"],
    "url": canonicalUrl,
    "description": "Discover thousands of global scholarship opportunities. Track deadlines, manage applications, and connect with universities worldwide through our comprehensive scholarship platform.",
    "keywords": "scholarships, education funding, study abroad, university scholarships, financial aid, student grants, global education opportunities",
    "inLanguage": "en-US",
    "copyrightYear": currentYear,
    "creator": {
      "@type": "Organization",
      "name": "OpenScholarships",
      "url": canonicalUrl
    },
    "mainEntity": {
      "@type": "WebApplication",
      "name": "OpenScholarships Platform",
      "applicationCategory": "EducationApplication",
      "description": "Comprehensive scholarship discovery and management platform",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    },
    "potentialAction": [
      {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${canonicalUrl}/browse?search={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      },
      {
        "@type": "ViewAction",
        "name": "Browse Scholarships",
        "target": `${canonicalUrl}/browse`
      }
    ],
    "audience": {
      "@type": "EducationalAudience",
      "educationalRole": "student"
    }
  };

  // Enhanced educational organization schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "OpenScholarships",
    "url": canonicalUrl,
    "logo": `${canonicalUrl}/logo_.png`,
    "description": "Leading platform for scholarship discovery and educational funding opportunities worldwide",
    "foundingDate": "2024",
    "email": "openscholarships@gmail.com",
    "areaServed": "Worldwide",
    "serviceType": ["Education Technology", "Scholarship Services", "Educational Consulting"],
    "knowsAbout": [
      "Higher Education",
      "Scholarship Management", 
      "Educational Funding",
      "Student Financial Aid",
      "International Education"
    ],
    "sameAs": [
      "https://facebook.com/openscholarships",
      "https://twitter.com/openscholarships",
      "https://linkedin.com/company/openscholarships"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "openscholarships@gmail.com",
      "availableLanguage": ["English"]
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Scholarship Database",
      "itemListElement": [
        {
          "@type": "OfferCatalog",
          "name": "University Scholarships"
        },
        {
          "@type": "OfferCatalog", 
          "name": "Government Scholarships"
        },
        {
          "@type": "OfferCatalog",
          "name": "Private Organization Scholarships"
        }
      ]
    }
  };

  // FAQ Schema for better SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I find scholarships on OpenScholarships?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can browse our comprehensive scholarship database by visiting the Browse Scholarships page. Use our smart search filters to find opportunities that match your academic profile, field of study, and geographic preferences."
        }
      },
      {
        "@type": "Question", 
        "name": "Is OpenScholarships free to use?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, OpenScholarships is completely free to use. We provide access to thousands of scholarship opportunities, deadline tracking, and application management tools at no cost."
        }
      },
      {
        "@type": "Question",
        "name": "How often is the scholarship database updated?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our scholarship database is updated daily with new opportunities from universities, governments, and organizations worldwide. We ensure you have access to the latest funding opportunities."
        }
      },
      {
        "@type": "Question",
        "name": "Can I track scholarship deadlines?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, OpenScholarships features advanced deadline tracking with calendar integration and notification systems to ensure you never miss an important scholarship deadline."
        }
      }
    ]
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": canonicalUrl
      }
    ]
  };

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>OpenScholarships - Discover Global Education Funding Opportunities | Free Scholarship Platform 2025</title>
        <meta 
          name="title" 
          content="OpenScholarships - Discover Global Education Funding Opportunities | Free Scholarship Platform 2025" 
        />
        <meta 
          name="description" 
          content="Find and apply for thousands of scholarships worldwide in 2025. Track deadlines, manage applications, and discover funding opportunities from universities, governments, and organizations globally. Start your educational journey today!" 
        />
        <meta 
          name="keywords" 
          content="scholarships 2025, education funding, study abroad scholarships, university scholarships, financial aid, student grants, global education, scholarship search, education opportunities, funding for students, international scholarships, merit scholarships, need-based aid, scholarship deadline tracker" 
        />
        <meta name="author" content="OpenScholarships" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <link rel="canonical" href={canonicalUrl} />

        {/* Geographic and Language Tags */}
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="Global" />
        <meta name="language" content="English" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content="OpenScholarships - Your Gateway to Global Educational Opportunities 2025" />
        <meta 
          property="og:description" 
          content="Discover thousands of scholarship opportunities worldwide in 2025. Our platform helps students find funding, track deadlines, and manage applications for universities globally." 
        />
        <meta property="og:image" content={`${canonicalUrl}/logo_.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="OpenScholarships - Global Education Funding Platform" />
        <meta property="og:site_name" content="OpenScholarships" />
        <meta property="og:locale" content="en_US" />
        <meta property="article:author" content="OpenScholarships" />
        <meta property="article:publisher" content="OpenScholarships" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={canonicalUrl} />
        <meta property="twitter:title" content="OpenScholarships - Discover Global Education Funding 2025" />
        <meta 
          property="twitter:description" 
          content="Find scholarships worldwide in 2025. Track deadlines, manage applications, and discover funding opportunities for your education." 
        />
        <meta property="twitter:image" content={`${canonicalUrl}/logo_.png`} />
        <meta property="twitter:image:alt" content="OpenScholarships Platform" />
        <meta name="twitter:creator" content="@openscholarships" />
        <meta name="twitter:site" content="@openscholarships" />

        {/* Additional SEO Meta Tags */}
        <meta name="theme-color" content="#283d50" />
        <meta name="msapplication-TileColor" content="#283d50" />
        <meta name="application-name" content="OpenScholarships" />
        <meta name="apple-mobile-web-app-title" content="OpenScholarships" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />

        {/* Preconnect for Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>

        {/* Enhanced Educational Organization Schema */}
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>

        {/* FAQ Schema */}
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>

        {/* Breadcrumb Schema */}
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      {/* Breadcrumb Navigation for SEO */}
      <nav aria-label="Breadcrumb" className="hidden">
        <ol itemScope itemType="https://schema.org/BreadcrumbList">
          <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <span itemProp="name">Home</span>
            <meta itemProp="position" content="1" />
          </li>
        </ol>
      </nav>

      <main className="space-y-0" role="main" itemScope itemType="https://schema.org/WebPage">
        <meta itemProp="name" content="OpenScholarships - Homepage" />
        <meta itemProp="description" content="Discover global scholarship opportunities and educational funding" />
        <meta itemProp="url" content={canonicalUrl} />
        
        <Hero />
        <LatestScholarships />
        <WhyYouChoose />
        {/* <WhoWeAre/> */}
        {/* <TeamWork/> */}
      </main>
    </>
  );
}
