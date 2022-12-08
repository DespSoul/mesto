export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._openPopupImage = handleCardClick;
    this._templateSelector = templateSelector;
    this._name = data.name;
    this._link = data.link
  };

  _templateElement() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element__content')
      .cloneNode(true);

    return cardElement;
  }

  createElement() {
    this._elementContent = this._templateElement();
    this._cardImage = this._elementContent.querySelector('.element__image');
    this._cardText = this._elementContent.querySelector('.element__title');
    this._buttonLike = this._elementContent.querySelector('.element__like');
    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardText.textContent = this._name;

    return this._elementContent;
  };

  _setEventListeners() {
    this._elementContent.querySelector('.element__delete')
      .addEventListener('click', () => {
        this._elementContent.remove();
        this._elementContent = null;
      });

    this._buttonLike.addEventListener('click', () => this._buttonLike
        .classList.toggle('element__like_active'));

    this._cardImage.addEventListener('click', () => this._openPopupImage
      (this._link, this._name ));
  };
};