import assert from 'assert';
import {setLives, setQuestion, setAnswer} from './game';
import data from '../data/game-data';
import config from '../config';
import {answerTypes} from '../constants/answerTypes';

const initialState = {
  lives: 3,
  answers: [],
  currentQuestion: 0,
  time: 0,
  maxQuestions: data.length
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
        assert.throws(() => setQuestion(initialState, data.length));
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
        }, data[initialState.currentQuestion]);

        assert.equal(newState.answers[newState.currentQuestion], answerTypes.WRONG);
      });

      it('should mark answer as unknown and decrease lives if time passed', () => {
        const newState = setAnswer(initialState, {
          answer: 'qwert',
          time: config.timer.SECONDS_PER_LEVEL + 10
        }, data[initialState.currentQuestion]);

        assert((newState.lives === initialState.lives - 1) && (newState.answers[newState.currentQuestion] === answerTypes.UNKNOWN));
      });

      it('should mark answer as fast if passed less then 10 secs', () => {
        const correctAnswer = ['photo', 'painting'];
        const newState = setAnswer(initialState, {
          answer: correctAnswer,
          time: config.timer.SECONDS_PER_LEVEL - 9
        }, data[0]);

        assert.equal(newState.answers[newState.currentQuestion], answerTypes.FAST);
      });


      it('should mark answer as slow if passed more then 20 secs', () => {
        const correctAnswer = ['photo', 'painting'];
        const newState = setAnswer(initialState, {
          answer: correctAnswer,
          time: config.timer.SECONDS_PER_LEVEL - 21
        }, data[0]);

        assert.equal(newState.answers[newState.currentQuestion], answerTypes.SLOW);
      });

      it('should decrease lives when wrong answer passed', () => {
        const newState = setAnswer(initialState, {
          answer: 'qwert',
          time: 0
        }, data[initialState.currentQuestion]);

        assert.equal(newState.lives, initialState.lives - 1);
      });
    });

    describe('Failure', () => {
      it('should throw an Error if negative time value passed', () => {
        assert.throws(() => setAnswer(initialState, {
          answer: 'qwert',
          time: -1
        }, data[initialState.currentQuestion]));
      });

      it('should throw an Error if current lives is 0', () => {
        assert.throws(() => setAnswer(Object.assign({}, initialState, {lives: 0}), {
          answer: 'qwert',
          time: 10
        }, data[initialState.currentQuestion]));
      });
    });
  });
});
