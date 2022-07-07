const overlay = document.getElementById('overlay');
const rulesModal = document.getElementById('rules-modal');
const contributorsModal = document.getElementById('contributors-modal');

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

function toggleOverlay() {
  overlay.classList.toggle('visible');
  overlay.classList.toggle('hidden');
}

function toggleRules() {
  rulesModal.classList.toggle('visible');
  rulesModal.classList.toggle('hidden');
  toggleOverlay();
}

function toggleContributors() {
  contributorsModal.classList.toggle('visible');
  contributorsModal.classList.toggle('hidden');
  toggleOverlay();
}