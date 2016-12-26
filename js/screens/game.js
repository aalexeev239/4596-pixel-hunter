import AbstractView from '../view';
import Application from '../application';
import renderQuestion from '../templates/renderQuestion';
import renderStats from '../templates/renderStats';
import renderGameHeader from '../templates/renderGameHeader';
import Timer from '../components/timer';
import {timer as timerConfig} from '../config';
import questionTypes from '../constants/questionTypes';


class GameScreen extends AbstractView {

  constructor(state, question) {
    super();
    this._state = state;
    this._question = question;
    this._onFormChange = (this._onFormChange).bind(this);
  }

  getMarkup() {
    return `
      ${renderGameHeader(this._state.lives)}
      <div class="game">
        ${renderQuestion(this._question)}
        <div class="stats">
          ${renderStats(this._state.answers)}
        </div>
      </div>
    `;
  }

  bindHandlers() {
    this._formElement = this.element.querySelector('form');

    this._formNameSet = new Set();
    for (let elem of this._formElement.elements) {
      this._formNameSet.add(elem.name);
      this._formName = elem.name;
    }

    this._formElement.addEventListener('change', this._onFormChange);

    const timerElement = this.element.querySelector('.game__timer');
    this._timer = new Timer(
      () => {
        timerElement.textContent = this._timerPad(this._timer.getTime());
      },
      () => {
        this._onAnswer(null, 0);
      }
    );
    this._timer.start();
  }

  clearHandlers() {
    this._timer.stop();
    this._formElement.removeEventListener('change', this._onFormChange);
  }

  _timerPad(time) {
    return ((new Array(timerConfig.digitCount)).join('0') + (time + 1)).slice(-timerConfig.digitCount);
  }

  _onFormChange(ev) {
    ev.preventDefault();

    if (this._question.type === questionTypes.GUESS_EVERY_OPTION) {
      let input = ev.target;
      Array.prototype.forEach.call(this._formElement[input.name], (elem) => {
        elem.disabled = true;
      });
      for (let name of this._formNameSet) {
        if (!this._formElement[name].value) {
          return;
        }
      }

      let answerArray = [];

      for (let name of this._formNameSet) {
        answerArray.push(this._formElement[name].value);
      }
      this._onAnswer(answerArray, this._timer.getTime());
    } else {
      this._onAnswer(this._formElement[this._formName].value, this._timer.getTime());
    }
  }

  _onAnswer(answer, time) {
    this.clearHandlers();

    Application.answerQuestion({
      answer,
      time
    });
  }

}

export default (state, question) => new GameScreen(state, question).element;
