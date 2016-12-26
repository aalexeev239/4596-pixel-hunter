import AbstractView from '../view';
import Application from '../application';
import createGameHeader from './partials/gameHeader';
import createStats from './partials/stats';
import renderQuestion from '../templates/renderQuestion';


class GameScreen extends AbstractView {

  constructor(state, question) {
    super();
    this._state = state;
    this._question = question;
    this.element.insertBefore(
      createGameHeader(this._state.lives, () => {
        console.log('time ended');
      }),
      this.element.children[0]
    );
    this.element.querySelector('.stats').appendChild(createStats(state.answers));
  }

  getMarkup() {
    return `
      <div class="game">
        ${renderQuestion(this._question)}
        <div class="stats">
          
        </div>
      </div>
    `
  }

  bindHandlers() {

  }
}

export default (state, question) => new GameScreen(state, question).element;
