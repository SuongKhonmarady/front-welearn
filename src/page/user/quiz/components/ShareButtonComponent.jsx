import { useEffect } from 'react';

const ShareButton = () => {
  useEffect(() => {
    // Load the Facebook SDK script
    if (!window.FB) {
      const script = document.createElement('script');
      script.src = "https://connect.facebook.net/en_US/sdk.js";
      script.async = true;
      script.onload = () => {
        window.FB.init({
          appId      : 'your-app-id', 
          xfbml      : true,
          version    : 'v12.0'
        });
      };
      document.body.appendChild(script);
    }
  }, []);

  const handleClick = () => {
    if (window.FB) {
      window.FB.ui({
        display: 'popup',
        method: 'share',
        href: 'https://ygrean.site',
      }, function(response){
        // Handle response here
        console.log(response);
      });
    } else {
      console.error('Facebook SDK not loaded yet.');
    }
  };

  return (
    <div id="shareBtn" className="btn btn-success clearfix" onClick={handleClick}>
      <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
        Share to Facebook
      </button>
    </div>
  );
};

export default ShareButton;
