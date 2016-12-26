import AbstractView from '../view';
import headerBackTemplate from '../templates/headerBack';
import renderStats from '../templates/renderStats';


class StatsScreen extends AbstractView {

  constructor({pageTitle, results}) {
    super();
    this._pageTitle = pageTitle;
    this._results = results;
  }

  getMarkup() {
    return `
      <header class="header">${headerBackTemplate}</header>
      <div class="result">
        <h1>${this._pageTitle}</h1>
        ${this._results.map((this._renderResult).bind(this)).join('\n')}
      </div>
    `;
  }

  _renderResult(result, index) {
    const {answers, additionals, isSuccess, final} = result;
    return `
      <table class="result__table">
        <tr>
          <td class="result__number">${index + 1}.</td>
            <td colspan="2">
              ${renderStats(answers)}
            </td>
            ${this._renderResultScore(result)}
        </tr>
        ${additionals.map(this._renderResultAdditional).join('\n')}
        ${isSuccess ? `<tr>
          <td colspan="5" class="result__total  result__total--final">${final}</td>
        </tr>` : ''}
      </table>
    `;
  }

  _renderResultAdditional({title, extra, icon, points, total}) {
    return `
    <tr>
      <td></td>
      <td class="result__extra">${title}:</td>
      <td class="result__extra">${extra}&nbsp;<span class="stats__result stats__result--${icon}"></span></td>
      <td class="result__points">×&nbsp;${points}</td>
      <td class="result__total">${total}</td>
    </tr>
  `;
  }

  _renderResultScore({isSuccess, points, total, final}) {
    if (isSuccess) {
      return `<td class="result__points">×&nbsp;${points}</td>
      <td class="result__total">${total}</td>`;
    } else {
      return `<td class="result__total"></td>
      <td class="result__total  result__total--final">fail</td>`;
    }
  }
}

export default (stats) => new StatsScreen(stats).element;
