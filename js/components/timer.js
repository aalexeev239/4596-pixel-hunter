import {timer as timerConfig} from '../config';

export default class Timer {
  constructor(onTick, onFailure, secPerLevel) {
    this._value = secPerLevel || timerConfig.SECONDS_PER_LEVEL;
    this.msPerLevel = (this._value) * 1000;
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
    return this;
  }

  stop() {
    clearInterval(this._tickInterval);
    return this;
  }

  getTime() {
    return this._value;
  }

  _tick() {
    const now = new Date();
    this._value--;

    if (now - this._startTime <= this.msPerLevel) {
      this.onTick();
    } else {
      this.stop();
      this.onFailure();
    }
  }
}
