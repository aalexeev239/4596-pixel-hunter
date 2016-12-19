import getElementFromTemplate from '../utils/getElementFromTemplate';
import renderSlide from '../utils/renderSlide';
import introTemplate from '../templates/intro';
import getGreetingElement from './getGreetingElement';

const getIntroElement = () => {
  const introElement = getElementFromTemplate(introTemplate);
  const asteriskElement = introElement.querySelector('.intro__asterisk');

  if (asteriskElement) {
    const onClick = () => {
      renderSlide(getGreetingElement());
    };

    asteriskElement.addEventListener('click', onClick);
  }

  return introElement;
};

export default getIntroElement;
