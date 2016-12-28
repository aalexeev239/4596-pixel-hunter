import AbstractView from '../view';
import Application from '../application';

class IntroScreen extends AbstractView {

  getMarkup() {
    return `
      <div class="intro">
        <h1 class="intro__asterisk">*</h1>
        <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf
          Sparnaay.</p>
      </div>
    `;
  }

  bindHandlers() {
    this._btn = this.element.querySelector('.intro__asterisk');
    this._btn.onclick = (ev) => {
      ev.preventDefault();

      this.clearHandlers();
      Application.showGreeting();
    };
  }

  clearHandlers() {
    this._btn.onclick = null;
  }
}

export default () => new IntroScreen();
