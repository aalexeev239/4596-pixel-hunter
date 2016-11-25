import getElementFromTemplate from '../utils/getElementFromTemplate';
import renderSlide from '../renderSlide';

import introTemplate from '../templates/intro';
import greetingElement from './greetingElement';

const introElement = getElementFromTemplate(introTemplate);
const asteriskElement = introElement.querySelector('.intro__asterisk');

if (asteriskElement) {
  let onClick = (ev) => {
    ev.preventDefault();
    renderSlide(greetingElement);
    cleanup();
  };

  let cleanup = () => {
    asteriskElement.removeEventListener('click', onClick);
  };

  asteriskElement.addEventListener('click', onClick);
}

export default introElement;
