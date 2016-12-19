import getElementFromTemplate from '../utils/getElementFromTemplate';
import getClosestNode from '../utils/getClosestNode';
import questionTypes from '../constants/questionTypes';
import renderGameHeader from '../templates/renderGameHeader';
import renderQuestion from '../templates/renderQuestion';
import renderStats from '../templates/renderStats';
import {questions} from '../data/game-data';


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
    // const timerElement = element.querySelector('.game__timer');
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
          }
        );
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
          time: 10
        });
      } else {
        onAnswer({
          answer: form[formName].value,
          time: 10
        });
      }
    });

// answerElements.forEach((elem) => elem.addEventListener('click', onClick));

    return element;
  }
  ;

export default getGameElement;
