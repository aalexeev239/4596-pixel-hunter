import getElementFromTemplate from '../utils/getElementFromTemplate';

import answerValues from '../constants/answerValues';

import headerBack from '../templates/headerBack';
import renderStats from '../templates/renderStats';


const data = {
  pagetitle: 'Победа!',
  results: [
    {
      number: 1,
      answersList: [
        {
          value: answerValues.WRONG
        },
        {
          value: answerValues.SLOW
        },
        {
          value: answerValues.FAST
        },
        {
          value: answerValues.CORRECT
        },
        {
          value: answerValues.WRONG
        },
        {
          value: answerValues.UNKNOWN
        },
        {
          value: answerValues.SLOW
        },
        {
          value: answerValues.UNKNOWN
        },
        {
          value: answerValues.FAST
        },
        {
          value: answerValues.UNKNOWN
        }
      ],
      isSuccess: true,
      points: 100,
      total: 900,
      additionals: [
        {
          title: 'Бонус за скорость',
          extra: 1,
          icon: 'fast',
          points: 50,
          total: 50
        },
        {
          title: 'Бонус за жизни',
          extra: 2,
          icon: 'heart',
          points: 50,
          total: 100
        },
        {
          title: 'Штраф за медлительность',
          extra: 2,
          icon: 'slow',
          points: 50,
          total: -100
        }
      ],
      final: 950
    },
    {
      number: 2,
      answersList: [
        {
          value: answerValues.WRONG
        },
        {
          value: answerValues.SLOW
        },
        {
          value: answerValues.FAST
        },
        {
          value: answerValues.CORRECT
        },
        {
          value: answerValues.WRONG
        },
        {
          value: answerValues.UNKNOWN
        },
        {
          value: answerValues.SLOW
        },
        {
          value: answerValues.UNKNOWN
        },
        {
          value: answerValues.FAST
        },
        {
          value: answerValues.UNKNOWN
        }
      ],
      isSuccess: false,
      points: null,
      total: null,
      additionals: [],
      final: null,
    },
    {
      number: 3,
      answersList: [
        {
          value: answerValues.WRONG
        },
        {
          value: answerValues.SLOW
        },
        {
          value: answerValues.FAST
        },
        {
          value: answerValues.CORRECT
        },
        {
          value: answerValues.WRONG
        },
        {
          value: answerValues.UNKNOWN
        },
        {
          value: answerValues.SLOW
        },
        {
          value: answerValues.UNKNOWN
        },
        {
          value: answerValues.FAST
        },
        {
          value: answerValues.UNKNOWN
        }
      ],
      isSuccess: true,
      points: 100,
      total: 900,
      additionals: [
        {
          title: 'Бонус за жизни',
          extra: 2,
          icon: 'heart',
          points: 50,
          total: 100
        }
      ],
      final: 950
    }
  ]
};

const {pagetitle, results} = data;

const renderResult = (result) => {
  const {number, answersQueue, additionals, isSuccess, final} = result;

  return `<table class="result__table">
    <tr>
      <td class="result__number">${number}.</td>
        <td colspan="2">
          ${renderStats(answersQueue)}
        </td>
        ${renderResultScore(result)}
    </tr>
    ${additionals.map(renderResultAdditional).join('\n')}
    ${isSuccess ? `<tr>
      <td colspan="5" class="result__total  result__total--final">${final}</td>
    </tr>` : ''}
  </table>`;
};

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

const template = `<header class="header">
    ${headerBack}
  
  </header>
  <div class="result">
    <h1>${pagetitle}</h1>
    ${results.map(renderResult).join('\n')}
  </div>`;

const statsElement = getElementFromTemplate(template);

export default statsElement;
