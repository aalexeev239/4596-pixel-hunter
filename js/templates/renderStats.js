import {answerTypes} from '../constants/answerTypes';

const func = ({answers, maxQuestions}) => `<ul class="stats">
    ${answers.map((answer) => `<li class="stats__result stats__result--${answer || answerTypes.UNKNOWN}"></li>`)}
    ${[...Array(maxQuestions - answers.length)].map(() => `<li class="stats__result stats__result--${answerTypes.UNKNOWN}"></li>`)}
  </ul>`;

export default func;
