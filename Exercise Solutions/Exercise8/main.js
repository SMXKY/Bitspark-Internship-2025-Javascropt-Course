// Create an app with a button that, when clicked, asks for the user's name and displays a greeting message on the web page with the user's name.

const btnElement = document.querySelector(".js-click-btn");
const textElement = document.querySelector(".js-greet-text");

btnElement.addEventListener("click", () => {
  const userName = prompt("What is your name?");

  textElement.innerHTML = `Hi there ${userName}! Welcome to my app.`;
});
