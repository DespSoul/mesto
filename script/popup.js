export default class Popup {
  constructor(selectorPopup) {
    this._popup = document.querySelector(selectorPopup);
    this._popupButtonClose = this._popup.querySelector(".popup__close");
  }

  _handleEscClose(e) {
    if (e.key === 'Escape') {
      this.close()
    };
  }

  open() {   
    this._popup.classList.add('popup_opened')
    document.addEventListener('keydown', (e) => this._handleEscClose(e));
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', (e) => this._handleEscClose(e));
  }

  setEventListeners() {
    this._popup.addEventListener('click', (e) => {
      if (e.target === e.currentTarget || this._popupButtonClose === e.target) {
        this.close()} 
    })
  }
};