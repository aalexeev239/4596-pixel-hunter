import {
  introElement,
  greetingElement,
  rulesElement,
  game1Element,
  game2Element,
  game3Element,
  statsElement
} from './templateElements';


(() => {

  // Rules
  const rulesSubmit = rulesElement.querySelector('.rules__button');

  rulesElement.querySelector('.rules__input').oninput = (e) => {
    if (e.target.value) {
      rulesSubmit.removeAttribute('disabled');
    } else {
      rulesSubmit.setAttribute('disabled', '');
    }
  };

  // Slides changer

  const mainElement = document.getElementById('main');

  const switcher = document.createElement('div');
  switcher.innerHTML = `<span class="prev"><img src="img/arrow_left.svg" alt="Left" width="50" height="50"></span>
    <span class="next"><img src="img/arrow_right.svg" alt="Right" width="50" height="50"></span>`;
  switcher.style.cssText = 'text-align: center';
  mainElement.after(switcher);

  const slides = [
    introElement,
    greetingElement,
    rulesElement,
    game1Element,
    game2Element,
    game3Element,
    statsElement
  ];
  let current = -1;

  const select = (index) => {
    current = index;
    mainElement.innerHTML = '';
    mainElement.appendChild(slides[index]);
  };

  document.querySelector('.next').onclick = (e) => {
    e.preventDefault();
    select(current + 1);
  };

  document.querySelector('.prev').onclick = (e) => {
    e.preventDefault();
    select(current - 1);
  };

  select(0);
})();
