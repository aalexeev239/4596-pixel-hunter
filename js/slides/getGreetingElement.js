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
      renderSlide(getRulesElement(rulesData));
    };

    continueElement.addEventListener('click', onClick);
  }

  return greetingElement;
};

export default getGreetingElement;
