const func = ({image:{url, alt, w, h}, name}) => `<div class="game__option">
      <img src="${url}" alt="${alt}" width="${w}" height="${h}">
      <label class="game__answer game__answer--photo">
        <input name="${name}" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer game__answer--paint">
        <input name="${name}" type="radio" value="paint">
        <span>Рисунок</span>
      </label>
    </div>`;

export default func;
