export default class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
    this._inputs = Array.from(form.querySelectorAll(config.inputSelector));
    this._saveButton = form.querySelector(config.submitButtonSelector)
  };

  _showInputError = (popupInput, errorMessage) => {
    const spanError = this._form.querySelector(`.${popupInput.id}-error`);
    popupInput.classList.add(this._config.inputErrorClass);
    spanError.textContent = errorMessage;
    spanError.classList.add(this._config.errorClass);
  };

  _hideInputError = (popupInput) => {
    const spanError = this._form.querySelector(`.${popupInput.id}-error`);

    popupInput.classList.remove(this._config.inputErrorClass);
    spanError.classList.remove(this._config.errorClass);
    spanError.textContent = '';
  };

  _isValid = (popupInput) => {
    if (!popupInput.validity.valid) {
      this._showInputError(popupInput, popupInput.validationMessage);
    } else {
      this._hideInputError(popupInput);
    }
  };

  _toggleButtonPopup = () => {
    if (!this._hasInvalidInput()) {
      this._activeButtonPopup()
    } else {
      this._inactiveButtonPopup()
    }
  };

  _activeButtonPopup = () => {
    this._saveButton.removeAttribute('disabled');
    this._saveButton.classList.remove(this._config.inactiveButtonClass);
  };

  _inactiveButtonPopup = () => {
    this._saveButton.setAttribute('disabled', 'true');
    this._saveButton.classList.add(this._config.inactiveButtonClass);
  }

  _hasInvalidInput = () => {
    return this._inputs.some((popupInput) => {
      return !popupInput.validity.valid
    });
  };

  enableValidation = () => {
    this._toggleButtonPopup()
    this._inputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._isValid(input);
        this._toggleButtonPopup();
      })
    })
  };
  resetValidation() {
    this._toggleButtonPopup();
    this._inputs.forEach((input) => {
      this._hideInputError(input);
    })
  }
}
