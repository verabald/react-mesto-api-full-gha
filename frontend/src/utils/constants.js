const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-submit',
    inactiveButtonClass: 'popup__button-submit_disabled',
    inputErrorClass: 'popup__input_type_error'
};

const apiOptions = {
        url: 'https://mesto.nomoreparties.co/v1/cohort-66',
        headers: {
          authorization: '4e14d5ac-b5a8-4129-9bd2-ef7c1e4423e4',
          'Content-Type': 'application/json'
        }
};

export {
    validationConfig,
    apiOptions
};