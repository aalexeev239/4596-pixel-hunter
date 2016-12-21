// import getIntroElement from './components/getIntroElement';
// import renderSlide from './utils/renderSlide';
import {gameController} from './components/gameController';


// renderSlide(getIntroElement());
gameController({
  lives: 3,
  answers: [],
  currentQuestion: 0,
  time: 0
});
