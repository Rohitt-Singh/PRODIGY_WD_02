let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  const centiseconds = String(Math.floor((ms % 1000) / 10)).padStart(2, '0');
  return `${minutes}:${seconds}:${centiseconds}`;
}

function updateDisplay() {
  display.textContent = formatTime(elapsedTime);
}

function startTimer() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    updateDisplay();
  }, 10);
  running = true;
  startStopBtn.textContent = 'Pause';
  lapBtn.disabled = false;
  resetBtn.disabled = false;
}

function stopTimer() {
  clearInterval(timerInterval);
  running = false;
  startStopBtn.textContent = 'Start';
}

startStopBtn.addEventListener('click', () => {
  if (!running) {
    startTimer();
  } else {
    stopTimer();
  }
});

resetBtn.addEventListener('click', () => {
  stopTimer();
  elapsedTime = 0;
  updateDisplay();
  laps.innerHTML = '';
  lapBtn.disabled = true;
  resetBtn.disabled = true;
});

lapBtn.addEventListener('click', () => {
  const li = document.createElement('li');
  li.textContent = formatTime(elapsedTime);
  laps.appendChild(li);
});
