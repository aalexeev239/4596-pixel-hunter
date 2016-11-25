import getElementFromTemplate from '../utils/getElementFromTemplate';
import renderSlide from '../renderSlide';

import game3Template from '../templates/game3';
import statsElement from './statsElement';

const game3Element = getElementFromTemplate(game3Template);
const answerElements = Array.from(game3Element.querySelectorAll('.game__option'));

const onClick = () => {
  renderSlide(statsElement);
  cleanup();
};

const cleanup = () => {
  answerElements.forEach((elem) => elem.removeEventListener('click', onClick));
};

answerElements.forEach((elem) => elem.addEventListener('click', onClick));

export default game3Element;
