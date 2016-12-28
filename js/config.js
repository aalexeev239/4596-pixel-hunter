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
  time: 0,
  maxQuestions: 0
};

export const server = {
  QUESTIONS_URL: 'https://intensive-ecmascript-server-nnpnvhhedl.now.sh/pixel-hunter/questions',
  STATS_URL_TEMPLATE: 'https://intensive-ecmascript-server-dxttmcdylw.now.sh/pixel-hunter/stats/:username',
  NO_USER: 'noname'
};

// various export possibilities
export default {
  timer,
  lives,
  initialState
};
