import GameModel from './GameModel';
import {getStatsData} from './game';
import Application from '../application';
import {server as serverConfig} from '../config';
import Timer from './timer';
import createGameHeaderView from '../views/gameHeader';
import createGameView from '../views/game';


class GamePresenter {
  constructor() {
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
    return window.fetch(serverConfig.QUESTIONS_URL).then((response) => response.json());
  }

  _changeLevel() {
    if (this._model.canGoNext()) {
      this._model.setNextQuestion();

      const gameContent = createGameView(this._model.getState(), this._model.getQuestion(), this._onAnswer.bind(this));
      this.root.replaceChild(gameContent.element, this._gameContent.element);
      if (this._gameContent.clearHandlers) {
        this._gameContent.clearHandlers();
      }
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

    Application.showStats(getStatsData(this._model.getState()));
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
}

const game = new GamePresenter();

export default () => {
  game.start();
  return game.root;
};
