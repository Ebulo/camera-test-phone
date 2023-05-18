var name_inp = document.getElementById("name");
var phone_inp = document.getElementById("phoneNumber");
var code_inp = document.getElementById("code");
var verify_btn = document.getElementById("verify_btn");

verify_btn.addEventListener("click", (e) => {
  console.log("Verify Button clicked");
  var code_pass =
    code_inp.value ==
    window.atob(window.atob("TmpKaA==") + window.atob("ZUdvPQ=="));

  if (name_inp.value != "" && phone_inp.value && code_pass) {
    var user_data = {
      name: name_inp.value,
      phone: phone_inp.value,
      window_loc: window.location.href,
      user_prev_signin: window.localStorage.getItem("user_data")
        ? window.localStorage.getItem("user_data")
        : null,
    };
    window.localStorage.setItem("user_data", JSON.stringify(user_data));
    console.log("Added to local Successfully");
    if (window.localStorage.getItem("user_data")) {
      window.location = "main.html";
    }
  } else if (!code_pass) {
    alert("Your actions are being monitored, Please enter the correct code");
  }
});

// function checkLocal() {
//   var user_data = window.localStorage.getItem("user_data");
//   if (user_data) {
//     window.location = "main.html";
//   }
// }
