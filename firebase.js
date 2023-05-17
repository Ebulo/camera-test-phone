// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-analytics.js";
import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: window.atob("QUl6YVN5QVBqbmkyNWlNQUVoZVlyakVnOVcwTkV6UjlEQy1vanZV"),
  authDomain: window.atob("bGl2ZS1kYXRhLTNiMDFlLmZpcmViYXNlYXBwLmNvbQ=="),
  projectId: window.atob("bGl2ZS1kYXRhLTNiMDFl"),
  storageBucket: window.atob("bGl2ZS1kYXRhLTNiMDFlLmFwcHNwb3QuY29t"),
  messagingSenderId: window.atob("ODAwMjc3NTM2NDkw"),
  appId: window.atob(
    "MTo4MDAyNzc1MzY0OTA6d2ViOjg1YTZjYjliYTM1Y2IyNjJkZjQxOTM="
  ),
  measurementId: window.atob("Ry1EUURFRVBHSDE2"),
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// console.log("Content Loaded Successfully");
const analytics = getAnalytics(app);
var auth = getAuth(app);
auth.languageCode = "en";
console.log("Auth Initialised");

onAuthStateChanged(auth, function (user) {
  if (user) {
    window.user = user;
    console.log("USER LOGGED IN");
    window.location.replace("main.html");
  } else {
    // No user is signed in.
    console.log("USER NOT LOGGED IN");
    // window.location.replace("/login.html");
  }
});

var sign_in_btn = document.getElementById("sign-in-button");
var confirm_code = document.getElementById("confirm-code");

window.recaptchaVerifier = new RecaptchaVerifier(
  "recaptcha-container",
  {
    size: "normal",
    callback: (response) => {
      // reCAPTCHA solved, allow signInWithPhoneNumber.
      // ...
    },
    "expired-callback": () => {
      // Response expired. Ask user to solve reCAPTCHA again.
      // ...
    },
  },
  auth
);

function submitPhoneNumberAuth() {
  // We are using the test phone numbers we created before
  // var phoneNumber = document.getElementById("phoneNumber").value;
  var phoneNumber = document.getElementById("phoneNumber").value;
  console.log("Phone Number: ", phoneNumber);
  var appVerifier = window.recaptchaVerifier;
  //   firebase
  signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then(function (confirmationResult) {
      window.confirmationResult = confirmationResult;
      //   console.log("added ConfirmationResult");
      confirm_code.hidden = false;
    })
    .catch(function (error) {
      console.log(error);
    });
}

// submitPhoneNumberAuth();
// This function runs when the 'confirm-code' button is clicked
// Takes the value from the 'code' input and submits the code to verify the phone number
// Return a user object if the authentication was successful, and auth is complete
function submitPhoneNumberAuthCode() {
  // We are using the test code we created before
  // var code = document.getElementById("code").value;
  var code = document.getElementById("code").value;
  console.log("Code, ", code);
  confirmationResult
    .confirm(code)
    .then(function (result) {
      var user = result.user;
      console.log(user);
    })
    .catch(function (error) {
      console.log(error);
    });
}

sign_in_btn.addEventListener("click", submitPhoneNumberAuth);
confirm_code.addEventListener("click", submitPhoneNumberAuthCode);
