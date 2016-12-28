const func = ({image: {url, width, height}}, index) => `<label class="game__option">
    <img src="${url}" alt="${index}" width="${width}" height="${height}">
    <input type="radio" name="question" value="${index}" name="img" class="hidden">
  </label>`;

export default func;
