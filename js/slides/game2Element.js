import getElementFromTemplate from '../utils/getElementFromTemplate';
import renderSlide from '../renderSlide';

import answerValues from '../constants/answerValues';

import renderGameHeader from '../templates/renderGameHeader';
import renderOption from '../templates/renderOption';
import renderStats from '../templates/renderStats';
import game3Element from './game3Element';

const data = {
  time: 'NN',
  lives: {
    left: 2,
    total: 3
  },
  task: 'Угадай, фото или рисунок?',
  answersList: [
    {
      value: answerValues.WRONG
    },
    {
      value: answerValues.SLOW
    },
    {
      value: answerValues.FAST
    },
    {
      value: answerValues.CORRECT
    },
    {
      value: answerValues.WRONG
    },
    {
      value: answerValues.UNKNOWN
    },
    {
      value: answerValues.SLOW
    },
    {
      value: answerValues.UNKNOWN
    },
    {
      value: answerValues.FAST
    },
    {
      value: answerValues.UNKNOWN
    }
  ],
  option: {
    id: 1,
    name: 'question1',
    image: {
      url: 'http://placehold.it/705x455',
      title: 'Option 1',
      width: 705,
      height: 455
    }
  }
};

const {time, lives, task, answersQueue, option} = data;

const template = `
  ${renderGameHeader({time, lives})}
<div class="game">
  <p class="game__task">${task}</p>
  <form class="game__content  game__content--wide">
    ${renderOption(option)}
  </form>
  <div class="stats">
    ${renderStats(answersQueue)}
   </div>
</div>`;

const game2Element = getElementFromTemplate(template);
const answerElements = Array.from(game2Element.querySelectorAll('.game__answer'));

const onClick = () => {
  renderSlide(game3Element);
  cleanup();
};

const cleanup = () => {
  answerElements.forEach((elem) => elem.removeEventListener('click', onClick));
};

answerElements.forEach((elem) => elem.addEventListener('click', onClick));

export default game2Element;
