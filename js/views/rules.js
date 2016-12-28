import AbstractView from '../view';
import Application from '../application';
import pluralize from '../utils/pluralizeNoun_ru';
import headerBackTemplate from '../templates/headerBack';

class RulesScreen extends AbstractView {

  constructor(config) {
    super();
    this._pluralizeSecPerLevel = `${config.timer.SECONDS_PER_LEVEL} ${pluralize(config.timer.SECONDS_PER_LEVEL, 'секунда', 'секунды', 'секунд')}`;
    this._pluralizeLives = `${config.lives.TOTAL} ${pluralize(config.lives.TOTAL, 'раз', 'раза', 'раз')}`;
    this._onInput = this._onInput.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
  }

  getMarkup() {
    return `
      <header class="header">${headerBackTemplate}</header>
      <div class="rules  central--none">
        <h1 class="rules__title">Правила</h1>
        <p class="rules__description">Угадай 10 раз для каждого изображения фото <img
          src="img/photo_icon.png" width="16" height="16"> или рисунок <img
          src="img/paint_icon.png" width="16" height="16" alt="">.<br>
          Фотографиями или рисунками могут быть оба изображения.<br>
          На каждую попытку отводится ${this._pluralizeSecPerLevel}.<br>
          Ошибиться можно не более ${this._pluralizeLives}.<br>
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
    this._inputElement = this.element.querySelector('.rules__input');
    this._submitElement = this.element.querySelector('.rules__button');
    this._formElement = this.element.querySelector('.rules__form');

    this._inputElement.addEventListener('input', this._onInput);
    this._formElement.addEventListener('submit', this._onSubmit);
  }

  clearHandlers() {
    this._inputElement.removeEventListener('input', this._onInput);
    this._formElement.removeEventListener('submit', this._onSubmit);
    this._inputElement.value = '';
  }

  _checkInputValidity() {
    return this._inputElement.value.trim().length > 0;
  }

  _onInput() {
    this._submitElement.disabled = !this._checkInputValidity();
  }

  _onSubmit(ev) {
    ev.preventDefault();

    if (this._checkInputValidity()) {
      const username = this._inputElement.value.trim();
      this.clearHandlers();
      Application.showGame(username);
    }
  }
}

export default (config, data) => new RulesScreen(config, data);
