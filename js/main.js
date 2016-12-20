// import getIntroElement from './components/getIntroElement';
// import renderSlide from './utils/renderSlide';
import {initGame} from './components/game';


// renderSlide(getIntroElement());
initGame({
  lives: 3,
  answers: [],
  currentQuestion: 0,
  time: 0
});
