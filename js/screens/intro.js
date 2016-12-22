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
    this.element.querySelector('.intro__asterisk').onclick = (ev) => {
      ev.preventDefault();

      Application.showGreeting();
    }
  }
}

export default () => new IntroScreen().element;
