const username = document.querySelector(".username");
const email = document.querySelector(".email");
const password = document.querySelector(".password");
const confirmPassword = document.querySelector(".confirm_password");
const btnSignUp = document.querySelector(".signup_btn");

const userStorage = JSON.parse(localStorage.getItem("userStorage")) ?? [];

const checkErrorInputs = () => {
  let isCheckError = true;

  const errorUsername = document.querySelector(".error-username");
  const errorEmail = document.querySelector(".error-email");
  const errorPassword = document.querySelector(".error-password");
  const errorConfirmPassword = document.querySelector(".error-confirmPassword");

  errorUsername.innerHTML = "";
  errorEmail.innerHTML = "";
  errorPassword.innerHTML = "";
  errorConfirmPassword.innerHTML = "";
  if (username.value === "") {
    isCheckError = false;
    username.style.border = "1px solid red";
    errorUsername.innerHTML = "! This name is invalid.";
  } else {
    username.style.border = "1px solid #a7a7a7";
  }

  if (email.value === "") {
    email.style.border = "1px solid red";
    errorEmail.innerHTML = "! This email is invalid.";
  } else if (
    !email.value
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  ) {
    email.style.border = "1px solid red";
    errorEmail.innerHTML = "! Make sure it’s written like example@email.com";
    isCheckError = false;
  } else {
    email.style.border = "1px solid #a7a7a7";
  }

  if (password.value === "") {
    password.style.border = "1px solid red";
    errorPassword.innerHTML = "! This password is invalid.";
    isCheckError = false;
  } else {
    password.style.border = "1px solid #a7a7a7";
  }

  if (confirmPassword.value === "") {
    confirmPassword.style.border = "1px solid red";
    errorConfirmPassword.innerHTML = "! This password is invalid.";
    isCheckError = false;
  } else {
    confirmPassword.style.border = "1px solid #a7a7a7";
  }

  if (confirmPassword.value !== password.value) {
    errorConfirmPassword.innerHTML = "! This password is invalid.";
    isCheckError = false;
  } else {
    confirmPassword.style.border = "1px solid #a7a7a7";
  }
  const isCheckEmail = userStorage?.some((user) => user.email === email.value);
  if (isCheckEmail) {
    errorEmail.innerHTML = "! Email already exists.";
    isCheckError = false;
  } else {
    email.style.border = "1px solid #a7a7a7";
  }

  return isCheckError;
};

//xử lý đăng ký
btnSignUp.addEventListener("click", (e) => {
  e.preventDefault();
  if (checkErrorInputs()) {
    userStorage.push({
      id: Date.now(),
      username: username.value,
      email: email.value,
      password: password.value,
    });
    localStorage.setItem("userStorage", JSON.stringify(userStorage));
    alert("Đăng kí thành công !");
    location.href = "Login.html";
    document.getElementsByTagName("form")[0].reset();
  }
});
