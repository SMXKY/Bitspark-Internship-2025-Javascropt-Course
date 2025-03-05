// # Exercise 9

// 1. Create a web with two predefined string variables:

// - `password` with a value of `"000000"`
// - `username` with a value of `"johnMinang"`

// Your program should provide a user a form to enter thier name, and password.

// - If the user enters the correct username **and** password (matching the predefined values), display `"You are logged in"` with an alert message.
// - If either the username or password is incorrect, display an error message with an alert message.

const password = "000000";
const username = "johnMinang";

const accountNameInput = document.querySelector(".js-user-name-input");
const accountPasswordInput = document.querySelector(".js-user-password-input");
const submitInfoBtn = document.querySelector(".js-submit-information-btn");

submitInfoBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const accountName = accountNameInput.value;
  const accountPassword = accountPasswordInput.value;

  if (username === accountName && password === accountPassword) {
    alert("You are logged in.");
  } else {
    alert("Wrong user name or password!");
  }
});
