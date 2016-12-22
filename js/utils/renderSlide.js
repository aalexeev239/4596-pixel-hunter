const mainElement = document.getElementById('main');

export default function (element) {
  mainElement.innerHTML = '';
  mainElement.appendChild(element);
}
