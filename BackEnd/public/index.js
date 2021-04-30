const fbBtn = document.querySelector(".fb-login-button");
const googleBtn = document.querySelector(".g-signin2");
const input = document.querySelector(".textInput");

function statusChangeCallback(response) {
  // Called with the results from FB.getLoginStatus().
  console.log("statusChangeCallback");
  console.log(response.authResponse); // The current login status of the person.
  if (response.status === "connected") {
    const { accessToken, userID } = response.authResponse;
    // Logged into your webpage and Facebook.
    const data = fetch("/auth/facebook", {
      method: "POST",
      body: JSON.stringify({ accessToken, userID }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
    console.log("connected");
  } else {
    // Not logged into your webpage or we are unable to tell.
    console.log("not connected");
  }
}

function checkLoginState() {
  // Called when a person is finished with the Login Button.
  FB.getLoginStatus(function (response) {
    // See the onlogin handler
    statusChangeCallback(response);
  });
}

window.fbAsyncInit = function () {
  FB.init({
    appId: "485115039207078",
    cookie: true, // Enable cookies to allow the server to access the session.
    xfbml: true, // Parse social plugins on this webpage.
    version: "v10.0", // Use this Graph API version for this call.
  });
  FB.getLoginStatus(function (response) {
    // Called after the JS SDK has been initialized.
    statusChangeCallback(response); // Returns the login status.
  });
};


// //google login implementation
function onSignIn(googleUser) {
  const tokenId = googleUser.getAuthResponse().id_token;
  const data = fetch("/auth/google", {
    method: "POST",
    body: JSON.stringify({tokenId}),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
}
