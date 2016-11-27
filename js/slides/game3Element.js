import getElementFromTemplate from '../utils/getElementFromTemplate';
import renderSlide from '../renderSlide';

import answerValues from '../constants/answerValues';

import renderGameHeader from '../templates/renderGameHeader';
import renderStats from '../templates/renderStats';
import statsElement from './statsElement';

const data = {
  time: 'NN',
  lives: {
    left: 2,
    total: 3
  },
  task: 'Найдите рисунок среди изображений?',
  answersQueue: [
    {
      id: 1,
      value: answerValues.WRONG
    },
    {
      id: 2,
      value: answerValues.SLOW
    },
    {
      id: 3,
      value: answerValues.FAST
    },
    {
      id: 4,
      value: answerValues.CORRECT
    },
    {
      id: 5,
      value: answerValues.WRONG
    },
    {
      id: 6,
      value: answerValues.UNKNOWN
    },
    {
      id: 7,
      value: answerValues.SLOW
    },
    {
      id: 8,
      value: answerValues.UNKNOWN
    },
    {
      id: 9,
      value: answerValues.FAST
    },
    {
      id: 10,
      value: answerValues.UNKNOWN
    }
  ],
  options: [
    {
      id: 1,
      image: {
        url: 'http://placehold.it/304x455',
        alt: 'Option 1',
        w: 304,
        h: 455
      },
      isSelected: false
    },
    {
      id: 2,
      image: {
        url: 'http://placehold.it/304x455',
        alt: 'Option 1',
        w: 304,
        h: 455
      },
      isSelected: true
    },
    {
      id: 3,
      image: {
        url: 'http://placehold.it/304x455',
        alt: 'Option 1',
        w: 304,
        h: 455
      },
      isSelected: false
    }
  ]
};

const {time, lives, task, answersQueue, options} = data;

const renderOption = ({image:{url, alt, w, h}, isSelected}) => `<div class="game__option${isSelected ? ' game__option--selected' : ''}">
    <img src="${url}" alt="${alt}" width="${w}" height="${h}">
  </div>`;

const template = `
  ${renderGameHeader({time, lives})}
<div class="game">
  <p class="game__task">${task}</p>
  <form class="game__content  game__content--triple">
    ${options.map(renderOption).join('\n')}
  </form>
  <div class="stats">
    ${renderStats(answersQueue)}
   </div>
</div>`;

const game3Element = getElementFromTemplate(template);
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
