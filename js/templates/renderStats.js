import {answerTypes} from '../constants/answerTypes';
import {questions} from '../data/game-data';


const func = (answers) => `<ul class="stats">
    ${answers.map((answer) => `<li class="stats__result stats__result--${answer || answerTypes.UNKNOWN}"></li>`)}
    ${[...Array(questions.length - answers.length)].map(() => `<li class="stats__result stats__result--${answerTypes.UNKNOWN}"></li>`)}
  </ul>`;

export default func;
