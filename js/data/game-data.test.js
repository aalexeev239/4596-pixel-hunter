import assert from 'assert';
import data from './game-data';
import questionTypes from '../constants/questionTypes';


describe('data', function () {
  it('should contain 10 questions', function () {
    assert.equal(data.questions.length, 10);
  });

  it('should contain 3 types of questions', function () {
    //collect all question types
    let questionSet = new Set();
    data.questions.forEach(q => {
      questionSet.add(q.type)
    });
    if (questionSet.size !== 3) {
      assert(false);
    }

    let res = true;
    for (let type in questionTypes) {
      if (!questionSet.has(questionTypes[type])) {
        res = false;
        break;
      }
    }

    assert(res);
  });
});
