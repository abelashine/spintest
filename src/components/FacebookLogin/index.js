import React, { useEffect } from "react";
import { Mixpanel } from "../../services/Mixpanel";

import Button from "../Button";

export default ({ onLogin }) => {
  useEffect(() => {
    if (!window.FB && process.env.REACT_APP_FACEBOOK_APP_ID) {
      const script = document.createElement("script");
      window.fbAsyncInit = function () {
        window.FB.init({
          appId: process.env.REACT_APP_FACEBOOK_APP_ID,
          autoLogAppEvents: true,
          xfbml: true,
          cookie: true,
          version: "v7.0",
        });
        // Broadcast an event when FB object is ready
        const fbInitEvent = new Event("FBObjectReady");
        document.dispatchEvent(fbInitEvent);
      };
      let js;
      const fjs = document.getElementsByTagName("script")[0];
      if (document.getElementById("facebook-jssdk")) {
        return;
      }
      js = document.createElement("script");
      js.id = "facebook-jssdk";
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
      document.body.appendChild(script);
    }
  }, []);

  const facebookLogin = () => {
    if (!window.FB) return;

    window.FB.getLoginStatus((response) => {
      if (response.status === "connected") {
        facebookLoginHandler(response);
      } else {
        window.FB.login(facebookLoginHandler, {
          scope: "public_profile,email",
          return_scopes: true,
        });
      }
    });
  };

  const facebookLoginHandler = (response) => {
    if (response.status === "connected") {
      window.FB.api("/me", (userData) => {
        const result = {
          ...response,
        };
        onLogin(true, result);
        Mixpanel.identify(response.profile.email);
        Mixpanel.track("Login (Facebook)");
        Mixpanel.people.set({
          $name: response.profile.first_name,
          $email: response.profile.email,
        });
      });
    } else {
      onLogin(false);
    }
  };

  return (
    <Button
      type="button"
      size="large"
      color="transparent"
      onClick={facebookLogin}
    >
      LOGIN WITH FACEBOOK
    </Button>
  );
};
