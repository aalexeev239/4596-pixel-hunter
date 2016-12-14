import assert from 'assert';
import Timer from './timer';

const testConfig = {
  SECONDS_PER_LEVEL: 5
};

describe('Timer', function () {

  it('should fire tick every second', function (done) {
    const timeToEnd = testConfig.SECONDS_PER_LEVEL * 1000 + 100;
    let ticks = testConfig.SECONDS_PER_LEVEL;
    const timer = new Timer(() => {
      ticks--;
    }, noop);

    timer.start();

    setTimeout(() => {
      timer.stop();
      if (ticks > 0) {
        done('timer failed');
      } else {
        done();
      }
    }, timeToEnd);
  }).timeout(testConfig.SECONDS_PER_LEVEL * 1000 + 500);

  it('should fire callback after time passed', function (done) {
    let errTimeout;

    const timeToEnd = testConfig.SECONDS_PER_LEVEL * 1000;
    const timer = new Timer(noop, () => {
      clearTimeout(errTimeout);
      if (new Date() - timerStartedTime >= timeToEnd) {
        done();
      } else {
        done('timer ended early than expected');
      }
    }, testConfig.SECONDS_PER_LEVEL);

    const timerStartedTime = new Date();
    timer.start();

    errTimeout = setTimeout(() => {
      timer.stop();
      done('timer failed on timeout' + (new Date() - timerStartedTime));
    }, timeToEnd + 100);
  }).timeout(testConfig.SECONDS_PER_LEVEL * 1000 + 500);
});
