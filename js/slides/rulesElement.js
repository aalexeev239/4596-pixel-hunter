import getElementFromTemplate from '../utils/getElementFromTemplate';
import renderSlide from '../renderSlide';

import rulesTemplate from '../templates/rules';
import game1Element from './game1Element';

const rulesElement = getElementFromTemplate(rulesTemplate);
const formElement = rulesElement.querySelector('.rules__form');
const inputElement = rulesElement.querySelector('.rules__input');
const submitElement = rulesElement.querySelector('.rules__button');

if (formElement && inputElement && submitElement) {

  const checkInputValidity = () => {
    return inputElement.value.trim().length > 0;
  };

  const onInput = () => {
    submitElement.disabled = !checkInputValidity();
  };

  const onSubmit = (ev) => {
    ev.preventDefault();

    if (checkInputValidity()) {
      renderSlide(game1Element);
      cleanup();
    }
  };

  const cleanup = () => {
    inputElement.removeEventListener('input', onInput);
    formElement.removeEventListener('submit', onSubmit);
  };

  inputElement.addEventListener('input', onInput);
  formElement.addEventListener('submit', onSubmit);
}

export default rulesElement;
