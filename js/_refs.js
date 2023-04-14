export const refs = {
  holeEl: document.getElementById('hole'),
  targetEl: document.getElementById('target'),
  startBtnEl: document.getElementById('start-btn'),

  // modal refs
  modal: document.getElementById('modal'),
  modalOverlay: document.querySelector('.modal__overlay'),
  modalContent: document.querySelector('.modal__content'),

  // statusbar refs
  userNameEl: document.getElementById('user-name'),
  scoreEl: document.getElementById('score'),
  levelEl: document.getElementById('level'),
  levelLengthEl: document.getElementById('level-length'),

  // Audio refs
  soundHit: document.getElementById('sound-hit'),
  soundNextlevel: document.getElementById('sound-nextlevel'),
  soundWin: document.getElementById('sound-win'),
};
