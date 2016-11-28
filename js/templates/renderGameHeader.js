import headerBackTemplate from './headerBack';

const func = ({time, lives: {left, total}}) => {
  const diff = total - left;

  const heartsArrayTemplate = [...Array(total)].map((life, i) => `
  <img src="img/heart__${i < diff ? 'empty' : 'full'}.svg" 
  class="game__heart" alt="Life" width="32" height="32">`);

  const livesTemplate = `<div class="game__lives">
    ${heartsArrayTemplate.join('\n')}
  </div>`;

  return `<header class="header">
    ${headerBackTemplate}
    <h1 class="game__timer">${time}</h1>
    ${livesTemplate}
  </header>`;
};

export default func;
