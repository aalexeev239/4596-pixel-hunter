import assert from 'assert';
import config from './config';


describe('data', function () {
  it('should take 30 sec per question', function () {
    assert.equal(config.timer.SECONDS_PER_LEVEL, 30);
  });
});
