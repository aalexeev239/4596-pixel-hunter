import headerBackTemplate from './headerBack';
import {lives as livesConfig, timer as timerConfig} from '../config';


const func = (lives) => {
  const diff = livesConfig.TOTAL - lives;

  const heartsArrayTemplate = [...Array(livesConfig.TOTAL)].map((life, i) => `
  <img src="img/heart__${i < diff ? 'empty' : 'full'}.svg" 
  class="game__heart" alt="Life" width="32" height="32">`);

  const livesTemplate = `<div class="game__lives">
    ${heartsArrayTemplate.join('\n')}
  </div>`;

  return `<header class="header">
    ${headerBackTemplate}
    <h1 class="game__timer">${timerConfig.SECONDS_PER_LEVEL}</h1>
    ${livesTemplate}
  </header>`;
};

export default func;
