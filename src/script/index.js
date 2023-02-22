import Card from "./Card.js";
import { initialCards } from "./data.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import Api from "./Api.js";
import PopupDeleteCard from "./PopupDeleteCard.js";
import {
  buttonEditPopupProfile,
  profileForm,
  cards,
  buttonOpenPopupPlace,
  popupFormSaveAvatar,
  formSaveNewPlace,
  popupDeleteCard,
  avatarProfile,
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

let userId;

const formValidatorPlace = new FormValidator(
  validationConfig,
  formSaveNewPlace
);
const formValidatorProfile = new FormValidator(validationConfig, profileForm);
const formValidatorAvatar = new FormValidator(
  validationConfig,
  popupFormSaveAvatar
);

const userInfo = new UserInfo(
  ".profile__title",
  ".profile__subtitle",
  ".profile__avatar"
);

const section = new Section(
  { items: initialCards, renderer: createCard },
  ".element"
);

const popupСonfirmDeleteCard = new PopupDeleteCard(
  ".popup-delete-card",
  async (id, card) => {
    api
      .deleteCard(id)
      .then(() => {
        card.remove();
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

const popupAvatar = new PopupWithForm(".popup-save-avatar", () => {
  async (link) => {
    return api
      .editingAvatar(link)
      .then((link) => {
        userInfo.setUserInfo(link);
      })
      .catch((err) => {
        console.log(err);
      });
  };
});

const api = new Api({
  utl: "https://mesto.nomoreparties.co/v1/cohort-60",
  headers: {
    authorization: "f7de5b33-38c0-4e63-aff7-9e2d9d442f71",
    "Content-Type": "application/json",
  },
});

section.renderInitialCard();

const popupImageOpen = new PopupWithImage("#popup-image");
popupImageOpen.setEventListeners();

const popupFormProfile = new PopupWithForm("#popup-profile", async (data) => {
  return api(data)
    .editingProfile(data)
    .then((data) => {
      userInfo.setUserInfo(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

popupFormProfile.setEventListeners();

const popupFormPlace = new PopupWithForm("#popup-place", async (data) => {
  return api(data)
    .addNewCard(data)
    .then((card) => {
      section.addItem(createCard(card));
    })
    .catch((err) => {
      console.log(err);
    });
});

popupFormPlace.setEventListeners();

avatarProfile.addEventListener("click", () => {
  popupAvatar.open();
  formValidatorAvatar.resetValidation();
});

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
  const newCard = new Card(
    data,
    ".element-template",
    (link, name) => {
      popupImageOpen.open(link, name);
    },
    (data, card) => {
      popupСonfirmDeleteCard.openPopupDelete(data._id, card);
    },
    userId,
    (isLiked, id) => {
      if (isLiked) {
        api
          .deleteLike(id)
          .then((data) => {
            newCard.likeButtonActive(data.likes.length);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        api
          .addLike(id)
          .then((data) => {
            newCard.likeButtonInactive(data.likes.length);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  );

  return newCard.createElement();
}

Promise.all([api.getUsers(), api.getInitialCards()])
  .then(([usersData, cards]) => {
    userId = usersData._id;
    userInfo.setUserInfo(usersData);
    section.addItem(createCard(cards));
  })
  .catch((err) => {
    console.log(err);
  });

formValidatorProfile.enableValidation();
formValidatorPlace.enableValidation();
formValidatorAvatar.enableValidation();
