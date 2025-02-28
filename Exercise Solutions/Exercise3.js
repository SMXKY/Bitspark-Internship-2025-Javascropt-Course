// Exercise 3

// 1. Create a JavaScript program with two predefined string variables:

// - `password` with a value of `"000000"`
// - `username` with a value of `"johnMinang"`

// Your program should prompt the user to enter their username and password.

// - If the user enters the correct username **and** password (matching the predefined values), display `"You are logged in"` in the console.
// - If either the username or password is incorrect, display an error message in the console.

const password = "000000";
const username = "johnMinang";

const accountName = prompt("What is your user name?");
const accountPassword = prompt("What is your password");

if (username === accountName && password === accountPassword) {
  console.log("You are logged in.");
} else {
  console.log("Wrong user name or password!");
}
