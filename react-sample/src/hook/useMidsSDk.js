import { useState, useEffect, useRef } from "react";

const useMindsSDK = () => {
  const sdkRef = useRef(null);
  const [isSdkLoaded, setIsSdkLoaded] = useState(false);
  const clientId = "7695268872432";

  const integrationUrls = {
    production: 'https://assets.99minds.io/live/loyalty-sdk/bundle.js',
    enterprise1: 'https://assets.99minds.io/enterprise1/loyalty-sdk/bundle.js',
    staging: 'https://assets.99minds.io/staging/loyalty-sdk/bundle.js',
    qa: 'https://assets.99minds.io/qa/loyalty-sdk/bundle.js',
    dev: 'https://assets.99minds.io/dev/loyalty-sdk/bundle.js'
  };

  useEffect(() => {
    const initializeSdk = async () => {
      const script = document.createElement("script");
      script.src = integrationUrls[process.env.REACT_APP_NODE_ENV];
      script.async = true;
      script.onload = () => {
        sdkRef.current = new window.MindsSDK.Loyalty({
          apiKey: process.env.REACT_APP_API_KEY,
          platform: process.env.REACT_APP_PLATFORM,
          shopDomain: process.env.REACT_APP_SHOP_DOMAIN,
          useAppProxy: false,
          getCurrentCustomer: async () => clientId,
        });
        setIsSdkLoaded(true);
      };
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    };

    initializeSdk();
  }, []);

  return { sdk: sdkRef.current, isSdkLoaded, clientId };
};

export default useMindsSDK;
