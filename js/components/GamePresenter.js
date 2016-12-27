import GameModel from './GameModel';
import {getStatsData} from './game';
import Application from '../application';

import data from '../data/game-data';
import Timer from './timer';
import createGameHeaderView from '../views/gameHeader';
import createGameView from '../views/game';


class GamePresenter {
  constructor(Model) {
    this._getData(); // todo: promisify

    this._model = new Model(this._data.questions);

    this._header = {element: document.createElement('div')};
    this._gameContent = {element: document.createElement('div')};
    this.root = document.createElement('div');
    this.root.appendChild(this._header.element);
    this.root.appendChild(this._gameContent.element);
  }

  start() {
    this._changeLevel();
  }


  _getData() {
    this._data = data;
  }

  _changeLevel() {
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
    } else {
      Application.showStats(getStatsData(this._model.getState()));
    }
  }

  _onAnswer(answer) {
    let time = answer ? this._timer.stop() : 0;
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
    this._header = header;
  }
}

const game = new GamePresenter(GameModel);

export default () => {
  game.start();
  return game.root;
};
