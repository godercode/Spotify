const email = document.querySelector(".email");
const password = document.querySelector(".password");
const btnLogin = document.querySelector(".login_btn");
const remember = document.getElementById("remember");

const errorEmail = document.querySelector(".error-email");
const errorPassword = document.querySelector(".error-password");
const userStorage = JSON.parse(localStorage.getItem("userStorage")) ?? [];

const userRemember = userStorage?.find((user) => user.isRemember);
if (userRemember) {
  email.value = userRemember.email ?? "";
  password.value = userRemember.password ?? "";
  remember.checked = userRemember.isRemember ?? false;
}

const checkErrorInputs = () => {
  const isCheckEmail = userStorage?.some((user) => user.email === email.value);
  const isCheckPassword = userStorage?.some(
    (user) => user.password === password.value
  );

  let isCheckError = true;

  if (email.value === "") {
    document.querySelector(".error-username").innerHTML = email.style.border =
      "1px solid red";
    errorEmail.innerHTML = "! Incorrect Email.";
    isCheckError = false;
  } else if (!isCheckEmail) {
    email.style.border = "1px solid red";
    errorEmail.innerHTML = "! This email is invalid.";
    isCheckError = false;
  } else {
    email.style.border = "1px solid #a7a7a7";
    isCheckError = true;
  }

  if (password.value === "") {
    password.style.border = "1px solid red";
    errorPassword.innerHTML = "! This password is invalid.";
    isCheckError = false;
  } else if (!isCheckPassword) {
    password.style.border = "1px solid red";
    errorPassword.innerHTML = "! Incorrect password.";
    isCheckError = false;
  } else {
    password.style.border = "1px solid #a7a7a7";
  }

  return isCheckError;
};
btnLogin.addEventListener("click", (e) => {
  e.preventDefault();
  if (checkErrorInputs()) {
    const user = userStorage.find((user) => {
      return user.email === email.value && user.password === password.value;
    });
    const { id } = user;
    if (remember.checked) {
      userStorage = userStorage.map((user) => {
        delete user.isRemember;
        return user;
      });
    }
    user.isRemember = remember.checked;
    if (email.value === user.email && password.value === user.password) {
      localStorage.setItem("Username", user.username);
      location.href = `index.html`;
    }
    localStorage.setItem("userStorage", JSON.stringify(userStorage));
    document.getElementsByTagName("form")[0].reset();
  }
});
