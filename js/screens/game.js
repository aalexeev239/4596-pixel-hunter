import AbstractView from '../view';
import Application from '../application';


class GameScreen extends AbstractView {

  constructor(state, question) {
    super();
    this.state = state;
    this.question = question;
  }

  getMarkup() {
    return `
      game should render here
    `;
  }

  bindHandlers() {

  }
}

export default (state, question) => new GameScreen(state, question).element;
