import renderSlide from '../utils/renderSlide';
import getGameElement from './getGameElement';
import getStatsElement from './getStatsElement';
import {setAnswer, setQuestion, getStatsData} from './game';
import {questions} from '../data/game-data';

export const gameController = (state) => {
  state = setQuestion(state, state.currentQuestion);
  renderSlide(getGameElement(state, (answer) => {
    state = setAnswer(state, answer);
    if (state.lives > 0 && state.currentQuestion < questions.length - 1) {
      state.currentQuestion = state.currentQuestion + 1;
      gameController(state);
    } else {
      renderSlide(getStatsElement(getStatsData(state)));
    }
  }));
};
