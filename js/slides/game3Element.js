import getElementFromTemplate from '../utils/getElementFromTemplate';
import renderSlide from '../renderSlide';

import {game3Template} from '../templates/game3Template';
import {statsElement} from './statsElement';

const game3Element = getElementFromTemplate(game3Template);
const answerElements = Array.from(game3Element.querySelectorAll('.game__option'));

if (answerElements.length) {
  let onClick = (ev) => {
    ev.preventDefault();
    renderSlide(statsElement);
    cleanup();
  };

  let cleanup = () => {
    answerElements.forEach((elem) => elem.removeEventListener('click', onClick));
  };

  answerElements.forEach((elem) => elem.addEventListener('click', onClick));
}

export {game3Element};
