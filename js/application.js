import data from './data/game-data';
import config from './config';


import createIntroScreen from './screens/intro';
import createGreetingScreen from './screens/greeting';
import createRulesScreen from './screens/rules';

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
    // renderView(createNewGame());
  }

  static showStats(stats) {
    // renderView(createStatsScreen(stats));
  }
}
