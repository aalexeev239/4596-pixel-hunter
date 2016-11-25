import getElementFromTemplate from '../utils/getElementFromTemplate';
import renderSlide from '../renderSlide';

import greetingTemplate from '../templates/greeting';
import rulesElement from './rulesElement';

const greetingElement = getElementFromTemplate(greetingTemplate);
const continueElement = greetingElement.querySelector('.greeting__continue');

if (continueElement) {

  const onClick = (ev) => {
    ev.preventDefault();
    renderSlide(rulesElement);
    cleanup();
  };

  const cleanup = () => {
    continueElement.removeEventListener('click', onClick);
  };

  continueElement.addEventListener('click', onClick);
}

export default greetingElement;
