import {answerTypes} from '../constants/answerTypes';
import {scores} from '../constants/scores';
import questionTypes from '../constants/questionTypes';
import {questionFindPaintTypesMap} from '../constants/questionTypes';

import isInteger from '../utils/isInteger';

import {lives as livesConfig, timer as timerConfig} from '../config';

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

  if (questionIndex >= state.maxQuestions) {
    throw new RangeError('question index are greater than possible');
  }

  return Object.assign({}, state, {currentQuestion: questionIndex});
};

const validateAnswer = (answer, question) => {
  switch (question.type) {
    case questionTypes.GUESS_EVERY_OPTION:
      return Array.isArray(answer) &&
        question.answers.every((qAnswer, i) => qAnswer.type === answer[i]);

    case questionTypes.GUESS_SINGLE_OPTION:
      return question.answers[0].type === answer;

    case questionTypes.FIND_PAINT:
      answer = +answer;
      console.log('--- question', question);
      console.log('--- questionFindPaintTypesMap[question.question]', questionFindPaintTypesMap.get(question.question));
      return isInteger(answer) &&
        answer < question.answers.length &&
        question.answers[answer].type === questionFindPaintTypesMap.get(question.question);
    default:
      return false;
  }
};

export const setAnswer = (state, {answer, time}, question) => {
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
  } else if (validateAnswer(answer, question)) {
    if (timerConfig.SECONDS_PER_LEVEL - time < 10) {
      resultAnswer = answerTypes.FAST;
    } else if (timerConfig.SECONDS_PER_LEVEL - time > 20) {
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
  const {lives, answers, currentQuestion, maxQuestions} = state;
  let pageTitle = 'FAIL';
  let isSuccess = false;
  let points = null;
  let total = null;
  let additionals = [];
  let final = null;

  if (answers.length > maxQuestions) {
    throw new RangeError('too many answers');
  }

  if (lives > 0 && currentQuestion === maxQuestions - 1) {
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
      final,
      maxQuestions
    }]
  };
};


