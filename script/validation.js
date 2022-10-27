const showInputError = (popupForm, popupInput, errorMessage, config) => {
  const spanError = popupForm.querySelector(`.${popupInput.id}-error`);


  popupInput.classList.add(config.inputErrorClass);
  spanError.textContent = errorMessage;
  spanError.classList.add(config.errorClass);
};

const hideInputError = (popupForm, popupInput, config) => {
  const spanError = popupForm.querySelector(`.${popupInput.id}-error`);

  popupInput.classList.remove(config.inputErrorClass);
  spanError.classList.remove(config.errorClass);
  spanError.textContent = '';
};

const isValid = (popupForm, popupInput, config) => {
  if (!popupInput.validity.valid) {
    showInputError(popupForm, popupInput, popupInput.validationMessage, config);
  } else {
    hideInputError(popupForm, popupInput, config);
  }
};

const toggleButtonPopup = (arrayInput, saveButtonPopup, config) => {
  if (!hasInvalidInput(arrayInput)) {
    activeButtonPopup(saveButtonPopup, config)
  } else {
    inactiveButtonPopup(saveButtonPopup, config)
  }
};

const setEventListeners = (popupForm, config) => {
  const arrayInput = Array.from(popupForm.querySelectorAll(config.inputSelector));
  const saveButtonPopup = popupForm.querySelector(config.submitButtonSelector);

  toggleButtonPopup(arrayInput, saveButtonPopup, config)

  arrayInput.forEach((popupInput) => {
    popupInput.addEventListener('input', () => {
      isValid(popupForm, popupInput, config);

      toggleButtonPopup(arrayInput, saveButtonPopup, config)
    })
  });
};

const activeButtonPopup = (saveButtonPopup, config) => {
  saveButtonPopup.removeAttribute('disabled');
  saveButtonPopup.classList.remove(config.inactiveButtonClass);
};

const inactiveButtonPopup = (saveButtonPopup, config) => {
  saveButtonPopup.setAttribute('disabled', 'true');
  saveButtonPopup.classList.add(config.inactiveButtonClass);
}

const hasInvalidInput = (arrayInput) => {
  return arrayInput.some((popupInput) => {
    return !popupInput.validity.valid
  });
};

const enableValidation = (config) => {
  const arrayForm = Array.from(document.querySelectorAll(config.formSelector));

  arrayForm.forEach((popupForm) => {
    setEventListeners(popupForm, config)
  });
  return function (popup){
    const popupForm = popup.querySelector(config.formSelector)
    const saveButtonPopup = popupForm.querySelector(config.submitButtonSelector);
    const arrayInput = Array.from(popupForm.querySelectorAll(config.inputSelector));
    inactiveButtonPopup (saveButtonPopup, config);
    arrayInput.forEach((input) => {
      hideInputError (popupForm, input, config);
    })
  }
};
