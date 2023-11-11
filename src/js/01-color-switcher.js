const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

btnStart.addEventListener('click', onStartClick);
btnStop.addEventListener('click', onStopClick);

let timerId;
let color;

function onStartClick() {
  btnStart.setAttribute('disabled', '');
  const btnParent = btnStart.parentNode.style;
  setColor(btnParent);
  timerId = setInterval(() => {
    setColor(btnParent);
  }, 1000);
}

function setColor(event) {
  color = getRandomHexColor();
  event.backgroundColor = color;
}

function onStopClick() {
  clearTimeout(timerId);
  btnStart.removeAttribute('disabled');
}
