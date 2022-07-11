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
  
  if (bgColor === 'black') {
    document.body.style.setProperty('--bgColor', 'white');
    document.body.style.setProperty('--fgColor', 'black');
    theme = 'white'
  }

  else {
    document.body.style.setProperty('--bgColor', 'black');
    document.body.style.setProperty('--fgColor', 'white');
    theme = 'black';
  }

  const sleep = ms => new Promise(res => setTimeout(res, ms));

  if (theme == 'black'){
    let clr = 255;
    (async () => {
      while (clr >= 0){
        clr -= 10;
        theme = 'rgb('+clr+','+clr+','+clr+')';
        await sleep(2);
      }
      if (clr <= 40){
        theme = 'black';
      }
    })();
  } else {
    let clr = 0;
    (async () => {
      while (clr <= 255){
        clr += 10;
        theme = 'rgb('+clr+','+clr+','+clr+')';
        await sleep(2);
      }
      if (clr >= 250){
        theme = 'white';
      }
    })();
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