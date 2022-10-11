const popupProfile = document.querySelector('#popup-profile');
const buttonEdit = document.querySelector('.button_edit');
const buttonClose = document.querySelector('#profile-close');
let formElement = document.querySelector('#profile-save');
let nameInput = document.querySelector('#popup-name');
let jobInput = document.querySelector('#popup-subtitle');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

function openPopup() {
  popupProfile.classList.add('popup_opened');

  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
};

buttonEdit.addEventListener('click', openPopup);

function closePopup() {
  popupProfile.classList.remove('popup_opened');
};

buttonClose.addEventListener('click', closePopup);

function formSubmitHandler(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;

  closePopup();
};

formElement.addEventListener('submit', formSubmitHandler);



const popupPlace = document.querySelector('#popup-place');
const buttonAdd = document.querySelector('.button_add');
const closePlace = document.querySelector('#close-place');
const savePlace = document.querySelector('#save-place')
let popupNameImage = document.querySelector("#name-image");
let popupUrlImage = document.querySelector('#url-image');


function openPlace() {
  popupPlace.classList.add('popup_opened');
};

buttonAdd.addEventListener('click', openPlace);

function hidePlace() {
  popupPlace.classList.remove('popup_opened');

  savePlace.reset();
};

closePlace.addEventListener('click', hidePlace);



const cards = document.querySelector('.element');
const cardTemplate = document.querySelector('#element-template').content;

const render = () => {
  initialCards.forEach((item) => {
    const arrayElemetn = createElement(item.link, item.name);
    cards.prepend(arrayElemetn);
  });
};

const createElement = (link, name) => {
  const card = cardTemplate.querySelector('.element__content').cloneNode(true);
  const cardImage = card.querySelector('.element__image');
  const cardText = card.querySelector('.element__title');

  const battonDeleteElement = card.querySelector('.element__delete');
  battonDeleteElement.addEventListener('click', deleteElement);

  const buttonLike = card.querySelector('.element__like');
  buttonLike.addEventListener('click', likeButtonActive);

  cardImage.addEventListener('click', () => {
    popupContentImage.src = cardImage.src;
    popupContentImage.alt = cardText.textContent;
    popupContentText.textContent = cardText.textContent;

    openPopupImage()
  });

  cardImage.src = link;
  cardText.textContent = name;
  return card
};

render()

const addElement = (evt) => {
  evt.preventDefault();

  const element = createElement(popupUrlImage.value, popupNameImage.value);
  cards.prepend(element);

  hidePlace()
};

savePlace.addEventListener('submit', addElement);

function deleteElement(e) {
  const targetElementContent = e.target.closest('.element__content');
  targetElementContent.remove();
};



const popupImage = document.querySelector('#popup-image');
const buttonCloseImage = document.querySelector('#close-popup-image');
const popupContentImage = document.querySelector('.popup__image');
const popupContentText = document.querySelector('.popup__text');

function openPopupImage() {
  popupImage.classList.add('popup_opened');
};

function closePopupImage() {
  popupImage.classList.remove('popup_opened');
};

buttonCloseImage.addEventListener('click', closePopupImage);


function likeButtonActive(e) {
  const targetElementButton = e.target.closest('.element__like');
  targetElementButton.classList.toggle('element__like_active');
};



