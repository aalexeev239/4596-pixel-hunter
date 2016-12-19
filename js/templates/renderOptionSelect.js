const func = ({image: {url, title, width, height}, isSelected}) => `<label class="game__option${isSelected ? ' game__option--selected' : ''}">
    <img src="${url}" alt="${title}" width="${width}" height="${height}">
    <input type="radio" name="question" value="${title}" name="${title}">
  </label>`;

export default func;
