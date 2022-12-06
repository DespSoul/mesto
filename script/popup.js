export default class Popup {
  constructor(selectorPopup) {
    this._popup = document.querySelector(selectorPopup);
  }

  _handleEscClose(e) {
    if (e.key === 'Escape') {
      this.close()
    };
  }

  open() {   
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose)
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  setEventListeners() {
    this._popup.addEventListener('click', (e) => {
      if (e.target === e.currentTarget) {
        this.close()
      }
    })
  }
};