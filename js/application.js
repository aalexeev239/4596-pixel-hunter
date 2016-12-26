import data from './data/game-data';
import config from './config';
import Model from './components/gameModel';
import {getStatsData} from './components/game';


import createIntroScreen from './screens/intro';
import createGreetingScreen from './screens/greeting';
import createRulesScreen from './screens/rules';
import createNewGame from './screens/game';
import createStatsScreen from './screens/stats';


const mainElement = document.getElementById('main');
const renderView = (element) => {
  mainElement.innerHTML = '';
  mainElement.appendChild(element)
};

const gameModel = new Model(data.questions);

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
    if (gameModel.canGoNext()) {
      gameModel.setNextQuestion();
      renderView(createNewGame(gameModel.getState(), gameModel.getQuestion()));
    } else {
      this.showStats(getStatsData(gameModel.getState()));
    }
  }

  static answerQuestion(formattedAnswer) {
    gameModel.setAnswer(formattedAnswer);
    this.showGame();
  }

  static showStats(stats) {
    renderView(createStatsScreen(stats));
  }
}
