import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup)
    this._image = document.querySelector('.popup__image');
    this._text = document.querySelector('.popup__text');
  }

  open(link, name) {
    super.open()
    this._image.src = link;
    this._image.alt = name;
    this._text.textContent = name;
  }
}