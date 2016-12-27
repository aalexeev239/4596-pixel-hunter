export const timer = {
  SECONDS_PER_LEVEL: 30,
  DIGIT_COUNT: 2
};

export const lives = {
  TOTAL: 3
};

export const initialState = {
  lives: 3,
  answers: [],
  currentQuestion: -1,
  time: 0
};

// various export possibilities
export default {
  timer,
  lives,
  initialState
};
