import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

flatpickr(input, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notify.failure('Please choose a date in the future');
    } else {
      startBtn.removeAttribute('disabled');
    }
  },
});

startBtn.addEventListener('click', onClick);

function onClick() {
  const timerId = setInterval(() => {
    const currentDate = new Date();
    const targetDate = new Date(input.value);
    const countdown = targetDate - currentDate;

    if (countdown > 0) {
      const timer = convertMs(countdown);
      days.textContent = addLeadingZero(timer.days);
      hours.textContent = addLeadingZero(timer.hours);
      seconds.textContent = addLeadingZero(timer.seconds);
      minutes.textContent = addLeadingZero(timer.minutes);
    } else {
      clearInterval(timerId);
    }
  }, 1000);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

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
