import Card from "./card.js";
import { initialCards } from './data.js';
import FormValidator from './FormValidator.js'

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__span_active',
};


const popupProfile = document.querySelector('#popup-profile');
const buttonEditPopupProfile = document.querySelector('.button_edit');
const buttonClosePopupProfile = document.querySelector('#profile-close');
const profileFormSave = document.querySelector('#new-profile-text-form');
const nameInput = document.querySelector('#popup-name');
const jobInput = document.querySelector('#popup-subtitle');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const popupElementArray = document.querySelectorAll('.popup');

const popupPlace = document.querySelector('#popup-place');
const buttonOpenPopupPlace = document.querySelector('.button_add');
const buttonClosePopupPlace = document.querySelector('#close-place');
const formSaveNewPlace = document.querySelector('#new-place-form');
const popupNameImagePlace = document.querySelector("#name-image");
const popupUrlImagePlace = document.querySelector('#url-image');
const buttonPopupPlace = document.querySelector('#popup-button-place')
const cards = document.querySelector('.element');


const popupImage = document.querySelector('#popup-image');
const buttonClosePopupImage = document.querySelector('#close-popup-image');
const popupContentImage = document.querySelector('.popup__image');
const popupContentText = document.querySelector('.popup__text');

const FormValidatorPlace = new FormValidator(validationConfig, formSaveNewPlace);
const FormValidatorProfile = new FormValidator(validationConfig, profileFormSave);

const openPopup = (element) => {
  element.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupKeydownEsc);
};

const closePopup = (element) => {
  element.classList.remove('popup_opened');

  document.removeEventListener('keydown', closePopupKeydownEsc);
};

function closePopupKeydownEsc(e) {
  if (e.key === 'Escape') {
    const popupElement = document.querySelector('.popup_opened');
    if (popupElement) {
      closePopup(popupElement)
    }
  };
};

popupElementArray.forEach((element) => {
  element.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
      closePopup(element)
    };
  });
});

function openPopupProfile() {
  openPopup(popupProfile);
  FormValidatorProfile.resetValidation();

  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
};


buttonEditPopupProfile.addEventListener('click', openPopupProfile);

function closePopupProfile() {
  closePopup(popupProfile);
};

buttonClosePopupProfile.addEventListener('click', closePopupProfile);

function saveFormProfile(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;

  closePopupProfile();
};

profileFormSave.addEventListener('submit', saveFormProfile);





function openPopupPlace() {
  openPopup(popupPlace);
  FormValidatorPlace.resetValidation();
};

buttonOpenPopupPlace.addEventListener('click', openPopupPlace);

function closePopupPlace() {
  closePopup(popupPlace);

  formSaveNewPlace.reset();
};

buttonClosePopupPlace.addEventListener('click', closePopupPlace);

function openPopupImage(data) {
  popupContentImage.src = data.link;
  popupContentImage.alt = data.name;
  popupContentText.textContent = data.name;

  openPopup(popupImage);
}


function closePopupImage() {
  closePopup(popupImage);
};

buttonClosePopupImage.addEventListener('click', closePopupImage);

function createCard(data) {
  const newCard = new Card(data, '.element-template', openPopupImage);
  return newCard.createElement();
}

const addNewCard = (cardElement) => {
  cards.prepend(cardElement);
};

function submitSaveNewPlace(e) {
  e.preventDefault()

  const card = createCard({ name: popupNameImagePlace.value, link: popupUrlImagePlace.value });
  addNewCard(card);

  closePopupPlace()
}

initialCards.forEach((item) => {
  const card = createCard(item);
  addNewCard(card);
});

formSaveNewPlace.addEventListener('submit', submitSaveNewPlace);

FormValidatorProfile.enableValidation();

FormValidatorPlace.enableValidation();