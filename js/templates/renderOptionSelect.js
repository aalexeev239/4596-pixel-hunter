const func = ({image: {url, title, width, height}, isSelected}) => `<div class="game__option${isSelected ? ' game__option--selected' : ''}">
    <img src="${url}" alt="${title}" width="${width}" height="${height}">
  </div>`;

export default func;
