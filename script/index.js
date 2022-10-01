const popup = document.querySelector('.popup')
const buttonEdit = document.querySelector('.button_edit');
const buttonClose = document.querySelector('.popup__close');
let formElement = document.querySelector('.popup__inputs');
let nameInput = document.querySelector('.popup__name');
let jobInput = document.querySelector('.popup__subtitle');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

function openPopup () {
  popup.classList.add('popup_opened');

  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
};

buttonEdit.addEventListener('click', openPopup);

function closePopup () {
  popup.classList.remove('popup_opened');
};

buttonClose.addEventListener('click', closePopup);

function formSubmitHandler (evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;

  closePopup();
};

formElement.addEventListener('submit', formSubmitHandler);
