import {initialState} from '../config';
import {setAnswer, setQuestion} from './game';

export default class GameModel {
  constructor(questions, state = initialState) {
    this._questions = questions;
    this._state = state;
    this._state.maxQuestions = this._questions.length;
  }

  getState() {
    return this._state;
  }

  canGoNext() {
    return (this._state.lives > 0) && (this._state.currentQuestion < this._state.maxQuestions - 1);
  }

  getQuestion() {
    return this._questions[this._state.currentQuestion];
  }

  setAnswer(answer) {
    this._state = setAnswer(this._state, answer, this._questions[this._state.currentQuestion]);
    return this;
  }

  setNextQuestion() {
    this._state = setQuestion(this._state, this._state.currentQuestion + 1);
    return this;
  }
}
