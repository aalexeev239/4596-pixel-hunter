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
  options: [
    {
      image: {
        url: 'http://placehold.it/304x455',
        title: 'Option 1',
        width: 304,
        height: 455
      },
      isSelected: false
    },
    {
      image: {
        url: 'http://placehold.it/304x455',
        title: 'Option 1',
        width: 304,
        height: 455
      },
      isSelected: true
    },
    {
      image: {
        url: 'http://placehold.it/304x455',
        title: 'Option 1',
        width: 304,
        height: 455
      },
      isSelected: false
    }
  ]
};

const {time, lives, task, answersQueue, options} = data;

const renderOption = ({image: {url, title, width, height}, isSelected}) => `<div class="game__option${isSelected ? ' game__option--selected' : ''}">
    <img src="${url}" alt="${title}" width="${width}" height="${height}">
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
