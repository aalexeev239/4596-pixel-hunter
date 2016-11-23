import getElementFromTemplate from '../utils/getElementFromTemplate';

import {introTemplate} from '../templates/introTemplate';
import {greetingTemplate} from '../templates/greetingTemplate';
import {rulesTemplate} from '../templates/rulesTemplate';
import {game1Template} from '../templates/game1Template';
import {game2Template} from '../templates/game2Template';
import {game3Template} from '../templates/game3Template';
import {statsTemplate} from '../templates/statsTemplate';

const introElement = getElementFromTemplate(introTemplate);
const greetingElement = getElementFromTemplate(greetingTemplate);
const rulesElement = getElementFromTemplate(rulesTemplate);
const game1Element = getElementFromTemplate(game1Template);
const game2Element = getElementFromTemplate(game2Template);
const game3Element = getElementFromTemplate(game3Template);
const statsElement = getElementFromTemplate(statsTemplate);

export {
  introElement,
  greetingElement,
  rulesElement,
  game1Element,
  game2Element,
  game3Element,
  statsElement
};
