import getElementFromTemplate from '../utils/getElementFromTemplate';
import renderSlide from '../renderSlide';
import greetingTemplate from '../templates/greeting';
import getRulesElement from './getRulesElement';
import rulesData from '../fixtures/rulesData';

const getGreetingElement = () => {
  const greetingElement = getElementFromTemplate(greetingTemplate);
  const continueElement = greetingElement.querySelector('.greeting__continue');

  if (continueElement) {

    const onClick = () => {
      cleanup();
      renderSlide(getRulesElement(rulesData));
    };

    const cleanup = () => {
      continueElement.removeEventListener('click', onClick);
    };

    continueElement.addEventListener('click', onClick);
  }

  return greetingElement;
};

export default getGreetingElement;
