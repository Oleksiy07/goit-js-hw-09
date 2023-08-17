import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

form.addEventListener('submit', onSubmit);

function onSubmit(evt) {
  evt.preventDefault();
  const { delay, step, amount } = form.elements;

  let delayNum = Number(delay.value);
  let stepNum = Number(step.value);
  let amountNum = Number(amount.value);

  for (let i = 0; i < amountNum; i++) {
    createPromise(i + 1, delayNum)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delayNum += stepNum;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}
