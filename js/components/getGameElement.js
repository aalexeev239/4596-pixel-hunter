import getElementFromTemplate from '../utils/getElementFromTemplate';
import questionTypes from '../constants/questionTypes';
import renderGameHeader from '../templates/renderGameHeader';
import renderQuestion from '../templates/renderQuestion';
import renderStats from '../templates/renderStats';
import {questions} from '../data/game-data';
import Timer from '../components/timer';


const getGameElement = (state, onAnswer) => {
  const {lives, currentQuestion, answers} = state;
  const question = questions[currentQuestion];

  const template = `
  ${renderGameHeader(lives)}
  <div class="game">
    ${renderQuestion(question)}
    <div class="stats">
      ${renderStats(answers)}
    </div>
  </div>
`;

  const element = getElementFromTemplate(template);
  const timerElement = element.querySelector('.game__timer');
  const timer = new Timer(
    () => {
      timerElement.textContent = timer.getTime() + 1;
    },
    () => {
      onAnswer({
        answer: null,
        time: 0
      });
    });
  timer.start();
  const form = element.querySelector('form');
  let formNameSet;
  let formName;
  formNameSet = new Set();
  for (let elem of form.elements) {
    formNameSet.add(elem.name);
    formName = elem.name;
  }


  form.addEventListener('change', function (ev) {
    ev.preventDefault();

    if (question.type === questionTypes.GUESS_EVERY_OPTION) {
      let input = ev.target;
      Array.prototype.forEach.call(form[input.name], (elem) => {
        elem.disabled = true;
      });
      for (let name of formNameSet) {
        if (!form[name].value) {
          return;
        }
      }

      let answerArray = [];

      for (let name of formNameSet) {
        answerArray.push(form[name].value);
      }
      onAnswer({
        answer: answerArray,
        time: timer.stop()
      });
    } else {
      onAnswer({
        answer: form[formName].value,
        time: timer.stop()
      });
    }
  });

  return element;
};

export default getGameElement;
