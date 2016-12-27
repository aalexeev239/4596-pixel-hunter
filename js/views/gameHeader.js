import AbstractView from '../view';
import headerBackTemplate from '../templates/headerBack';
import {lives as livesConfig, timer as timerConfig} from '../config';

class GameHeader extends AbstractView {

  constructor(lives = livesConfig.TOTAL, time = timerConfig.SECONDS_PER_LEVEL) {
    super();
    this._lives = lives;
    this._time = time;
  }

  getMarkup() {
    return `
      <header class="header">
        ${headerBackTemplate}
        <h1 class="game__timer">${this._getFormattedTime(this._time)}</h1>
        <div class="game__lives">
          ${this._getLivesMarkup()}
        </div>
      </header>
    `;
  }

  _getFormattedTime(time) {
    return ((new Array(timerConfig.DIGIT_COUNT)).join('0') + (time + 1)).slice(-timerConfig.DIGIT_COUNT);
  }

  _getLivesMarkup() {
    const diff = livesConfig.TOTAL - this._lives;
    return [...Array(livesConfig.TOTAL)].map((life, i) => `
      <img src="img/heart__${i < diff ? 'empty' : 'full'}.svg" 
      class="game__heart" alt="Life" width="32" height="32">`).join('\n');
  }
}

export default (lives, time) => new GameHeader(lives, time);
