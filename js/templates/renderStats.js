import answerValues from '../constants/answerValues';

const func = (answers) => `<ul class="stats">
    ${answers.map((answer) => `<li class="stats__result stats__result--${answer.value || answerValues.UNKNOWN}"></li>`)}
  </ul>`;

export default func;
