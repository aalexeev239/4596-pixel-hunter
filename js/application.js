import createIntroScreen from './screens/intro';

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
    renderView(createRulesScreen());
  }

  static showRules() {
    // renderView(createRulesScreen());
  }

  static showGame() {
    // renderView(createNewGame());
  }

  static showStats(stats) {
    // renderView(createStatsScreen(stats));
  }
}
