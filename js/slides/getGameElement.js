import getElementFromTemplate from '../utils/getElementFromTemplate';
import renderSlide from '../renderSlide';
import questionTypes from '../constants/questionTypes';
import renderGameHeader from '../templates/renderGameHeader';
import renderStats from '../templates/renderStats';
import renderQuestion from '../templates/renderQuestion';
import getStatsElement from './getStatsElement';
import statsData from '../fixtures/statsData';

const getGameElement = (data, questionCursor) => {
  const {time, lives, answers, questions} = data;
  const currentQuestion = questions[questionCursor];

  if (!currentQuestion) {
    return getElementFromTemplate('Error! Question not found.');
  }

  const template = `
    ${renderGameHeader({time, lives})}
    <div class="game">
      ${renderQuestion(currentQuestion)}
      <div class="stats">
        ${renderStats(answers)}
      </div>
    </div>
  `;

  const element = getElementFromTemplate(template);
  let answerElements = [];
  let levelImages = [];

  const goNext = (ev) => {
    ev.preventDefault();

    if (currentQuestion.type === questionTypes.GUESS_EVERY_ITEM) {
      // select current image
      const currentOption = ev.target.closest('.game__option');
      // remove listeners
      Array.from(currentOption.querySelectorAll('.game__answer')).forEach((elem) => elem.removeEventListener('click', goNext));

      // remove current image from array
      if (~levelImages.indexOf(currentOption)) {
        levelImages.splice(levelImages.indexOf(currentOption), 1);
      }
      // if there are images to click
      if (levelImages.length) {
        return;
      }
    }

    if (questionCursor < questions.length - 1) {
      renderSlide(getGameElement(data, questionCursor + 1));
    } else {
      renderSlide(getStatsElement(statsData));
    }
  };

  switch (currentQuestion.type) {
    case questionTypes.GUESS_SINGLE_ITEM:
      answerElements = Array.from(element.querySelectorAll('.game__answer'));
      break;
    case questionTypes.GUESS_EVERY_ITEM:
      levelImages = Array.from(element.querySelectorAll('.game__option'));
      answerElements = Array.from(element.querySelectorAll('.game__answer'));
      break;
    case questionTypes.FIND_PAINT:
      answerElements = Array.from(element.querySelectorAll('.game__option'));
      break;
  }

  answerElements.forEach((elem) => elem.addEventListener('click', goNext));

  return element;
};

export default getGameElement;
