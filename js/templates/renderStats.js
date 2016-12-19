import answerValues from '../constants/answerValues';
import {questions} from '../data/game-data';


const func = (answers) => `<ul class="stats">
    ${answers.map((answer) => `<li class="stats__result stats__result--${answer || answerValues.UNKNOWN}"></li>`)}
    ${[...Array(questions.length - answers.length)].map(() => `<li class="stats__result stats__result--${answerValues.UNKNOWN}"></li>`)}
  </ul>`;

export default func;
