import GameModel from './GameModel';
import {getStatsData} from './game';
import Application from '../application';
import {server as serverConfig} from '../config';
import Timer from './timer';
import createGameHeaderView from '../views/gameHeader';
import createGameView from '../views/game';
import checkResponseStatus from '../utils/checkResponseStatus';


class GamePresenter {
  constructor(username = serverConfig.NO_USER) {
    this._username = username;
    this._header = {element: document.createElement('div')};
    this._gameContent = {element: document.createElement('div')};
    this.root = document.createElement('div');
    this.root.appendChild(this._header.element);
    this.root.appendChild(this._gameContent.element);
  }

  start() {
    this._getData().then((data) => {
      this._model = new GameModel(data);
      this._changeLevel();
    });
  }


  _getData() {
    return window.fetch(serverConfig.QUESTIONS_URL + '1111').then(checkResponseStatus).then((response) => response.json()).catch(this._handleError);
  }

  _changeLevel() {
    if (this._gameContent.clearHandlers) {
      this._gameContent.clearHandlers();
    }
    if (this._model.canGoNext()) {
      this._model.setNextQuestion();

      const gameContent = createGameView(this._model.getState(), this._model.getQuestion(), this._onAnswer.bind(this));
      this.root.replaceChild(gameContent.element, this._gameContent.element);

      this._gameContent = gameContent;

      this._timer = new Timer(
        () => {
          this._updateHeader();
        },
        () => {
          this._onAnswer(null);
        }
      );
      this._timer.start();
      return;
    }
    this._showStats();
  }

  _onAnswer(answer) {
    let time = answer ? this._timer.stop().getTime() : 0;
    this._model.setAnswer({
      answer,
      time
    });
    this._changeLevel();
  }

  _updateHeader() {
    const time = this._timer ? this._timer.getTime() : null;
    const header = createGameHeaderView(this._model.getState().lives, time);
    this.root.replaceChild(header.element, this._header.element);
    if (this._header.clearHandlers) {
      this._header.clearHandlers();
    }
    this._header = header;
  }

  _showStats() {
    const requestUrl = serverConfig.STATS_URL_TEMPLATE.replace(/:username/g, this._username);
    const {answers, lives, maxQuestions} = this._model.getState();
    const payload = JSON.stringify({
      stats: answers,
      lives
    });

    window.fetch(requestUrl, {
      method: 'POST',
      body: payload
    }).then(() => {
      window.fetch(requestUrl).then(checkResponseStatus).then((response) => response.json()).then((response) => Application.showStats(getStatsData(response, maxQuestions)));
    }).catch(this._handleError);
  }

  _handleError(error) {
    Application.showError(error);
  }
}

export default (username) => {
  const game = new GamePresenter(username);
  game.start();
  return game.root;
};
