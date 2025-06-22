import { useState, useEffect } from 'react';

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowConsent(true);
      
      // Initialize Google Analytics with consent denied
      if (typeof window.gtag !== 'undefined') {
        window.gtag('consent', 'default', {
          'analytics_storage': 'denied'
        });
      }
    } else if (consent === 'accepted') {
      // Grant consent if previously accepted
      if (typeof window.gtag !== 'undefined') {
        window.gtag('consent', 'update', {
          'analytics_storage': 'granted'
        });
      }
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowConsent(false);
    
    // Enable Google Analytics
    if (typeof window.gtag !== 'undefined') {
      window.gtag('consent', 'update', {
        'analytics_storage': 'granted'
      });
      
      // Track the consent acceptance
      window.gtag('event', 'consent_granted', {
        event_category: 'Privacy',
        event_label: 'Cookie Consent'
      });
    }
  };
  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setShowConsent(false);
    
    // Track the consent decline
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'consent_denied', {
        event_category: 'Privacy',
        event_label: 'Cookie Consent'
      });
    }
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm">
            We use cookies to analyze our traffic and improve your experience. 
            By continuing to use our site, you accept our use of cookies.
            <a href="/privacy-policy" className="underline ml-1">Learn more</a>
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={declineCookies}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm"
          >
            Decline
          </button>
          <button
            onClick={acceptCookies}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-sm"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
