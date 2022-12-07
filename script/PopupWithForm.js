import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selectorPopup, submitForm) {
    super(selectorPopup)
    this._buttonSubmitForm = document.querySelector('.popup__button');
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = this._form.querySelectorAll(".popup__input");
    this._submitForm = submitForm;
  }
  _getInputValues() {
    const values = {};
    this._inputs.forEach((input) => {
      values[input.name] = input.value;
    })
    return values
  }

  setIntutsValues(values) {
    this._inputs.forEach((input) => {
      if (values[input.name]) 
      { input.value = values[input.name] }
    })
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (e) => {
      e.preventDefault()
      this._submitForm(this._getInputValues());
      super.close()
    })
  }

  close() {
    super.close()
    this._form.reset()
  }
}
