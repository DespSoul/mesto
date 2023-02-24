import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selectorPopup, submitForm) {
    super(selectorPopup);
    this._form = this._popup.querySelector(".popup__form");
    this._inputs = this._form.querySelectorAll(".popup__input");
    this._submitForm = submitForm;
    this._buttonFormSubmit = this._popup.querySelector(".popup__button")
    this._buttonSave  =  this._buttonFormSubmit.textContent
  }
  _getInputValues() {
    const values = {};
    this._inputs.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
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
      this._submitForm(this._getInputValues())
      .finally(() =>{
        this._buttonFormSubmit.textContent = this._buttonSave
      })
      this.close();
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
