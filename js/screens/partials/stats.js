import AbstractView from '../../view';
import {answerTypes} from '../../constants/answerTypes';
import {questions} from '../../data/game-data';

const MAX_QUESTIONS = questions.length;


class GameStats extends AbstractView {

  constructor(answers) {
    super();
    this._answers = answers;
  }

  getMarkup() {
    return `<ul class="stats">
    ${this._answers.map((answer) => `<li class="stats__result stats__result--${answer || answerTypes.UNKNOWN}"></li>`)}
    ${[...Array(MAX_QUESTIONS - this._answers.length)].map(() => `<li class="stats__result stats__result--${answerTypes.UNKNOWN}"></li>`)}
  </ul>`;
  }
}

export default (answers) => new GameStats(answers).element;
