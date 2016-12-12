import getElementFromTemplate from '../utils/getElementFromTemplate';
import getClosestNode from '../utils/getClosestNode';
import renderSlide from '../renderSlide';
import questionTypes from '../constants/questionTypes';
import renderGameHeader from '../templates/renderGameHeader';
import renderStats from '../templates/renderStats';
import renderQuestion from '../templates/renderQuestion';
import getStatsElement from './getStatsElement';
import statsData from '../data/stats-data';
import {livesState} from '../data/game-data';


const getGameElement = (data, questionCursor) => {
  const {time, answers, questions} = data;
  const currentQuestion = questions[questionCursor];

  if (!currentQuestion) {
    return getElementFromTemplate('Error! Question not found.');
  }

  const template = `
    ${renderGameHeader({time, livesState})}
    <div class="game">
      ${renderQuestion(currentQuestion)}
      <div class="stats">
        ${renderStats(answers)}
      </div>
    </div>
  `;

  const element = getElementFromTemplate(template);
  let answerElements = [];
  let levelOptions = [];

  switch (currentQuestion.type) {
    case questionTypes.GUESS_SINGLE_OPTION:
      answerElements = Array.from(element.querySelectorAll('.game__answer'));
      break;
    case questionTypes.GUESS_EVERY_OPTION:
      levelOptions = Array.from(element.querySelectorAll('.game__option'));
      answerElements = Array.from(element.querySelectorAll('.game__answer'));
      break;
    case questionTypes.FIND_PAINT:
      answerElements = Array.from(element.querySelectorAll('.game__option'));
      break;
  }

  const onClick = (ev) => {
    ev.preventDefault();

    if (currentQuestion.type === questionTypes.GUESS_EVERY_OPTION) {
      // select current image
      const currentOption = getClosestNode(ev.target, 'game__option');

      if (!currentOption) {
        return;
      }

      // remove listeners
      Array.from(currentOption.querySelectorAll('.game__answer')).forEach((elem) => elem.removeEventListener('click', onClick));

      // remove current image from array
      if (~levelOptions.indexOf(currentOption)) {
        levelOptions.splice(levelOptions.indexOf(currentOption), 1);
      }
      // if there are images to click
      if (levelOptions.length) {
        return;
      }
    }

    goNext();
  };

  const goNext = () => {

    if (questionCursor < questions.length - 1) {
      renderSlide(getGameElement(data, questionCursor + 1));
    } else {
      renderSlide(getStatsElement(statsData));
    }
  };

  answerElements.forEach((elem) => elem.addEventListener('click', onClick));

  return element;
};

export default getGameElement;
