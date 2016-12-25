import data from './data/game-data';
import config from './config';

import createIntroScreen from './screens/intro';
import createGreetingScreen from './screens/greeting';
import createRulesScreen from './screens/rules';
import createNewGame from './screens/game';

const initialState = {
  lives: 3,
  answers: [],
  currentQuestion: 0,
  time: 0
};

const mainElement = document.getElementById('main');
const renderView = (element) => {
  mainElement.innerHTML = '';
  mainElement.appendChild(element)
};

export default class Application {

  static showIntro() {
    renderView(createIntroScreen());
  }

  static showGreeting() {
    renderView(createGreetingScreen());
  }

  static showRules() {
    renderView(createRulesScreen(config, data));
  }

  static showGame() {
    renderView(createNewGame(initialState, data.questions[0]));
  }

  static showStats(stats) {
    // renderView(createStatsScreen(stats));
  }
}
