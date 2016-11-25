import getElementFromTemplate from '../utils/getElementFromTemplate';
import renderSlide from '../renderSlide';

import game2Template from '../templates/game2';
import game3Element from './game3Element';

const game2Element = getElementFromTemplate(game2Template);
const answerElements = Array.from(game2Element.querySelectorAll('.game__answer'));

if (answerElements.length) {
  let onClick = (ev) => {
    ev.preventDefault();
    renderSlide(game3Element);
    cleanup();
  };

  let cleanup = () => {
    answerElements.forEach((elem)=>elem.removeEventListener('click', onClick));
  };

  answerElements.forEach((elem)=>elem.addEventListener('click', onClick));
}

export default game2Element;
