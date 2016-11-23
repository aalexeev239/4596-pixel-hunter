export default function (templateString) {
  const elem = document.createElement('span');
  elem.innerHTML = templateString;

  return elem;
}
