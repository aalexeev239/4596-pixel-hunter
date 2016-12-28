import answerVariants from '../constants/answerVariants';


const func = ({image: {url, width, height}}, index) => `<div class="game__option">
      <img src="${url}" alt="${index}" width="${width}" height="${height}">
      <label class="game__answer game__answer--photo">
        <input name="img_${index}" type="radio" value="${answerVariants.PHOTO}">
        <span>Фото</span>
      </label>
      <label class="game__answer game__answer--paint">
        <input name="img_${index}" type="radio" value="${answerVariants.PAINTING}">
        <span>Рисунок</span>
      </label>
    </div>`;

export default func;
