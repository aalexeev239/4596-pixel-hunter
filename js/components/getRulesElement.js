import getElementFromTemplate from '../utils/getElementFromTemplate';
import pluralize from '../utils/pluralizeNoun_ru';
import renderSlide from '../renderSlide';
import headerBackTemplate from '../templates/headerBack';
import getGameElement from './getGameElement';
import gameData from '../data/game-data';

const getRulesElement = ({attempts, attemptTimeInSec, lives}) => {

  const formTemplate = `<form class="rules__form">
    <input class="rules__input" type="text" placeholder="Ваше Имя">
    <button class="rules__button  continue" type="submit" disabled>Go!</button>
  </form>`;

  const pluralizeAttempts = `${attempts} ${pluralize(attempts, 'раз', 'раза', 'раз')}`;
  const pluralizeAttemptTimeInSec = `${attemptTimeInSec} ${pluralize(attemptTimeInSec, 'секунда', 'секунды', 'секунд')}`;
  const pluralizeLives = `${lives} ${pluralize(lives, 'раз', 'раза', 'раз')}`;

  const rulesTemplate = `<div class="rules  central--none">
    <h1 class="rules__title">Правила</h1>
    <p class="rules__description">Угадай ${pluralizeAttempts} для каждого изображения фото <img
      src="img/photo_icon.png" width="16" height="16"> или рисунок <img
      src="img/paint_icon.png" width="16" height="16" alt="">.<br>
      Фотографиями или рисунками могут быть оба изображения.<br>
      На каждую попытку отводится ${pluralizeAttemptTimeInSec}.<br>
      Ошибиться можно не более ${pluralizeLives}.<br>
      <br>
      Готовы?
    </p>
    ${formTemplate}
  </div>`;

  const template = `<header class="header">${headerBackTemplate}</header>
    ${rulesTemplate}`;

  const rulesElement = getElementFromTemplate(template);
  const formElement = rulesElement.querySelector('.rules__form');
  const inputElement = rulesElement.querySelector('.rules__input');
  const submitElement = rulesElement.querySelector('.rules__button');

  if (formElement && inputElement && submitElement) {

    const checkInputValidity = () => {
      return inputElement.value.trim().length > 0;
    };

    const onInput = () => {
      submitElement.disabled = !checkInputValidity();
    };

    const onSubmit = (ev) => {
      ev.preventDefault();

      if (checkInputValidity()) {
        renderSlide(getGameElement(gameData, 0));
      }
    };

    inputElement.addEventListener('input', onInput);
    formElement.addEventListener('submit', onSubmit);
  }

  return rulesElement;
};

export default getRulesElement;
