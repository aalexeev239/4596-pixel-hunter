import getElementFromTemplate from '../utils/getElementFromTemplate';
import renderSlide from '../renderSlide';

import answerValues from '../constants/answerValues';

import renderGameHeader from '../templates/renderGameHeader';
import renderOption from '../templates/renderOption';
import renderStats from '../templates/renderStats';
import game2Element from './game2Element';

const data = {
  time: 'NN',
  lives: {
    left: 2,
    total: 3
  },
  task: 'Угадайте для каждого изображения фото или рисунок?',
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
      value: answerValues.UNKNOWN
    },
    {
      value: answerValues.UNKNOWN
    },
    {
      value: answerValues.UNKNOWN
    },
    {
      value: answerValues.UNKNOWN
    },
    {
      value: answerValues.UNKNOWN
    },
    {
      value: answerValues.UNKNOWN
    }
  ],
  options: [
    {
      name: 'question1',
      image: {
        url: 'http://placehold.it/468x458',
        alt: 'Option 1',
        w: 468,
        h: 458
      }
    },
    {
      name: 'question2',
      image: {
        url: 'http://placehold.it/468x458',
        alt: 'Option 2',
        w: 468,
        h: 458
      }
    }
  ]
};

const {time, lives, task, answersList, options} = data;

const template = `
  ${renderGameHeader({time, lives})}
<div class="game">
  <p class="game__task">${task}</p>
  <form class="game__content">
    ${options.map(renderOption).join('\n')}
  </form>
  <div class="stats">
    ${renderStats(answersList)}
  </div>
</div>`;

const game1Element = getElementFromTemplate(template);
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
