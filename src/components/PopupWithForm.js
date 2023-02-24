import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selectorPopup, submitForm) {
    super(selectorPopup);
    this._form = this._popup.querySelector(".popup__form");
    this._inputs = this._form.querySelectorAll(".popup__input");
    this._handleSubmit = submitForm;
    this._buttonFormSubmit = this._popup.querySelector(".popup__button")
    this._defaultButtonText  =  this._buttonFormSubmit.textContent
  }
  _getInputValues() {
    const values = {};
    this._inputs.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }

  getDefaultButtonText(){
    this._buttonFormSubmit.textContent = this._defaultButtonText
  }

  setInputsValues(values) {
    this._inputs.forEach((input) => {
      if (values[input.name]) {
        input.value = values[input.name];
      }
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this._buttonFormSubmit.textContent = "Сохранение..."
      this._handleSubmit(this._getInputValues())
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
