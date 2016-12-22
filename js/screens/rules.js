import AbstractView from '../view';
import Application from '../application';
import pluralize from '../utils/pluralizeNoun_ru';
import headerBackTemplate from '../templates/headerBack';


class IntroScreen extends AbstractView {

  constructor(config, data) {
    super();
    this.pluralizeTotal = `${data.questions.length} ${pluralize(data.questions.length, 'раз', 'раза', 'раз')}`;
    this.pluralizeSecPerLevel = `${config.timer.SECONDS_PER_LEVEL} ${pluralize(config.timer.SECONDS_PER_LEVEL, 'секунда', 'секунды', 'секунд')}`;
    this.pluralizeLives = `${config.lives.TOTAL} ${pluralize(config.lives.TOTAL, 'раз', 'раза', 'раз')}`;
  }

  getMarkup() {
    return `
      <header class="header">${headerBackTemplate}</header>
      <div class="header__back">
        <span class="back">
          <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
          <img src="img/logo_small.png" width="101" height="44">
        </span>
      </div>
      <div class="rules  central--none">
        <h1 class="rules__title">Правила</h1>
        <p class="rules__description">Угадай ${this.pluralizeTotal} для каждого изображения фото <img
          src="img/photo_icon.png" width="16" height="16"> или рисунок <img
          src="img/paint_icon.png" width="16" height="16" alt="">.<br>
          Фотографиями или рисунками могут быть оба изображения.<br>
          На каждую попытку отводится ${this.pluralizeSecPerLevel}.<br>
          Ошибиться можно не более ${this.pluralizeLives}.<br>
          <br>
          Готовы?
        </p>
        <form class="rules__form">
          <input class="rules__input" type="text" placeholder="Ваше Имя">
          <button class="rules__button  continue" type="submit" disabled>Go!</button>
        </form>
      </div>
    `;
  }

  bindHandlers() {
    this.inputElement = this.element.querySelector('.rules__input');
    this.submitElement = this.element.querySelector('.rules__button');
    this.formElement = this.element.querySelector('.rules__form');

    this.inputElement.addEventListener('input', (this._onInput).bind(this));
    this.formElement.addEventListener('submit', (this._onSubmit).bind(this));
  }

  _checkInputValidity() {
    return this.inputElement.value.trim().length > 0;
  }

  _onInput() {
    this.submitElement.disabled = !this._checkInputValidity();
  }

  _onSubmit(ev) {
    ev.preventDefault();

    if (this._checkInputValidity()) {
      Application.showGame();
    }
  };
}

export default (config, data) => new IntroScreen(config, data).element;
