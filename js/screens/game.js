import AbstractView from '../view';
import Application from '../application';
import createGameHeader from './partials/gameHeader';


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

  }

  getMarkup() {
    return `
      
    `;
  }

  bindHandlers() {

  }
}

export default (state, question) => new GameScreen(state, question).element;
