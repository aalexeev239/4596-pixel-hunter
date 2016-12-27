import {initialState} from '../config';
import {setAnswer, setQuestion} from './game';


export default class GameModel {
  constructor(questions, state = initialState) {
    this._state = state;
    this._questions = questions;
  }

  getState() {
    return this._state;
  }

  canGoNext() {
    return (this._state.lives > 0) && (this._state.currentQuestion < this._questions.length - 1);
  }

  getQuestion() {
    return this._questions[this._state.currentQuestion];
  }

  setAnswer(answer) {
    this._state = setAnswer(this._state, answer);
    return this;
  }

  setNextQuestion() {
    this._state = setQuestion(this._state, this._state.currentQuestion + 1);
    return this;
  }
}
