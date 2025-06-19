import { Helmet } from "react-helmet-async";
import { SEO_CONSTANTS } from "../utils/seoConstants";

export default function SEOHead({ 
  title, 
  description, 
  keywords, 
  image, 
  url, 
  type = "website",
  structuredData = null,
  noIndex = false
}) {
  const currentYear = new Date().getFullYear();
  const canonicalUrl = url ? `${SEO_CONSTANTS.SITE_URL}${url}` : SEO_CONSTANTS.SITE_URL;
  const pageImage = image ? `${SEO_CONSTANTS.SITE_URL}${image}` : `${SEO_CONSTANTS.SITE_URL}${SEO_CONSTANTS.DEFAULT_IMAGE}`;
  
  const fullTitle = title ? `${title} | ${SEO_CONSTANTS.SITE_NAME}` : SEO_CONSTANTS.SITE_NAME;
  const pageDescription = description || SEO_CONSTANTS.SITE_DESCRIPTION;
  const pageKeywords = keywords ? `${keywords}, ${SEO_CONSTANTS.SITE_KEYWORDS}` : SEO_CONSTANTS.SITE_KEYWORDS;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={pageKeywords} />
      <meta name="author" content={SEO_CONSTANTS.SITE_NAME} />
      <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"} />
      <meta name="googlebot" content={noIndex ? "noindex, nofollow" : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Geographic and Language Tags */}
      <meta name="geo.region" content="US" />
      <meta name="geo.placename" content="Global" />
      <meta name="language" content="English" />
      <meta name="distribution" content="global" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${SEO_CONSTANTS.SITE_NAME} - ${title || 'Global Education Platform'}`} />
      <meta property="og:site_name" content={SEO_CONSTANTS.SITE_NAME} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={pageDescription} />
      <meta property="twitter:image" content={pageImage} />
      <meta property="twitter:image:alt" content={`${SEO_CONSTANTS.SITE_NAME} Platform`} />
      <meta name="twitter:creator" content={SEO_CONSTANTS.SOCIAL_HANDLES.twitter} />
      <meta name="twitter:site" content={SEO_CONSTANTS.SOCIAL_HANDLES.twitter} />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#283d50" />
      <meta name="msapplication-TileColor" content="#283d50" />
      <meta name="application-name" content={SEO_CONSTANTS.SITE_NAME} />
      <meta name="apple-mobile-web-app-title" content={SEO_CONSTANTS.SITE_NAME} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}

      {/* Default Organization Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": SEO_CONSTANTS.SITE_NAME,
          "url": SEO_CONSTANTS.SITE_URL,
          "logo": `${SEO_CONSTANTS.SITE_URL}${SEO_CONSTANTS.LOGO_URL}`,
          "description": SEO_CONSTANTS.SITE_DESCRIPTION,
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "email": SEO_CONSTANTS.CONTACT_EMAIL
          },
          "sameAs": [
            `https://facebook.com/${SEO_CONSTANTS.SOCIAL_HANDLES.facebook}`,
            `https://twitter.com/${SEO_CONSTANTS.SOCIAL_HANDLES.twitter.replace('@', '')}`,
            `https://linkedin.com/${SEO_CONSTANTS.SOCIAL_HANDLES.linkedin}`
          ]
        })}
      </script>
    </Helmet>
  );
}
