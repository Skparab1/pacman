// Pacman

// music stuff @advaita
var audioElement = new Audio('pacman_beat_3.mp3');
var eatsound = new Audio('pacman_eat_sound.mp3');
eatsound.volume = 0.5;
var deathsound = new Audio('pacman_death_sound.mp3');
var ghosteatspacman = new Audio('ghost_eats_pacman.mp3');
var eatghostsound = new Audio('pacman_eats_ghost.mp3');
var winsound = new Audio('pacman_gg_win_music.mp3');

// audio
audioElement.addEventListener("canplaythrough", event => {
  // playit
  audioElement.play();
  var playable;
  if (audioElement.duration > 0 && !audioElement.paused){
    playable = true;
  } else {
    playable = false;
    // notif
    if (!playable && localStorage.getItem('audionotif') != 'dontshow'){
      var notif = document.getElementById('notif');
      notif.style.display = "block";
      notif.innerHTML = `<h3 style="color:rgb(255, 255, 255);">Unable to play Audio. Check audio permissions and try again.</h3>
      <a href="https://github.com/Skparab1/snake/blob/main/fix-audio.md" target="_blank"><button class="notif-button" style="position: absolute; left: 700px; top: 5px;">How to allow audio</button></a>
      <button class="notif-button" style="position: absolute; left: 900px; top: 5px;" onclick="notif.style.display = 'none';">Dismiss</button>
      <button class="notif-button" style="position: absolute; left: 1010px; top: 5px;" onclick="notif.style.display = 'none'; localStorage.setItem('audionotif','dontshow');">Dont show again</button>`;
    }
  }
});

// audio vars
audioElement.controls = true;
audioElement.loop = true;
let volume = document.querySelector("#volume-control");
volume.addEventListener("change", function(e) {
  audioElement.volume = e.currentTarget.value/100;
})
let musictimeload = localStorage.getItem('musictime');

// audio continuer
if (musictimeload != null && parseFloat(musictimeload) < 130){
  audioElement.currentTime = parseFloat(musictimeload);
}

// theme functions
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
function settheme(clr){
  setclr = clr;  // to make ritam not complain about how long this is i mean he complains about useful comments smh 
  maketheme('header1',setclr);maketheme('header2',setclr);maketheme('header3',setclr);maketheme('title',setclr);maketheme('settings',setclr);maketheme('theme',setclr);clrbtn1('box',setclr);clrbtn1('left-panel',setclr);clrbtn1('rulesbtn',setclr);maketheme('es',setclr);maketheme('sf',setclr);clrbtn1('mode',setclr);maketheme('mode',setclr);maketheme('rules',setclr);clrbtn1('contributersbtn',setclr);maketheme('contributers',setclr);clrbtn1('leaderboardbtn',setclr);maketheme('leaderboard',setclr);maketheme('audio',setclr);clrbtn1('audiobtn',setclr);maketheme('audio-toggle',setclr);clrbtn1('right-panel',setclr);maketheme('info',setclr);maketheme('name',setclr);maketheme('score',setclr);maketheme('best',setclr);maketheme('time',setclr);maketheme('display',setclr);maketheme('game-controls',setclr);clrbtn('up',setclr);clrbtn('left',setclr);clrbtn('down',setclr);clrbtn('right',setclr);        maketheme('oth',setclr);clrbtn1('contributersbtn1',setclr);clrbtn1('contributersbtn2',setclr);clrbtn1('contributersbtn3',setclr);maketheme('cb1',setclr); maketheme('cb2',setclr);maketheme('cb3',setclr);
}

// censorer
function checkcensor(inp){
  let cr = 0;
  while (cr < censored.length){
    if (inp.toLowerCase().includes(censored[cr].toLowerCase())){
      return true;
    }
    cr += 1;
  }
  return false
}

// animate plus 
function plus10(eh){
  (async () => {
    p10 = document.getElementById('plus10');
    if (eh != null){
      p10.textContent = eh;
    } else {
      p10.textContent = '+ 10';
    }
    let mover = byte*10;
    p10.style.left = (window.innerWidth/2 - (byte*(boardSize+2)))/2 + basex + (byte*5) + 50 +'px';
    while (mover > byte*7){
      p10.style.top = mover +'px';
      mover = mover - (mover-byte*6.9)/10;
      p10.style.color = 'rgba(255,255,255,'+(((byte*6.9-mover)/(byte*3))+1)+')';
      await sleep(2);
    }
    let alpha2 = 1;
    while (alpha2 > 0){
      p10.style.color = 'rgba(255,255,255,'+alpha2+')';
      alpha2 -= 0.01;
      await sleep(2);
    }
  })();
}

// reset after life lost in og mode
function resetboard(){
  xpos = (height)/(boardSize+2)*0.5+(height)/(boardSize+2)*3+window.innerWidth/4;
  ypos = (height)/(boardSize+2)*0.5+(height)/(boardSize+2)*10.25;
  thepos = [xpos,ypos];
  thepos = nearestgp(thepos);
  g1pos = [(height)/(boardSize+2)*0.5+(height)/(boardSize+2)*7.25+window.innerWidth/4,(height)/(boardSize+2)*0.5+(height)/(boardSize+2)*10.25];
  g2pos = [(height)/(boardSize+2)*0.5+(height)/(boardSize+2)*8.25+window.innerWidth/4,(height)/(boardSize+2)*0.5+(height)/(boardSize+2)*10.25];
  g3pos = [(height)/(boardSize+2)*0.5+(height)/(boardSize+2)*9.25+window.innerWidth/4,(height)/(boardSize+2)*0.5+(height)/(boardSize+2)*10.25];
  g4pos = [(height)/(boardSize+2)*0.5+(height)/(boardSize+2)*10.25+window.innerWidth/4,(height)/(boardSize+2)*0.5+(height)/(boardSize+2)*10.25];
  fpslst = [];
  lastfps = Date.now();
  speed = basespeed;
  //counter = 0; // this causes problems
  kickedoff1 = true;
  kickedoff2 = true;
  kickedoff3 = true;
  kickedoff4 = true;
}

// reset speed in case user leaves
// earlier this was a notif but it sometimes falsely triggers
function resetspeed(){
  fpslst = [];
  lastfps = Date.now();
  speed = basespeed;
}

// vaars
const boardSize = 16; //so 20 means 20x20 and 40 would be 40x40 and you can change it to anything you want
const speedfactor = 189; //directly porportional to these many pixels per second (but not exactly)
var eyesize = 2 // squarelength/this pixels
const borderleniance = 0.5 // the game will ignore a wall hit as long as it is less than 0.5 boxes away from the border
const endcurtainspeed = 0.25 // seconds wait in between frames of each pixel expansion (for game over animation)
var lostlives = 0;
var counter = 0; // i got it finally
var keylog = 'https://skparab1.github.io/pacman/generateanim/?';

// for 3 life only
var l2counter = 0;
var l3counter = 0;

// half of these are useless so clean it up
var storeendspeed = 0;
var startspeed = 0;
var capturedspeed = false;
var randlog = '';
var url = 'https://skparab1.github.io/pacman/generatesrc?';
var difficulty = localStorage.getItem('pacmode');
if (difficulty == null){
  localStorage.setItem('pacmode','normal');
  difficulty = 'normal';
}

// mode
let mode = document.getElementById('mode');
mode.value = difficulty;

let fmode = window.location.href.includes('funny');

// these are the 3 vars that control difficulty levels
var ghspeedfactor = 0.975; // relative to the speed of pacman 
var dtimer = 6; // the time at which itl stop running away
var pushtime = 6; // time at which itl start blinking aback to reg mode

// set difficulty vars
if (difficulty == 'hard'){
  ghspeedfactor = 1; // max 
  dtimer = 2;
  pushtime = 4;
} else if (difficulty == 'normal'){
  ghspeedfactor = 0.975;
  dtimer = 4;
  pushtime = 6;
} else if (difficulty == 'easy'){
  ghspeedfactor = 0.90;
  dtimer = 6;
  pushtime = 6;
} else if (difficulty == 'very easy'){
  ghspeedfactor = 0.75;
  dtimer = 7;
  pushtime = 9;
} else if (difficulty == 'OG'){
  ghspeedfactor = 1; // max 
  dtimer = 2;
  pushtime = 4;
}

// sfx settings
var sfx = localStorage.getItem('sfx');
var eatsfx = localStorage.getItem('eatsfx');
if (sfx == null){
  sfx = true;
} else {
  if (sfx == 'true'){
    sfx = true;
  } else {
    sfx = false;
  }
}
if (eatsfx == null){
  eatsfx = true;
} else {
  if (eatsfx == 'true'){
    eatsfx = true;
  } else {
    eatsfx = false;
  }
}


// theme stuff
var lost = false;
var theme = localStorage.getItem('theme');
if (theme == null){
  theme = 'black';
}
if (theme == 'white' || theme == 'rgb(255,255,255)'){
  settheme('black'); // opp color because contrast color
}
document.body.style.background = theme;
var rulesModal1 = document.getElementById('rules-modal');
var best = localStorage.getItem("bestpac");

// more vars
var lastfps = Date.now();
var avgfps = 0;
var fpslst = [];
var won = false;
var closedintro = true;
var lastname = '';

// testing mode dont touch
testingmode = window.location.href.includes('tmode');

// we dont talk abt this
var censored = "tawt;erohw a fo nos;hctib a fo nos;tuls;rekcufretsis;ssa tihs;tihs;kcirp;ssip;aggin;rekcufrehtom;tihs ni;tihsesroh;tihs yloh;lleh;nmadsdog;nmaddog;kcuf;reggirf;rekcufrehtaf;gniffe;nmad;tnuc;parc;rekcuskcoc;kcoc;rekcuf-dlihc;tihsllub;reggub;rekcufrehtorb;skcollob;hctib;dratsab;elohssa;ssa;esra";
censored = censored.split("").reverse().join("").split(";");
var firstrender = true;
//console.log(censored);

// name stuff
var name1 = localStorage.getItem('name');
var nameinput = document.getElementById('name-input');
if (name1 == null){
  name1 = '';
  rulesModal1.classList.toggle('visible');
  rulesModal1.classList.toggle('hidden');
  overlay.classList.toggle('visible');
  overlay.classList.toggle('hidden');
} else {
  nameinput.value = name1;
}
var namedisp = document.getElementById('name');
namedisp.textContent = name1;
localStorage.setItem('name',name1);


// read all the localstorage
if (best == null){
  localStorage.setItem("bestpac",'0');
  //openintro();
  best = 0;
}

// draw line
function drawline(x,y,x1,y1,clr){
  ctx.beginPath();
  ctx.lineWidth = 4*scalefactor;
  ctx.strokeStyle = clr;
  ctx.fillStyle = clr;
  ctx.moveTo(x,y);
  ctx.lineTo(x1,y1)
  ctx.stroke();
}

// random generation functions
function getrand() {
  return Math.floor(Math.random() * 10); // 9 out of 10 cases go regualr way
}
function getrand2() {
  return Math.floor(Math.random() * 3)-1;
}
function getrand3() {
  let gr = Math.floor(Math.random() * 2);
  if (gr == 0){
    gr = -speed*ghspeedfactor;
  } else {
    gr = speed*ghspeedfactor
  }
  return gr;
}
function getranddir() {
  //alert('getting rand dir'); //stfu
  let gr2 = getrand();
  let d;
  if (gr2 >= 3){
    d = [0,getrand3()];
  } else {
    d = [getrand3(),0];
  }
  randlog = randlog+(d[0]/(speed*ghspeedfactor))+','+(d[1]/(speed*ghspeedfactor))+';';
  return d;
}
// this is useless no cap //stfu
function getrandnum(low,cap) {
  return (Math.random() * (cap-low))+low; // 9 out of 10 cases go regualr way
}

// to make the ghosts dumb in blue mode
function getoppdir(dir,pos,gh){
  //return dir;
  if (activationclr && ((!got[0] && gh == 1) || (!got[1] && gh == 2) || (!got[2] && gh == 3) || (!got[3] && gh == 4)) && (Date.now() - activationtimer)/1000 <= dtimer){ // lmfao  4 is gud or eveen 3.5 dont wanna risk being too ez technical best 6 difficulty btw
    //console.log('got opp');
    return [-dir[0],-dir[1]];
  } else {
    return dir;
  }
}

// for confetti shhhh
function drawdimond(x,y){
  ctx.beginPath();
  ctx.moveTo(x,y-12.5);
  ctx.lineTo(x+12.5,y);
  ctx.lineTo(x,y+12.5);
  ctx.lineTo(x-12.5,y);
  ctx.fill();
}


// returns boolean of whether going right is allowed or not for given pos
function getrightblock(pos){
  let ct11 = 0;
  let rejected = false;
  
  while (ct11 < rightblockghost.length && !rejected){
    if (pos[0] >= rightblockghost[ct11][0]+byte/2 && pos[0] <= rightblockghost[ct11][1]+byte/2 && pos[1] >= rightblockghost[ct11][2] && pos[1] <= rightblockghost[ct11][3]){
      rejected = true;
      return true;
    }
    ct11 += 1;
  }
  return false;
}

// returns boolean of whether going left is allowed or not for given pos
function getleftblock(pos){
  let ct11 = 0;
  let rejected = false;
  
  while (ct11 < leftblockghost.length && !rejected){
    if (pos[0] >= leftblockghost[ct11][0]-byte/2 && pos[0] <= leftblockghost[ct11][1]-byte/2 && pos[1] >= leftblockghost[ct11][2] && pos[1] <= leftblockghost[ct11][3]){
      rejected = true;
      return true;
    }
    ct11 += 1;
  }
  return false;
}

// goin up allowed or not
function getupblock(pos){
  let ct11 = 0;
  let rejected = false;
  
  while (ct11 < upblockghost.length && !rejected){
    if (pos[0] >= upblockghost[ct11][0] && pos[0] <= upblockghost[ct11][1] && pos[1] >= upblockghost[ct11][2]-byte/2 && pos[1] <= upblockghost[ct11][3]-byte/2){
      rejected = true;
      return true;
    }
    ct11 += 1;
  }
  return false;
}

// goin down allowed or not
function getdownblock(pos){
  let ct11 = 0;
  let rejected = false;
  
  while (ct11 < downblockghost.length && !rejected){
    if (pos[0] >= downblockghost[ct11][0] && pos[0] <= downblockghost[ct11][1] && pos[1] >= downblockghost[ct11][2]+byte/2 && pos[1] <= downblockghost[ct11][3]+byte/2){
      rejected = true;
      return true;
    }
    ct11 += 1;
  }
  return false;
}

// if at intersection
function atintersection(pos){
  let inter = 0;
  while (inter < intersection.length){
    if (pos[0] >= intersection[inter][0] && pos[0] <= intersection[inter][1] && pos[1] >= intersection[inter][2] && pos[1] <= intersection[inter][3]){
      return true;
    }
    inter += 1;
  }
  return false;
}

// nearest gridpos
function nearestgp(pos){
  // we expect it to be +- 0.1 off
  let nx = window.innerWidth/4 + byte/2;
  while (nx < window.innerWidth/4 + byte*(boardSize+2)){
    let ny = byte/2;
    while (ny < byte*(boardSize+2)){
      if (Math.abs(pos[0]-nx) < byte/2 && Math.abs(pos[1]-ny) < byte/2){
        return [nx,ny];
      }
      ny += byte;
    }
    nx += byte;
  }
  return [0,0];
}

// nearst gp y only
function nearestgpy(pos){
  // we expect it to be +- 0.1 off
  let nx = window.innerWidth/4 + byte/2;
  while (nx < window.innerWidth/4 + byte*(boardSize+2)){
    let ny = byte/2;
    while (ny < byte*(boardSize+2)){
      if (Math.abs(pos[0]-nx) < byte/2 && Math.abs(pos[1]-ny) < byte/2){
        return [pos[0],ny];
      }
      ny += byte;
    }
    nx += byte;
  }
  return [0,0];
}

// nearest gp x only
function nearestgpx(pos){
  // we expect it to be +- 0.1 off
  let nx = window.innerWidth/4 + byte/2;
  while (nx < window.innerWidth/4 + byte*(boardSize+2)){
    let ny = byte/2;
    while (ny < byte*(boardSize+2)){
      if (Math.abs(pos[0]-nx) < byte/2 && Math.abs(pos[1]-ny) < byte/2){
        return [nx,pos[1]];
      }
      ny += byte;
    }
    nx += byte;
  }
  return [0,0];
}

// ghost mover algoirthm
function moveghost(pos,dir,timer1,gh){
  // ghostmover function 

  // descision if at intersection and yeah dont turn 2 times at the same intersection thats a waste of processing
  if (atintersection(pos) && timer1 > 25){
    pos = nearestgp(pos); // want a gridpos for uh descision
    if (dir[0] != 0){ // going right or left
      if (thepos[1] > pos[1] && Math.abs(thepos[1]-pos[1]) > byte/4){ // not in same line but pacman is below
        if (!getdownblock(pos)){ // below if allowed
          dir = [0,speed*ghspeedfactor];
          dir = getoppdir(dir,pos,gh);
          pos = nearestgp(pos);
        }
      } else if (thepos[1] < pos[1] && Math.abs(thepos[1]-pos[1]) > byte/4){ //pac above
        if (!getupblock(pos)){ // up if allowed
          dir = [0,-speed*ghspeedfactor];
          dir = getoppdir(dir,pos,gh);
          pos = nearestgp(pos);
        }
      }
      timer1 = 0;
    } else { // going up or down
      if (thepos[0] < pos[0] && Math.abs(thepos[0]-pos[0]) > byte/4){ // not in same line but left
        if (!getleftblock(pos)){ // left if allowed
          dir = [-speed*ghspeedfactor,0];
          dir = getoppdir(dir,pos,gh);
          pos = nearestgp(pos);
        }
      } else if (thepos[0] > pos[0] && Math.abs(thepos[0]-pos[0]) > byte/4){
        if (!getrightblock(pos)){ // right if allowed
          dir = [speed*ghspeedfactor,0];
          dir = getoppdir(dir,pos,gh);
          pos = nearestgp(pos);
        }
      }
      timer1 = 0;
    }

  }
  timer1 += 1; // upgrade obv

  // if its not at an intersection // dont rlly need to do anything unless its gonna crash
  if (dir[0] > 0){ // moving right
    if (getrightblock(pos) && !atintersection(pos) && timer1 > 25){
      if (thepos[1] > pos[1]){
        dir = [0,speed*ghspeedfactor];
        dir = getoppdir(dir,pos,gh);
      } else if (thepos[1] < pos[1]){
        dir = [0,-speed*ghspeedfactor];
        dir = getoppdir(dir,pos,gh);
      }
      timer1 = 0;
    } else if (!getrightblock(pos)){
      pos = [pos[0]+dir[0],pos[1]+dir[1]];
    }
  } else if (dir[0] < 0){ // moving left
    if (getleftblock(pos) && !atintersection(pos) && timer1 > 25){
      if (thepos[1] > pos[1]){
        dir = [0,speed*ghspeedfactor];
        dir = getoppdir(dir,pos,gh);
      } else if (thepos[1] < pos[1]){
        dir = [0,-speed*ghspeedfactor];
        dir = getoppdir(dir,pos,gh);
      }
      timer1 = 0;
    } else if (!getleftblock(pos)){
      pos = [pos[0]+dir[0],pos[1]+dir[1]];
    }
  } else if (dir[1] < 0){ // moving up
    if (getupblock(pos) && !atintersection(pos) && timer1 > 25){
      if (thepos[0] > pos[0]){
        dir = [speed*ghspeedfactor,0];
        dir = getoppdir(dir,pos,gh);
      } else if (thepos[0] < pos[0]){
        dir = [-speed*ghspeedfactor,0];
        dir = getoppdir(dir,pos,gh);
      }
      timer1 = 0;
    } else if (!getupblock(pos)){
      pos = [pos[0]+dir[0],pos[1]+dir[1]];
    }
  } else if (dir[1] > 0){ // moving down
    if (getdownblock(pos) && !atintersection(pos) && timer1 > 25){
      if (thepos[0] > pos[0]){
        dir = [speed*ghspeedfactor,0];
        dir = getoppdir(dir,pos,gh);
      } else if (thepos[0] < pos[0]){
        dir = [-speed*ghspeedfactor,0];
        dir = getoppdir(dir,pos,gh);
      }
      timer1 = 0;
    } else if (!getdownblock(pos)){
      pos = [pos[0]+dir[0],pos[1]+dir[1]];
    }
  }
  // ok return finally
  return [pos,dir,timer1];
}

// this is for the pingponging back to the ghost box when eaten in blue mode
// basically there are pushzones defined by rightpush leftpush yk and it just uses that to push the ghost
function returnghost(pos,dir){
  let sn = 0;
  while (sn < rightpush.length){ // if its in rightpush zone
    if (pos[0] > rightpush[sn][0] && pos[0] < rightpush[sn][1] && pos[1] > rightpush[sn][2] && pos[1] < rightpush[sn][3]){
      dir = [speed*2,0];
      pos = nearestgpy(pos);
    }
    sn += 1;
  }
  sn = 0;
  while (sn < leftpush.length){ // if in leftpush zione
    if (pos[0] > leftpush[sn][0] && pos[0] < leftpush[sn][1] && pos[1] > leftpush[sn][2] && pos[1] < leftpush[sn][3]){
      dir = [-speed*2,0];
      pos = nearestgpy(pos);
    }
    sn += 1;
  } 
  sn = 0;
  while (sn < uppush.length){ // if in up zone
    if (pos[0] > uppush[sn][0] && pos[0] < uppush[sn][1] && pos[1] > uppush[sn][2] && pos[1] < uppush[sn][3]){
      dir = [0,-speed*2];
      pos = nearestgpx(pos);
    }
    sn += 1;
  } 
  sn = 0;
  while (sn < downpush.length){ // down zone
    if (pos[0] > downpush[sn][0] && pos[0] < downpush[sn][1] && pos[1] > downpush[sn][2] && pos[1] < downpush[sn][3]){
      dir = [0,speed*2];
      pos = nearestgpx(pos);
    }
    sn += 1;
  } 
  return [pos,dir];
}

// if its in the ghost box i actually dk what this is for u can check if u want
function inghostbox(pos){
  return (pos[0] > basex+byte*7 && pos[0] < basex+byte*11 && pos[1] > byte*10 && pos[1] < byte*12)
}

// draw the board
// this is a main function btw
function drawboard(){
  ctx.beginPath();
  let x = 0;
  let actx = window.innerWidth/4+byte;
  // clear else keeps adding
  while (x < boardSize*2-1){ // this isnt actually that useful anymore
    let y = 0;
    let acty = byte/2;
    while (y < boardSize*2-1){
      acty += (height)/(boardSize+2)*0.51;
      y += 1;
      // grid
      //ctx.strokeRect(actx,acty,(height)/(boardSize+2),(height)/(boardSize+2));

      //dots
      ctx.fillStyle = dotcolor;
  
      let ed = 0;
      let deactivated = false;
      while (ed < eraseddots.length){
        if (Math.abs(eraseddots[ed][0] - (actx+byte/2+byte/20)) < byte/4 && Math.abs(eraseddots[ed][1] - (acty+byte/2+byte/20)) < byte/4){
          deactivated = true;
        }
        ed += 1;
      }
      
      // smth abt dots i dont actually remember
      if (!deactivated){
        if ((x == 0 && y == 1) || (x == 30 && y == 1) || (x == 30 && y == 31) || (x == 0 && y == 31)){
          ctx.beginPath();
          ctx.arc(actx+byte/2+byte/40,acty+byte/2,(height)/(boardSize+2)/5,0,2*Math.PI);
          ctx.fill();
        } else {
          ctx.fillRect(actx+byte/2,acty+byte/2,(height)/(boardSize+2)/10,(height)/(boardSize+2)/10);
        }
      }
      //console.log(eraseddots.length);

      if (firstrender){
        dotspos.push([actx+byte/2+byte/20,acty+byte/2+byte/20]);
      }
      }
    actx += (height)/(boardSize+2)*0.51;
    x += 1;
  }
  firstrender = false;

  // the exit dot overlay
  ctx.fillStyle = theme;
  ctx.fillRect(window.innerWidth/4+byte*1,byte*9-4,byte*2+4,byte*2+8);
  ctx.fillRect(window.innerWidth/4+byte*15-4,byte*9-4,byte*2+8,byte*2+8);

  // def colors of board
  var linecolor;
  var limecolor;
  var yellowcolor;
  var redcolor;
  var ghostbcolor;
  if (theme == 'white' || theme == 'rgb(255,255,255)'){
    linecolor = "rgb(0, 0, 255)";
    dotcolor = "brown";
    limecolor = 'rgb(10, 215, 65)'
    yellowcolor = 'rgb(240, 240, 110)'
    redcolor = 'rgb(180, 30, 30)'
    ghostbcolor = 'rgb(0, 0, 0)'
  } else {
    linecolor = "rgb(42, 198, 250)";
    dotcolor = "orange";
    limecolor = 'rgb(0, 255, 0)'
    yellowcolor = 'rgb(255, 255, 0)'
    redcolor = 'rgb(255, 0, 0)'
    ghostbcolor = 'rgb(255, 255, 255)'
  }

  //----------------------ok all the board drawing bs is after this so yeah scroll past if u want--------
  // its messy ik
  // but at least i commented
  //console.log(theme);

  ctx.strokeStyle = linecolor;
  ctx.lineWidth = 4*scalefactor;
  let leniance = ((height)/(boardSize+2))*borderleniance;
  bounderies = [window.innerWidth/4+(height)/(boardSize+2)*1.5-leniance+10*scalefactor,(height)/(boardSize+2)*1.5-leniance+10*scalefactor,(window.innerWidth/4+height*((boardSize-1)/boardSize))-(height)/(boardSize+2)/2.5+leniance-10*scalefactor,height*(boardSize-1)/boardSize-(height)/(boardSize+2)/2+leniance-10*scalefactor];
  ctx.strokeRect(window.innerWidth/4+(height)/(boardSize+2),(height)/(boardSize+2),byte*boardSize,byte*boardSize);
  ctx.strokeRect(window.innerWidth/4+(height)/(boardSize+2)-10*scalefactor,(height)/(boardSize+2)-10*scalefactor,byte*boardSize+20*scalefactor,byte*boardSize+20*scalefactor);

  // some dot cover fillrects
  ctx.fillRect(window.innerWidth/4+byte*1,byte*11,byte*2+4,byte*1+4);
  ctx.fillRect(window.innerWidth/4+byte*14.75,byte*11,byte*2+4,byte*1+4);

  ctx.fillRect(window.innerWidth/4+(height)/(boardSize+2)-byte,byte*(boardSize/2)+byte*1+10*scalefactor,byte*3,byte*2.5);
  ctx.fillRect(window.innerWidth/4+byte*boardSize-byte,byte*(boardSize/2)+byte*1,byte*3,byte*3);

  //the enterances and exits
  drawline(window.innerWidth/4+(height)/(boardSize+2),byte*(boardSize/2)+3*byte+2,window.innerWidth/4+(height)/(boardSize+2),byte*(boardSize/2)+3*byte+2+byte,theme);
  drawline(window.innerWidth/4+(height)/(boardSize+2),byte*(boardSize/2)+3*byte+2+byte,window.innerWidth/4+(height)/(boardSize+2)+2*byte,byte*(boardSize/2)+3*byte+2+byte,linecolor);
  drawline(window.innerWidth/4+(height)/(boardSize+2)+2*byte,byte*(boardSize/2)+3*byte+2+byte,2*byte+window.innerWidth/4+(height)/(boardSize+2),byte*(boardSize/2)+3*byte,linecolor);
  drawline(window.innerWidth/4+(height)/(boardSize+2)-10*scalefactor,byte*(boardSize/2)+4*byte-10*scalefactor,2*byte+window.innerWidth/4+(height)/(boardSize+2)-10*scalefactor,byte*(boardSize/2)+4*byte-10*scalefactor,linecolor);
  drawline(window.innerWidth/4+(height)/(boardSize+2)-10*scalefactor-2,byte*(boardSize/2)+3*byte,2*byte+window.innerWidth/4+(height)/(boardSize+2),byte*(boardSize/2)+3*byte,linecolor);
  // hmm there shud be a break somewhere here idk
  drawline(window.innerWidth/4+(height)/(boardSize+2)-10*scalefactor+2,byte*(boardSize/2)+3*byte+10*scalefactor,2*byte+window.innerWidth/4+(height)/(boardSize+2)-10*scalefactor,byte*(boardSize/2)+3*byte+10*scalefactor,linecolor);
  drawline(2*byte+window.innerWidth/4+(height)/(boardSize+2)-10*scalefactor,byte*(boardSize/2)+3*byte+10*scalefactor,2*byte+window.innerWidth/4+(height)/(boardSize+2)-10*scalefactor,byte*(boardSize/2)+4*byte-10*scalefactor,linecolor);
  drawline(window.innerWidth/4+byte-10*scalefactor-1,byte*11+10*scalefactor+2,window.innerWidth/4+byte-10*scalefactor-1,byte*12-10*scalefactor-2,theme)
  drawline(window.innerWidth/4+byte-10*scalefactor+2,byte*11+10*scalefactor+2,window.innerWidth/4+byte-10*scalefactor+2,byte*12-10*scalefactor-2,theme)
  drawline(window.innerWidth/4+(height)/(boardSize+2)-10*scalefactor,byte*(boardSize/2)+byte*3+2,window.innerWidth/4+(height)/(boardSize+2)-10*scalefactor,byte*(boardSize/2)+byte*3+10*scalefactor,linecolor);
  
  drawline(window.innerWidth/4+(height)/(boardSize+2),byte*(boardSize/2)+byte,2*byte+window.innerWidth/4+(height)/(boardSize+2),byte*(boardSize/2)+byte,linecolor);
  drawline(window.innerWidth/4+(height)/(boardSize+2),byte*(boardSize/2)+2+byte,window.innerWidth/4+(height)/(boardSize+2),byte*(boardSize/2)+10*scalefactor-2+byte,theme);
  drawline(window.innerWidth/4+(height)/(boardSize+2)-10*scalefactor,byte*(boardSize/2)+10*scalefactor+byte,2*byte+window.innerWidth/4+(height)/(boardSize+2)-10*scalefactor,byte*(boardSize/2)+10*scalefactor+byte,linecolor);
  drawline(2*byte+window.innerWidth/4+(height)/(boardSize+2),byte*(boardSize/2)+byte,2*byte+window.innerWidth/4+(height)/(boardSize+2),byte*(boardSize/2)+byte*2,linecolor);
  drawline(window.innerWidth/4+(height)/(boardSize+2)-10*scalefactor,byte*(boardSize/2)-10*scalefactor+byte*2,2*byte+window.innerWidth/4+(height)/(boardSize+2)-10*scalefactor,byte*(boardSize/2)-10*scalefactor+byte*2,linecolor);
  drawline(2*byte+window.innerWidth/4+(height)/(boardSize+2)-10*scalefactor,byte*(boardSize/2)+byte+10*scalefactor,2*byte+window.innerWidth/4+(height)/(boardSize+2)-10*scalefactor,byte*(boardSize/2)+byte*2-10*scalefactor,linecolor);
  drawline(window.innerWidth/4+(height)/(boardSize+2)-10*scalefactor,byte*(boardSize/2)+byte*2,2*byte+window.innerWidth/4+(height)/(boardSize+2),byte*(boardSize/2)+byte*2,linecolor);
  drawline(window.innerWidth/4+(height)/(boardSize+2)-10*scalefactor,byte*(boardSize/2)+byte*2,window.innerWidth/4+(height)/(boardSize+2)-10*scalefactor,byte*(boardSize/2)+byte*2-10*scalefactor,linecolor);


  drawline(window.innerWidth/4+byte*boardSize+byte+10*scalefactor,byte*(boardSize/2)+3*byte,window.innerWidth/4+byte*boardSize-byte,byte*(boardSize/2)+3*byte,linecolor);
  drawline(window.innerWidth/4+byte*boardSize+byte,byte*(boardSize/2)+byte,window.innerWidth/4+byte*boardSize-byte,byte*(boardSize/2)+byte,linecolor);
  drawline(window.innerWidth/4+byte*boardSize+byte+scalefactor*10,byte*(boardSize/2)+byte+scalefactor*10,window.innerWidth/4+byte*boardSize-byte+scalefactor*10,byte*(boardSize/2)+byte+scalefactor*10,linecolor);
  drawline(window.innerWidth/4+byte*boardSize+byte+scalefactor*10,byte*(boardSize/2)+byte*2,window.innerWidth/4+byte*boardSize-byte,byte*(boardSize/2)+byte*2,linecolor);
  drawline(window.innerWidth/4+byte*boardSize-byte,byte*(boardSize/2)+byte+scalefactor,window.innerWidth/4+byte*boardSize-byte,byte*(boardSize/2)+byte*2,linecolor);
  drawline(window.innerWidth/4+byte*boardSize+byte+scalefactor*10-1,byte*(boardSize/2)+byte+scalefactor*10,window.innerWidth/4+byte*boardSize+byte+scalefactor*10-1,byte*(boardSize/2)+byte,linecolor);
  drawline(window.innerWidth/4+byte*boardSize+byte+scalefactor*10,byte*(boardSize/2)+byte*2-scalefactor*10,window.innerWidth/4+byte*boardSize-byte+scalefactor*10,byte*(boardSize/2)+byte*2-scalefactor*10,linecolor);
  drawline(window.innerWidth/4+byte*boardSize-byte+scalefactor*10,byte*(boardSize/2)+byte*2-scalefactor*10,window.innerWidth/4+byte*boardSize-byte+scalefactor*10,byte*(boardSize/2)+byte+scalefactor*10,linecolor);
  drawline(window.innerWidth/4+byte*boardSize+byte+scalefactor*10,byte*(boardSize/2)+byte*2-scalefactor*10,window.innerWidth/4+byte*boardSize+byte+scalefactor*10,byte*(boardSize/2)+byte*2,linecolor);
  
  // all the fillrects to cover the uneeded dots
  // repettitive ik
  // i suppose i couldve put them in an arr and then iterated
  ctx.fillStyle = theme;
  ctx.fillRect(window.innerWidth/4+byte*2+2-4,byte*2+2-4,byte+8,byte*6+8); 
  ctx.fillRect(window.innerWidth/4+byte*4+2-4,byte*2+2-4,byte*3+8,byte+8);
  ctx.fillRect(window.innerWidth/4+byte*4+2-4,byte*4+2-4,byte*3+8,byte+8);
  ctx.fillRect(window.innerWidth/4+byte*4+2-4,byte*4+2-4,byte*1+8,byte*3+8);
  ctx.fillRect(window.innerWidth/4+byte*7-4,byte*9-4,byte*4+8,byte*3+8);
  ctx.fillRect(window.innerWidth/4+byte*8-4,byte*1-4,byte*1+8,byte*5+8);
  ctx.fillRect(window.innerWidth/4+byte*6-4,byte*6-4,byte*1+8,byte*2+8);
  ctx.fillRect(window.innerWidth/4+byte*7-4,byte*7-4,byte*2+8,byte*1+8);
  ctx.fillRect(window.innerWidth/4+byte*4-4,byte*8-4,byte*1+8,byte*4+8);
  ctx.fillRect(window.innerWidth/4+byte*5-4,byte*9-4,byte*1+8,byte*3+8);
  ctx.fillRect(window.innerWidth/4+byte*12,byte*9-4,byte*2+8,byte*3+8);
  ctx.fillRect(window.innerWidth/4+byte*10-4,byte*2-4,byte*2+8,byte*1+8);
  ctx.fillRect(window.innerWidth/4+byte*14-4,byte*2-4,byte*2+8,byte*1+8);
  ctx.fillRect(window.innerWidth/4+byte*10-4,byte*2-4,byte*1+8,byte*6+8);
  ctx.fillRect(window.innerWidth/4+byte*15-4,byte*2-4,byte*1+8,byte*6+8);
  ctx.fillRect(window.innerWidth/4+byte*10-4,byte*7-4,byte*6+8,byte*1+8);
  ctx.fillRect(window.innerWidth/4+byte*12-4,byte*4-4,byte*2+8,byte*2+8);
  ctx.fillRect(window.innerWidth/4+byte*2-4,byte*13-4,byte*1+8,byte*1+8);
  ctx.fillRect(window.innerWidth/4+byte*2-4,byte*15-4,byte*1+8,byte*1+8);
  ctx.fillRect(window.innerWidth/4+byte*3-4,byte*15-4,byte*1+8,byte*1+8);
  ctx.fillRect(window.innerWidth/4+byte*4-4,byte*13-4,byte*3+8,byte*1+8);
  ctx.fillRect(window.innerWidth/4+byte*5-4,byte*14-4,byte*1+8,byte*2+8);
  ctx.fillRect(window.innerWidth/4+byte*8-4,byte*13-4,byte*1+8,byte*2+8);
  ctx.fillRect(window.innerWidth/4+byte*7-4,byte*15-4,byte*3+8,byte*1+8);
  ctx.fillRect(window.innerWidth/4+byte*10-4,byte*13-4,byte*3+8,byte*1+8);
  ctx.fillRect(window.innerWidth/4+byte*11-4,byte*14-4,byte*1+8,byte*2+8);
  ctx.fillRect(window.innerWidth/4+byte*14-4,byte*13-4,byte*1+8,byte*2+8);
  ctx.fillRect(window.innerWidth/4+byte*13-4,byte*15-4,byte*3+8,byte*1+8);
  ctx.fillRect(window.innerWidth/4+byte*12-4,byte*1.75-4,byte*2+8,byte*0.5+8);
  ctx.fillRect(window.innerWidth/4+byte*12-4,byte*2.75-4,byte*2+8,byte*0.5+8);
  ctx.fillRect(window.innerWidth/4+byte*8-4,byte*9-4,byte*2+8,byte*1+8);

  // middle dot in o enterance
  //ctx.fillRect(window.innerWidth/4+byte*12.75,byte*2.25,byte*0.5+4,byte*0.5+4);

  ctx.strokeStyle = linecolor;
  ctx.beginPath();
  // block 1
  ctx.strokeStyle = redcolor;
  ctx.strokeRect(window.innerWidth/4+byte*2,byte*2,byte,byte*6); // -10*scalefactor to make it fit but then it doesnt align
  // block 2
  ctx.strokeStyle = limecolor;
  ctx.strokeRect(window.innerWidth/4+byte*4,byte*2,byte*3,byte);

  // weird shape
  drawline(window.innerWidth/4+byte*4,byte*4,window.innerWidth/4+byte*7,byte*4,yellowcolor);
  drawline(window.innerWidth/4+byte*4,byte*4,window.innerWidth/4+byte*4,byte*7,yellowcolor);
  drawline(window.innerWidth/4+byte*5,byte*5,window.innerWidth/4+byte*7,byte*5,yellowcolor);
  drawline(window.innerWidth/4+byte*5,byte*5,window.innerWidth/4+byte*5,byte*7,yellowcolor);
  drawline(window.innerWidth/4+byte*7,byte*4,window.innerWidth/4+byte*7,byte*5,yellowcolor);
  drawline(window.innerWidth/4+byte*4,byte*7,window.innerWidth/4+byte*5,byte*7,yellowcolor);
  ctx.fillStyle = theme;

  // ghost box
  ctx.strokeStyle = ghostbcolor;

  ctx.strokeRect(window.innerWidth/4+byte*7,byte*10,byte*4,byte*2);
  ctx.strokeRect(window.innerWidth/4+byte*7,byte*9,byte*1,byte*1);
  ctx.strokeRect(window.innerWidth/4+byte*10,byte*9,byte*1,byte*1);
  
  drawline(window.innerWidth/4+byte*7+2,byte*10-2,window.innerWidth/4+byte*11-2,byte*10-2,theme);
  drawline(window.innerWidth/4+byte*7+2,byte*10+1,window.innerWidth/4+byte*11-2,byte*10+1,theme);
  drawline(window.innerWidth/4+byte*8,byte*10-2,window.innerWidth/4+byte*10,byte*10-2,dotcolor);

  // box 4
  ctx.strokeStyle = linecolor;
  ctx.fillStyle = theme;
  ctx.strokeRect(window.innerWidth/4+byte*8,byte*1,byte,byte*5);
  drawline(window.innerWidth/4+byte*8,byte-2,window.innerWidth/4+byte*9,byte-2,theme);
  drawline(window.innerWidth/4+byte*8,byte+1,window.innerWidth/4+byte*9,byte+1,theme);

  // another weird shape
  drawline(window.innerWidth/4+byte*6,byte*6,window.innerWidth/4+byte*6,byte*8,redcolor);
  drawline(window.innerWidth/4+byte*6,byte*8,window.innerWidth/4+byte*9,byte*8,redcolor);
  drawline(window.innerWidth/4+byte*7,byte*7,window.innerWidth/4+byte*9,byte*7,redcolor);
  drawline(window.innerWidth/4+byte*6,byte*6,window.innerWidth/4+byte*7,byte*6,redcolor);
  drawline(window.innerWidth/4+byte*9,byte*8,window.innerWidth/4+byte*9,byte*7,redcolor);
  drawline(window.innerWidth/4+byte*7,byte*6,window.innerWidth/4+byte*7,byte*7,redcolor);

  // big o shape
  ctx.strokeStyle = limecolor;
  ctx.strokeRect(window.innerWidth/4+byte*10,byte*2,byte*6,byte*6);
  drawline(window.innerWidth/4+byte*12,byte*2-1,window.innerWidth/4+byte*14,byte*2-1,theme);
  drawline(window.innerWidth/4+byte*12,byte*2+2,window.innerWidth/4+byte*14,byte*2+2,theme);
  ctx.strokeStyle = limecolor;
  ctx.strokeRect(window.innerWidth/4+byte*11,byte*3,byte*4,byte*4);
  drawline(window.innerWidth/4+byte*12,byte*3,window.innerWidth/4+byte*14,byte*3,theme);
  ctx.strokeStyle = limecolor;
  drawline(window.innerWidth/4+byte*12,byte*2,window.innerWidth/4+byte*12,byte*3)
  drawline(window.innerWidth/4+byte*14,byte*2,window.innerWidth/4+byte*14,byte*3)
  ctx.strokeRect(window.innerWidth/4+byte*12,byte*4,byte*2,byte*2);

  //block 5 with a block on side
  ctx.strokeStyle = yellowcolor;
  ctx.strokeRect(window.innerWidth/4+byte*4,byte*9,byte*2,byte*3);
  ctx.strokeRect(window.innerWidth/4+byte*4,byte*8,byte*1,byte*1);
  drawline(window.innerWidth/4+byte*4+2,byte*9-1,window.innerWidth/4+byte*5-2,byte*9-1,theme);
  drawline(window.innerWidth/4+byte*4+2,byte*9+2,window.innerWidth/4+byte*5-2,byte*9+2,theme);
  
  // block 6 removed to push the ghost box up
  ctx.strokeStyle = linecolor;
  //ctx.strokeRect(window.innerWidth/4+byte*7,byte*9,byte*7,byte*1);

  // block 7
  ctx.strokeStyle = linecolor;
  ctx.strokeRect(window.innerWidth/4+byte*15,byte*11,byte*2,byte*1);
  ctx.strokeRect(window.innerWidth/4+byte*16,byte*13,byte*1,byte*1);
  //ctx.fillStyle = theme;
  ctx.fillRect(window.innerWidth/4+byte*16+2,byte*13+2,byte*1+2,byte*1-4);
  drawline(window.innerWidth/4+byte*17+1,byte*11+2,window.innerWidth/4+byte*17+1,byte*12-2,theme);
  drawline(window.innerWidth/4+byte*17-1,byte*11+2,window.innerWidth/4+byte*17-2,byte*12-2,theme);
  drawline(window.innerWidth/4+byte*17-1,byte*14,window.innerWidth/4+byte*17-1,byte*14+8,linecolor);
  drawline(window.innerWidth/4+byte*boardSize+byte+scalefactor*10,byte*(boardSize/2)+byte*4-scalefactor*10,window.innerWidth/4+byte*boardSize-byte+scalefactor*10,byte*(boardSize/2)+byte*4-scalefactor*10,linecolor);
  drawline(window.innerWidth/4+byte*boardSize+byte+scalefactor*10,byte*(boardSize/2)+byte*3+scalefactor*10,window.innerWidth/4+byte*boardSize-byte+scalefactor*10,byte*(boardSize/2)+byte*3+scalefactor*10,linecolor);
  drawline(window.innerWidth/4+byte*boardSize-byte+scalefactor*10,byte*(boardSize/2)+byte*4-scalefactor*10,window.innerWidth/4+byte*boardSize-byte+scalefactor*10,byte*(boardSize/2)+byte*3+scalefactor*10,linecolor);
  drawline(window.innerWidth/4+byte*boardSize+byte+scalefactor*10-1,byte*(boardSize/2)+byte*4-scalefactor*10,window.innerWidth/4+byte*boardSize+byte+scalefactor*10-1,byte*(boardSize/2)+byte*4,linecolor);
  drawline(window.innerWidth/4+byte*boardSize+byte+scalefactor*10-1,byte*(boardSize/2)+byte*3,window.innerWidth/4+byte*boardSize+byte+scalefactor*10-1,byte*(boardSize/2)+byte*3+10*scalefactor,linecolor);

  // t shape thing
  ctx.strokeStyle = limecolor;
  ctx.strokeRect(window.innerWidth/4+byte*13,byte*15,byte*3,byte*1);
  ctx.strokeRect(window.innerWidth/4+byte*14,byte*13,byte*1,byte*2);
  drawline(window.innerWidth/4+byte*14,byte*15+1,window.innerWidth/4+byte*15,byte*15+1,theme);
  drawline(window.innerWidth/4+byte*14,byte*15-1,window.innerWidth/4+byte*15,byte*15-1,theme);

  // 2nd t shape
  ctx.strokeStyle = yellowcolor;
  ctx.strokeRect(window.innerWidth/4+byte*10,byte*13,byte*3,byte*1);
  ctx.strokeRect(window.innerWidth/4+byte*11,byte*14,byte*1,byte*2);
  drawline(window.innerWidth/4+byte*11,byte*14+1,window.innerWidth/4+byte*12,byte*14+1,theme);
  drawline(window.innerWidth/4+byte*11,byte*14-1,window.innerWidth/4+byte*12,byte*14-1,theme);

  // 3rd t shape thing
  ctx.strokeStyle = redcolor;
  ctx.strokeRect(window.innerWidth/4+byte*7,byte*15,byte*3,byte*1);
  ctx.strokeRect(window.innerWidth/4+byte*8,byte*13,byte*1,byte*2);
  drawline(window.innerWidth/4+byte*8,byte*15+1,window.innerWidth/4+byte*9,byte*15+1,theme);
  drawline(window.innerWidth/4+byte*8,byte*15-1,window.innerWidth/4+byte*9,byte*15-1,theme);

  // block 8
  ctx.strokeStyle = redcolor;
  ctx.strokeRect(window.innerWidth/4+byte*12,byte*9,byte*2,byte*3);

  // 4th t shape
  ctx.strokeStyle = linecolor;
  ctx.strokeRect(window.innerWidth/4+byte*5,byte*14,byte*1,byte*2);
  ctx.strokeRect(window.innerWidth/4+byte*4,byte*13,byte*3,byte*1);
  drawline(window.innerWidth/4+byte*6,byte*14-1,window.innerWidth/4+byte*5,byte*14-1,theme);
  drawline(window.innerWidth/4+byte*6,byte*14+1,window.innerWidth/4+byte*5,byte*14+1,theme);

  // l shaped thing
  ctx.strokeStyle = limecolor;
  ctx.strokeRect(window.innerWidth/4+byte*2,byte*15,byte*2,byte*1);
  //drawline(window.innerWidth/4+byte*3-2,byte*15-1,window.innerWidth/4+byte*2+2,byte*15-1,theme);
  //drawline(window.innerWidth/4+byte*3-2,byte*15+1,window.innerWidth/4+byte*2+2,byte*15+1,theme);

  // block 9
  ctx.strokeStyle = limecolor;
  ctx.strokeRect(window.innerWidth/4+byte*2,byte*13,byte*1,byte*1);

  // top stuff
  ctx.fillStyle = 'gray';
  ctx.font = byte*0.66+"px finlandica";
  ctx.fillText('Difficulty: '+difficulty, basex+byte, 0.50*byte, byte*10);
  ctx.font = byte*0.85+"px finlandica";
  ctx.fillStyle = 'gray';
  let ll = 0;
  let txl = '';
  while (ll < (3-lostlives) && difficulty == 'OG'){
    txl += '♥';
    ll += 1;
  }

  ctx.fillText(txl, basex+byte*15.75, 0.55*byte, byte*10);

  // a bunch of test cases i think ill delete
  // if u need them then git history
  // ok i just saved 30 lines
}

// put in in terms of bytes, ill add a converter
// assign blocks
var rightblockpre = [[3,4,8,12],[1,2,2,8],[3,4,2,3],[10,11,9,12],[3,4,4,7],[1,2,11,12],[1,2,13,14],[1,2,15,16],[3,4,13,14],[4,5,14,16],[7,8,1,6],[5,6,6,8],[6,7,9,12],[7,8,13,15],[6,7,15,16],[9,10,2,8],[11,12,4,6],[14,15,3,7],[13,14,2,3],[16,17,1,9],[11,12,9,12],[14,15,9,10],[14,15,11,12],[15,16,13,14],[16,17,12,13],[9,10,13,14],[10,11,14,16],[13,14,13,15],[12,13,15,16],[16,17,14,17],[8.5,9.5,9,10]];
var leftblockpre = [[1,2,1,9],[3,4,2,8],[7,8,9,12],[1,2,12,17],[3,4,11,12],[3,4,9,10],[3,4,13,14],[4,5,15,16],[7,8,2,3],[7,8,4,5],[5,6,5,7],[5,6,8,9],[6,7,9,12],[7,8,13,14],[6,7,14,16],[7,8,6,7],[9,10,7,8],[9,10,1,6],[9,10,13,15],[10,11,15,16],[12,13,2,3],[11,12,3,7],[14,15,4,6],[16,17,2,8],[8.5,9.5,9,10],[14,15,9,12],[13,14,13,14],[12,13,14,16],[15,16,13,15],[16,17,15,16],[11.5,12,9,12]];
var upblockpre = [[1,8,1,2],[1,2,12,13],[16,17,12,13],[-20,2,10,11],[7,8,10,11],[10,11,10,11],[15,50,10,11],[2,3,8,9],[2,3,12,13],[2,4,16,17],[4,7,3,4],[4,5,7,8],[5,7,5,6],[4,6,12,13],[4,5,14,15],[5,6,16,17],[6,7,14,15],[7,8,8,9],[7,8,9,10],[10,11,9,10],[7,10,16,17],[7,11,12,13],[6,9,8,9],[8,9,6,7],[9,17,1,2],[11,12,3,4],[14,15,3,4],[12,14,6,7],[10,16,8,9],[12,14,12,13],[10,11,14,15],[11,12,16,17],[12,13,14,15],[13,16,16,17],[15,16,12,13],[16,17,14,15],[1,3,10,11],[15,17,10,11],[1,3,9,10],[15,17,9,10],[2,3,14,15]];
var downblockpre = [[3,4,14,15],[2,3,1,2],[1,3,8,9],[-20,2,10,11],[1,2,10,11],[15,50,10,11],[2,3,9,10],[2,3,12,13],[1,17,16,17],[4,7,1,2],[4,7,3,4],[6,7,5,6],[7,9,6,7],[4,5,7,8],[5,6,8,9],[4,7,12,13],[10,11,8,9],[7,8,8,9],[10,11,8,9],[7,8,14,15],[8,9,12,13],[9,10,14,15],[10,13,12,13],[13,14,14,15],[14,15,12,13],[15,16,14,15],[12,14,8,9],[15,17,10,11],[10,12,1,2],[14,16,1,2],[12,14,3,4],[11,15,6,7],[15,17,8,10],[7,11,8,9],[2,3,10,11],[16,17,12,13],[2,3,14,15],[7,11,10,11]];
// intersections
var intersectionpre = [[3,4,1,2],[12,13,1,2],[13,14,1,2],[3,4,3,4],[7,8,3,4],[7,8,5,6],[9,10,6,7],[3,4,7,8],[3,4,8,9],[5,6,7,8],[6,7,8,9],[9,10,8,9],[11,12,8,9],[14,15,8,9],[12,13,3,4],[13,14,3,4],[3,4,10,11],[3,4,12,13],[6,7,12,13],[11,12,12,13],[14,15,12,13],[7,8,12,13],[9,10,12,13],[13,14,12,13],[15,16,12,13],[1,2,14,15],[3,4,14,15],[4,5,16,17],[6,7,16,17],[10,11,16,17],[12,13,16,17],[1,2,1,2],[1,2,8,9],[7,8,1,2],[9,10,1,2],[16,17,1,2],[11,12,3,4],[11,12,6,7],[14,15,3,4],[14,15,6,7],[5,6,5,6],[7,8,6,7],[5,6,8,9],[16,17,8,9],[1,2,12,13],[1,2,16,17],[4,5,14,15],[6,7,14,15],[7,8,14,15],[9,10,14,15],[10,11,14,15],[12,13,14,15],[13,14,14,15],[15,16,14,15],[16,17,14,15],[16,17,16,17],[16,17,12,13]];
// pushers
var rightpushpre = [[1,7,1,2],[3,7,3,4],[1,3,8,9],[3,5,7,8],[5,7,5,6],[7,9,6,7],[5,8,8,9],[13,14,6,7],[11,12,3,4],[-2,3,10,11],[1,3,12,13],[4,6,12,13],[9,11,12,13],[2,3,14,15],[6,7,14,15],[12,13,14,15],[2,4,16,17],[5,6,16,17],[9,10,16,17]];
var leftpushpre = [[10,17,8,9],[10,17,1,2],[12,13,6,7],[14,15,3,4],[15,18,10,11],[7,9,12,13],[12,14,12,13],[15,17,12,13],[4,5,14,15],[10,11,14,15],[16,17,14,15],[7,9,16,17],[11,12,16,17],[13,16,16,17]];
var uppushpre = [[11,12,4,7],[14,15,4,7],[12,14,2,4],[3,4,8,15],[6,7,9,13],[11,12,9,13],[14,15,9,13],[1,2,13,17],[4,5,15,17],[6,7,15,17],[7,8,13,15],[9,10,13,15],[10,11,15,17],[12,13,15,17],[13,14,13,15],[15,16,13,15],[16,17,15,17],[1,2,16,17]];
var downpushpre = [[1,2,2,8],[3,4,2,7],[7,8,1,6],[5,6,6,8],[8,10,8,9],[9,10,1,8],[16,17,2,8]];
// these arrs will be filled after conversion
var rightblock = [];
var leftblock = [];
var upblock = [];
var downblock = [];
var rightpush = [];
var leftpush = [];
var uppush = [];
var downpush = [];
var intersection = [];
var playeatsound = 0;
// central unit
byte = 2*((window.innerHeight-100)/(16*2.2));

// hmm couldnt this have been in drawboard
// but whatever
var dotcolor;
if (theme == 'black'){
  dotcolor = "orange";
} else {
  dotcolor = "brown";
}

// all the converters
// convert all the block coordinates into pixels
let ctr = 0;
while (ctr < rightblockpre.length){
  let subjarr = [];
  subjarr.push(rightblockpre[ctr][0]*byte+window.innerWidth/4);
  subjarr.push(rightblockpre[ctr][1]*byte+window.innerWidth/4);
  subjarr.push(rightblockpre[ctr][2]*byte);
  subjarr.push(rightblockpre[ctr][3]*byte);
  rightblock.push(subjarr);
  ctr += 1;
}
ctr = 0;
while (ctr < leftblockpre.length){
  let subjarr = [];
  subjarr.push(leftblockpre[ctr][0]*byte+window.innerWidth/4);
  subjarr.push(leftblockpre[ctr][1]*byte+window.innerWidth/4);
  subjarr.push(leftblockpre[ctr][2]*byte);
  subjarr.push(leftblockpre[ctr][3]*byte);
  leftblock.push(subjarr);
  ctr += 1;
}
ctr = 0;
while (ctr < upblockpre.length){
  let subjarr = [];
  subjarr.push(upblockpre[ctr][0]*byte+window.innerWidth/4);
  subjarr.push(upblockpre[ctr][1]*byte+window.innerWidth/4);
  subjarr.push(upblockpre[ctr][2]*byte);
  subjarr.push(upblockpre[ctr][3]*byte);
  upblock.push(subjarr);
  ctr += 1;
}
ctr = 0;
while (ctr < downblockpre.length){
  let subjarr = [];
  subjarr.push(downblockpre[ctr][0]*byte+window.innerWidth/4);
  subjarr.push(downblockpre[ctr][1]*byte+window.innerWidth/4);
  subjarr.push(downblockpre[ctr][2]*byte);
  subjarr.push(downblockpre[ctr][3]*byte);
  downblock.push(subjarr);
  ctr += 1;
}

// intersection
ctr = 0;
while (ctr < intersectionpre.length){
  let subjarr = [];
  subjarr.push((intersectionpre[ctr][0]+0.38)*byte+window.innerWidth/4);
  subjarr.push((intersectionpre[ctr][1]-0.38)*byte+window.innerWidth/4);
  subjarr.push((intersectionpre[ctr][2]+0.38)*byte);
  subjarr.push((intersectionpre[ctr][3]-0.38)*byte);
  intersection.push(subjarr);
  ctr += 1;
}

// pushers
// wait i cudve just made all of these functions lmao
ctr = 0;
while (ctr < rightpushpre.length){
  let subjarr = [];
  subjarr.push(rightpushpre[ctr][0]*byte+window.innerWidth/4);
  subjarr.push(rightpushpre[ctr][1]*byte+window.innerWidth/4);
  subjarr.push(rightpushpre[ctr][2]*byte);
  subjarr.push(rightpushpre[ctr][3]*byte);
  rightpush.push(subjarr);
  ctr += 1;
}

ctr = 0;
while (ctr < leftpushpre.length){
  let subjarr = [];
  subjarr.push(leftpushpre[ctr][0]*byte+window.innerWidth/4);
  subjarr.push(leftpushpre[ctr][1]*byte+window.innerWidth/4);
  subjarr.push(leftpushpre[ctr][2]*byte);
  subjarr.push(leftpushpre[ctr][3]*byte);
  leftpush.push(subjarr);
  ctr += 1;
}

ctr = 0;
while (ctr < uppushpre.length){
  let subjarr = [];
  subjarr.push(uppushpre[ctr][0]*byte+window.innerWidth/4);
  subjarr.push(uppushpre[ctr][1]*byte+window.innerWidth/4);
  subjarr.push(uppushpre[ctr][2]*byte);
  subjarr.push(uppushpre[ctr][3]*byte);
  uppush.push(subjarr);
  ctr += 1;
}

ctr = 0;
while (ctr < downpushpre.length){
  let subjarr = [];
  subjarr.push(downpushpre[ctr][0]*byte+window.innerWidth/4);
  subjarr.push(downpushpre[ctr][1]*byte+window.innerWidth/4);
  subjarr.push(downpushpre[ctr][2]*byte);
  subjarr.push(downpushpre[ctr][3]*byte);
  downpush.push(subjarr);
  ctr += 1;
}

// these arnt that useful but yeah originally they were modified
var rightblockghost = rightblock;
var leftblockghost = leftblock;
var upblockghost = upblock;
var downblockghost = downblock;

// for screenshot end
function openurl(){
  window.open(url);
}

// for replay end
function openlog(){
  let tsend = keylog+'&r'+randlog+'&r'+difficulty+'&r'+(speed/byte)+'&r'+ghspeedfactor+'&r'+(storeendspeed/byte)+'&r'+(startspeed/byte); // speed is in grid blocks/frame
  console.log('sed',speed,ghspeedfactor);
  window.open(tsend);
}

// drawing pac man
function drawpac(x,y,rad,dir,openangle){
  openangle = openangle*2;
  ctx.beginPath();
  //ctx.lineWidth = "10px"; NOT PX JUST INT
  ctx.fillStyle = "rgb(225,175,0)";
  ctx.strokeStyle = "rgb(225,175,0)";
  // depending on direction
  if (dir == "l"){
    ctx.arc(x, y, rad, 1.25*Math.PI-(0.125*Math.PI*openangle),(Math.PI*0.25)-(0.125*Math.PI*openangle), false);
    ctx.fill(); 
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, y-1, rad, 1.75*Math.PI+(0.125*Math.PI*openangle),(Math.PI*0.75)+(0.125*Math.PI*openangle), false);
  }
  if (dir == "r"){
    ctx.arc(x, y, rad, 0.75*Math.PI+(0.125*Math.PI*openangle),(Math.PI*1.75)+(0.125*Math.PI*openangle), false);
    ctx.fill(); 
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, y-1, rad, 0.25*Math.PI-(0.125*Math.PI*openangle),(Math.PI*1.25)-(0.125*Math.PI*openangle), false);
  }
  if (dir == "u"){
    ctx.arc(x, y, rad, 0.25*Math.PI+(0.125*Math.PI*openangle),(Math.PI*1.25)+(0.125*Math.PI*openangle), false);
    ctx.fill(); 
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, y, rad, 1.75*Math.PI-(0.125*Math.PI*openangle),(Math.PI*0.75)-(0.125*Math.PI*openangle), false);
  }
  if (dir == "d"){
    ctx.arc(x, y, rad, 0.75*Math.PI-(0.125*Math.PI*openangle),(Math.PI*1.75)-(0.125*Math.PI*openangle), false);
    ctx.fill(); 
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, y, rad, 1.25*Math.PI+(0.125*Math.PI*openangle),(Math.PI*0.25)+(0.125*Math.PI*openangle), false);
  }
  //ctx.arc(x, y, rad, 0.75 * Math.PI, 1 * Math.PI); //-((height)/(boardSize+2)/2)
  ctx.stroke(); 
  ctx.fill();
  ctx.beginPath();
  ctx.fillStyle = theme;
}

//draw a ghost @manav @abhinav
function drawghost(x,y,rad,clr,dir){
  //ctx.arc(x, y, rad, 0.75 * Math.PI, 1 * Math.PI); //-((height)/(boardSize+2)/2)
  ctx.beginPath();
  ctx.fillStyle = clr;
  ctx.strokeStyle = clr;
  ctx.arc(x,y,byte/2*0.75,0,2*Math.PI);
  ctx.fill();
  ctx.beginPath();
  ctx.fillStyle = 'white';
  ctx.arc(x-(byte/6),y-(byte/7),byte/6,0,2*Math.PI);
  ctx.arc(x+(byte/6),y-(byte/7),byte/6,0,2*Math.PI);
  ctx.fill();
  ctx.beginPath();
  // eyes i think
  if (dir[0] > 0){
    ctx.arc(x-(byte/6)+byte/12,y-(byte/7),byte/12,0,2*Math.PI);
    ctx.arc(x+(byte/6)+byte/12,y-(byte/7),byte/12,0,2*Math.PI);
  } else if (dir[0] < 0){
    ctx.arc(x-(byte/6)-byte/12,y-(byte/7),byte/12,0,2*Math.PI);
    ctx.arc(x+(byte/6)-byte/12,y-(byte/7),byte/12,0,2*Math.PI);
  } else if (dir[1] > 0){
    ctx.arc(x-(byte/6),y-(byte/7)+byte/12,byte/12,0,2*Math.PI);
    ctx.arc(x+(byte/6),y-(byte/7)+byte/12,byte/12,0,2*Math.PI);
  } else if (dir[1] < 0){
    ctx.arc(x-(byte/6),y-(byte/7)-byte/12,byte/12,0,2*Math.PI);
    ctx.arc(x+(byte/6),y-(byte/7)-byte/12,byte/12,0,2*Math.PI);
  } else {
    ctx.arc(x-(byte/6),y-(byte/7),byte/12,0,2*Math.PI);
    ctx.arc(x+(byte/6),y-(byte/7),byte/12,0,2*Math.PI);
  }
  // triangles at bottom
  ctx.fillStyle = 'blue';
  ctx.fill();
  ctx.beginPath();
  ctx.fillStyle = clr;
  ctx.strokeStyle = clr;
  ctx.fillRect(x-byte/2*0.75,y,byte*0.75,byte/2*0.75);
  ctx.beginPath();
  ctx.fillStyle = theme;
  ctx.moveTo(x-byte/2*0.75, y+byte/2*0.75);
  ctx.lineTo(x-byte/2*0.75+rad*2/7, y+byte/2*0.75-rad*2/7);
  ctx.lineTo(x-byte/2*0.75+2*rad*2/7, y+byte/2*0.75);
  ctx.lineTo(x-byte/2*0.75, y+byte/2*0.75);
  ctx.fill();
  ctx.moveTo(x-byte/2*0.75+2.5*rad*2/7, y+byte/2*0.75);
  ctx.lineTo(x-byte/2*0.75+3.5*rad*2/7, y+byte/2*0.75-rad*2/7);
  //ctx.lineTo(x-byte/2*0.75+4*rad*2/7, y+byte/2*0.75-rad*2/7);
  ctx.lineTo(x-byte/2*0.75+4.5*rad*2/7, y+byte/2*0.75);
  ctx.lineTo(x-byte/2*0.75+2.5*rad*2/7, y+byte/2*0.75);
  ctx.fill();
  ctx.moveTo(x-byte/2*0.75+5*rad*2/7, y+byte/2*0.75);
  ctx.lineTo(x-byte/2*0.75+6*rad*2/7, y+byte/2*0.75-rad*2/7);
  ctx.lineTo(x-byte/2*0.75+7*rad*2/7, y+byte/2*0.75);
  ctx.fill();

  // bridge covers
  ctx.fillStyle = theme;
  ctx.fillRect(window.innerWidth/4-byte,byte*10,2*byte-15*scalefactor,byte);
  ctx.fillRect(window.innerWidth/4+byte*17+15*scalefactor,byte*10,2*byte-15*scalefactor,byte);
}

// dont think i asked
const canvas = document.querySelector('.myCanvas');
const ctx = canvas.getContext('2d');
const width = canvas.width = window.innerWidth/2+window.innerWidth/4; 
const height = canvas.height = window.innerHeight-100;
var bounderies = [0,0,0,0];
var score = 0;
var dir = 'l';

//canvas outline
//ctx.strokeStyle = 'rgb(125,125,125)';
ctx.fillStyle = theme;
ctx.fillRect(0, 0, width, height);
//console.log('printeddd');

// vars
var speed = ((height)/(boardSize+2))/(200-speedfactor)*0.4; // 1/4 square/frame?
if (fmode){
  speed = ((height)/(boardSize+2))/(200-speedfactor)*0.65;
}
var basespeed = speed;
let xpos = (height)/(boardSize+2)*0.5+(height)/(boardSize+2)*3+window.innerWidth/4;
let ypos = (height)/(boardSize+2)*0.5+(height)/(boardSize+2)*10.25;
let startingpos = [xpos,ypos];
var thepos = [xpos,ypos];
thepos = nearestgp(thepos);
var g1pos = [(height)/(boardSize+2)*0.5+(height)/(boardSize+2)*7.25+window.innerWidth/4,(height)/(boardSize+2)*0.5+(height)/(boardSize+2)*10.25];
var g2pos = [(height)/(boardSize+2)*0.5+(height)/(boardSize+2)*8.25+window.innerWidth/4,(height)/(boardSize+2)*0.5+(height)/(boardSize+2)*10.25];
var g3pos = [(height)/(boardSize+2)*0.5+(height)/(boardSize+2)*9.25+window.innerWidth/4,(height)/(boardSize+2)*0.5+(height)/(boardSize+2)*10.25];
var g4pos = [(height)/(boardSize+2)*0.5+(height)/(boardSize+2)*10.25+window.innerWidth/4,(height)/(boardSize+2)*0.5+(height)/(boardSize+2)*10.25];
var lastg1pos = [0,0];
var lastg2pos = [0,0];
var lastg3pos = [0,0];
var lastg4pos = [0,0];
var kickedoff1 = true;
var kickedoff2 = true;
var kickedoff3 = true;
var kickedoff4 = true;
var g1dir = [0,0];
var g2dir = [0,0];
var g3dir = [0,0];
var g4dir = [0,0];
var g1timer = 0;
var g2timer = 0;
var g3timer = 0;
var g4timer = 0;
var dotspos = [];
var eraseddots = [];
var thelastpos = [xpos,ypos];
var activated = false;
var activationclr = false;
var activationtimer = 0;
var active = [false,false,false,false];
var activatedarr = [false,false,false,false];
var got = [false,false,false,false];
var returng1 = false;
var returng2 = false;
var returng3 = false;
var returng4 = false;
var greturned = [false,false,false,false];
var returntimerg1 = 100;
var returntimerg2 = 100;
var returntimerg3 = 100;
var returntimerg4 = 100;
var xd = 0;
var yd = 0
var waiter = '';
var waiter2 = '';
var waiter3 = '';
var startwaiter = false;
var applepos = [Math.floor(Math.random()*(boardSize-2))*(height)/(boardSize+2)+window.innerWidth/4+(height)/(boardSize+2)*1.5+(height)/(boardSize+2), Math.floor(Math.random()*(boardSize-2))*(height)/(boardSize+2)+(height)/(boardSize+2)+((height)/(boardSize+2)*1.5)];
var scalefactor = window.innerWidth/2048;
var initxpos = xpos;
var initypos = ypos;
var breaker = false;
var snakeclr2 = "";
var eatwaiter = 0;
var lastapple = [0,0];
var elapsedtime = 0;
var door = 0.01;
var byte = 2*((height)/(boardSize*2.2));
var basex = window.innerWidth/4;
var start = Date.now();
var intropc = 0;
var firsttime;
var starting = true;
var oa = 1;
var od = 'c';

// initial drawboard
drawboard();

// actual start var no bs
var started = false;

// smth to do with the first time doesnt see like the dialogue though but i do change the var
let reader = localStorage.getItem('firsttime');
if (reader == null){
  localStorage.setItem('firsttime','false');
  firsttime = true;
  closedintro = false;
}

// for animations
const sleep = ms => new Promise(res => setTimeout(res, ms));

// large loop
(async () => {
  while (true){ // add some living condition later nah its fine i have a breaker
    ctx.clearRect(0, 0, canvas.width, canvas.height); //clear it obv

    //console.log(counter);
    //console.log(waiter);
    // pac man moving algorithm
    // upgrader updater
    // if in range then updatepos
    if (true && startwaiter){ // within bounderies
      if (xd > 0){ // moving right
        let ct = 0;
        let rejected1 = false;
        while (ct < rightblock.length && !rejected1){
          if (thepos[0] >= rightblock[ct][0]+byte/2 && thepos[0] <= rightblock[ct][1] && thepos[1] >= rightblock[ct][2] && thepos[1] <= rightblock[ct][3]){
            rejected1 = true;
          }
          ct += 1;
        }
        if (!rejected1){
          thepos = [thepos[0]+xd,thepos[1]+yd];
        }
      } else if (xd < 0){ // moving left
        let ct = 0;
        let rejected1 = false;
        while (ct < leftblock.length && !rejected1){
          if (thepos[0] >= leftblock[ct][0]-byte/2 && thepos[0] <= leftblock[ct][1]-byte/2 && thepos[1] >= leftblock[ct][2] && thepos[1] <= leftblock[ct][3]){
            rejected1 = true;
          }
          ct += 1;
        }
        if (!rejected1){
          thepos = [thepos[0]+xd,thepos[1]+yd];
        }
      } else if (yd < 0){ // moving up
        let ct = 0;
        let rejected1 = false;
        while (ct < upblock.length && !rejected1){
          if (thepos[0] >= upblock[ct][0] && thepos[0] <= upblock[ct][1] && thepos[1] >= upblock[ct][2]-byte/2 && thepos[1] <= upblock[ct][3]-byte/2){
            rejected1 = true;
            console.log('rejected up');
          }
          ct += 1;
        }
        if (!rejected1){
          thepos = [thepos[0]+xd,thepos[1]+yd];
        }
      } else { // moving down
        let ct = 0;
        let rejected1 = false;
        while (ct < downblock.length && !rejected1){
          if (thepos[0] >= downblock[ct][0] && thepos[0] <= downblock[ct][1] && thepos[1] >= downblock[ct][2]+byte/2 && thepos[1] <= downblock[ct][3]+byte/2){
            //console.log('rejected down',ct);
            rejected1 = true;
          }
          ct += 1;
        }
        if (!rejected1){
          thepos = [thepos[0]+xd,thepos[1]+yd];
        }
      }

      // bridge
      if (thepos[0] > window.innerWidth/4-byte && thepos[0] < window.innerWidth/4 && thepos[1] > byte*10 && thepos[1] < byte*11 && xd < 0){
        thepos = [window.innerWidth/4 + 18.5*byte,10.5*byte];
      }
      if (thepos[0] > window.innerWidth/4+byte*18 && thepos[0] < window.innerWidth/4+byte*19 && thepos[1] > byte*10 && thepos[1] < byte*11 && xd > 0){
        thepos = [window.innerWidth/4 - 0.5*byte,10.5*byte];
      }

      // ghost bridge ik i shud have made a funciton
      if (g1pos[0] > window.innerWidth/4-byte && g1pos[0] < window.innerWidth/4 && g1pos[1] > byte*10 && g1pos[1] < byte*11 && g1dir[0] < 0){
        g1pos = [window.innerWidth/4 + 18.5*byte,10.5*byte];
      }
      if (g1pos[0] > window.innerWidth/4+byte*18 && g1pos[0] < window.innerWidth/4+byte*19 && g1pos[1] > byte*10 && g1pos[1] < byte*11 && g1dir[0] > 0){
        g1pos = [window.innerWidth/4 - 0.5*byte,10.5*byte];
      }

      if (g2pos[0] > window.innerWidth/4-byte && g2pos[0] < window.innerWidth/4 && g2pos[1] > byte*10 && g2pos[1] < byte*11 && g2dir[0] < 0){
        g2pos = [window.innerWidth/4 + 18.5*byte,10.5*byte];
      }
      if (g2pos[0] > window.innerWidth/4+byte*18 && g2pos[0] < window.innerWidth/4+byte*19 && g2pos[1] > byte*10 && g2pos[1] < byte*11 && g2dir[0] > 0){
        g2pos = [window.innerWidth/4 - 0.5*byte,10.5*byte];
      }

      if (g3pos[0] > window.innerWidth/4-byte && g3pos[0] < window.innerWidth/4 && g3pos[1] > byte*10 && g3pos[1] < byte*11 && g3dir[0] < 0){
        g3pos = [window.innerWidth/4 + 18.5*byte,10.5*byte];
      }
      if (g3pos[0] > window.innerWidth/4+byte*18 && g3pos[0] < window.innerWidth/4+byte*19 && g3pos[1] > byte*10 && g3pos[1] < byte*11 && g3dir[0] > 0){
        g3pos = [window.innerWidth/4 - 0.5*byte,10.5*byte];
      }

      if (g4pos[0] > window.innerWidth/4-byte && g4pos[0] < window.innerWidth/4 && g4pos[1] > byte*10 && g4pos[1] < byte*11 && g4dir[0] < 0){
        g4pos = [window.innerWidth/4 + 18.5*byte,10.5*byte];
      }
      if (g4pos[0] > window.innerWidth/4+byte*18 && g4pos[0] < window.innerWidth/4+byte*19 && g4pos[1] > byte*10 && g4pos[1] < byte*11 && g4dir[0] > 0){
        g4pos = [window.innerWidth/4 - 0.5*byte,10.5*byte];
      }

    }
 
    //activation expire   difficulty
    if ((Date.now() - activationtimer)/1000 >= pushtime && (Date.now() - activationtimer)/1000 < pushtime+0.25){
      activationclr = false;
    } else if ((Date.now() - activationtimer)/1000 >= pushtime+0.25 && (Date.now() - activationtimer)/1000 < pushtime+0.5){
      activationclr = true;
    } else if ((Date.now() - activationtimer)/1000 >= pushtime+0.5 && (Date.now() - activationtimer)/1000 < pushtime+0.75){
      activationclr = false;
    } else if ((Date.now() - activationtimer)/1000 >= pushtime+0.75 && (Date.now() - activationtimer)/1000 < pushtime+1){
      activationclr = true;
    } else if ((Date.now() - activationtimer)/1000 >= pushtime+1 && (Date.now() - activationtimer)/1000 < pushtime+1.25){
      activationclr = false;
    } else if ((Date.now() - activationtimer)/1000 >= pushtime+1.25 && (Date.now() - activationtimer)/1000 < pushtime+1.5){
      activationclr = true;
    } else if ((Date.now() - activationtimer)/1000 >= pushtime+1.5){
      activationclr = false;
      activated = false;
    }

    // check if on dot
    let dotchecker = 0;
    while (dotchecker < dotspos.length){
      // got it

      //got dots
      if (Math.abs(thepos[0]-dotspos[dotchecker][0]) < byte/8 && Math.abs(thepos[1]-dotspos[dotchecker][1]) < byte/8){ // basically it went over the thing but not on the bridge
        score += 1;
        if (counter >= 1){
          var z1 = document.getElementById('score');
          z1.textContent = 'Score: '+score;
        }

        // sfx
        playeatsound += 1;
        if (playeatsound == 2){
          playeatsound = 0;
          if (eatsfx){
            eatsound.pause();
            eatsound.currentTime = 0.0;
            eatsound.play();
          }
        }

        // notif
        let z2 = document.getElementById('display');
        let randnotif = Math.floor(Math.random()*6);
        if (randnotif == 0){
          randnotif = "Good job";
        } else if (randnotif == 1){
          randnotif = "Great job";
        } else if (randnotif == 2){
          randnotif = "Nice job";
        } else if (randnotif == 3){
          randnotif = "Nice";
        } else if (randnotif == 4){
          randnotif = "Cringe";
        } else if (randnotif == 5){
          randnotif = "GG";
        }
        
        z2.textContent = randnotif;

        //console.log('score',score);
        eraseddots.push(dotspos[dotchecker]);

        // if you run over the activation dots got dots crackers
        if (thepos[0] > window.innerWidth/4+byte && thepos[0] < window.innerWidth/4+byte*2 && thepos[1] > byte && thepos[1] < byte*2 && !active[0]){
          activated = true;
          activationclr = true;
          activationtimer = Date.now();
          active[0] = true;
          activationarr = [true,true,true,true];
          greturned = [false,false,false,false];
          got = [false, false, false, false];
        } else if (thepos[0] > window.innerWidth/4+byte*16 && thepos[0] < window.innerWidth/4+byte*17 && thepos[1] > byte && thepos[1] < byte*2 && !active[1]){
          activated = true;
          activationclr = true;
          activationtimer = Date.now();
          active[1] = true;
          activationarr = [true,true,true,true];
          greturned = [false,false,false,false];
          got = [false, false, false, false];
        } else if (thepos[0] > window.innerWidth/4+byte*16 && thepos[0] < window.innerWidth/4+byte*17 && thepos[1] > byte*16 && thepos[1] < byte*17 && !active[2]){
          activated = true;
          activationclr = true;
          activationtimer = Date.now();
          active[2] = true;
          activationarr = [true,true,true,true];
          greturned = [false,false,false,false];
          got = [false, false, false, false];
        } else if (thepos[0] > window.innerWidth/4+byte && thepos[0] < window.innerWidth/4+byte*2 && thepos[1] > byte*16 && thepos[1] < byte*17 && !active[3]){
          activated = true;
          activationclr = true;
          activationtimer = Date.now();
          active[3] = true;
          activationarr = [true,true,true,true];
          greturned = [false,false,false,false];
          got = [false, false, false, false];
        }
        // deactivate that dot pos
        dotspos[dotchecker] = [0,0]; // is it that easy lmfao
      }
      dotchecker += 1;
    }

    let musictime = audioElement.currentTime;
    //console.log('music',musictime);
    localStorage.setItem('musictime',String(musictime));

    // store theme in storage
    localStorage.setItem('theme',theme);

    // whys it stuck at 3,4,3,4 fixer cheap fix
    if (g1pos[0] > basex+byte*3 && g1pos[0] < basex+byte*4 && g1pos[1] > byte*3 && g1pos[1] < byte*4 && returng1){
      g1dir = [0,speed*ghspeedfactor];
      g1pos[1] += byte/2;
    }
    if (g2pos[0] > basex+byte*3 && g2pos[0] < basex+byte*4 && g2pos[1] > byte*3 && g2pos[1] < byte*4 && returng2){
      g2dir = [0,speed*ghspeedfactor];
      g2pos[1] += byte/2;
    }
    if (g3pos[0] > basex+byte*3 && g3pos[0] < basex+byte*4 && g3pos[1] > byte*3 && g3pos[1] < byte*4 && returng3){
      g3dir = [0,speed*ghspeedfactor];
      g3pos[1] += byte/2;
    }
    if (g4pos[0] > basex+byte*3 && g4pos[0] < basex+byte*4 && g4pos[1] > byte*3 && g4pos[1] < byte*4 && returng4){
      g4dir = [0,speed*ghspeedfactor];
      g4pos[1] += byte/2;
    }

    //another cheap fix
    if (thepos[0] > basex+16*byte+byte*3/7 && thepos[0] < basex+17*byte && thepos[1] > 8*byte && thepos[1] < 9*byte && waiter == 'up'){
      //console.log('called af');
      thepos[1] = thepos[1]-byte/100;
      dir = [0, -speed];
    }

    // set won if won
    if (eraseddots.length == 323){
      won = true;
      elapsedtime = (Date.now() - start)/1000;
      break;
    }

    //console.log('county',counter,startwaiter);

    if (counter < 10000 && startwaiter){  // sort of unessacary for pac man ig
      // check fps
      let renderellapse = (Date.now() - lastfps);
      if (renderellapse < 0.5){
        renderellapse = 6.5;
      }

      //console.log(renderellapse);

      fpslst.push(renderellapse);
      //avgfps = (avgfps+renderellapse)/2;
      let sum = fpslst.reduce((a, b) => a + b, 0);
      let avgfps = (sum / fpslst.length) || 0;
      //console.log('avg'+fpslst);
      lastfps = Date.now();

      // if the person left it used to work but whaaat stfu this feature is bs ngl ig but better than it goin haywire
      if (renderellapse > 5*avgfps && startwaiter){
        //alert('you left!');
        //break;
        resetspeed();
      }
      // just reset all the speeds and stuff ok yeah done
  
      // actually fps is not actual fps but delay between frames

      //console.log('acutal fps '+1/avgfps);

      // so basically adjust speed based on deviation from 6.5 ever 100 frames
      //avgfps = time between frames
      // so basically fps = 6.5 milisec between frames
      // lps = loops per sec
      let lps = 1000/avgfps;

      let deviation = 153/lps; // more loops per sec, lesser 
      //console.log('delay in between frames is'+avgfps);
      //console.log('deviation from 153 lps is '+deviation);
      //bascially deviation is higher if delay is higher

      // adjustment
      let newspeed = basespeed*((deviation-1)*0.9+1);
      storeendspeed = newspeed;

      console.log(capturedspeed,startwaiter);
      //wait im big brain
      // fantastic i got it
      if (startwaiter && !capturedspeed && elapsedtime != 0){
        startspeed = speed;
        //console.log('startspeed',startspeed);
        capturedspeed = true;
      }

      //console.log('stored',storeendspeed,speed,startspeed,counter, ((height)/(boardSize+2))/(200-speedfactor)*0.4);
      
      // actual speed at start
      if (newspeed > speed){
        speed = speed*1.01;
      } else if (newspeed < speed){
        speed = speed*0.99; //bruh stupid
      }
    }

    // we do need timer
    if (counter >= 1 && startwaiter){
      if (starting){
            start = Date.now();
            starting = false;
      }
      elapsedtime = (Date.now() - start)/1000;
      document.getElementById('time').innerHTML = 'Time: '+ elapsedtime +" sec";

    }

    // reset counter
    if (!startwaiter){
      counter = 1;
    }

    // resize html
    if (counter >= 1){
      //console.log(best);
      btn = document.getElementById('best');
      btn.textContent = "Best: "+best;

      cvs = document.getElementById('canvas-container');
      let openspace = window.innerWidth/2;
      openspace = (openspace - (byte*(boardSize+2)))/2;
      cvs.style.left = openspace + 'px';
      cvs.style.top = byte*0.5 + 'px'
    }


    // draw stuff
    drawboard();

    drawpac(thepos[0],thepos[1],(height)/(boardSize*2.2)*0.75,dir,oa);

    if (activationclr && !got[0]){
      drawghost(g1pos[0],g1pos[1],(height)/(boardSize*2.2)*0.75,'blue',g1dir);
    } else {
      drawghost(g1pos[0],g1pos[1],(height)/(boardSize*2.2)*0.75,'pink',g1dir);
    }
    if (activationclr && !got[1]){
      drawghost(g2pos[0],g2pos[1],(height)/(boardSize*2.2)*0.75,'blue',g2dir);
    } else {
      drawghost(g2pos[0],g2pos[1],(height)/(boardSize*2.2)*0.75,'red',g2dir);
    }
    if (activationclr && !got[2]){
      drawghost(g3pos[0],g3pos[1],(height)/(boardSize*2.2)*0.75,'blue',g3dir);
    } else {
      drawghost(g3pos[0],g3pos[1],(height)/(boardSize*2.2)*0.75,'orange',g3dir);
    }
    if (activationclr && !got[3]){
      drawghost(g4pos[0],g4pos[1],(height)/(boardSize*2.2)*0.75,'blue',g4dir);
    } else {
      drawghost(g4pos[0],g4pos[1],(height)/(boardSize*2.2)*0.75,'teal',g4dir);
    }

    // stopper
    if (counter >= 525){
      // adssf();
    }

    //if ghosts in the ghost box after its been eaten then reset vars and push it out
    if (inghostbox(g1pos) && !kickedoff1){
      activatedarr[0] = false;
      g1dir = [0,-speed*ghspeedfactor];
      got[0] = true;
      returng1 = false;
      greturned[0] = true;
    }
    if (inghostbox(g2pos) && !kickedoff2){
      activatedarr[1] = false;
      g2dir = [0,-speed*ghspeedfactor];
      got[1] = true;
      returng2 = false;
      greturned[1] = true;
    }
    if (inghostbox(g3pos) && !kickedoff3){
      activatedarr[2] = false;
      g3dir = [0,-speed*ghspeedfactor];
      got[2] = true;
      returng3 = false;
      greturned[2] = true;
    }
    if (inghostbox(g4pos) && !kickedoff4){
      activatedarr[3] = false;
      g4dir = [0,-speed*ghspeedfactor];
      got[3] = true;
      returng4 = false;
      greturned[3] = true;
    }

    // ghost mover for gh1
    if (!returng1 && !activatedarr[0]){
      let result = moveghost(g1pos,g1dir,g1timer,1);
      g1pos = result[0];
      g1dir = result[1];
      g1timer = result[2];
    } else {
      let result = returnghost(g1pos,g1dir);
      g1pos = result[0];
      g1dir = result[1];
      g1pos = [g1pos[0]+g1dir[0],g1pos[1]+g1dir[1]];
    }

    // ghostmover for ghost 2
    if (!returng2 && !activatedarr[1]){
      result = moveghost(g2pos,g2dir,g2timer,2);
      g2pos = result[0];
      g2dir = result[1];
      g2timer = result[2];
    } else {
      result = returnghost(g2pos,g2dir);
      g2pos = result[0];
      g2dir = result[1];
      g2pos = [g2pos[0]+g2dir[0],g2pos[1]+g2dir[1]];
    }

    // move ghost 3
    if (!returng3 && !activatedarr[2]){
      result = moveghost(g3pos,g3dir,g3timer,3);
      g3pos = result[0];
      g3dir = result[1];
      g3timer = result[2];
    } else {
      result = returnghost(g3pos,g3dir);
      g3pos = result[0];
      g3dir = result[1];
      g3pos = [g3pos[0]+g3dir[0],g3pos[1]+g3dir[1]];
    }

    // move ghost 4
    if (!returng4 && !activatedarr[3]){
      result = moveghost(g4pos,g4dir,g4timer,4);
      g4pos = result[0];
      g4dir = result[1];
      g4timer = result[2];
    } else {
      result = returnghost(g4pos,g4dir);
      g4pos = result[0];
      g4dir = result[1];
      g4pos = [g4pos[0]+g4dir[0],g4pos[1]+g4dir[1]];
    }

    // if pacman is stuck in one pos for some time then kick it off in a random dir
    if (lastg1pos == g1pos && !kickedoff1){
      g1dir = getranddir();
    }
    if (lastg2pos == g2pos && !kickedoff2){
      g2dir = getranddir();
    }
    if (lastg3pos == g3pos && !kickedoff3){
      g3dir = getranddir();
    }
    if (lastg4pos == g4pos && !kickedoff4){
      g4dir = getranddir();
    }

    // update last poses
    lastg1pos = g1pos;
    lastg2pos = g2pos;
    lastg3pos = g3pos;
    lastg4pos = g4pos;

    // ghost timer for kicking off
    if (counter > 100 && !testingmode){
      if (g1pos[0] < window.innerWidth/4+byte*9 && kickedoff1){
        g1dir = [speed*ghspeedfactor,0];
        // this doesnt gdo much rn but it cud be nessacary if that bug surfaces again
        if (lostlives == 1){
          g1pos = [g1pos[0]+g1dir[0]*0.05,g1pos[1]+g1dir[1]*0.05]; // extra pusher, but dampened
        }
      } else if (g1pos[1] >= byte*8.5 && kickedoff1){
        g1dir = [0,-speed*ghspeedfactor];
      } else if (kickedoff1){
        if (thepos[0] < basex+9*byte){
          g1dir = [-speed*ghspeedfactor,0];
        } else {
          g1dir = [speed*ghspeedfactor,0];
        }
        kickedoff1 = false;
      }
    }
    if (counter > 500 && !testingmode){
      if (g2pos[1] >= byte*8.5 && kickedoff2){
        g2dir = [0,-speed*ghspeedfactor];
      } else if (kickedoff2){
        if (thepos[0] < basex+9*byte){
          g2dir = [-speed*ghspeedfactor,0];
        } else {
          g2dir = [speed*ghspeedfactor,0];
        }
        kickedoff2 = false;
      }
    }
    if (counter > 900 && !testingmode){
      if (g3pos[1] >= byte*8.5 && kickedoff3){
        g3dir = [0,-speed*ghspeedfactor];
      } else if (kickedoff3){
        if (thepos[0] < basex+9*byte){
          g3dir = [-speed*ghspeedfactor,0];
        } else {
          g3dir = [speed*ghspeedfactor,0];
        }
        kickedoff3 = false;
      }
    }
    if (counter > 1300 && !testingmode){
      if (g4pos[0] > window.innerWidth/4+byte*9 && kickedoff4){
        g4dir = [-speed*ghspeedfactor,0];
      } else if (g4pos[1] >= byte*8.5 && kickedoff4){
        g4dir = [0,-speed*ghspeedfactor];
      } else if (kickedoff4){
        if (thepos[0] < basex+9*byte){
          g4dir = [-speed*ghspeedfactor,0];
        } else {
          g4dir = [speed*ghspeedfactor,0];
        }
        kickedoff4 = false;
      }
    }

    // update whatever this is
    returntimerg1 += 1;
    returntimerg2 += 1;
    returntimerg3 += 1;
    returntimerg4 += 1;

    // lose if ghost overlap
    // lost
    if (Math.abs(thepos[0]-g1pos[0]) < byte/6 && Math.abs(thepos[1]-g1pos[1]) < byte/8){
      if (((!activated || (activated && got[0])) && !greturned[0] && returntimerg1 >= 100) || greturned[0]){ // figure this out got it letsgooo
        if (difficulty == 'OG' && lostlives < 2){
          plus10('-1 Life');
          lostlives += 1;
          drawboard();
          await sleep(1000);
          resetboard();
        } else {
          breaker = true;
          lost = true;
          break;
        }
      } else {
        returntimerg1 = 0;
        returng1 = true;
        got[0] = true;
        if (sfx){
          eatghostsound.currentTime = 0.0;
          eatghostsound.play();
        }
        plus10();
        score += 10;
        z1.textContent = 'Score: '+score;
      }
    }
    if (Math.abs(thepos[0]-g2pos[0]) < byte/6 && Math.abs(thepos[1]-g2pos[1]) < byte/8){
      if (((!activated || (activated && got[1])) && !greturned[1] && returntimerg2 >= 100) || greturned[1]){
        if (difficulty == 'OG' && lostlives < 2){
          plus10('-1 Life');
          lostlives += 1;
          drawboard();
          await sleep(1000);
          resetboard();
        } else {
          breaker = true;
          lost = true;
          break;
        }
      } else {
        returntimerg2 = 0;
        returng2 = true;
        got[1] = true;
        if (sfx){
          eatghostsound.currentTime = 0.0;
          eatghostsound.play();
        }
        plus10();
        score += 10;
        z1.textContent = 'Score: '+score;
      }
    }
    if (Math.abs(thepos[0]-g3pos[0]) < byte/6 && Math.abs(thepos[1]-g3pos[1]) < byte/8){
      if (((!activated || (activated && got[2])) && !greturned[2] && returntimerg3 >= 100) || greturned[2]){
        if (difficulty == 'OG' && lostlives < 2){
          plus10('-1 Life');
          lostlives += 1;
          drawboard();
          await sleep(1000);
          resetboard();
        } else {
          breaker = true;
          lost = true;
          break;
        }
      } else {
        returntimerg3 = 0;
        returng3 = true;
        got[2] = true;
        if (sfx){
          eatghostsound.currentTime = 0.0;
          eatghostsound.play();
        }
        plus10();
        score += 10;
        z1.textContent = 'Score: '+score;
      }
    }
    if (Math.abs(thepos[0]-g4pos[0]) < byte/6 && Math.abs(thepos[1]-g4pos[1]) < byte/8){
      if (((!activated || (activated && got[3])) && !greturned[3] && returntimerg4 >= 100) || greturned[3]){
        if (difficulty == 'OG' && lostlives < 2){
          plus10('-1 Life');
          lostlives += 1;
          drawboard();
          await sleep(1000);
          resetboard();
        } else {
          breaker = true;
          lost = true;
          break;
        }
      } else {
        returntimerg4 = 0;
        returng4 = true;
        got[3] = true;
        if (sfx){
          eatghostsound.currentTime = 0.0;
          eatghostsound.play();
        }
        plus10();
        score += 10;
        z1.textContent = 'Score: '+score;
      }
    }

    // name storer
    if (lastname != nameinput.value){
      name1 = nameinput.value;
      if (checkcensor(name1)){ // true means bad
        name1 = 'Censored';
        nameinput.value = 'Censored';
      }
      namedisp.textContent = name1;
      localStorage.setItem('name',name1);
    }
    lastname = name1;

    // pacman mouth mover
    // idk why i named them oa and od
    // oa is the opening angle a decimal 0 to 1 of the percentage of opening
    // od is the direction its currently going in o = opening c = closing

    // stop pac man mouth opening and closing if its not moving
    if (thepos == thelastpos){
      if (started && oa >= 0.25){
        oa -= 0.04;
      }
    } else {
      if (od == 'c' && started){
        oa -= 0.04;
      } else if (started){
        oa += 0.04;
      }
    }
    // change mouth direction lmao
    if (oa <= 0 && thepos != thelastpos){
      od = 'o';
    }
    if (oa >= 1){
      od = 'c';
    }
   
    // end updaters
    thelastpos = thepos;
    xpos += xd;
    ypos += yd;
    if (startwaiter){
      counter += 1;
      if (lostlives == 1){ // on life 2
        l2counter += 1;
      } else if (lostlives == 2){ // on life 3
        l3counter += 1;
      }
    }
    await sleep(2);
    //console.log('drew at '+xpos+' '+ypos);

    eatwaiter -= 1;

    // turns the pacman based on waiter
    // turner
    let ct3 = window.innerWidth/4;
    //console.log(ypos,thepos);
    while (ct3 < (thepos[0]+byte/2) + (height)/(boardSize+2)){
      if (Math.abs(ct3-(thepos[0]+byte/2)) < 5){
        if (waiter == 'up'){
          let ct11 = 0;
          let rejected = false;
          
          while (ct11 < upblock.length && !rejected){
            //console.log('rb'+upblock[ct11]);
            if (thepos[0] >= upblock[ct11][0] && thepos[0] <= upblock[ct11][1] && thepos[1] >= upblock[ct11][2] && thepos[1] <= upblock[ct11][3]){
              // nopt allowed
              console.log('rejected up based on waiter');
              rejected = true;
            } else {
              //console.log('broke1');
            }
            ct11 += 1;
          }
          if (!rejected){
            thepos = [ct3-byte/2,thepos[1]];
            xd = 0;
            yd = -speed;
            dir = 'u';
            if (!(thepos[0] > basex+16*byte && thepos[0] < basex+17*byte && thepos[1] > 8*byte && thepos[1] < 9*byte)){
              waiter = '';
            }
          }
        } else if (waiter == 'down'){
          let ct11 = 0;
          let rejected = false;
          
          while (ct11 < downblock.length && !rejected){
            //console.log('rb'+downblock[ct11]);
            if (thepos[0] >= downblock[ct11][0] && thepos[0] <= downblock[ct11][1] && thepos[1] >= downblock[ct11][2] && thepos[1] <= downblock[ct11][3]){
              // nopt allowed
              //console.log('rejected',ct11);
              rejected = true;
            } else {
              //console.log('broke1');
            }
            ct11 += 1;
          }
          if (!rejected){
            thepos = [ct3-byte/2,thepos[1]];
            xd = 0;
            yd = speed;
            dir = 'd';
            waiter = '';
          }
        }
        //console.log('broke2');
        waiter2 = '';
        waiter3 = '';
      }
      ct3 += (height)/(boardSize+2)*1.025;
    }

    ct3 = ((height)/(boardSize+2))/2;
    while (ct3 < (thepos[1]) + (height)/(boardSize+2)){
      if (Math.abs(ct3-(thepos[1])) < 5){
        if (waiter == 'right'){
          let ct11 = 0;
          let rejected = false;
          
          while (ct11 < rightblock.length && !rejected){
            //console.log('rb'+rightblock[ct11]);
            if (thepos[0] >= rightblock[ct11][0] && thepos[0] <= rightblock[ct11][1] && thepos[1] >= rightblock[ct11][2] && thepos[1] <= rightblock[ct11][3]){
              // nopt allowed
              //console.log('rejected',ct11);
              rejected = true;
            } else {
              //console.log('broke1');
            }
            ct11 += 1;
          }
          if (!rejected){
            thepos = [thepos[0],ct3];
            xd = speed;
            yd = 0;
            dir = 'r';
            waiter = '';
          }

        } else if (waiter == 'left'){
          let ct11 = 0;
          let rejected = false;
          
          while (ct11 < leftblock.length && !rejected){
            //console.log('rb'+leftblock[ct11]);
            if (thepos[0] >= leftblock[ct11][0] && thepos[0] <= leftblock[ct11][1] && thepos[1] >= leftblock[ct11][2] && thepos[1] <= leftblock[ct11][3]){
              // nopt allowed
              //console.log('rejected',ct11);
              rejected = true;
            } else {
              //console.log('broke1');
            }
            ct11 += 1;
          }
          if (!rejected){
            thepos = [thepos[0],ct3];
            xd = -speed;
            yd = 0;
            dir = 'l';
            waiter = '';
          }
        }
        waiter2 = '';
        waiter3 = '';
      }
      ct3 += (height)/(boardSize+2)*1.02;
    }
    //   ct1 += (height)/(boardSize+2);

    // idk if this is used anymore but yeah
    // acutally yes it it but it might not be needed
    if (breaker){
      break;
    }
  }

  // now lost or won

  // auto feedback popup
  // btw fbpls can also be used for play number
  let fbpls = localStorage.getItem('fbpls2');
  if (fbpls == '4' && closedintro){
    togglefeedback();
  }
  if (fbpls == null){
    localStorage.setItem('fbpls2','1');
    fbpls = '1';
  } else {
    localStorage.setItem('fbpls2',String(parseInt(fbpls)+1));
  }

  // turn off main music
  audioElement.pause();


  //console.log('did whole thing');
  let z3 = document.getElementById('display');

  // upgrade score
  if (won){
    score += 100;
    var z1 = document.getElementById('score');
    z1.textContent = 'Score: '+score;
    //reset music continuer
    localStorage.setItem('musictime','0');
  }

  // reformat difficulty for db
  if (difficulty == 'Hard'){
    difficulty = 'hard';
  } else if (difficulty == 'Normal'){
    difficulty = 'normal';
  } else if (difficulty == 'Easy'){
    difficulty = 'easy';
  } else if (difficulty == 'Very easy'){
    difficulty = 'veryeasy';
  } else if (difficulty == 'Original 3 life'){
    difficulty = 'og3life';
  }

  // all db stuff goes in here
  if (!fmode && !testingmode){
    (async () => {
      const resp = await fetch(`https://wfcdaj.deta.dev/insert?username=${lastname}&score=${score}&time=${elapsedtime}&difficulty=${difficulty}`, {method: "POST", mode:"cors"}).then(resp => resp.text()).then(text =>{
        if (text != "yeet") {
          console.log("INSERT FAILED");
        }
      });
    })();
  }
    
  //won = true; hehe
  // lost lose or won

  // generate screenshot link
  // what we need
  // 1. pac coords x y dir
  // 2. ghost coords x y dirs
  // 3. dots gotten (either raw arr or comma sep)
  url += String((thepos[0]-basex)/byte).substring(0, 4);  // basically in grid code now
  url += ',';
  url += String((thepos[1])/byte).substring(0, 4); 
  url += ',';
  url += dir;
  url += '&n=';
  url += String((g1pos[0]-basex)/byte).substring(0, 4);  
  url += ',';
  url += String((g1pos[1])/byte).substring(0, 4); 
  url += ',';
  url += String(g1dir[0]).substring(0, 4); 
  url += ',';
  url += String(g1dir[1]).substring(0, 4); 
  url += '&n=';
  url += String((g2pos[0]-basex)/byte).substring(0, 4); 
  url += ',';
  url += String((g2pos[1])/byte).substring(0, 4); 
  url += ',';
  url += String(g2dir[0]).substring(0, 4);   
  url += ',';
  url += String(g2dir[1]).substring(0, 4); 
  url += '&n=';
  url += String((g3pos[0]-basex)/byte).substring(0, 4); 
  url += ',';
  url += String((g3pos[1])/byte).substring(0, 4); 
  url += ',';
  url += String(g3dir[0]).substring(0, 4);   
  url += ',';
  url += String(g3dir[1]).substring(0, 4); 
  url += '&n=';
  url += String((g4pos[0]-basex)/byte).substring(0, 4); 
  url += ',';
  url += String((g4pos[1])/byte).substring(0, 4); 
  url += ',';
  url += String(g4dir[0]).substring(0, 4);   
  url += ',';
  url += String(g4dir[1]).substring(0, 4); 
  url += '&n=';
  let edctr = 0;
  while (edctr < eraseddots.length){
    let ts = String((eraseddots[edctr][0]-basex)/byte);
    ts = ts.replace('10','a');
    ts = ts.replace('11','b');
    ts = ts.replace('12','c');
    ts = ts.replace('13','d');
    ts = ts.replace('14','e');
    ts = ts.replace('15','f');
    ts = ts.replace('16','g');
    ts = ts.replace('17','h');
    ts = ts.substring(0,3); // cap at 3
    url += ts;
    url += ',';

    ts = String((eraseddots[edctr][1])/byte)
    ts = ts.replace('10','a');
    ts = ts.replace('11','b');
    ts = ts.replace('12','c');
    ts = ts.replace('13','d');
    ts = ts.replace('14','e');
    ts = ts.replace('15','f');
    ts = ts.replace('16','g');
    ts = ts.replace('17','h');
    ts = ts.substring(0,3);
    url += ts;
    url += ';';
    edctr += 1;
  }
  url += '&n=';
  if (activationclr && !got[0]){
    url += 'blue,';
  } else {
    url += 'pink,';
  }
  if (activationclr && !got[1]){
    url += 'blue,';
  } else {
    url += 'red,';
  }
  if (activationclr && !got[2]){
    url += 'blue,';
  } else {
    url += 'orange,';
  }
  if (activationclr && !got[3]){
    url += 'blue';
  } else {
    url += 'teal';
  }
  // ok screenshot stuff done

  // update best
  if (score > best){
    localStorage.setItem('bestpac',String(score));
    btn = document.getElementById('best');
    btn.textContent = "Best: "+best;
  }

  //console.log('went from',startspeed,storeendspeed);

  if (!won){ // lost basically

    // palys sfxs
    if (sfx){
      deathsound.currentTime = 0.0;
      deathsound.play();
      ghosteatspacman.currentTime = 0.0;
      ghosteatspacman.play();
    }
    z3.textContent = 'Game over! reload to play again';


    //end screen and animation
    // modify all the html poses
    var ending = document.getElementById('gameover');
    ending.style.width = (byte*(boardSize-2))+"px";
    ending.style.top = (window.innerHeight/2-ending.height/8)+"px";
    ending.style.left = (window.innerWidth/2-(byte*(boardSize-2))/2)+"px";

    let intro1 = document.getElementById('gameover-cover');
    intro1.style.left = window.innerWidth/4+"px";
    intro1.style.width = window.innerWidth/2+"px";
    intro1.style.top = '66px';
    intro1.style.height = (window.innerHeight-66)+'px';

    let playagain = document.getElementById('playagain');
    let openspace = window.innerWidth/2;
    playagain.style.left = (openspace - (byte*(boardSize+2)))/2+window.innerWidth/4+byte*2+"px";
    playagain.style.width = byte*6+"px";
    playagain.style.top = byte*3.33+'px';
    playagain.style.height = byte*6+"px";

    let leaderboard = document.getElementById('leaderboard-btn');
    leaderboard.style.left = (openspace - (byte*(boardSize+2)))/2+window.innerWidth/4+byte*10+"px";
    leaderboard.style.width = byte*6+"px";
    leaderboard.style.top = byte*3.33+'px';
    leaderboard.style.height = byte*6+"px";

    let endscore = document.getElementById('endscore');
    endscore.textContent = "Score: "+score;
    endscore.style.left = (window.innerWidth/2-100)+"px";
    endscore.style.top = byte*13+'px';

    let srcurl = document.getElementById('srcurl');
    srcurl.style.left = (window.innerWidth/2-410)+"px";
    srcurl.style.width = (400)+"px";
    srcurl.addEventListener('click',openurl);

    let animurl = document.getElementById('animurl');
    animurl.style.left = (window.innerWidth/2+10)+"px";
    animurl.style.width = (400)+"px";
    animurl.addEventListener('click',openlog);

    let endtime = document.getElementById('endtime');
    endtime.textContent = "Time: "+elapsedtime;
    endtime.style.left = (window.innerWidth/2-125)+"px";
    endtime.style.top = byte*15+'px';
    if (theme == 'white' || theme == 'rgb(255,255,255)'){
      endscore.style.color = 'black';
      endtime.style.color = 'black';
    }

    let pag = document.getElementById('playagain-glow');
    pag.style.left = ((openspace - (byte*(boardSize+2)))/2+window.innerWidth/4+byte*2-10)+"px";
    pag.style.width = byte*6+20+"px";
    pag.style.top = (byte*3.33-10)+'px';
    pag.style.height = byte*6+20+"px";

    let etg = document.getElementById('leaderboard-glow');
    etg.style.left = ((openspace - (byte*(boardSize+2)))/2+window.innerWidth/4+byte*10-10)+"px";
    etg.style.width = byte*6+20+"px";
    etg.style.top = (byte*3.33-10)+'px';
    etg.style.height = byte*6+20+"px";

    let endscoreglower = document.getElementById('endscoreglower');
    endscoreglower.textContent = "Score: "+score;
    endscoreglower.style.left = (window.innerWidth/2-100)+"px";
    endscoreglower.style.top = byte*13+'px';

    let endtimeglower = document.getElementById('endtimeglower');
    endtimeglower.textContent = "Time: "+elapsedtime;
    endtimeglower.style.left = (window.innerWidth/2-125)+"px";
    endtimeglower.style.top = byte*15+'px';

    
    // background dimmer
    let dimmer = 0;
    while (dimmer < 0.5){
      if (theme == 'black' || theme == 'rgba(0,0,0)'){
        intro1.style.backgroundImage = 'linear-gradient(rgba(0,0,0,'+dimmer+'), rgb(0,0,0,'+(0.5-0.5*(0.5-dimmer))+'))';
      } else {
        intro1.style.backgroundImage = 'linear-gradient(rgba(255,255,255,'+dimmer+'), rgb(255,255,255,'+(0.5-0.5*(0.5-dimmer))+'))';
      }    
      dimmer = (0.51-dimmer)/20+dimmer;
      ending.style.top = (dimmer/0.5)*(window.innerHeight/2-ending.height/8)+"px";
      playagain.style.top = ((dimmer/0.5)*(byte*3.33))+'px';
      leaderboard.style.top = ((dimmer/0.5)*(byte*3.33))+'px';
      endscore.style.top = (dimmer/0.5)*byte*13+'px';
      endtime.style.top = (dimmer/0.5)*byte*15+'px';
      srcurl.style.top = (dimmer/0.5)*byte*17.5+'px';
      animurl.style.top = (dimmer/0.5)*byte*17.5+'px';
      await sleep(2);
    }

    await sleep(250);

    dimmer = 0.5;
    let looper = 0;
    let looper1 = -1020;
    let alpha = 1;
    let alpha1 = 1;
    let t11 = 0;
    let t12 = 0;
    while (true){
      if (looper < 100){
        alpha = looper/100;
      } else if (looper > 920){
        alpha = (1020-looper)/100;
      } else {
        alpha = 1;
      }
      if (looper1 < 100){
        alpha1 = looper1/100;
      } else if (looper1 > 920){
        alpha1 = (1020-looper1)/100;
      } else {
        alpha1 = 1;
      }

      if (theme == 'black' || theme == 'rgba(0,0,0)'){
        intro1.style.backgroundImage = 'linear-gradient(rgba(0,0,0,'+dimmer+'), rgb(0,0,0,'+(0.5-0.5*(0.5-dimmer))+'))';
      } else {
        intro1.style.backgroundImage = 'linear-gradient(rgba(255,255,255,'+dimmer+'), rgb(255,255,255,'+(0.5-0.5*(0.5-dimmer))+'))';
      }
      dimmer = (1.51-dimmer)/200+dimmer;

      pag.style.backgroundColor = 'rgba('+(255-Math.abs(255-looper))+','+(255-Math.abs(510-looper))+','+(255-Math.abs(765-looper))+','+alpha+')';
      etg.style.backgroundColor = 'rgba('+(255-Math.abs(255-looper1))+','+(255-Math.abs(510-looper1))+','+(255-Math.abs(765-looper1))+','+alpha1+')';
      if (t12 == 0){
        endtimeglower.style.color = 'rgba('+(255-Math.abs(255-looper1))+','+(255-Math.abs(510-looper1))+','+(255-Math.abs(765-looper1))+','+alpha1+')';
      }
      if (t11 == 0){
        endscoreglower.style.color = 'rgba('+(255-Math.abs(255-looper))+','+(255-Math.abs(510-looper))+','+(255-Math.abs(765-looper))+','+alpha+')';
      }

      if (looper >= 1020*2){
        looper = 0;
        t11 = 1;
      }
      if (looper1 >= 1020*2){
        looper1 = 0;
        t12 = 1;
      }
      looper += 3;
      looper1 += 3;
      await sleep(2);
    }

  } else {
    // won
    plus10('+ 100');

    // sfx
    if (sfx){
      winsound.currentTime = 0.0;
      winsound.play();
    }
    z3.textContent = 'GG you won! reload to play again';


    //end screen and animation
    var ending = document.getElementById('ggwin');
    ending.style.height = (byte*8)+"px";
    ending.style.top = (byte*3)+"px";
    ending.style.left = (window.innerWidth/2-(ending.width/2))+"px";
    
    let intro1 = document.getElementById('gameover-cover');
    intro1.style.left = window.innerWidth/4+"px";
    intro1.style.width = window.innerWidth/2+"px";
    intro1.style.top = '66px';
    intro1.style.height = (window.innerHeight-66)+'px';

    let playagain = document.getElementById('playagain');
    let openspace = window.innerWidth/2;
    playagain.style.left = (openspace - (byte*(boardSize+2)))/2+window.innerWidth/4+byte*2+"px";
    playagain.style.width = byte*6+"px";
    playagain.style.top = byte*3.33+'px';
    playagain.style.height = byte*2+"px";
    playagain.style.border = '4px solid';

    let leaderboard = document.getElementById('leaderboard-btn');
    leaderboard.style.left = (openspace - (byte*(boardSize+2)))/2+window.innerWidth/4+byte*10+"px";
    leaderboard.style.width = byte*6+"px";
    leaderboard.style.top = byte*3.33+'px';
    leaderboard.style.height = byte*2+"px";
    leaderboard.style.border = '4px solid';

    let endscore = document.getElementById('endscore');
    endscore.textContent = "Score: "+score;
    endscore.style.left = (window.innerWidth/2-byte*7)+"px";
    endscore.style.top = byte*15+'px';

    let endtime = document.getElementById('endtime');
    endtime.textContent = "Time: "+elapsedtime;
    endtime.style.left = (window.innerWidth/2+byte*1)+"px";
    endtime.style.top = byte*15+'px';

    let endscoreglower = document.getElementById('endscoreglower');
    endscoreglower.textContent = "Score: "+score;
    endscoreglower.style.left = (window.innerWidth/2-byte*7)+"px";
    endscoreglower.style.top = byte*15+'px';

    let endtimeglower = document.getElementById('endtimeglower');
    endtimeglower.textContent = "Time: "+elapsedtime;
    endtimeglower.style.left = (window.innerWidth/2+byte*1)+"px";
    endtimeglower.style.top = byte*15+'px';

    let pag = document.getElementById('playagain-glow');
    pag.style.left = ((openspace - (byte*(boardSize+2)))/2+window.innerWidth/4+byte*2-10)+"px";
    pag.style.width = byte*6+20+"px";
    pag.style.top = (byte*3.33-10)+'px';
    pag.style.height = byte*2+20+"px";

    let etg = document.getElementById('leaderboard-glow');
    etg.style.left = ((openspace - (byte*(boardSize+2)))/2+window.innerWidth/4+byte*10-10)+"px";
    etg.style.width = byte*6+20+"px";
    etg.style.top = (byte*3.33-10)+'px';
    etg.style.height = byte*2+20+"px";

    let dimmer = 0;
    while (dimmer < 0.5){
      intro1.style.backgroundImage = 'linear-gradient(rgba(0,0,0,'+dimmer*2+'), rgb(0,0,0,'+(0.5-0.5*(0.5-dimmer))*2+'))';
      dimmer = (0.51-dimmer)/20+dimmer;
      ending.style.top = (dimmer/0.5)*(byte*7)+"px";
      playagain.style.top = ((dimmer/0.5)*(byte*3.33))+'px';
      leaderboard.style.top = ((dimmer/0.5)*(byte*3.33))+'px';
      endscore.style.top = (dimmer/0.5)*byte*15+'px';
      endtime.style.top = (dimmer/0.5)*byte*15+'px';
      await sleep(2);
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    ctx.fillStyle = 'rgb(50,50,50)';
    // ctx.fillRect(basex-6*byte,canvas.height-2*byte,2*byte,2*byte);
    // ctx.fillRect(basex+(boardSize*byte)+6*byte,canvas.height-2*byte,2*byte,2*byte);
    cvs = document.getElementById('canvas-container');
    cvs.style.zIndex = 5;


    // confetti generation
    let varsarr = [];
    let varsarr1 = [];
    // this is gonna be cool im telling y
    let generator = 0;
    let timing = 0;
    while (generator < 100){ // amt of confetti
      let clrgen = 'rgb('+getrandnum(100,255)+','+getrandnum(100,255)+','+getrandnum(100,255)+')';
      let subj = [getrandnum(0.5,1),getrandnum(30,50),timing,clrgen]
      varsarr.push(subj);
      timing += 10;
      clrgen = 'rgb('+getrandnum(150,255)+','+getrandnum(150,255)+','+getrandnum(150,255)+')';
      subj = [getrandnum(0.5,1),getrandnum(30,50),timing,clrgen]
      varsarr1.push(subj);
      timing += 10;
      generator += 1;
      // confetti bursts if we want
      // if (timing == 1000){
      //   timing = 2000;
      // } else if (timing == 3000){
      //   timing = 4000;
      // } else if (timing == 5000){
      //   timing = 6000;
      // }
    }
    
    // do this later whatever lmao what
    await sleep(250);

    // actual confetti
    dimmer = 0.5;
    let looper = 0;
    let looper1 = -1020;
    let alpha = 1;
    let alpha1 = 1;
    let t = 0;
    let t11 = 0;
    let t12 = 0;
    while (true){
      // confetti
      ctx.clearRect(0, 0, canvas.width, canvas.height); 
      ctx.fillStyle = 'rgb(50,50,50)';
      // ctx.fillRect(basex-6*byte,canvas.height-2*byte,2*byte,2*byte);
      // ctx.fillRect(basex+(boardSize*byte)+6*byte,canvas.height-2*byte,2*byte,2*byte);
      let iter = 0;
      while (iter < varsarr.length){
        let xcoord = (basex-6*byte)+(t-varsarr[iter][2])*varsarr[iter][0]+byte;
        let ycoord = canvas.height-(-1*(((t-varsarr[iter][2])/15)*((t-varsarr[iter][2])/15))+(varsarr[iter][1]*((t-varsarr[iter][2])/15)));
        ctx.fillStyle = varsarr[iter][3];
        drawdimond(xcoord,ycoord);
        iter += 1;
      }
      iter = 0;
      while (iter < varsarr.length){
        let xcoord = (basex+(boardSize*byte)+6*byte)-(t-varsarr1[iter][2])*varsarr1[iter][0]+byte;
        let ycoord = canvas.height-(-1*(((t-varsarr1[iter][2])/15)*((t-varsarr1[iter][2])/15))+(varsarr1[iter][1]*((t-varsarr1[iter][2])/15)));
        ctx.fillStyle = varsarr1[iter][3];
        drawdimond(xcoord,ycoord);
        iter += 1;
      }
      // basically if follows projectile motion

      t += 2;


      if (looper < 100){
        alpha = looper/100;
      } else if (looper > 920){
        alpha = (1020-looper)/100;
      } else {
        alpha = 1;
      }
      if (looper1 < 100){
        alpha1 = looper1/100;
      } else if (looper1 > 920){
        alpha1 = (1020-looper1)/100;
      } else {
        alpha1 = 1;
      }

      pag.style.backgroundColor = 'rgba('+(255-Math.abs(255-looper))+','+(255-Math.abs(510-looper))+','+(255-Math.abs(765-looper))+','+alpha+')';
      etg.style.backgroundColor = 'rgba('+(255-Math.abs(255-looper1))+','+(255-Math.abs(510-looper1))+','+(255-Math.abs(765-looper1))+','+alpha1+')';
      
      if (t12 == 0){
        endscoreglower.style.color = 'rgba('+(255-Math.abs(255-looper1))+','+(255-Math.abs(510-looper1))+','+(255-Math.abs(765-looper1))+','+alpha1+')';
      }
      if (t11 == 0){
        endtimeglower.style.color = 'rgba('+(255-Math.abs(255-looper))+','+(255-Math.abs(510-looper))+','+(255-Math.abs(765-looper))+','+alpha+')';
      }

      if (looper >= 1020*2){
        looper = 0;
        t11 = 1;
      }
      if (looper1 >= 1020*2){
        looper1 = 0;
        t12 = 1;
      }
      looper += 3;
      looper1 += 3;
      await sleep(2);
    }

  }

})();
// ok thats it for the main loop

function keyed(k){
  if (!started){
    counter = 0;
  }

  const ctx = canvas.getContext('2d');
  
  let actkey = k;
  let filterletters = 'QWERTYUIOPASDFGHJKLZXCVBNM';
  //console.log('pressed'+actkey);

  // starter
  if (!startwaiter && (closedintro) && actkey != 'ArrowRight' && actkey != 'D'){
    startwaiter = true;
    startspeed = speed;
    console.log('put speed as',speed);
    capturedspeed = false;
    started = true;
    counter = 0;
    let z = document.getElementById('display');
    z.textContent = 'Start';
    fpslst = [];
    lastfps = Date.now();
    speed = basespeed;
    // no starting thing
    //yd = -speed;
  }

  // beayboard shortcuts
  if (lost && actkey == 'P' && closedintro){
    location.reload();
  }
  if (lost && actkey == "L" && closedintro){
    window.location.href = 'https://skparab1.github.io/pacman/leaderboard/leaderboard.html';
  }

  // we only need 1 waiter
  if (actkey == 'ArrowLeft' || actkey == 'A'){
    waiter = 'left';
    keylog = keylog + 'l' + String(elapsedtime).substring(0,10)+',';
  }
  if (actkey == 'ArrowRight' || actkey == 'D'){
    waiter = 'right';
    keylog = keylog + 'r' + String(elapsedtime).substring(0,10)+',';
  }
  if (actkey == 'ArrowUp' || actkey == 'W'){
    waiter = 'up';
    keylog = keylog + 'u' + String(elapsedtime).substring(0,10)+',';
  }
  if (actkey == 'ArrowDown' || actkey == 'S'){
    waiter = 'down';
    keylog = keylog + 'd' + String(elapsedtime).substring(0,10)+',';
  }
}

// keypress processing
(async () => {
window.addEventListener("keydown", function(event) {
  if (!started){
    counter = 0;
  }
  if (event.defaultPrevented) {
    return;
  }

  const ctx = canvas.getContext('2d');
  
  let actkey = event.code.replace('Key','')
  let filterletters = 'QWERTYUIOPASDFGHJKLZXCVBNM';
  //console.log('pressed'+actkey);

  // starter
  if (!startwaiter && (closedintro) && actkey != 'ArrowRight' && actkey != 'D'){
    startwaiter = true;
    startspeed = speed;
    console.log('put speed as',speed);
    capturedspeed = false;
    started = true;
    counter = 0;
    let z = document.getElementById('display');
    z.textContent = 'Start';
    fpslst = [];
    lastfps = Date.now();
    speed = basespeed;
    // no starting thing
    //yd = -speed;
  }

  // beayboard shortcuts
  if (lost && actkey == 'P' && closedintro){
    location.reload();
  }
  if (lost && actkey == "L" && closedintro){
    window.location.href = 'https://skparab1.github.io/pacman/leaderboard/leaderboard.html';
  }

  // we only need 1 waiter
  if (actkey == 'ArrowLeft' || actkey == 'A'){
    waiter = 'left';
    keylog = keylog + 'l' + String(elapsedtime).substring(0,10)+',';
  }
  if (actkey == 'ArrowRight' || actkey == 'D'){
    waiter = 'right';
    keylog = keylog + 'r' + String(elapsedtime).substring(0,10)+',';
  }
  if (actkey == 'ArrowUp' || actkey == 'W'){
    waiter = 'up';
    keylog = keylog + 'u' + String(elapsedtime).substring(0,10)+',';
  }
  if (actkey == 'ArrowDown' || actkey == 'S'){
    waiter = 'down';
    keylog = keylog + 'd' + String(elapsedtime).substring(0,10)+',';
  }
  }, true);
})();
//@everyone i am very happy to announce that we have completed development of pacman