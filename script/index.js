const validationReset = enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__span_active'
});


const popupProfile = document.querySelector('#popup-profile');
const buttonEditPopupProfile = document.querySelector('.button_edit');
const buttonClosePopupProfile = document.querySelector('#profile-close');
const profileFormSave = document.querySelector('#new-profile-text-form');
const nameInput = document.querySelector('#popup-name');
const jobInput = document.querySelector('#popup-subtitle');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const popupElementArray = document.querySelectorAll('.popup');

const openPopup = (element) => {
  element.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupKeydownEsc);
};

const closePopup = (element) => {
  element.classList.remove('popup_opened');

  document.removeEventListener('keydown', closePopupKeydownEsc);
};

function closePopupKeydownEsc (e) {
  if (e.key === 'Escape') {
    const popupElement = document.querySelector('.popup_opened');
    if (popupElement) {
      closePopup(popupElement)
    }
  };
};

popupElementArray.forEach((element) =>{
  element.addEventListener('click', (e) =>{
    if(e.target === e.currentTarget){
      closePopup(element)
    };
  });
});

function openPopupProfile() {
  openPopup(popupProfile);
  validationReset(popupProfile);

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



const popupPlace = document.querySelector('#popup-place');
const buttonOpenPopupPlace = document.querySelector('.button_add');
const buttonClosePopupPlace = document.querySelector('#close-place');
const formSaveNewPlace = document.querySelector('#new-place-form');
const popupNameImagePlace = document.querySelector("#name-image");
const popupUrlImagePlace = document.querySelector('#url-image');
const buttonPopupPlace = document.querySelector('#popup-button-place')


function openPopupPlace() {
  openPopup(popupPlace);
  validationReset(popupPlace);

  buttonPopupPlace.setAttribute('disabled', 'true');
  buttonPopupPlace.classList.add('popup__button_disabled');
};

buttonOpenPopupPlace.addEventListener('click', openPopupPlace);

function closePopupPlace() {
  closePopup(popupPlace);

  formSaveNewPlace.reset();
};

buttonClosePopupPlace.addEventListener('click', closePopupPlace);



const cards = document.querySelector('.element');
const cardTemplate = document.querySelector('#element-template').content;

const renderCardArray = () => {
  initialCards.forEach((item) => {
    const newCard = createElement(item.link, item.name);
    cards.prepend(newCard);
  });
};

const createElement = (link, name) => {
  const card = cardTemplate.querySelector('.element__content').cloneNode(true);
  const cardImage = card.querySelector('.element__image');
  const cardText = card.querySelector('.element__title');

  const battonDeleteElement = card.querySelector('.element__delete');
  battonDeleteElement.addEventListener('click', deleteElement);

  const buttonLike = card.querySelector('.element__like');
  buttonLike.addEventListener('click', () => {
    buttonLike.classList.toggle('element__like_active');
  });

  cardImage.addEventListener('click', () => {
    popupContentImage.src = cardImage.src;
    popupContentImage.alt = cardText.textContent;
    popupContentText.textContent = cardText.textContent;

    openPopup(popupImage);
  });

  cardImage.src = link;
  cardImage.alt = name;
  cardText.textContent = name;
  return card
};

renderCardArray()

const addNewCard = (evt) => {
  evt.preventDefault();

  const element = createElement(popupUrlImagePlace.value, popupNameImagePlace.value);
  cards.prepend(element);

  closePopupPlace();
};

formSaveNewPlace.addEventListener('submit', addNewCard);

function deleteElement(e) {
  const targetElementContent = e.target.closest('.element__content');
  targetElementContent.remove();
};



const popupImage = document.querySelector('#popup-image');
const buttonClosePopupImage = document.querySelector('#close-popup-image');
const popupContentImage = document.querySelector('.popup__image');
const popupContentText = document.querySelector('.popup__text');

function closePopupImage() {
  closePopup(popupImage);
};

buttonClosePopupImage.addEventListener('click', closePopupImage);