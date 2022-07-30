const overlay = document.getElementById('overlay');
const rulesModal = document.getElementById('rules-modal');
const contributorsModal = document.getElementById('contributors-modal');

function starteverything(){
  startwaiter = true;
  started = true;
  counter = 0;
  let z = document.getElementById('display');
  z.textContent = 'Start';
  fpslst = [];
  lastfps = Date.now();
  speed = basespeed;
}

function left() {
  waiter = 'left';
  starteverything();
}

function up() {
  waiter = 'up';
  starteverything();
}

function down() {
  waiter = 'down';
  starteverything();
}

function right() {
  waiter = 'right';
}

function changemode(){
  let mode = document.getElementById('mode');
  localStorage.setItem('pacmode',mode.value);
  window.location.reload();
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

function maketheme(id,clr){
  let ab = document.getElementById(id);
  ab.style.color = clr;
}

function clrbtn(id,clr){
  let ab = document.getElementById(id);
  ab.style.backgroundColor = clr;
  ab.style.borderColor = clr;
}

function clrbtn1(id,clr){
  let ab = document.getElementById(id);
  ab.style.borderColor = clr;
}

function toggleTheme() {

  const sleep = ms => new Promise(res => setTimeout(res, ms));

  if (theme == 'white' || theme == 'rgb(255,255,255)'){
    let clr = 255;
    (async () => {
      while (clr >= 0){
        clr -= 10;
        theme = 'rgb('+clr+','+clr+','+clr+')';
        document.body.style.background = theme;

        let setclr = 'rgb('+(255-clr)+','+(255-clr)+','+(255-clr)+')';
        maketheme('header1',setclr);
        maketheme('header2',setclr);
        maketheme('header3',setclr);
        maketheme('title',setclr);
        maketheme('settings',setclr);
        maketheme('theme',setclr);
        clrbtn1('box',setclr);
        clrbtn1('left-panel',setclr);
        clrbtn1('rulesbtn',setclr);
        clrbtn1('mode',setclr);
        maketheme('mode',setclr);
        maketheme('rules',setclr);
        clrbtn1('contributersbtn',setclr);
        maketheme('contributers',setclr);
        clrbtn1('leaderboardbtn',setclr);
        maketheme('leaderboard',setclr);
        maketheme('audio',setclr);
        clrbtn1('audiobtn',setclr);
        maketheme('audio-toggle',setclr);
        clrbtn1('right-panel',setclr);
        maketheme('info',setclr);
        maketheme('name',setclr);
        maketheme('score',setclr);
        maketheme('best',setclr);
        maketheme('time',setclr);
        maketheme('display',setclr);
        maketheme('game-controls',setclr);
        clrbtn1('up',setclr);
        clrbtn1('left',setclr);
        clrbtn1('down',setclr);
        clrbtn1('right',setclr);
       
        
        await sleep(2);
      }
      if (clr <= 10){
        theme = 'black';
      }
    })();
  } else {
    let clr = 0;
    (async () => {
      while (clr <= 255){
        clr += 10;
        theme = 'rgb('+clr+','+clr+','+clr+')';
        document.body.style.background = theme;

        let setclr = 'rgb('+(255-clr)+','+(255-clr)+','+(255-clr)+')';
        maketheme('header1',setclr);
        maketheme('header2',setclr);
        maketheme('header3',setclr);
        maketheme('title',setclr);
        maketheme('settings',setclr);
        maketheme('theme',setclr);
        clrbtn1('box',setclr);
        clrbtn1('left-panel',setclr);
        clrbtn1('rulesbtn',setclr);
        clrbtn1('mode',setclr);
        maketheme('mode',setclr);
        maketheme('rules',setclr);
        clrbtn1('contributersbtn',setclr);
        maketheme('contributers',setclr);
        clrbtn1('leaderboardbtn',setclr);
        maketheme('leaderboard',setclr);
        maketheme('audio',setclr);
        clrbtn1('audiobtn',setclr);
        maketheme('audio-toggle',setclr);
        clrbtn1('right-panel',setclr);
        maketheme('info',setclr);
        maketheme('name',setclr);
        maketheme('score',setclr);
        maketheme('best',setclr);
        maketheme('time',setclr);
        maketheme('display',setclr);
        maketheme('game-controls',setclr);
        clrbtn('up',setclr);
        clrbtn('left',setclr);
        clrbtn('down',setclr);
        clrbtn('right',setclr);
        await sleep(2);
      }
      if (clr >= 245){
        theme = 'white';
      }
    })();
  }
}

function togglesfx(){
  if (sfx){
    //eatsfx = false;
    localStorage.setItem('sfx','false');
    //localStorage.setItem('eatsfx','false');
    sfx = false;
  } else {
    localStorage.setItem('sfx','true');    
    sfx = true;
  }
}
function toggleeatsfx(){
  if (eatsfx){
    eatsfx = false;
    localStorage.setItem('eatsfx','false');
  } else {
    eatsfx = true;
    localStorage.setItem('eatsfx','true');
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
  if (closedintro){
    closedintro = false;
  } else {
    closedintro = true;
  }
}

function toggleContributors() {
  contributorsModal.classList.toggle('visible');
  contributorsModal.classList.toggle('hidden');
  toggleOverlay();
}