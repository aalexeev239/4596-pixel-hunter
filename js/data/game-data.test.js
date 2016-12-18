import assert from 'assert';
import data from './game-data';
import questionTypes from '../constants/questionTypes';


describe('data', () => {
  it('should contain 10 questions', () => {
    assert.equal(data.questions.length, 10);
  });

  it('should contain equal quantity of answers', () => {
    assert(data.questions.length === data.correctAnswers.length);
  });

  it('should contain 3 types of questions', () => {
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

  it('should contain corresponding types of answers', () => {
    const validateChoise = (answer) => (answer === 'photo' || answer === 'paint');

    const res = data.correctAnswers.every((answer, i) => {
      const question = data.questions[i];

      switch (question.type) {
        case questionTypes.FIND_PAINT:
          return question.options.filter(o => o.image.title === answer).length > 0;

        case questionTypes.GUESS_SINGLE_OPTION:
          return validateChoise(answer);

        case questionTypes.GUESS_EVERY_OPTION:
          return Array.isArray(answer) &&
            answer.length === question.options.length &&
            answer.every(validateChoise);
      }
    });

    assert(res);
  });


});
