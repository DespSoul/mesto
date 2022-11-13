export default class Card {
  constructor(data, templateSelector, openPopupImage) {
    this._openPopupImage = openPopupImage;
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
    const cardImage = this._elementContent.querySelector('.element__image');
    const cardText = this._elementContent.querySelector('.element__title');
    this._setEventListeners();


    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardText.textContent = this._name;

    return this._elementContent;
  };

  _setEventListeners() {
    this._elementContent.querySelector('.element__delete')
      .addEventListener('click', () => this._elementContent
        .closest('.element__content').remove());

    this._elementContent.querySelector('.element__like')
      .addEventListener('click', () => this._elementContent
        .querySelector('.element__like')
        .classList.toggle('element__like_active'));

    this._elementContent.querySelector('.element__image')
      .addEventListener('click', () => this._openPopupImage
        ({ name: this._name, link: this._link }));
  };
};