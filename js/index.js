// Refs
const rootEl = document.getElementById('root');
const formBoxEl = document.getElementById('form-box');
const userForm = document.forms['user-data'];
const isValidNameEl = document.getElementById('isValid-name');
const holeEl = document.getElementById('hole');
const targetEl = document.getElementById('target');
const startBtnEl = document.getElementById('start-btn');

// Variables
let score = 0;
let level = 1;

function submitHandler(event) {
  event.preventDefault();

  console.log('submit');
}

function start() {
  console.log('start');
}
