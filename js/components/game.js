import {answerTypes} from '../constants/answerTypes';
import {scores} from '../constants/scores';
import questionTypes from '../constants/questionTypes';
import isInteger from '../utils/isInteger';
import {lives as livesConfig, timer as timerConfig} from '../config';
import {questions, correctAnswers} from '../data/game-data';

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
  let resultAnswer;
  let resultLives = lives;

  if (lives === 0) {
    throw new RangeError('lives should be positive');
  }

  if (time < 0) {
    throw new RangeError('answer time should be non-negative');
  }

  if (time > timerConfig.SECONDS_PER_LEVEL) {
    answers[currentQuestion] = answerTypes.UNKNOWN;
    return Object.assign({}, state, {answers}, {lives: lives - 1});
  }

  if (!answer || time === 0) {
    resultAnswer = answerTypes.UNKNOWN;
    resultLives = lives - 1;
  } else if (validateAnswer(answer, currentQuestion)) {
    if (time < 10) {
      resultAnswer = answerTypes.FAST;
    } else if (time > 20) {
      resultAnswer = answerTypes.SLOW;
    } else {
      resultAnswer = answerTypes.CORRECT;
    }
  } else {
    resultAnswer = answerTypes.WRONG;
    resultLives = lives - 1;
  }

  answers[currentQuestion] = resultAnswer;

  return Object.assign({}, state, {answers}, {lives: resultLives});
};

const correctAnswersList = [answerTypes.CORRECT, answerTypes.FAST, answerTypes.SLOW];

const isAnswerCorrect = (answer) => {
  return (~correctAnswersList.indexOf(answer));
};

const getAdditionals = (answers, lives) => {
  let fastAnswersCount = answers.filter((a) => a === answerTypes.FAST).length;
  let slowAnswersCount = answers.filter((a) => a === answerTypes.SLOW).length;
  let result = [];

  if (fastAnswersCount) {
    result.push({
      title: 'Бонус за скорость',
      extra: fastAnswersCount,
      icon: 'fast',
      points: Math.abs(scores.FAST),
      total: fastAnswersCount * scores.FAST
    });
  }

  if (lives) {
    result.push({
      title: 'Бонус за жизни',
      extra: lives,
      icon: 'heart',
      points: Math.abs(scores.LIVE),
      total: lives * scores.LIVE
    });
  }

  if (slowAnswersCount) {
    result.push({
      title: 'Штраф за медлительность',
      extra: slowAnswersCount,
      icon: 'fast',
      points: Math.abs(scores.SLOW),
      total: slowAnswersCount * scores.SLOW
    });
  }

  return result;
};

export const getStatsData = (state) => {
  const {lives, answers, currentQuestion} = state;
  let pageTitle = 'FAIL';
  let isSuccess = false;
  let points = null;
  let total = null;
  let additionals = [];
  let final = null;

  if (answers.length > questions.length) {
    throw new RangeError('too many answers');
  }

  if (lives > 0 && currentQuestion === questions.length - 1) {
    pageTitle = 'Победа!';
    isSuccess = true;
    points = 100; // WTF??????
    total = answers.filter(isAnswerCorrect).length * scores.CORRECT;
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
    }]
  };
};


