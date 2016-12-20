import assert from 'assert';
import {setLives, setQuestion, setAnswer, calculateStats} from './game';
import data from '../data/game-data';
import config from '../config';
import answerValues from '../constants/answerValues';

const initialState = {
  lives: 3,
  answers: [],
  currentQuestion: 0,
  time: 0
};


describe('Game', function () {

  describe('Lives | setLives', () => {
    describe('Setting', () => {
      it('should set number of character lives', () => {
        assert.equal(setLives(initialState, 3).lives, 3);
      });
    });

    describe('Failure', () => {
      it('should throw an Error if non integer value passed', () => {
        assert.throws(() => setLives(initialState, 'pickachu'));
      });

      it('should throw an Error if negative value passed', () => {
        assert.throws(() => setLives(initialState, -1));
      });

      it('should throw an Error if too big value passed', () => {
        assert.throws(() => setLives(initialState, config.lives.TOTAL + 1));
      });
    });
  });

  describe('Question | setQuestion', () => {
    describe('Setting', () => {
      it('should set a question', () => {
        assert.equal(setQuestion(initialState, 1).currentQuestion, 1);
      });
    });

    describe('Failure', () => {
      it('should throw an Error if non integer value passed', () => {
        assert.throws(() => setQuestion(initialState, 'pickachu'));
      });

      it('should throw an Error if negative value passed', () => {
        assert.throws(() => setQuestion(initialState, -1));
      });

      it('should throw an Error if too big value passed', () => {
        assert.throws(() => setQuestion(initialState, data.questions.length));
      });
    });
  });

  describe('Answer | setAnswer', () => {
    describe('Setting', () => {
      it('should set a answer', () => {
        const newState = setAnswer(initialState, {
          answer: 'qwert',
          time: 0
        });

        assert(newState.answers[newState.currentQuestion]);
      });

      it('should mark wrong answer as wrong', () => {
        const newState = setAnswer(initialState, {
          answer: 'qwert',
          time: 10
        });

        assert.equal(newState.answers[newState.currentQuestion], answerValues.WRONG);
      });

      it('should mark answer as unknown and decrease lives if time passed', () => {
        const newState = setAnswer(initialState, {
          answer: 'qwert',
          time: config.timer.SECONDS_PER_LEVEL + 10
        });

        assert((newState.lives === initialState.lives - 1) && (newState.answers[newState.currentQuestion] === answerValues.UNKNOWN));
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
      it('should throw an Error if negative time value passed', () => {
        assert.throws(() => setAnswer(initialState, {
          answer: 'qwert',
          time: -1
        }));
      });

      it('should throw an Error if current lives is 0', () => {
        assert.throws(() => setAnswer(Object.assign({}, initialState, {lives: 0}), {
          answer: 'qwert',
          time: 10
        }));
      });
    });
  });

  describe('Stats | calculateStats', () => {
    describe('Calculating', () => {

      it('should give 100 points on correct answer', () => {
        const state = Object.assign({}, initialState, {
          answers: [answerValues.CORRECT],
          lives: 0
        });
        assert.equal(calculateStats(state), 100);
      });

      it('should sum points on answers', () => {
        const state = Object.assign({}, initialState, {
          answers: [answerValues.CORRECT, answerValues.CORRECT],
          lives: 0
        });
        assert.equal(calculateStats(state), 200);
      });

      it('should add 50 points on fast answer', () => {
        const state = Object.assign({}, initialState, {
          answers: [answerValues.FAST],
          lives: 0
        });
        assert.equal(calculateStats(state), 150);
      });

      it('should decrease 50 points on slow answer', () => {
        const state = Object.assign({}, initialState, {
          answers: [answerValues.SLOW],
          lives: 0
        });
        assert.equal(calculateStats(state), 50);
      });

      it('should add 50 points on each live', () => {
        const state = Object.assign({}, initialState, {
          answers: [answerValues.CORRECT],
          lives: 3
        });
        assert.equal(calculateStats(state), 250);
      });
    });

    describe('Failure', () => {
      it('should throw an error if extra values passed', () => {
        const state = Object.assign({}, initialState, {
          answers: [...Array(data.correctAnswers.length + 1)].map(() => null),
          lives: 0
        });
        assert.throws(() => calculateStats(state));
      });
    });
  });
});
