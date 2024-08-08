export function initFacebookSdk() {
  return new Promise((resolve) => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "384697447632966",
        xfbml: true,
        version: "v20.0",
      });
      resolve();
    //   window.FB.login(function (response) {
    //     if (response.authResponse) {
    //       console.log("Welcome!  Fetching your information.... ");
    //       window.FB.api("/me", { fields: "name, email" }, function (response) {
    //         document.getElementById("profile").innerHTML =
    //           "Good to see you, " +
    //           response.name +
    //           ". i see your email address is " +
    //           response.email;
    //       });
    //     } else {
    //       console.log("User cancelled login or did not fully authorize.");
    //       resolve();
    //     }
    //   });
    };
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  });
}
