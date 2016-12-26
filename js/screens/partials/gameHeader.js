import AbstractView from '../../view';
import {lives as livesConfig, timer as timerConfig} from '../../config';
import headerBackTemplate from '../../templates/headerBack';
import Timer from '../../components/timer';


class GameHeader extends AbstractView {

  constructor(lives, callback) {
    super();
    this._lives = lives;
    this._callback = callback;
    this._maxLives = livesConfig.TOTAL;
    this._maxTime = timerConfig.SECONDS_PER_LEVEL;
  }

  getMarkup() {
    return `
      <header class="header">
        ${headerBackTemplate}
        <h1 class="game__timer">${this._maxTime}</h1>
        <div class="game__lives">
          ${this._getLivesMarkup()}
        </div>
       </header>
  `;
  }

  bindHandlers() {

    this._timerElement = this.element.querySelector('.game__timer');
    this._timer = new Timer(
      () => {
        this._timerElement.textContent = this._timerPad(this._timer.getTime());
      },
      () => {
        this._callback();
      }
    );
    this._timer.start();
  }

  _getLivesMarkup() {
    const diff = this._maxLives - this._lives;

    return ([...Array(this._maxLives)]).map((life, i) => `
        <img src="img/heart__${i < diff ? 'empty' : 'full'}.svg" class="game__heart" alt="Life" width="32" height="32">
      `)
      .join('\n');
  }

  _timerPad(time) {
    return ((new Array(timerConfig.digitCount)).join('0') + (time + 1)).slice(-timerConfig.digitCount)
  }
}

export default (lives, callback) => new GameHeader(lives, callback).element;
