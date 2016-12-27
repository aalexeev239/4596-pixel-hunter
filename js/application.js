import data from './data/game-data';
import config from './config';

import createIntroView from './views/intro';
import createGreetingView from './views/greeting';
import createRulesView from './views/rules';
import createStatsView from './views/stats';
import createGame from './components/GamePresenter';


const mainElement = document.getElementById('main');
const renderView = (element) => {
  mainElement.innerHTML = '';
  mainElement.appendChild(element);
};

export default class Application {

  static showIntro() {
    renderView(createIntroView().element);
  }

  static showGreeting() {
    renderView(createGreetingView().element);
  }

  static showRules() {
    renderView(createRulesView(config, data).element);
  }

  static showGame() {
    renderView(createGame());
  }

  static showStats(stats) {
    renderView(createStatsView(stats).element);
  }
}
