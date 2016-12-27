import AbstractView from '../view';
import renderQuestion from '../templates/renderQuestion';
import renderStats from '../templates/renderStats';
import questionTypes from '../constants/questionTypes';
import imageLoader from '../image-loader/image-loader';

const IMAGE_SIZES = new Map([
  [questionTypes.GUESS_EVERY_OPTION, {width: 468, height: 458}],
  [questionTypes.GUESS_SINGLE_OPTION, {width: 705, height: 455}],
  [questionTypes.FIND_PAINT, {width: 304, height: 455}]
]);

console.log('--- IMAGE_SIZES', IMAGE_SIZES);

class GameScreen extends AbstractView {

  constructor(state, question, answerCallback) {
    super();
    this._state = state;
    this._question = question;
    this._answerCallback = answerCallback;
    this._onFormChange = this._onFormChange.bind(this);
  }

  getMarkup() {
    return `
      <div class="game">
        ${renderQuestion(this._question)}
        <div class="stats">
          ${renderStats(this._state)}
        </div>
      </div>
    `;
  }

  bindHandlers() {
    this._formElement = this.element.querySelector('form');

    const images = this.element.querySelectorAll('img');

    for (let image of images) {
      let {width, height} = IMAGE_SIZES.get(this._question.type);
      imageLoader(image).load({
        url: image.src
      }, width, height);
    }

    // collect input names for multiple options or get single name for else
    if (this._question.type === questionTypes.GUESS_EVERY_OPTION) {
      let formElementsNamesSet = new Set();
      for (let elem of this._formElement.elements) {
        formElementsNamesSet.add(elem.name);
      }
      this._formElementsNamesSet = formElementsNamesSet;
    } else {
      this._formElementsName = this._formElement.elements[0].name;
    }

    this._formElement.addEventListener('change', this._onFormChange);
  }

  clearHandlers() {
    this._formElement.removeEventListener('change', this._onFormChange);
  }

  _onFormChange(ev) {
    ev.preventDefault();

    if (this._question.type === questionTypes.GUESS_EVERY_OPTION) {
      let input = ev.target;
      Array.prototype.forEach.call(this._formElement[input.name], (elem) => {
        elem.disabled = true;
      });

      let answerArray = [];

      for (let name of this._formElementsNamesSet) {
        if (!this._formElement[name].value) {
          return;
        } else {
          answerArray.push(this._formElement[name].value);
        }
      }
      this._onAnswer(answerArray);
    } else {
      this._onAnswer(this._formElement[this._formElementsName].value);
    }
  }

  _onAnswer(answer) {
    this._answerCallback(answer);
  }

}

export default (state, question, answerCallback) => new GameScreen(state, question, answerCallback);
