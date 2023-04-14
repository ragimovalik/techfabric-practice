import {
  formMarkup,
  nextLevelCogratsMarkup,
  winCongratsMarkup,
} from '../templates/gameMarkup.js';

const holeEl = document.getElementById('hole');
const targetEl = document.getElementById('target');
const startBtnEl = document.getElementById('start-btn');

// modal refs
const modal = document.getElementById('modal');
const modalOverlay = document.querySelector('.modal__overlay');
const modalContent = document.querySelector('.modal__content');

// statusbar refs
const userNameEl = document.getElementById('user-name');
const scoreEl = document.getElementById('score');
const levelEl = document.getElementById('level');
const levelLengthEl = document.getElementById('level-length');

// Audio refs
const soundHit = document.getElementById('sound-hit');
const soundNextlevel = document.getElementById('sound-nextlevel');
const soundWin = document.getElementById('sound-win');

// Constants
const LEVELUP_COUNT = 10;
const WIN_SCORE = 50; // counts
const JUMP_DELAY = 500; // milliseconds
const JUMP_DURATION = 850; // milliseconds
const LEVELUP_SPEEDUP_STEP = 50; // milliseconds

// =========== Listeners ===========
addEventListener('DOMContentLoaded', () => {
  const markup = formMarkup();
  modalContent.innerHTML = markup;
  modalOpen();
});

modal.addEventListener('submit', handleSubmit);
startBtnEl.addEventListener('click', play);
targetEl.addEventListener('click', hit);

// Variables to Status Bar
const user = { name: '', email: '' };
let score = 0;
let level = 1;
let hitCountToNextLevel = 5;

const targetImages = {
  1: "url('images/stickman-dancing.svg')",
  2: "url('images/fish.svg')",
  3: "url('images/basketball.svg')",
  4: "url('images/jumper.svg')",
  5: "url('images/jumper-fun.svg')",
};

// Utils
export function delay(func, ms) {
  if (!ms) ms = 500;
  setTimeout(() => func(), ms);
}

// Check
const isWin = () => {
  if (score >= WIN_SCORE) {
    const markup = winCongratsMarkup();
    modalContent.innerHTML = markup;
    modalOpen();

    soundWin.currentTime = 0;
    soundWin.play();

    const modalCloseBtn = document.querySelector('.modal__button');
    modalCloseBtn.addEventListener('click', modalClose);
    modalOverlay.addEventListener('click', modalClose);

    startBtnEl.disabled = false;

    return true;
  }

  return false;
};

const isNextLevel = () => {
  if (hitCountToNextLevel === 0) {
    const markup = nextLevelCogratsMarkup(level + 1);
    modalContent.innerHTML = markup;
    modalOpen();

    soundNextlevel.currentTime = 0;
    soundNextlevel.play();

    setTimeout(() => {
      modalClose();
    }, 4000);

    hitCountToNextLevel = LEVELUP_COUNT;
    levelLengthEl.textContent = LEVELUP_COUNT;

    targetEl.style.backgroundImage = targetImages[level];

    return true;
  }
  return false;
};

// ========== Form ===========

function handleSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const isNameValid = document.getElementById('isValid-name');

  // Username input field validation.
  if (form.name.value.length < 2 || form.name.value.length > 20) {
    isNameValid.style.color = 'red';
    return false;
  }

  user.name = form.name.value;
  userNameEl.textContent = user.name || 'Guest';
  levelLengthEl.textContent = LEVELUP_COUNT;

  modalClose();

  form.reset();
}

// ========== Game ===========

function jump() {
  // Checks is total score reached WIN_SCORE
  if (isWin()) return;

  // Checks is score reached for levelup
  isNextLevel();

  // Jumps faster on next level
  const time = JUMP_DURATION - level * LEVELUP_SPEEDUP_STEP;

  // Target jumps
  holeEl.classList.add('up');

  // Hide target
  setTimeout(() => {
    holeEl.classList.remove('up');
    delay(jump, JUMP_DELAY);
  }, time);
}

function play() {
  score = 0;
  level = 1;
  hitCountToNextLevel = LEVELUP_COUNT;

  scoreEl.textContent = score;
  levelEl.textContent = level;
  levelLengthEl.textContent = LEVELUP_COUNT;

  jump();
  startBtnEl.disabled = true;
}

function hit(event) {
  if (!event.isTrusted) throw new Error('No Cheat!');
  if (isWin()) return;
  if (isNextLevel()) return;

  soundHit.currentTime = 0;
  soundHit.play();

  updateStatus();
}

function updateStatus() {
  score++;
  level = Math.ceil(score / LEVELUP_COUNT);
  hitCountToNextLevel--;

  scoreEl.textContent = score;
  levelEl.textContent = level;
  levelLengthEl.textContent = hitCountToNextLevel;
}

// ========== Modal ===========

function modalOpen() {
  modal.classList.add('is-open');
}

function modalClose() {
  modal.classList.remove('is-open');
}
