const overlay = document.getElementById('overlay');
overlay.classList.toggle('invisible');

const modals = document.getElementsByClassName('modal');
Array.from(modals).forEach(modal => {
  modal.classList.toggle('invisible');
});

function left() {
  waiter = 'left';
}

function up() {
  waiter = 'up';
}

function down() {
  waiter = 'down';
}

function right() {
  waiter = 'right';
}

function toggleMusic() {
  const audiobtn = document.getElementById("audio-toggle");
  
  if (audioElement.paused){
    audioElement.play();
    audiobtn.textContent = "Pause Music";
  } 
  
  else {
    audioElement.pause();
    audiobtn.textContent = "Play Music";
  }
}

function toggleTheme() {
  const body = getComputedStyle(document.body);
  const bgColor = body.getPropertyValue('--bgColor');
  
  if (bgColor === '#212121') {
    document.body.style.setProperty('--bgColor', 'white');
    document.body.style.setProperty('--fgColor', '#212121');
  }

  else {
    document.body.style.setProperty('--bgColor', '#212121');
    document.body.style.setProperty('--fgColor', 'white');
  }
}

function openRules() {
  const rulesModal = document.getElementById('rules-modal');
  rulesModal.classList.toggle('invisible');
  overlay.classList.toggle('invisible');
}