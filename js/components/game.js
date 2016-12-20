import answerValues from '../constants/answerValues';
import questionTypes from '../constants/questionTypes';
import isInteger from '../utils/isInteger';
import {lives as livesConfig, timer as timerConfig} from '../config';
import {questions, correctAnswers} from '../data/game-data';
import renderSlide from '../utils/renderSlide';
import getGameElement from './getGameElement';
import getStatsElement from './getStatsElement';
import statsData from '../data/stats-data';


export const setLives = (state, lives) => {
  if (!isInteger(lives)) {
    throw new TypeError('lives should be an integer');
  }

  if (lives < 0) {
    throw new RangeError('lives should be non-negative');
  }

  if (lives > livesConfig.TOTAL) {
    throw new RangeError('lives are greater than possible');
  }

  return Object.assign({}, state, {lives});
};

export const setQuestion = (state, questionIndex) => {
  if (!isInteger(questionIndex)) {
    throw new TypeError('question index should be an integer');
  }

  if (questionIndex < 0) {
    throw new RangeError('question index should be non-negative');
  }

  if (questionIndex >= questions.length) {
    throw new RangeError('question index are greater than possible');
  }

  return Object.assign({}, state, {currentQuestion: questionIndex});
};

const validateAnswer = (answer, index) => {
  if (!isInteger(index) || index < 0 || index >= correctAnswers.length) {
    return false;
  }
  const question = questions[index];
  const correctAnswer = correctAnswers[index];

  if (question.type === questionTypes.GUESS_EVERY_OPTION) {
    if (!Array.isArray(answer)) {
      return false;
    }

    return correctAnswer.every((cAnswer, i) => cAnswer === answer[i]);
  }

  return correctAnswer === answer;
};

export const setAnswer = (state, {answer, time}) => {
  const {answers, currentQuestion, lives} = state;
  let res;
  let resLives = lives;

  if (lives === 0) {
    throw new RangeError('lives should be positive');
  }

  if (!answer) {
    throw new TypeError('answer is incorrect');
  }

  if (time < 0) {
    throw new RangeError('answer time should be non-negative');
  }

  if (time > timerConfig.SECONDS_PER_LEVEL) {
    answers[currentQuestion] = answerValues.UNKNOWN;
    return Object.assign({}, state, {answers}, {lives: lives - 1});
  }

  if (validateAnswer(answer, currentQuestion)) {
    if (time < 10) {
      res = answerValues.FAST;
    } else if (time > 20) {
      res = answerValues.SLOW;
    } else {
      res = answerValues.CORRECT;
    }
  } else {
    res = answerValues.WRONG;
    resLives = lives - 1;
  }

  answers[currentQuestion] = res;

  return Object.assign({}, state, {answers}, {lives: resLives});
};

const answersMap = new Map()
  .set(answerValues.CORRECT, 100)
  .set(answerValues.FAST, 150)
  .set(answerValues.SLOW, 50);

export const calculateStats = ({answers, lives}) => {

  if (answers.length > correctAnswers.length) {
    throw new RangeError('answers are too big');
  }

  let res = answers.reduce((sum, val) => {
    return sum + (answersMap.get(val) || 0);
  }, 0);

  res += lives * 50;

  return res;
};

const correctAnswersList = [answerValues.CORRECT, answerValues.FAST, answerValues.SLOW];
const isAnswerCorrect = (answer) => {
  return (~correctAnswersList.indexOf(answer));
};

const getAdditionals = (answers, lives) => {
  let fastAnswersCount = answers.filter((a) => a === answerValues.FAST).length;
  let slowAnswersCount = answers.filter((a) => a === answerValues.FAST).length;
  let res = [];

  if (fastAnswersCount) {
    res.push({
      title: 'Бонус за скорость',
      extra: fastAnswersCount,
      icon: 'fast',
      points: 50,
      total: fastAnswersCount * 50
    })
  }

  if (lives) {
    res.push({
      title: 'Бонус за жизни',
      extra: lives,
      icon: 'heart',
      points: 50,
      total: lives * 50
    });
  }

  if (slowAnswersCount) {
    res.push({
      title: 'Штраф за медлительность',
      extra: slowAnswersCount,
      icon: 'fast',
      points: 50,
      total: -slowAnswersCount * 50
    })
  }

  return res;
};

const getStatsData = (state) => {
  const {lives, answers, currentQuestion} = state;
  let pageTitle = 'FAIL';
  let isSuccess = false;
  let points = null;
  let total = null;
  let additionals = [];
  let final = null;
  if (lives > 0 && currentQuestion === questions.length - 1) {
    pageTitle = 'Победа!';
    isSuccess = true;
    points = 100; // WTF??????
    total = answers.filter(isAnswerCorrect).length * 100;
    additionals = getAdditionals(answers, lives);
    final = total + additionals.reduce((acc, cur) => acc + cur.total, 0);

  }

  return {
    pageTitle,
    results: [{
      answers,
      isSuccess,
      points,
      total,
      additionals,
      final
    }],

  }
};

export const initGame = (state) => {
  state = setQuestion(state, state.currentQuestion);
  renderSlide(getGameElement(state, (answer) => {
    state = setAnswer(state, answer);
    console.log('--- state', state);
    if (state.lives > 0 && state.currentQuestion < questions.length - 1) {
      state.currentQuestion = state.currentQuestion + 1;
      initGame(state);
    } else {
      renderSlide(getStatsElement(getStatsData(state)));
    }
  }));
};


