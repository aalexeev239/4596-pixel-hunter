import assert from 'assert';
import game from './game';
import {data} from '../data/game-data';
import config from '../config';
import answerValues from '../constants/answerValues';

const initialState = {
  lives: 3,
  answers: [],
  currentQuestion: 0,
  time: 0
};


describe('Game', function () {

  describe('Lives', () => {
    describe('Setting', () => {
      it('should set number of character lives', () => {
        assert.equal(setLives(initialState, 3).lives, 3);
      });
    });

    describe('Failure', () => {
      it('should throw an Error if negative value passed', () => {
        assert.throws(() => setLives(initialState, -1));
      });

      it('should throw an Error if too big value passed', () => {
        assert.throws(() => setLives(initialState, config.lives.TOTAL + 1));
      });
    });
  });

  describe('Question', () => {
    describe('Setting', () => {
      it('should set a question', () => {
        assert.equal(setQuestion(initialState, 1).currentQuestion, 1);
      });
    });

    describe('Failure', () => {
      it('should throw an Error if negative value passed', () => {
        assert.throws(() => setQuestion(initialState, -1));
      });

      it('should throw an Error if too big value passed', () => {
        assert.throws(() => setQuestion(initialState, data.questions.length));
      });
    });
  });

  describe('Answer', () => {
    describe('Setting', () => {
      it('should set a answer', () => {
        const newState = setAnswer(initialState, 'qwert');

        assert(newState.answers[newState.currentQuestion]);
      });

      it('should mark wrong answer as wrong', () => {
        const newState = setAnswer(initialState, {
          answer: 'qwert',
          time: 0
        });

        assert.equal(newState.answers[newState.currentQuestion], answerValues.WRONG);
      });

      it('should mark answer as fast if passed less then 10 secs', () => {
        const correctAnswer = data.correctAnswers[initialState.currentQuestion];
        const newState = setAnswer(initialState, {
          answer: correctAnswer,
          time: 9
        });

        assert.equal(newState.answers[newState.currentQuestion], answerValues.FAST);
      });


      it('should mark answer as slow if passed more then 20 secs', () => {
        const correctAnswer = data.correctAnswers[initialState.currentQuestion];
        const newState = setAnswer(initialState, {
          answer: correctAnswer,
          time: 21
        });

        assert.equal(newState.answers[newState.currentQuestion], answerValues.SLOW);
      });

      it('should decrease lives when wrong answer passed', () => {
        const newState = setAnswer(initialState, {
          answer: 'qwert',
          time: 0
        });

        assert.equal(newState.lives, initialState.lives - 1);
      });
    });

    describe('Failure', () => {
      it('should throw an Error if null answer passed', () => {
        assert.throws(setAnswer(initialState, {
          answer: null,
          time: 21
        }));
      });

      it('should throw an Error if negative time value passed', () => {
        assert.throws(setAnswer(initialState, {
          answer: 'qwert',
          time: -1
        }));
      });

      it('should throw an Error if too large time value passed', () => {
        assert.throws(setAnswer(initialState, {
          answer: 'qwert',
          time: config.timer.SECONDS_PER_LEVEL + 1
        }));
      });

      it('should throw an Error if current lives is 0', () => {
        assert.throws(setAnswer(
          Object.assign({}, initialState, {lives: 0}),
          {
            answer: 'qwert',
            time: 10
          }
        ));
      });
    });
  });

  describe('Stats', () => {
    describe('Calculating', () => {

      it('should give 100 points on correct answer', () => {
        const state = Object.assign({},
          initialState,
          {
            answers: [answerValues.CORRECT],
            lives: 0
          }
        );
        assert.equal(calculateAnswers(state), 100);
      });

      it('should sum points on answers', () => {
        const state = Object.assign({},
          initialState,
          {
            answers: [answerValues.CORRECT, answerValues.CORRECT],
            lives: 0
          }
        );
        assert.equal(calculateAnswers(state), 200);
      });

      it('should add 50 points on fast answer', () => {
        const state = Object.assign({},
          initialState,
          {
            answers: [answerValues.FAST],
            lives: 0
          }
        );
        assert.equal(calculateAnswers(state), 150);
      });

      it('should decrease 50 points on slow answer', () => {
        const state = Object.assign({},
          initialState,
          {
            answers: [answerValues.SLOW],
            lives: 0
          }
        );
        assert.equal(calculateAnswers(state), 50);
      });

      it('should add 50 points on each live', () => {
        const state = Object.assign({},
          initialState,
          {
            answers: [answerValues.CORRECT],
            lives: 3
          }
        );
        assert.equal(calculateAnswers(state), 250);
      });
    });

    describe('Failure', () => {
      it('should throw an error if extra values passed', () => {
        const state = Object.assign({},
          initialState,
          {
            answers: [...Array(data.correctAnswers.length + 1)],
            lives: 0
          }
        );
        assert.throws(calculateAnswers(state));
      });
    });
  });
});
