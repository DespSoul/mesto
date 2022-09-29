let popup = document.querySelector('.popup')
let buttonEdit = document.querySelector('.button_edit');
let buttonClose = document.querySelector('.popup__close');
let popupButton = document.querySelector('.popup__button');
let formElement = document.querySelector('.popup__inputs');
let nameInput = document.querySelector('.popup__name');
let jobInput = document.querySelector('.popup__subtitle');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

function popupOpen () {
  popup.classList.add('popup_opened');

  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
};

buttonEdit.addEventListener('click', popupOpen);

function popupClose () {
  popup.classList.remove('popup_opened');
};

buttonClose.addEventListener('click', popupClose);

function formSubmitHandler (evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;

  popupClose();
};

formElement.addEventListener('submit', formSubmitHandler);
