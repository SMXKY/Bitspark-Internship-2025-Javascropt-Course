//custom alert
const alertHolder = document.querySelector(".js-alert-holder");
const alertIconHolder = document.querySelector(".js-alert-icon-holder");
const alertImage = document.querySelector(".js-alert-img");
const alertMessageText = document.querySelector(".js-alert-message");
const closeAlertBtn = document.querySelector(".js-close-alert-btn");
const closeAlertBtnIcon = document.querySelector(".js-close-alert-btn-icon");

const fullAlertHolder = document.querySelector(".js-full-alert-holder");
let alertTimeoutId;

export function alertMessage(message, type) {
  // Remove any previously added alert type classes
  alertHolder.classList.remove("error-holder", "success-holder");
  alertIconHolder.classList.remove("error-icon-holder", "success-icon-holder");
  closeAlertBtn.classList.remove("error-close-btn", "success-close-btn");

  const closeImg = `./images-and-icons/Close-${type}.png`;

  const specifics = {
    img: "",
    holderClass: "",
    iconHolcderClass: "",
    closeButtonClass: "",
  };

  if (type === "error") {
    specifics.img = `./images-and-icons/error-icon.png`;
  } else if (type === "success") {
    specifics.img = `./images-and-icons/success-icon.png`;
  }

  specifics.holderClass = `${type}-holder`;
  specifics.iconHolcderClass = `${type}-icon-holder`;
  specifics.closeButtonClass = `${type}-close-btn`;

  // Add new classes for the current alert type
  alertHolder.classList.add(specifics.holderClass);
  alertIconHolder.classList.add(specifics.iconHolcderClass);
  alertImage.src = specifics.img;
  alertMessageText.innerHTML = message;
  closeAlertBtn.classList.add(specifics.closeButtonClass);
  closeAlertBtnIcon.src = closeImg;
  fullAlertHolder.classList.add("show-alert");

  alertTimeoutId = setTimeout(() => {
    fullAlertHolder.classList.remove("show-alert");
    clearTimeout(alertTimeoutId);
  }, 4000);

  closeAlertBtn.addEventListener("click", () => {
    fullAlertHolder.classList.remove("show-alert");
    clearTimeout(alertTimeoutId);
  });
}
