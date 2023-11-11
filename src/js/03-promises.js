import Notiflix from 'notiflix';
Notiflix.Notify.init({
  timeout: 2000,
});

const form = document.querySelector('.form');
form.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  const inputEl = event.target;
  const amount = Number(inputEl.amount.value);
  const delayStep = Number(inputEl.step.value);
  const firstDelay = Number(inputEl.delay.value);
  for (let i = 1; i <= amount; i += 1) {
    const delayTime = firstDelay + (i - 1) * delayStep;
      setTimeout(() => {
        createPromise(i, delayTime)
          .then(message => {
            Notiflix.Notify.success(message);
          })
          .catch(err => {
            Notiflix.Notify.failure(err);
          });
      }, firstDelay);
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve(`Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}
