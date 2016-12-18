import assert from 'assert';
import config from './config';


describe('config', function () {
  it('should take 30 sec per question', function () {
    assert.equal(config.timer.SECONDS_PER_LEVEL, 30);
  });

  it('should set max three lives to total', function () {
    assert.equal(config.lives.TOTAL, 3);
  });
});
