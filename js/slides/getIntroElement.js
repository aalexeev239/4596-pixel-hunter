import getElementFromTemplate from '../utils/getElementFromTemplate';
import renderSlide from '../renderSlide';
import introTemplate from '../templates/intro';
import getGreetingElement from './getGreetingElement';

const getIntroElement = () => {
  const introElement = getElementFromTemplate(introTemplate);
  const asteriskElement = introElement.querySelector('.intro__asterisk');

  if (asteriskElement) {
    const onClick = () => {
      renderSlide(getGreetingElement());
      cleanup();
    };

    const cleanup = () => {
      asteriskElement.removeEventListener('click', onClick);
    };

    asteriskElement.addEventListener('click', onClick);
  }

  return introElement;
};

export default getIntroElement;
