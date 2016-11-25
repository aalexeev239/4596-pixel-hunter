import getElementFromTemplate from '../utils/getElementFromTemplate';
import renderSlide from '../renderSlide';

import game1Template from '../templates/game1';
import game2Element from './game2Element';

const game1Element = getElementFromTemplate(game1Template);
const answerElements = Array.from(game1Element.querySelectorAll('.game__answer'));

const onClick = () => {
  renderSlide(game2Element);
  cleanup();
};

const cleanup = () => {
  answerElements.forEach((elem) => elem.removeEventListener('click', onClick));
};

answerElements.forEach((elem) => elem.addEventListener('click', onClick));

export default game1Element;
