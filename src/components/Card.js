export default class Card {
  constructor(
    data,
    templateSelector,
    handleCardClick,
    popupDeleteCard,
    userId,
    toggleLike
  ) {
    this._handleCardClick = handleCardClick;
    this._templateSelector = templateSelector;
    this._toggleLike = toggleLike;
    this._handleDeleteClick = popupDeleteCard;
    this._data = data;
    this._ownerId = data.owner._id;
    this._name = data.name;
    this._link = data.link;
    this._userId = userId;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element__content")
      .cloneNode(true);

    return cardElement;
  }

  createElement() {
    this._elementContent = this._getTemplate();
    this._cardImage = this._elementContent.querySelector(".element__image");
    this._cardText = this._elementContent.querySelector(".element__title");
    this._buttonLike = this._elementContent.querySelector(".element__like");
    this._buttonRemove = this._elementContent.querySelector(".element__delete");
    this._counterLike = this._elementContent.querySelector(
      ".element__like-quantity"
    );

    this._isLiked = !!this._data.likes.find((obj) => obj._id === this._userId);

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

  _handleLikeClick() {
    this._toggleLike(this._isLiked, this._data._id);
  }

  setLikeButtonActive(count) {
    this._buttonLike.classList.add("element__like_active");
    this._counterLike.textContent = count;
    this._isLiked = true;
  }

  setLikeButtonInactive(count) {
    this._buttonLike.classList.remove("element__like_active");
    this._counterLike.textContent = count;
    this._isLiked = false;
  }

  _handleImageClick() {
    this._handleCardClick(this._link, this._name);
  }

  _setEventListeners() {
    this._buttonRemove.addEventListener("click", () => {
      this._handleDeleteClick(this._data, this._elementContent);
    });

    this._buttonLike.addEventListener("click", () =>
      this._handleLikeClick()
    );

    this._cardImage.addEventListener("click", () => this._handleImageClick());
  }
}
