import {timer as timerConfig} from '../config';

export default class Timer {

  constructor(onTick, onFailure, secPerLevel) {
    this.msPerLevel = (secPerLevel || timerConfig.SECONDS_PER_LEVEL) * 1000;

    this.onTick = onTick;
    this.onFailure = onFailure;
    this._startTime = null;
  }

  start() {
    this._startTime = new Date();

    this._tickInterval = setInterval(() => {
      this._tick();
    }, 1000);

    this._tick();
  }

  stop() {
    clearInterval(this._tickInterval);
  }

  _tick() {
    const now = new Date();

    if (now - this._startTime <= this.msPerLevel) {
      this.onTick();
    } else {
      this.stop();
      this.onFailure();
    }
  }
}
