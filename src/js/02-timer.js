import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
Notiflix.Notify.init({
  timeout: 2000,
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

const inputField = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('button[data-start]');
const timerData = document.querySelectorAll('.value');
btnStart.addEventListener('click', onStartClick);

btnStart.setAttribute('disabled', '');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (initialDate > Date.parse(selectedDates[0])) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      btnStart.removeAttribute('disabled');
    }
  },
};

const fp = flatpickr(inputField, options);
const initialDate = Date.parse(fp.selectedDates);
let timerId = 0;

function onStartClick() {
  clearTimeout(timerId);
  btnStart.setAttribute('disabled', '');
  const targetDate = Date.parse(fp.selectedDates[0]);
  difference(targetDate);
  timerId = setInterval(() => {
    difference(targetDate);
  }, 1000);
}

function difference(target) {
  const currentDate = new Date();
  const difference = target - currentDate.getTime();
  if (difference <= 0) {
    Notiflix.Notify.success('Timer is over');
    clearTimeout(timerId);
    return;
  }
  const arrayTimer = convertMs(difference);
  addLeadingZero(arrayTimer);
}

function addLeadingZero(value) {
  Object.entries(value).forEach(([key, val], i) => {
    timerData[i].textContent = val.toString().padStart(2, '0');
  });
}
