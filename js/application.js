import data from './data/game-data';
import config from './config';
import Model from './components/GameModel';
import {getStatsData} from './components/game';


import createIntroScreen from './screens/intro';
import createGreetingScreen from './screens/greeting';
import createRulesScreen from './screens/rules';
import createNewGame from './screens/game';
import createStatsScreen from './screens/stats';
import createGame from './components/GamePresenter';


const mainElement = document.getElementById('main');
const renderView = (element) => {
  mainElement.innerHTML = '';
  mainElement.appendChild(element);
};

export default class Application {

  static showIntro() {
    renderView(createIntroScreen().element);
  }

  static showGreeting() {
    renderView(createGreetingScreen().element);
  }

  static showRules() {
    renderView(createRulesScreen(config, data).element);
  }

  static showGame() {
    renderView(createGame());
  }

  static showStats(stats) {
    renderView(createStatsScreen(stats).element);
  }
}
