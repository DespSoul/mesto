import Card from "./Card.js";
import { initialCards } from "./data.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import {
  buttonEditPopupProfile,
  profileForm,
  cards,
  buttonOpenPopupPlace,
  formSaveNewPlace,
} from "./const.js";
import "../pages/index.css";

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__span_active",
};

const formValidatorPlace = new FormValidator(
  validationConfig,
  formSaveNewPlace
);
const formValidatorProfile = new FormValidator(validationConfig, profileForm);

const userInfo = new UserInfo(".profile__title", ".profile__subtitle");
const section = new Section(
  { items: initialCards, renderer: createCard },
  ".element"
);
section.renderInitialCard();
const popupImageOpen = new PopupWithImage("#popup-image");
popupImageOpen.setEventListeners();
const popupFormProfile = new PopupWithForm("#popup-profile", (values) => {
  userInfo.setUserInfo(values);
});
popupFormProfile.setEventListeners();
const popupFormPlace = new PopupWithForm("#popup-place", (values) => {
  section.addItem(createCard(values));
});
popupFormPlace.setEventListeners();

buttonEditPopupProfile.addEventListener("click", () => {
  popupFormProfile.open();
  popupFormProfile.setInputsValues(userInfo.getUserInfo());
  formValidatorProfile.resetValidation();
});

buttonOpenPopupPlace.addEventListener("click", () => {
  popupFormPlace.open();
  formValidatorPlace.resetValidation();
});

function createCard(data) {
  const newCard = new Card(data, ".element-template", (link, name) => {
    popupImageOpen.open(link, name);
  });

  return newCard.createElement();
}

formValidatorProfile.enableValidation();
formValidatorPlace.enableValidation();
