import getElementFromTemplate from '../utils/getElementFromTemplate';
import renderSlide from '../renderSlide';

import rulesTemplate from '../templates/rules';
import game1Element from './game1Element';

const rulesElement = getElementFromTemplate(rulesTemplate);
const formElement = rulesElement.querySelector('.rules__form');
const inputElement = rulesElement.querySelector('.rules__input');
const submitElement = rulesElement.querySelector('.rules__button');

if (true || formElement && inputElement && submitElement) {

  const onInput = () => {
    submitElement.disabled = inputElement.value.length === 0;
  };

  const onSubmit = (ev) => {
    ev.preventDefault();

    if (inputElement.value.length > 0) {
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
