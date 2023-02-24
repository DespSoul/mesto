import Card from "../script/Card.js";
import FormValidator from "../script/FormValidator.js";
import Section from "../script/Section.js";
import UserInfo from "../script/UserInfo.js";
import PopupWithImage from "../script/PopupWithImage.js";
import PopupWithForm from "../script/PopupWithForm.js";
import Api from "../script/Api.js";
import PopupDeleteCard from "../script/PopupDeleteCard.js";
import {
  buttonEditPopupProfile,
  profileForm,
  buttonOpenPopupPlace,
  popupFormSaveAvatar,
  formSaveNewPlace,
  avatarProfile,
} from "../script/const.js";
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

const section = new Section({renderer: createCard},
  ".element");

const api = new Api({
  utl: "https://mesto.nomoreparties.co/v1/cohort-60",
  headers: {
    authorization: "f7de5b33-38c0-4e63-aff7-9e2d9d442f71",
    "Content-Type": "application/json",
  },
});

const popupConfirmDeleteCard = new PopupDeleteCard(
  ".popup-delete-card",
  async (id, card) => {
    api
      .deleteCard(id)
      .then(() => {
        card.remove();
        card = null
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

popupConfirmDeleteCard.setEventListeners();

const popupAvatar = new PopupWithForm(".popup-save-avatar", async (data) => {
  return api
    .editingAvatar({ avatar: data.link })
    .then((data) => {
      userInfo.setUserInfo(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

popupAvatar.setEventListeners();

const popupFormProfile = new PopupWithForm("#popup-profile", async (data) => {
  return api
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
  return api
  .addNewCard(data)
  .then((data) => {
    section.addItem(createCard(data));
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

const popupImageOpen = new PopupWithImage("#popup-image");
popupImageOpen.setEventListeners();

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
      popupConfirmDeleteCard.openPopupDelete(data._id, card);
    },
    userId,
    (isLiked, id) => {
      if (isLiked) {
        api
          .deleteLike(id)
          .then((data) => {
            newCard.likeButtonInactive(data.likes.length);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        api
          .addLike(id)
          .then((data) => {
            newCard.likeButtonActive(data.likes.length);
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
    section.renderInitialCard(cards);
  })
  .catch((err) => {
    console.log(err);
  });

formValidatorProfile.enableValidation();
formValidatorPlace.enableValidation();
formValidatorAvatar.enableValidation();
