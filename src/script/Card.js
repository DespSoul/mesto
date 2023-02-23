export default class Card {
  constructor(
    data,
    templateSelector,
    handleCardClick,
    popupDeleteCard,
    userId,
    toggleLike
  ) {
    this._openPopupImage = handleCardClick;
    this._templateSelector = templateSelector;
    this._toggleLike = toggleLike;
    this._popupDeleteCard = popupDeleteCard;
    this._data = data;
    this._ownerId = data.owner._id;
    this._name = data.name;
    this._link = data.link;
    this._userId = userId;
  }

  _templateElement() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element__content")
      .cloneNode(true);

    return cardElement;
  }

  createElement() {
    this._elementContent = this._templateElement();
    this._cardImage = this._elementContent.querySelector(".element__image");
    this._cardText = this._elementContent.querySelector(".element__title");
    this._buttonLike = this._elementContent.querySelector(".element__like");
    this._buttonRemove = this._elementContent.querySelector(".element__delete");
    this._counterLike = this._elementContent.querySelector(
      ".element__like-quantity"
    );

    this._isLiked = !!this._data.likes.find((obj) => obj._id === this.userId);

    if (this._userId !== this._ownerId) {
      this._buttonRemove.remove();
    }

    if (this._isLiked) {
      this._buttonLike.classList.add("element__like_active");
    }

    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardText.textContent = this._name;
    this._counterLike.textContent = this._data.likes.length;

    return this._elementContent;
  }

  _clickLikeButtonHandler() {
    this._toggleLike(this._isLiked, this._data._id);
  }

  likeButtonActive(count) {
    this._buttonLike.classList.add("element__like_active");
    this._counterLike.textContent = count;
    this._isLiked = true;
  }

  likeButtonInactive(count) {
    this._buttonLike.classList.remove("element__like_active");
    this._counterLike.textContent = count;
    this._isLiked = false;
  }

  _clickImageHandler() {
    this._openPopupImage(this._link, this._name);
  }

  _setEventListeners() {
    this._buttonRemove.addEventListener("click", () => {
      this._popupDeleteCard(this._data, this._elementContent);
    });

    this._buttonLike.addEventListener("click", () =>
      this._clickLikeButtonHandler()
    );

    this._cardImage.addEventListener("click", () => this._clickImageHandler());
  }
}
