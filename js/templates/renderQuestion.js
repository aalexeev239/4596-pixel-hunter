import questionTypes from '../constants/questionTypes';
import renderOptionChoose from './renderOptionChoose';
import renderOptionSelect from './renderOptionSelect';


const func = (question) => {
  switch (question.type) {
    case questionTypes.GUESS_SINGLE_OPTION:
      return `<p class="game__task">${question.question}1</p>
        <form class="game__content">
          ${renderOptionChoose(question.answers[0])}
        </form>`;

    case questionTypes.GUESS_EVERY_OPTION:
      return `<p class="game__task">${question.question}2</p>
        <form class="game__content">
          ${question.answers.map(renderOptionChoose).join('\n')}
        </form>`;

    case questionTypes.FIND_PAINT:
      return `<p class="game__task">${question.question}3</p>
        <form class="game__content game__content--triple">
          ${question.answers.map(renderOptionSelect).join('\n')}
        </form>`;
    default:
      return '';
  }
};

export default func;
