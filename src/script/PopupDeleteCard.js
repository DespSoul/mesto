import Popup from "./Popup.js";

export default class PopupDeleteCard extends Popup {
  constructor(selectorPopup, deleteCard) {
    super(selectorPopup);
    this._deleteCard = deleteCard;
    this._buttonDeleteCard = document.querySelector(
      ".popup__button-delete-element"
    );
  }

  openPopupDelete(id, card) {
    super.open();
    this._id = id;
    this._card = card;
  }

  setEventListeners() {
    super.setEventListeners();
    this._buttonDeleteCard.addEventListener("click", () => {
      this._deleteCard(this._id, this._card)
        .then(() => {
          super.close();
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }
}
