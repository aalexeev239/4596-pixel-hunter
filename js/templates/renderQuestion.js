import questionTypes from '../constants/questionTypes';
import renderOptionChoose from './renderOptionChoose';
import renderOptionSelect from './renderOptionSelect';


const func = (question) => {
  switch (question.type) {
    case questionTypes.GUESS_SINGLE_OPTION:
      return `<p class="game__task">${questionTypes.GUESS_SINGLE_OPTION}</p>
        <form class="game__content">
          ${renderOptionChoose(question.option)}
        </form>`;

    case questionTypes.GUESS_EVERY_OPTION:
      return `<p class="game__task">${questionTypes.GUESS_SINGLE_OPTION}</p>
        <form class="game__content">
          ${question.options.map(renderOptionChoose).join('\n')}
        </form>`;

    case questionTypes.FIND_PAINT:
      return `<p class="game__task">${questionTypes.FIND_PAINT}</p>
        <form class="game__content game__content--triple">
          ${question.options.map(renderOptionSelect).join('\n')}
        </form>`;
    default:
      return '';
  }
};

export default func;
