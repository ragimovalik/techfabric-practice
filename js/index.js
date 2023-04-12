// Refs
const rootEl = document.getElementById('root');
const formBoxEl = document.getElementById('form-box');
const userForm = document.forms['user-data'];
const isValidNameEl = document.getElementById('isValid-name');
const holeEl = document.getElementById('hole');
const targetEl = document.getElementById('target');
const startBtnEl = document.getElementById('start-btn');

const scoreEl = document.getElementById('score');
const levelEl = document.getElementById('level');
const countdownEl = document.getElementById('countdown');

const audio = document.getElementById('sound-hit');

// Variables to Status Bar
let score = 0;
let level = 1;
let hitCountToNextLevel = 10;

// Constants
const WIN_SCORE = 11; // counts
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

const shouldStopPlaying = () => {
  if (hitCountToNextLevel === 0 || score >= WIN_SCORE) return true;

  return false;
};

// ========== Form ===========

function submitHandler(event) {
  event.preventDefault();

  console.log('submit');
}

// ========== Game ===========

function jump() {
  if (shouldStopPlaying()) return;

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
  hitCountToNextLevel = 10;
  scoreEl.textContent = score;
  levelEl.textContent = level;
  countdownEl.textContent = hitCountToNextLevel;

  jump();
  startBtnEl.disabled = true;
}

function hit(event) {
  if (!event.isTrusted) throw new Error('No Cheat!');
  if (shouldStopPlaying()) return;

  // event.target.classList.remove('up');
  audio.currentTime = 0;
  audio.play();
  score++;
  level = Math.ceil(score / 10);
  hitCountToNextLevel--;

  scoreEl.textContent = score;
  levelEl.textContent = level;
  countdownEl.textContent = hitCountToNextLevel;
}

targetEl.addEventListener('click', hit);

/*
const shouldLevelUp = () => {
  level++;
};
*/
