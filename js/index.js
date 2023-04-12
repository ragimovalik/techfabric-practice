// Refs
const rootEl = document.getElementById('root');
const formBoxEl = document.getElementById('form-box');
const userForm = document.forms['user-data'];
const isValidNameEl = document.getElementById('isValid-name');
const holeEl = document.getElementById('hole');
const targetEl = document.getElementById('target');
const startBtnEl = document.getElementById('start-btn');

const modal = document.getElementById('modal');
const modalOverlay = document.querySelector('.modal__overlay');

const scoreEl = document.getElementById('score');
const levelEl = document.getElementById('level');
const levelLengthEl = document.getElementById('level-length');

const soundHit = document.getElementById('sound-hit');
const soundNextlevel = document.getElementById('sound-nextlevel');
const soundWin = document.getElementById('sound-win');

// Variables to Status Bar
let score = 0;
let level = 1;
let hitCountToNextLevel = 5;

// Constants
const LEVELUP_COUNT = 5;
const WIN_SCORE = 25; // counts
const JUMP_DELAY = 500; // milliseconds
const JUMP_DURATION = 850; // milliseconds
const LEVELUP_SPEEDUP_STEP = 50; // milliseconds

const targetImages = {
  1: "background-image: url('../images/jumper.svg')",
  2: "background-image: url('../images/jumper-fun.svg')",
  3: "background-image: url('../images/basketball.svg')",
  4: "background-image: url('../images/stickman-dancing.svg')",
  5: "background-image: url('../images/fish.svg')",
};

// Utils
function delay(func, ms) {
  if (!ms) ms = 500;
  setTimeout(() => func(), ms);
}

const isWin = () => {
  if (score >= WIN_SCORE) return true;

  return false;
};

const isNextLevel = () => {
  if (hitCountToNextLevel === 0) {
    modalOpen();

    soundNextlevel.currentTime = 0;
    soundNextlevel.play();

    setTimeout(() => {
      modalClose();
    }, 4000);

    hitCountToNextLevel = LEVELUP_COUNT;
    levelLengthEl.textContent = LEVELUP_COUNT;
    return true;
  }
  return false;
};

// ========== Form ===========

function submitHandler(event) {
  event.preventDefault();

  console.log('submit');
}

// ========== Game ===========

function jump() {
  if (isWin()) return;
  isNextLevel();

  // Jumps faster on next level
  const time = JUMP_DURATION - level * LEVELUP_SPEEDUP_STEP;

  holeEl.classList.add('up');

  setTimeout(() => {
    holeEl.classList.remove('up');
    delay(jump, JUMP_DELAY);
  }, time);
}

function play() {
  score = 0;
  level = 1;
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

  // targetEl.style = targetImages[level];
}

targetEl.addEventListener('click', hit);

// ========== Modal ===========
modalOverlay.addEventListener('click', modalClose);

function modalOpen() {
  modal.classList.add('is-open');
}

function modalClose() {
  modal.classList.remove('is-open');
}

/*


*/
