import assert from 'assert';
import Timer from './timer';
import {timer as timerConfig} from '../config';


const noop = function () {
};

const getEmptyTimer = () => new Timer(noop, noop);

describe('Timer', function () {
  describe('#constructor', function () {
    it('should contain onTick callback', function () {
      const timer = new Timer(noop);
      // duck typing
      assert(typeof timer.onTick === 'function');
    });

    it('should contain onFailure callback', function () {
      const timer = new Timer(noop, noop);
      // duck typing
      assert(typeof timer.onFailure === 'function');
    });
  });

  it('should contain start()', function () {
    const timer = getEmptyTimer();
    assert(typeof timer.start === 'function');
  });

  it('should contain stop()', function () {
    const timer = getEmptyTimer();
    assert(typeof timer.stop === 'function');
  });

  it('should fire tick every second', function (done) {
    const timeToEnd = timerConfig.SECONDS_PER_LEVEL * 1000 + 500;
    let ticks = timerConfig.SECONDS_PER_LEVEL;
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
  }).timeout(timerConfig.SECONDS_PER_LEVEL * 1000 + 1000);

  it('should fire callback after time passed', function (done) {
    const timer = new Timer(noop, done);
    const timeToEnd = timerConfig.SECONDS_PER_LEVEL * 1000;
    timer.start();
    setTimeout(() => {
      done('timer failed');
    }, timeToEnd);
  }).timeout(timerConfig.SECONDS_PER_LEVEL * 1000 + 1000);;
});
