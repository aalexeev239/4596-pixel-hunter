import getElementFromTemplate from '../utils/getElementFromTemplate';
import headerBack from '../templates/headerBack';
import renderStats from '../templates/renderStats';

const renderResultScore = ({isSuccess, points, total, final}) => {
  if (isSuccess) {
    return `<td class="result__points">×&nbsp;${points}</td>
      <td class="result__total">${total}</td>`;
  } else {
    return `<td class="result__total"></td>
      <td class="result__total  result__total--final">fail</td>`;
  }
};

const renderResultAdditional = ({title, extra, icon, points, total}) => `<tr>
    <td></td>
    <td class="result__extra">${title}:</td>
    <td class="result__extra">${extra}&nbsp;<span class="stats__result stats__result--${icon}"></span></td>
    <td class="result__points">×&nbsp;${points}</td>
    <td class="result__total">${total}</td>
  </tr>`;

const renderResult = (result, index) => {
  const {answers, additionals, isSuccess, final} = result;
  return `<table class="result__table">
    <tr>
      <td class="result__number">${index + 1}.</td>
        <td colspan="2">
          ${renderStats(answers)}
        </td>
        ${renderResultScore(result)}
    </tr>
    ${additionals.map(renderResultAdditional).join('\n')}
    ${isSuccess ? `<tr>
      <td colspan="5" class="result__total  result__total--final">${final}</td>
    </tr>` : ''}
  </table>`;
};

const getStatsElement = (data) => {
  const {pageTitle, results} = data;

  const template = `<header class="header">
    ${headerBack}
  </header>
  <div class="result">
    <h1>${pageTitle}</h1>
    ${results.map(renderResult).join('\n')}
  </div>`;

  return getElementFromTemplate(template);
};

export default getStatsElement;
