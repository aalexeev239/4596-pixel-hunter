import renderSlide from '../utils/renderSlide';
import getGameElement from './getGameElement';
import getStatsElement from './getStatsElement';
import {setAnswer, setQuestion, getStatsData} from './game';
import {questions} from '../data/game-data';

export const gameController = (state) => {
  renderSlide(getGameElement(state, (answer) => {
    state = setAnswer(state, answer);
    if (state.lives > 0 && state.currentQuestion < questions.length - 1) {
      state = setQuestion(state, state.currentQuestion + 1);
      gameController(state);
    } else {
      renderSlide(getStatsElement(getStatsData(state)));
    }
  }));
};
