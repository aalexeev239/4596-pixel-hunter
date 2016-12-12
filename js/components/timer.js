import {timer as timerConfig} from '../config';

const msPerLevel = timerConfig.SECONDS_PER_LEVEL * 1000;

export default class Timer {

  constructor(onTick, onFailure) {

    this.onTick = onTick;
    this.onFailure = onFailure;
    this._startTime = null;
  }

  start() {
    this._startTime = new Date();

    this._tickInterval = setInterval(() => {
      this._tick();
    }, 1000);
  }

  stop() {
    clearInterval(this._tickInterval);
  }

  _tick() {
    const now = new Date();

    if (now - this._startTime >= msPerLevel) {
      this.onTick();
    } else {
      this.stop();
      this.onFailure();
    }
  }
}
