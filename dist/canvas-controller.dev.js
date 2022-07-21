"use strict";

// Pacman
// music stuff @advaita
var audioElement = new Audio('pacman_beat_3.mp3');
var eatsound = new Audio('pacman_eat_sound.mp3');
eatsound.volume = 0.5;
var deathsound = new Audio('pacman_death_sound.mp3');
var ghosteatspacman = new Audio('ghost_eats_pacman.mp3');
var eatghostsound = new Audio('pacman_eats_ghost.mp3');
var winsound = new Audio('pacman_gg_win_music.mp3');
audioElement.play();
var playable;

if (audioElement.duration > 0 && !audioElement.paused) {
  //console.log('playing');
  playable = true;
} else {
  playable = false; //console.log('not playing');
  //alert('Unable to play audio');

  if (!playable) {// let notif = document.getElementById('notif');
    // notif.style.display = "block";
    // notif.innerHTML = '<h3 style="color:rgb(255, 255, 255);">Unable to play Audio. Check audio permissions and try again. See how to allow audio <a href="https://github.com/Skparab1/snake/blob/main/fix-audio.md">here<a></h3>';
  }
}

audioElement.controls = true;
audioElement.loop = true;
var volume = document.querySelector("#volume-control");
volume.addEventListener("change", function (e) {
  audioElement.volume = e.currentTarget.value / 100;
});
var musictimeload = localStorage.getItem('musictime'); // this is athe audio continuer

if (musictimeload != null && false) {
  audioElement.currentTime = parseFloat(musictimeload);
}

function maketheme(id, clr) {
  var ab = document.getElementById(id);
  ab.style.color = clr;
}

function clrbtn(id, clr) {
  var ab = document.getElementById(id);
  ab.style.backgroundColor = clr;
  ab.style.borderColor = clr;
}

function clrbtn1(id, clr) {
  var ab = document.getElementById(id);
  ab.style.borderColor = clr;
}

function settheme(clr) {
  setclr = clr; // to make ritam not complain about how long this is i mean what kind of developer complains about useful comments smh 

  maketheme('header1', setclr);
  maketheme('header2', setclr);
  maketheme('header3', setclr);
  maketheme('title', setclr);
  maketheme('settings', setclr);
  maketheme('theme', setclr);
  clrbtn1('box', setclr);
  clrbtn1('left-panel', setclr);
  clrbtn1('rulesbtn', setclr);
  maketheme('rules', setclr);
  clrbtn1('contributersbtn', setclr);
  maketheme('contributers', setclr);
  clrbtn1('leaderboardbtn', setclr);
  maketheme('leaderboard', setclr);
  clrbtn1('otherbtn', setclr);
  maketheme('other', setclr);
  maketheme('audio', setclr);
  clrbtn1('audiobtn', setclr);
  maketheme('audio-toggle', setclr);
  clrbtn1('right-panel', setclr);
  maketheme('info', setclr);
  maketheme('name', setclr);
  maketheme('score', setclr);
  maketheme('best', setclr);
  maketheme('time', setclr);
  maketheme('display', setclr);
  maketheme('game-controls', setclr);
  clrbtn('up', setclr);
  clrbtn('left', setclr);
  clrbtn('down', setclr);
  clrbtn('right', setclr);
}

function checkcensor(inp) {
  var cr = 0;

  while (cr < censored.length) {
    if (inp.toLowerCase().includes(censored[cr].toLowerCase())) {
      return true;
    }

    cr += 1;
  }

  return false;
} // alr anindit here are the toggle constants


var boardSize = 16; //so 20 means 20x20 and 40 would be 40x40 and you can change it to anything you want

var speedfactor = 189; //directly porportional to these many pixels per second (but not exactly)

var eyesize = 2; // squarelength/this pixels

var borderleniance = 0.5; // the game will ignore a wall hit as long as it is less than 0.5 boxes away from the border

var endcurtainspeed = 0.25; // seconds wait in between frames of each pixel expansion (for game over animation)

var autopilot = false; // this is for fun but it turns on with the localstorage reader
// sfx

var sfx = localStorage.getItem('sfx');
var eatsfx = localStorage.getItem('eatsfx');

if (sfx == null) {
  sfx = true;
} else {
  if (sfx == 'true') {
    sfx = true;
  } else {
    sfx = false;
  }
}

if (eatsfx == null) {
  eatsfx = true;
} else {
  if (eatsfx == 'true') {
    eatsfx = true;
  } else {
    eatsfx = false;
  }
} // other things


var lost = false;
var theme = localStorage.getItem('theme');

if (theme == null) {
  theme = 'black';
}

console.log(theme);

if (theme == 'white' || theme == 'rgb(255,255,255)') {
  settheme('black'); // opp color because contrast color
}

document.body.style.background = theme;
var rulesModal1 = document.getElementById('rules-modal');
var best = localStorage.getItem("bestpac");
var lastfps = Date.now();
var avgfps = 0;
var fpslst = [];
var won = false;
var closedintro = true;
var lastname = ''; // testing mode notouch

testingmode = false; // we dont talk abt this

var censored = "tawt;erohw a fo nos;hctib a fo nos;tuls;rekcufretsis;ssa tihs;tihs;kcirp;ssip;aggin;rekcufrehtom;tihs ni;tihsesroh;tihs yloh;lleh;nmadsdog;nmaddog;kcuf;reggirf;rekcufrehtaf;gniffe;nmad;tnuc;parc;rekcuskcoc;kcoc;rekcuf-dlihc;tihsllub;reggub;rekcufrehtorb;skcollob;hctib;dratsab;elohssa;ssa;esra";
censored = censored.split("").reverse().join("").split(";");
var firstrender = true; //console.log(censored);
// name

var name1 = localStorage.getItem('name');
var nameinput = document.getElementById('name-input');

if (name1 == null) {
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
localStorage.setItem('name', name1); // read all teh localstorage

if (localStorage.getItem("pac") == null) {
  localStorage.setItem("bestpac", 0); //openintro();

  best = 0;
}

if (localStorage.getItem('autopilot') == "true") {
  autopilot = true;
  bordercolor = "rgb(100,0,0)";
}

if (localStorage.getItem('autopilot') == null) {
  autopilot = false;
  localStorage.setItem('autopilot', "false");
}

if (window.location.href.includes('?autopilot=true')) {
  // this is an override in case anyone still uses it
  autopilot = true;
  bordercolor = "rgb(100,0,0)";
} // draw line


function drawline(x, y, x1, y1, clr) {
  ctx.beginPath();
  ctx.lineWidth = 4 * scalefactor;
  ctx.strokeStyle = clr;
  ctx.fillStyle = clr;
  ctx.moveTo(x, y);
  ctx.lineTo(x1, y1);
  ctx.stroke();
} // rnadom generation functions


function getrand() {
  return Math.floor(Math.random() * 10); // 9 out of 10 cases go regualr way
}

function getrand2() {
  return Math.floor(Math.random() * 3) - 1;
}

function getrand3() {
  var gr = Math.floor(Math.random() * 2);

  if (gr == 0) {
    gr = -1;
  }

  return gr;
}

function getranddir() {
  var gr2 = getrand();

  if (gr2 >= 3) {
    return [0, getrand3()];
  } else {
    return [getrand3(), 0];
  }
}

function getoppdir(dir, pos) {
  //return dir;
  if (activationclr[0] && pos == g1pos || activationclr[1] && pos == g2pos || activationclr[2] && pos == g3pos || activationclr[3] && pos == g4pos) {
    return [-dir[0], -dir[1]];
  } else {
    return dir;
  }
} // returns boolean of whether going right is allowed or not for given pos


function getrightblock(pos) {
  var ct11 = 0;
  var rejected = false;

  while (ct11 < rightblockghost.length && !rejected) {
    if (pos[0] >= rightblockghost[ct11][0] + _byte / 2 && pos[0] <= rightblockghost[ct11][1] + _byte / 2 && pos[1] >= rightblockghost[ct11][2] && pos[1] <= rightblockghost[ct11][3]) {
      rejected = true;
      return true;
    }

    ct11 += 1;
  }

  return false;
} // returns boolean of whether going left is allowed or not for given pos


function getleftblock(pos) {
  var ct11 = 0;
  var rejected = false;

  while (ct11 < leftblockghost.length && !rejected) {
    if (pos[0] >= leftblockghost[ct11][0] - _byte / 2 && pos[0] <= leftblockghost[ct11][1] - _byte / 2 && pos[1] >= leftblockghost[ct11][2] && pos[1] <= leftblockghost[ct11][3]) {
      rejected = true;
      return true;
    }

    ct11 += 1;
  }

  return false;
} // goin up allowed or not


function getupblock(pos) {
  var ct11 = 0;
  var rejected = false;

  while (ct11 < upblockghost.length && !rejected) {
    if (pos[0] >= upblockghost[ct11][0] && pos[0] <= upblockghost[ct11][1] && pos[1] >= upblockghost[ct11][2] - _byte / 2 && pos[1] <= upblockghost[ct11][3] - _byte / 2) {
      rejected = true;
      return true;
    }

    ct11 += 1;
  }

  return false;
} // goin down allowed or not


function getdownblock(pos) {
  var ct11 = 0;
  var rejected = false;

  while (ct11 < downblockghost.length && !rejected) {
    if (pos[0] >= downblockghost[ct11][0] && pos[0] <= downblockghost[ct11][1] && pos[1] >= downblockghost[ct11][2] + _byte / 2 && pos[1] <= downblockghost[ct11][3] + _byte / 2) {
      rejected = true;
      return true;
    }

    ct11 += 1;
  }

  return false;
} // if at intersection


function atintersection(pos) {
  var inter = 0;

  while (inter < intersection.length) {
    if (pos[0] >= intersection[inter][0] && pos[0] <= intersection[inter][1] && pos[1] >= intersection[inter][2] && pos[1] <= intersection[inter][3]) {
      return true;
    }

    inter += 1;
  }

  return false;
} // nearest gridpos


function nearestgp(pos) {
  // we expect it to be +- 0.1 off
  var nx = window.innerWidth / 4 + _byte / 2;

  while (nx < window.innerWidth / 4 + _byte * (boardSize + 2)) {
    var ny = _byte / 2;

    while (ny < _byte * (boardSize + 2)) {
      if (Math.abs(pos[0] - nx) < _byte / 2 && Math.abs(pos[1] - ny) < _byte / 2) {
        return [nx, ny];
      }

      ny += _byte;
    }

    nx += _byte;
  }

  return [0, 0];
}

function nearestgpy(pos) {
  // we expect it to be +- 0.1 off
  var nx = window.innerWidth / 4 + _byte / 2;

  while (nx < window.innerWidth / 4 + _byte * (boardSize + 2)) {
    var ny = _byte / 2;

    while (ny < _byte * (boardSize + 2)) {
      if (Math.abs(pos[0] - nx) < _byte / 2 && Math.abs(pos[1] - ny) < _byte / 2) {
        return [pos[0], ny];
      }

      ny += _byte;
    }

    nx += _byte;
  }

  return [0, 0];
}

function nearestgpx(pos) {
  // we expect it to be +- 0.1 off
  var nx = window.innerWidth / 4 + _byte / 2;

  while (nx < window.innerWidth / 4 + _byte * (boardSize + 2)) {
    var ny = _byte / 2;

    while (ny < _byte * (boardSize + 2)) {
      if (Math.abs(pos[0] - nx) < _byte / 2 && Math.abs(pos[1] - ny) < _byte / 2) {
        return [nx, pos[1]];
      }

      ny += _byte;
    }

    nx += _byte;
  }

  return [0, 0];
} // ghost mover algoirthm


function moveghost(pos, dir, timer1, reversed) {
  // ghostmover function 
  if (atintersection(pos) && timer1 > 25) {
    pos = nearestgp(pos);

    if (dir[0] != 0) {
      // going right or left
      if (thepos[1] > pos[1] && Math.abs(thepos[1] - pos[1]) > _byte / 4) {
        // not in same line
        if (!getdownblock(pos)) {
          dir = [0, speed * 0.95];
          dir = getoppdir(dir, pos);
          pos = nearestgp(pos);
        }
      } else if (thepos[1] < pos[1] && Math.abs(thepos[1] - pos[1]) > _byte / 4) {
        if (!getupblock(pos)) {
          dir = [0, -speed * 0.95];
          dir = getoppdir(dir, pos);
          pos = nearestgp(pos);
        }
      }

      timer1 = 0;
    } else {
      // going up or down
      if (thepos[0] < pos[0] && Math.abs(thepos[0] - pos[0]) > _byte / 4) {
        // not in same line
        if (!getleftblock(pos)) {
          dir = [-speed * 0.95, 0];
          dir = getoppdir(dir, pos);
          pos = nearestgp(pos);
        }
      } else if (thepos[0] > pos[0] && Math.abs(thepos[0] - pos[0]) > _byte / 4) {
        if (!getrightblock(pos)) {
          dir = [speed * 0.95, 0];
          dir = getoppdir(dir, pos);
          pos = nearestgp(pos);
        }
      }

      timer1 = 0;
    }
  }

  timer1 += 1;

  if (dir[0] > 0) {
    // moving right
    if (getrightblock(pos) && !atintersection(pos) && timer1 > 25) {
      if (thepos[1] > pos[1]) {
        dir = [0, speed * 0.95];
        dir = getoppdir(dir, pos);
      } else if (thepos[1] < pos[1]) {
        dir = [0, -speed * 0.95];
        dir = getoppdir(dir, pos);
      }

      timer1 = 0;
    } else if (!getrightblock(pos)) {
      pos = [pos[0] + dir[0], pos[1] + dir[1]];
    }
  } else if (dir[0] < 0) {
    // moving left
    if (getleftblock(pos) && !atintersection(pos) && timer1 > 25) {
      if (thepos[1] > pos[1]) {
        dir = [0, speed * 0.95];
        dir = getoppdir(dir, pos);
      } else if (thepos[1] < pos[1]) {
        dir = [0, -speed * 0.95];
        dir = getoppdir(dir, pos);
      }

      timer1 = 0;
    } else if (!getleftblock(pos)) {
      pos = [pos[0] + dir[0], pos[1] + dir[1]];
    }
  } else if (dir[1] < 0) {
    // moving up
    if (getupblock(pos) && !atintersection(pos) && timer1 > 25) {
      if (thepos[0] > pos[0]) {
        dir = [speed * 0.95, 0];
        dir = getoppdir(dir, pos);
      } else if (thepos[0] < pos[0]) {
        dir = [-speed * 0.95, 0];
        dir = getoppdir(dir, pos);
      }

      timer1 = 0;
    } else if (!getupblock(pos)) {
      pos = [pos[0] + dir[0], pos[1] + dir[1]];
    }
  } else if (dir[1] > 0) {
    // moving down
    if (getdownblock(pos) && !atintersection(pos) && timer1 > 25) {
      if (thepos[0] > pos[0]) {
        dir = [speed * 0.95, 0];
        dir = getoppdir(dir, pos);
      } else if (thepos[0] < pos[0]) {
        dir = [-speed * 0.95, 0];
        dir = getoppdir(dir, pos);
      }

      timer1 = 0;
    } else if (!getdownblock(pos)) {
      pos = [pos[0] + dir[0], pos[1] + dir[1]];
    }
  }

  return [pos, dir, timer1];
}

function returnghost(pos, dir) {
  var sn = 0;

  while (sn < rightpush.length) {
    if (pos[0] > rightpush[sn][0] && pos[0] < rightpush[sn][1] && pos[1] > rightpush[sn][2] && pos[1] < rightpush[sn][3]) {
      dir = [speed * 2, 0];
      pos = nearestgpy(pos);
      console.log('returned right');
    }

    sn += 1;
  }

  sn = 0;

  while (sn < leftpush.length) {
    if (pos[0] > leftpush[sn][0] && pos[0] < leftpush[sn][1] && pos[1] > leftpush[sn][2] && pos[1] < leftpush[sn][3]) {
      dir = [-speed * 2, 0];
      pos = nearestgpy(pos);
      console.log('returned left');
    }

    sn += 1;
  }

  sn = 0;

  while (sn < uppush.length) {
    if (pos[0] > uppush[sn][0] && pos[0] < uppush[sn][1] && pos[1] > uppush[sn][2] && pos[1] < uppush[sn][3]) {
      dir = [0, -speed * 2];
      pos = nearestgpx(pos);
      console.log('returned up');
    }

    sn += 1;
  }

  sn = 0;

  while (sn < downpush.length) {
    if (pos[0] > downpush[sn][0] && pos[0] < downpush[sn][1] && pos[1] > downpush[sn][2] && pos[1] < downpush[sn][3]) {
      dir = [0, speed * 2];
      pos = nearestgpx(pos);
      console.log('returned down');
    }

    sn += 1;
  }

  return [pos, dir];
}

function inghostbox(pos) {
  return pos[0] > basex + _byte * 7 && pos[0] < basex + _byte * 11 && pos[1] > _byte * 10 && pos[1] < _byte * 12;
} // draw the board


function drawboard() {
  ctx.beginPath();
  var x = 0;
  var actx = window.innerWidth / 4 + _byte; // clear else keeps adding

  while (x < boardSize * 2 - 1) {
    var y = 0;
    var acty = _byte / 2;

    while (y < boardSize * 2 - 1) {
      acty += height / (boardSize + 2) * 0.51;
      y += 1; // grid
      //ctx.strokeRect(actx,acty,(height)/(boardSize+2),(height)/(boardSize+2));
      //dots

      ctx.fillStyle = dotcolor;
      var ed = 0;
      var deactivated = false;

      while (ed < eraseddots.length) {
        if (Math.abs(eraseddots[ed][0] - (actx + _byte / 2 + _byte / 20)) < _byte / 4 && Math.abs(eraseddots[ed][1] - (acty + _byte / 2 + _byte / 20)) < _byte / 4) {
          deactivated = true;
        }

        ed += 1;
      }

      if (!deactivated) {
        if (x == 0 && y == 1 || x == 30 && y == 1 || x == 30 && y == 31 || x == 0 && y == 31) {
          ctx.beginPath();
          ctx.arc(actx + _byte / 2 + _byte / 40, acty + _byte / 2, height / (boardSize + 2) / 5, 0, 2 * Math.PI);
          ctx.fill();
        } else {
          ctx.fillRect(actx + _byte / 2, acty + _byte / 2, height / (boardSize + 2) / 10, height / (boardSize + 2) / 10);
        }
      } //console.log(eraseddots.length);


      if (firstrender) {
        dotspos.push([actx + _byte / 2 + _byte / 20, acty + _byte / 2 + _byte / 20]);
      }
    }

    actx += height / (boardSize + 2) * 0.51;
    x += 1;
  }

  firstrender = false; // the exit dot overlay

  ctx.fillStyle = theme;
  ctx.fillRect(window.innerWidth / 4 + _byte * 1, _byte * 9 - 4, _byte * 2 + 4, _byte * 2 + 8);
  ctx.fillRect(window.innerWidth / 4 + _byte * 15 - 4, _byte * 9 - 4, _byte * 2 + 8, _byte * 2 + 8);
  var linecolor;
  var limecolor;
  var yellowcolor;
  var redcolor;
  var ghostbcolor;

  if (theme == 'white' || theme == 'rgb(255,255,255)') {
    linecolor = "rgb(0, 0, 255)";
    dotcolor = "brown";
    limecolor = 'rgb(0, 150, 40)';
    yellowcolor = 'rgb(100, 100, 0)';
    redcolor = 'rgb(100, 0, 0)';
    ghostbcolor = 'rgb(0, 0, 0)';
  } else {
    linecolor = "rgb(42, 198, 250)";
    dotcolor = "orange";
    limecolor = 'rgb(0, 255, 0)';
    yellowcolor = 'rgb(255, 255, 0)';
    redcolor = 'rgb(255, 0, 0)';
    ghostbcolor = 'rgb(255, 255, 255)';
  } //console.log(theme);


  ctx.strokeStyle = linecolor;
  ctx.lineWidth = 4 * scalefactor;
  var leniance = height / (boardSize + 2) * borderleniance;
  bounderies = [window.innerWidth / 4 + height / (boardSize + 2) * 1.5 - leniance + 10 * scalefactor, height / (boardSize + 2) * 1.5 - leniance + 10 * scalefactor, window.innerWidth / 4 + height * ((boardSize - 1) / boardSize) - height / (boardSize + 2) / 2.5 + leniance - 10 * scalefactor, height * (boardSize - 1) / boardSize - height / (boardSize + 2) / 2 + leniance - 10 * scalefactor];
  ctx.strokeRect(window.innerWidth / 4 + height / (boardSize + 2), height / (boardSize + 2), _byte * boardSize, _byte * boardSize);
  ctx.strokeRect(window.innerWidth / 4 + height / (boardSize + 2) - 10 * scalefactor, height / (boardSize + 2) - 10 * scalefactor, _byte * boardSize + 20 * scalefactor, _byte * boardSize + 20 * scalefactor); // some dot cover fillrects

  ctx.fillRect(window.innerWidth / 4 + _byte * 1, _byte * 11, _byte * 2 + 4, _byte * 1 + 4);
  ctx.fillRect(window.innerWidth / 4 + _byte * 14.75, _byte * 11, _byte * 2 + 4, _byte * 1 + 4);
  ctx.fillRect(window.innerWidth / 4 + height / (boardSize + 2) - _byte, _byte * (boardSize / 2) + _byte * 1 + 10 * scalefactor, _byte * 3, _byte * 2.5);
  ctx.fillRect(window.innerWidth / 4 + _byte * boardSize - _byte, _byte * (boardSize / 2) + _byte * 1, _byte * 3, _byte * 3); //the enterances and exits

  drawline(window.innerWidth / 4 + height / (boardSize + 2), _byte * (boardSize / 2) + 3 * _byte + 2, window.innerWidth / 4 + height / (boardSize + 2), _byte * (boardSize / 2) + 3 * _byte + 2 + _byte, theme);
  drawline(window.innerWidth / 4 + height / (boardSize + 2), _byte * (boardSize / 2) + 3 * _byte + 2 + _byte, window.innerWidth / 4 + height / (boardSize + 2) + 2 * _byte, _byte * (boardSize / 2) + 3 * _byte + 2 + _byte, linecolor);
  drawline(window.innerWidth / 4 + height / (boardSize + 2) + 2 * _byte, _byte * (boardSize / 2) + 3 * _byte + 2 + _byte, 2 * _byte + window.innerWidth / 4 + height / (boardSize + 2), _byte * (boardSize / 2) + 3 * _byte, linecolor);
  drawline(window.innerWidth / 4 + height / (boardSize + 2) - 10 * scalefactor, _byte * (boardSize / 2) + 4 * _byte - 10 * scalefactor, 2 * _byte + window.innerWidth / 4 + height / (boardSize + 2) - 10 * scalefactor, _byte * (boardSize / 2) + 4 * _byte - 10 * scalefactor, linecolor);
  drawline(window.innerWidth / 4 + height / (boardSize + 2) - 10 * scalefactor - 2, _byte * (boardSize / 2) + 3 * _byte, 2 * _byte + window.innerWidth / 4 + height / (boardSize + 2), _byte * (boardSize / 2) + 3 * _byte, linecolor);
  drawline(window.innerWidth / 4 + height / (boardSize + 2) - 10 * scalefactor + 2, _byte * (boardSize / 2) + 3 * _byte + 10 * scalefactor, 2 * _byte + window.innerWidth / 4 + height / (boardSize + 2) - 10 * scalefactor, _byte * (boardSize / 2) + 3 * _byte + 10 * scalefactor, linecolor);
  drawline(2 * _byte + window.innerWidth / 4 + height / (boardSize + 2) - 10 * scalefactor, _byte * (boardSize / 2) + 3 * _byte + 10 * scalefactor, 2 * _byte + window.innerWidth / 4 + height / (boardSize + 2) - 10 * scalefactor, _byte * (boardSize / 2) + 4 * _byte - 10 * scalefactor, linecolor);
  drawline(window.innerWidth / 4 + _byte - 10 * scalefactor - 1, _byte * 11 + 10 * scalefactor + 2, window.innerWidth / 4 + _byte - 10 * scalefactor - 1, _byte * 12 - 10 * scalefactor - 2, theme);
  drawline(window.innerWidth / 4 + _byte - 10 * scalefactor + 2, _byte * 11 + 10 * scalefactor + 2, window.innerWidth / 4 + _byte - 10 * scalefactor + 2, _byte * 12 - 10 * scalefactor - 2, theme);
  drawline(window.innerWidth / 4 + height / (boardSize + 2) - 10 * scalefactor, _byte * (boardSize / 2) + _byte * 3 + 2, window.innerWidth / 4 + height / (boardSize + 2) - 10 * scalefactor, _byte * (boardSize / 2) + _byte * 3 + 10 * scalefactor, linecolor);
  drawline(window.innerWidth / 4 + height / (boardSize + 2), _byte * (boardSize / 2) + _byte, 2 * _byte + window.innerWidth / 4 + height / (boardSize + 2), _byte * (boardSize / 2) + _byte, linecolor);
  drawline(window.innerWidth / 4 + height / (boardSize + 2), _byte * (boardSize / 2) + 2 + _byte, window.innerWidth / 4 + height / (boardSize + 2), _byte * (boardSize / 2) + 10 * scalefactor - 2 + _byte, theme);
  drawline(window.innerWidth / 4 + height / (boardSize + 2) - 10 * scalefactor, _byte * (boardSize / 2) + 10 * scalefactor + _byte, 2 * _byte + window.innerWidth / 4 + height / (boardSize + 2) - 10 * scalefactor, _byte * (boardSize / 2) + 10 * scalefactor + _byte, linecolor);
  drawline(2 * _byte + window.innerWidth / 4 + height / (boardSize + 2), _byte * (boardSize / 2) + _byte, 2 * _byte + window.innerWidth / 4 + height / (boardSize + 2), _byte * (boardSize / 2) + _byte * 2, linecolor);
  drawline(window.innerWidth / 4 + height / (boardSize + 2) - 10 * scalefactor, _byte * (boardSize / 2) - 10 * scalefactor + _byte * 2, 2 * _byte + window.innerWidth / 4 + height / (boardSize + 2) - 10 * scalefactor, _byte * (boardSize / 2) - 10 * scalefactor + _byte * 2, linecolor);
  drawline(2 * _byte + window.innerWidth / 4 + height / (boardSize + 2) - 10 * scalefactor, _byte * (boardSize / 2) + _byte + 10 * scalefactor, 2 * _byte + window.innerWidth / 4 + height / (boardSize + 2) - 10 * scalefactor, _byte * (boardSize / 2) + _byte * 2 - 10 * scalefactor, linecolor);
  drawline(window.innerWidth / 4 + height / (boardSize + 2) - 10 * scalefactor, _byte * (boardSize / 2) + _byte * 2, 2 * _byte + window.innerWidth / 4 + height / (boardSize + 2), _byte * (boardSize / 2) + _byte * 2, linecolor);
  drawline(window.innerWidth / 4 + height / (boardSize + 2) - 10 * scalefactor, _byte * (boardSize / 2) + _byte * 2, window.innerWidth / 4 + height / (boardSize + 2) - 10 * scalefactor, _byte * (boardSize / 2) + _byte * 2 - 10 * scalefactor, linecolor);
  drawline(window.innerWidth / 4 + _byte * boardSize + _byte + 10 * scalefactor, _byte * (boardSize / 2) + 3 * _byte, window.innerWidth / 4 + _byte * boardSize - _byte, _byte * (boardSize / 2) + 3 * _byte, linecolor);
  drawline(window.innerWidth / 4 + _byte * boardSize + _byte, _byte * (boardSize / 2) + _byte, window.innerWidth / 4 + _byte * boardSize - _byte, _byte * (boardSize / 2) + _byte, linecolor);
  drawline(window.innerWidth / 4 + _byte * boardSize + _byte + scalefactor * 10, _byte * (boardSize / 2) + _byte + scalefactor * 10, window.innerWidth / 4 + _byte * boardSize - _byte + scalefactor * 10, _byte * (boardSize / 2) + _byte + scalefactor * 10, linecolor);
  drawline(window.innerWidth / 4 + _byte * boardSize + _byte + scalefactor * 10, _byte * (boardSize / 2) + _byte * 2, window.innerWidth / 4 + _byte * boardSize - _byte, _byte * (boardSize / 2) + _byte * 2, linecolor);
  drawline(window.innerWidth / 4 + _byte * boardSize - _byte, _byte * (boardSize / 2) + _byte + scalefactor, window.innerWidth / 4 + _byte * boardSize - _byte, _byte * (boardSize / 2) + _byte * 2, linecolor);
  drawline(window.innerWidth / 4 + _byte * boardSize + _byte + scalefactor * 10 - 1, _byte * (boardSize / 2) + _byte + scalefactor * 10, window.innerWidth / 4 + _byte * boardSize + _byte + scalefactor * 10 - 1, _byte * (boardSize / 2) + _byte, linecolor);
  drawline(window.innerWidth / 4 + _byte * boardSize + _byte + scalefactor * 10, _byte * (boardSize / 2) + _byte * 2 - scalefactor * 10, window.innerWidth / 4 + _byte * boardSize - _byte + scalefactor * 10, _byte * (boardSize / 2) + _byte * 2 - scalefactor * 10, linecolor);
  drawline(window.innerWidth / 4 + _byte * boardSize - _byte + scalefactor * 10, _byte * (boardSize / 2) + _byte * 2 - scalefactor * 10, window.innerWidth / 4 + _byte * boardSize - _byte + scalefactor * 10, _byte * (boardSize / 2) + _byte + scalefactor * 10, linecolor);
  drawline(window.innerWidth / 4 + _byte * boardSize + _byte + scalefactor * 10, _byte * (boardSize / 2) + _byte * 2 - scalefactor * 10, window.innerWidth / 4 + _byte * boardSize + _byte + scalefactor * 10, _byte * (boardSize / 2) + _byte * 2, linecolor); // all the fillrects to cover the uneeded dots

  ctx.fillStyle = theme;
  ctx.fillRect(window.innerWidth / 4 + _byte * 2 + 2 - 4, _byte * 2 + 2 - 4, _byte + 8, _byte * 6 + 8);
  ctx.fillRect(window.innerWidth / 4 + _byte * 4 + 2 - 4, _byte * 2 + 2 - 4, _byte * 3 + 8, _byte + 8);
  ctx.fillRect(window.innerWidth / 4 + _byte * 4 + 2 - 4, _byte * 4 + 2 - 4, _byte * 3 + 8, _byte + 8);
  ctx.fillRect(window.innerWidth / 4 + _byte * 4 + 2 - 4, _byte * 4 + 2 - 4, _byte * 1 + 8, _byte * 3 + 8);
  ctx.fillRect(window.innerWidth / 4 + _byte * 7 - 4, _byte * 9 - 4, _byte * 4 + 8, _byte * 3 + 8);
  ctx.fillRect(window.innerWidth / 4 + _byte * 8 - 4, _byte * 1 - 4, _byte * 1 + 8, _byte * 5 + 8);
  ctx.fillRect(window.innerWidth / 4 + _byte * 6 - 4, _byte * 6 - 4, _byte * 1 + 8, _byte * 2 + 8);
  ctx.fillRect(window.innerWidth / 4 + _byte * 7 - 4, _byte * 7 - 4, _byte * 2 + 8, _byte * 1 + 8);
  ctx.fillRect(window.innerWidth / 4 + _byte * 4 - 4, _byte * 8 - 4, _byte * 1 + 8, _byte * 4 + 8);
  ctx.fillRect(window.innerWidth / 4 + _byte * 5 - 4, _byte * 9 - 4, _byte * 1 + 8, _byte * 3 + 8);
  ctx.fillRect(window.innerWidth / 4 + _byte * 12, _byte * 9 - 4, _byte * 2 + 8, _byte * 3 + 8);
  ctx.fillRect(window.innerWidth / 4 + _byte * 10 - 4, _byte * 2 - 4, _byte * 2 + 8, _byte * 1 + 8);
  ctx.fillRect(window.innerWidth / 4 + _byte * 14 - 4, _byte * 2 - 4, _byte * 2 + 8, _byte * 1 + 8);
  ctx.fillRect(window.innerWidth / 4 + _byte * 10 - 4, _byte * 2 - 4, _byte * 1 + 8, _byte * 6 + 8);
  ctx.fillRect(window.innerWidth / 4 + _byte * 15 - 4, _byte * 2 - 4, _byte * 1 + 8, _byte * 6 + 8);
  ctx.fillRect(window.innerWidth / 4 + _byte * 10 - 4, _byte * 7 - 4, _byte * 6 + 8, _byte * 1 + 8);
  ctx.fillRect(window.innerWidth / 4 + _byte * 12 - 4, _byte * 4 - 4, _byte * 2 + 8, _byte * 2 + 8);
  ctx.fillRect(window.innerWidth / 4 + _byte * 2 - 4, _byte * 13 - 4, _byte * 1 + 8, _byte * 1 + 8);
  ctx.fillRect(window.innerWidth / 4 + _byte * 2 - 4, _byte * 15 - 4, _byte * 1 + 8, _byte * 1 + 8);
  ctx.fillRect(window.innerWidth / 4 + _byte * 3 - 4, _byte * 15 - 4, _byte * 1 + 8, _byte * 1 + 8);
  ctx.fillRect(window.innerWidth / 4 + _byte * 4 - 4, _byte * 13 - 4, _byte * 3 + 8, _byte * 1 + 8);
  ctx.fillRect(window.innerWidth / 4 + _byte * 5 - 4, _byte * 14 - 4, _byte * 1 + 8, _byte * 2 + 8);
  ctx.fillRect(window.innerWidth / 4 + _byte * 8 - 4, _byte * 13 - 4, _byte * 1 + 8, _byte * 2 + 8);
  ctx.fillRect(window.innerWidth / 4 + _byte * 7 - 4, _byte * 15 - 4, _byte * 3 + 8, _byte * 1 + 8);
  ctx.fillRect(window.innerWidth / 4 + _byte * 10 - 4, _byte * 13 - 4, _byte * 3 + 8, _byte * 1 + 8);
  ctx.fillRect(window.innerWidth / 4 + _byte * 11 - 4, _byte * 14 - 4, _byte * 1 + 8, _byte * 2 + 8);
  ctx.fillRect(window.innerWidth / 4 + _byte * 14 - 4, _byte * 13 - 4, _byte * 1 + 8, _byte * 2 + 8);
  ctx.fillRect(window.innerWidth / 4 + _byte * 13 - 4, _byte * 15 - 4, _byte * 3 + 8, _byte * 1 + 8);
  ctx.fillRect(window.innerWidth / 4 + _byte * 12 - 4, _byte * 1.75 - 4, _byte * 2 + 8, _byte * 0.5 + 8);
  ctx.fillRect(window.innerWidth / 4 + _byte * 12 - 4, _byte * 2.75 - 4, _byte * 2 + 8, _byte * 0.5 + 8);
  ctx.fillRect(window.innerWidth / 4 + _byte * 8 - 4, _byte * 9 - 4, _byte * 2 + 8, _byte * 1 + 8); // middle dot in o enterance
  //ctx.fillRect(window.innerWidth/4+byte*12.75,byte*2.25,byte*0.5+4,byte*0.5+4);

  ctx.strokeStyle = linecolor;
  ctx.beginPath(); // block 1

  ctx.strokeStyle = redcolor;
  ctx.strokeRect(window.innerWidth / 4 + _byte * 2, _byte * 2, _byte, _byte * 6); // -10*scalefactor to make it fit but then it doesnt align
  // block 2

  ctx.strokeStyle = limecolor;
  ctx.strokeRect(window.innerWidth / 4 + _byte * 4, _byte * 2, _byte * 3, _byte); // weird shape

  drawline(window.innerWidth / 4 + _byte * 4, _byte * 4, window.innerWidth / 4 + _byte * 7, _byte * 4, yellowcolor);
  drawline(window.innerWidth / 4 + _byte * 4, _byte * 4, window.innerWidth / 4 + _byte * 4, _byte * 7, yellowcolor);
  drawline(window.innerWidth / 4 + _byte * 5, _byte * 5, window.innerWidth / 4 + _byte * 7, _byte * 5, yellowcolor);
  drawline(window.innerWidth / 4 + _byte * 5, _byte * 5, window.innerWidth / 4 + _byte * 5, _byte * 7, yellowcolor);
  drawline(window.innerWidth / 4 + _byte * 7, _byte * 4, window.innerWidth / 4 + _byte * 7, _byte * 5, yellowcolor);
  drawline(window.innerWidth / 4 + _byte * 4, _byte * 7, window.innerWidth / 4 + _byte * 5, _byte * 7, yellowcolor);
  ctx.fillStyle = theme; // ghost box

  ctx.strokeStyle = ghostbcolor;
  ctx.strokeRect(window.innerWidth / 4 + _byte * 7, _byte * 10, _byte * 4, _byte * 2);
  ctx.strokeRect(window.innerWidth / 4 + _byte * 7, _byte * 9, _byte * 1, _byte * 1);
  ctx.strokeRect(window.innerWidth / 4 + _byte * 10, _byte * 9, _byte * 1, _byte * 1);
  drawline(window.innerWidth / 4 + _byte * 7 + 2, _byte * 10 - 2, window.innerWidth / 4 + _byte * 11 - 2, _byte * 10 - 2, theme);
  drawline(window.innerWidth / 4 + _byte * 7 + 2, _byte * 10 + 1, window.innerWidth / 4 + _byte * 11 - 2, _byte * 10 + 1, theme);
  drawline(window.innerWidth / 4 + _byte * 8, _byte * 10 - 2, window.innerWidth / 4 + _byte * 10, _byte * 10 - 2, dotcolor); // box 4

  ctx.strokeStyle = linecolor;
  ctx.fillStyle = theme;
  ctx.strokeRect(window.innerWidth / 4 + _byte * 8, _byte * 1, _byte, _byte * 5);
  drawline(window.innerWidth / 4 + _byte * 8, _byte - 2, window.innerWidth / 4 + _byte * 9, _byte - 2, theme);
  drawline(window.innerWidth / 4 + _byte * 8, _byte + 1, window.innerWidth / 4 + _byte * 9, _byte + 1, theme); // another weird shape

  drawline(window.innerWidth / 4 + _byte * 6, _byte * 6, window.innerWidth / 4 + _byte * 6, _byte * 8, redcolor);
  drawline(window.innerWidth / 4 + _byte * 6, _byte * 8, window.innerWidth / 4 + _byte * 9, _byte * 8, redcolor);
  drawline(window.innerWidth / 4 + _byte * 7, _byte * 7, window.innerWidth / 4 + _byte * 9, _byte * 7, redcolor);
  drawline(window.innerWidth / 4 + _byte * 6, _byte * 6, window.innerWidth / 4 + _byte * 7, _byte * 6, redcolor);
  drawline(window.innerWidth / 4 + _byte * 9, _byte * 8, window.innerWidth / 4 + _byte * 9, _byte * 7, redcolor);
  drawline(window.innerWidth / 4 + _byte * 7, _byte * 6, window.innerWidth / 4 + _byte * 7, _byte * 7, redcolor); // big o shape

  ctx.strokeStyle = limecolor;
  ctx.strokeRect(window.innerWidth / 4 + _byte * 10, _byte * 2, _byte * 6, _byte * 6);
  drawline(window.innerWidth / 4 + _byte * 12, _byte * 2 - 1, window.innerWidth / 4 + _byte * 14, _byte * 2 - 1, theme);
  drawline(window.innerWidth / 4 + _byte * 12, _byte * 2 + 2, window.innerWidth / 4 + _byte * 14, _byte * 2 + 2, theme);
  ctx.strokeStyle = limecolor;
  ctx.strokeRect(window.innerWidth / 4 + _byte * 11, _byte * 3, _byte * 4, _byte * 4);
  drawline(window.innerWidth / 4 + _byte * 12, _byte * 3, window.innerWidth / 4 + _byte * 14, _byte * 3, theme);
  ctx.strokeStyle = limecolor;
  drawline(window.innerWidth / 4 + _byte * 12, _byte * 2, window.innerWidth / 4 + _byte * 12, _byte * 3);
  drawline(window.innerWidth / 4 + _byte * 14, _byte * 2, window.innerWidth / 4 + _byte * 14, _byte * 3);
  ctx.strokeRect(window.innerWidth / 4 + _byte * 12, _byte * 4, _byte * 2, _byte * 2); //block 5 with a block on side

  ctx.strokeStyle = yellowcolor;
  ctx.strokeRect(window.innerWidth / 4 + _byte * 4, _byte * 9, _byte * 2, _byte * 3);
  ctx.strokeRect(window.innerWidth / 4 + _byte * 4, _byte * 8, _byte * 1, _byte * 1);
  drawline(window.innerWidth / 4 + _byte * 4 + 2, _byte * 9 - 1, window.innerWidth / 4 + _byte * 5 - 2, _byte * 9 - 1, theme);
  drawline(window.innerWidth / 4 + _byte * 4 + 2, _byte * 9 + 2, window.innerWidth / 4 + _byte * 5 - 2, _byte * 9 + 2, theme); // block 6 removed to push the ghost box up

  ctx.strokeStyle = linecolor; //ctx.strokeRect(window.innerWidth/4+byte*7,byte*9,byte*7,byte*1);
  // block 7

  ctx.strokeStyle = linecolor;
  ctx.strokeRect(window.innerWidth / 4 + _byte * 15, _byte * 11, _byte * 2, _byte * 1);
  ctx.strokeRect(window.innerWidth / 4 + _byte * 16, _byte * 13, _byte * 1, _byte * 1); //ctx.fillStyle = theme;

  ctx.fillRect(window.innerWidth / 4 + _byte * 16 + 2, _byte * 13 + 2, _byte * 1 + 2, _byte * 1 - 4);
  drawline(window.innerWidth / 4 + _byte * 17 + 1, _byte * 11 + 2, window.innerWidth / 4 + _byte * 17 + 1, _byte * 12 - 2, theme);
  drawline(window.innerWidth / 4 + _byte * 17 - 1, _byte * 11 + 2, window.innerWidth / 4 + _byte * 17 - 2, _byte * 12 - 2, theme); //drawline(window.innerWidth/4+byte*16-1,byte*12,window.innerWidth/4+byte*17-1,byte*12,theme);
  //drawline(window.innerWidth/4+byte*16+2,byte*12,window.innerWidth/4+byte*17+1,byte*12,theme);
  //drawline(window.innerWidth/4+byte*16,byte*12-1,window.innerWidth/4+byte*17-2,byte*12-1,theme);
  //drawline(window.innerWidth/4+byte*16,byte*12+1,window.innerWidth/4+byte*17-2,byte*12+1,theme);

  drawline(window.innerWidth / 4 + _byte * 17 - 1, _byte * 14, window.innerWidth / 4 + _byte * 17 - 1, _byte * 14 + 8, linecolor);
  drawline(window.innerWidth / 4 + _byte * boardSize + _byte + scalefactor * 10, _byte * (boardSize / 2) + _byte * 4 - scalefactor * 10, window.innerWidth / 4 + _byte * boardSize - _byte + scalefactor * 10, _byte * (boardSize / 2) + _byte * 4 - scalefactor * 10, linecolor);
  drawline(window.innerWidth / 4 + _byte * boardSize + _byte + scalefactor * 10, _byte * (boardSize / 2) + _byte * 3 + scalefactor * 10, window.innerWidth / 4 + _byte * boardSize - _byte + scalefactor * 10, _byte * (boardSize / 2) + _byte * 3 + scalefactor * 10, linecolor);
  drawline(window.innerWidth / 4 + _byte * boardSize - _byte + scalefactor * 10, _byte * (boardSize / 2) + _byte * 4 - scalefactor * 10, window.innerWidth / 4 + _byte * boardSize - _byte + scalefactor * 10, _byte * (boardSize / 2) + _byte * 3 + scalefactor * 10, linecolor);
  drawline(window.innerWidth / 4 + _byte * boardSize + _byte + scalefactor * 10 - 1, _byte * (boardSize / 2) + _byte * 4 - scalefactor * 10, window.innerWidth / 4 + _byte * boardSize + _byte + scalefactor * 10 - 1, _byte * (boardSize / 2) + _byte * 4, linecolor);
  drawline(window.innerWidth / 4 + _byte * boardSize + _byte + scalefactor * 10 - 1, _byte * (boardSize / 2) + _byte * 3, window.innerWidth / 4 + _byte * boardSize + _byte + scalefactor * 10 - 1, _byte * (boardSize / 2) + _byte * 3 + 10 * scalefactor, linecolor); // t shape thing

  ctx.strokeStyle = limecolor;
  ctx.strokeRect(window.innerWidth / 4 + _byte * 13, _byte * 15, _byte * 3, _byte * 1);
  ctx.strokeRect(window.innerWidth / 4 + _byte * 14, _byte * 13, _byte * 1, _byte * 2);
  drawline(window.innerWidth / 4 + _byte * 14, _byte * 15 + 1, window.innerWidth / 4 + _byte * 15, _byte * 15 + 1, theme);
  drawline(window.innerWidth / 4 + _byte * 14, _byte * 15 - 1, window.innerWidth / 4 + _byte * 15, _byte * 15 - 1, theme); // 2nd t shape

  ctx.strokeStyle = yellowcolor;
  ctx.strokeRect(window.innerWidth / 4 + _byte * 10, _byte * 13, _byte * 3, _byte * 1);
  ctx.strokeRect(window.innerWidth / 4 + _byte * 11, _byte * 14, _byte * 1, _byte * 2);
  drawline(window.innerWidth / 4 + _byte * 11, _byte * 14 + 1, window.innerWidth / 4 + _byte * 12, _byte * 14 + 1, theme);
  drawline(window.innerWidth / 4 + _byte * 11, _byte * 14 - 1, window.innerWidth / 4 + _byte * 12, _byte * 14 - 1, theme); // 3rd t shape thing

  ctx.strokeStyle = redcolor;
  ctx.strokeRect(window.innerWidth / 4 + _byte * 7, _byte * 15, _byte * 3, _byte * 1);
  ctx.strokeRect(window.innerWidth / 4 + _byte * 8, _byte * 13, _byte * 1, _byte * 2);
  drawline(window.innerWidth / 4 + _byte * 8, _byte * 15 + 1, window.innerWidth / 4 + _byte * 9, _byte * 15 + 1, theme);
  drawline(window.innerWidth / 4 + _byte * 8, _byte * 15 - 1, window.innerWidth / 4 + _byte * 9, _byte * 15 - 1, theme); // block 8

  ctx.strokeStyle = redcolor;
  ctx.strokeRect(window.innerWidth / 4 + _byte * 12, _byte * 9, _byte * 2, _byte * 3); // 4th t shape

  ctx.strokeStyle = linecolor;
  ctx.strokeRect(window.innerWidth / 4 + _byte * 5, _byte * 14, _byte * 1, _byte * 2);
  ctx.strokeRect(window.innerWidth / 4 + _byte * 4, _byte * 13, _byte * 3, _byte * 1);
  drawline(window.innerWidth / 4 + _byte * 6, _byte * 14 - 1, window.innerWidth / 4 + _byte * 5, _byte * 14 - 1, theme);
  drawline(window.innerWidth / 4 + _byte * 6, _byte * 14 + 1, window.innerWidth / 4 + _byte * 5, _byte * 14 + 1, theme); // l shaped thing

  ctx.strokeStyle = limecolor;
  ctx.strokeRect(window.innerWidth / 4 + _byte * 2, _byte * 15, _byte * 2, _byte * 1); //drawline(window.innerWidth/4+byte*3-2,byte*15-1,window.innerWidth/4+byte*2+2,byte*15-1,theme);
  //drawline(window.innerWidth/4+byte*3-2,byte*15+1,window.innerWidth/4+byte*2+2,byte*15+1,theme);
  // block 9

  ctx.strokeStyle = limecolor;
  ctx.strokeRect(window.innerWidth / 4 + _byte * 2, _byte * 13, _byte * 1, _byte * 1); // intersections
  // cr = 0;
  // ctx.fillStyle = limecolor;
  // while (cr < intersection.length){
  //   ctx.fillRect(intersection[cr][0],intersection[cr][2],intersection[cr][1]-intersection[cr][0],intersection[cr][3]-intersection[cr][2]);
  //   cr += 1;
  // }
  // pusher blocks
  // cr = 0;
  // ctx.fillStyle = limecolor;
  // while (cr < rightpush.length){
  //   ctx.fillRect(rightpush[cr][0],rightpush[cr][2],rightpush[cr][1]-rightpush[cr][0],rightpush[cr][3]-rightpush[cr][2]);
  //   cr += 1;
  // }
  // cr = 0;
  // ctx.fillStyle = redcolor;
  // while (cr < leftpush.length){
  //   ctx.fillRect(leftpush[cr][0],leftpush[cr][2],leftpush[cr][1]-leftpush[cr][0],leftpush[cr][3]-leftpush[cr][2]);
  //   cr += 1;
  // }
  // cr = 0;
  // ctx.fillStyle = linecolor;
  // while (cr < uppush.length){
  //   ctx.fillRect(uppush[cr][0],uppush[cr][2],uppush[cr][1]-uppush[cr][0],uppush[cr][3]-uppush[cr][2]);
  //   cr += 1;
  // }
  // cr = 0;
  // ctx.fillStyle = yellowcolor;
  // while (cr < downpush.length){
  //   ctx.fillRect(downpush[cr][0],downpush[cr][2],downpush[cr][1]-downpush[cr][0],downpush[cr][3]-downpush[cr][2]);
  //   cr += 1;
  // }
} // put in in terms of bytes, ill add a converter
// assign blocks


var rightblockpre = [[3, 4, 8, 12], [1, 2, 2, 8], [3, 4, 2, 3], [10, 11, 9, 12], [3, 4, 4, 7], [1, 2, 11, 12], [1, 2, 13, 14], [1, 2, 15, 16], [3, 4, 13, 14], [4, 5, 14, 16], [7, 8, 1, 6], [5, 6, 6, 8], [6, 7, 9, 12], [7, 8, 13, 15], [6, 7, 15, 16], [9, 10, 2, 8], [11, 12, 4, 6], [14, 15, 3, 7], [13, 14, 2, 3], [16, 17, 1, 9], [11, 12, 9, 12], [14, 15, 9, 10], [14, 15, 11, 12], [15, 16, 13, 14], [16, 17, 12, 13], [9, 10, 13, 14], [10, 11, 14, 16], [13, 14, 13, 15], [12, 13, 15, 16], [16, 17, 14, 17], [8.5, 9.5, 9, 10]];
var leftblockpre = [[1, 2, 1, 9], [3, 4, 2, 8], [7, 8, 9, 12], [1, 2, 12, 17], [3, 4, 11, 12], [3, 4, 9, 10], [3, 4, 13, 14], [4, 5, 15, 16], [7, 8, 2, 3], [7, 8, 4, 5], [5, 6, 5, 7], [5, 6, 8, 9], [6, 7, 9, 12], [7, 8, 13, 14], [6, 7, 14, 16], [7, 8, 6, 7], [9, 10, 7, 8], [9, 10, 1, 6], [9, 10, 13, 15], [10, 11, 15, 16], [12, 13, 2, 3], [11, 12, 3, 7], [14, 15, 4, 6], [16, 17, 2, 8], [8.5, 9.5, 9, 10], [14, 15, 9, 12], [13, 14, 13, 14], [12, 13, 14, 16], [15, 16, 13, 15], [16, 17, 15, 16], [11.5, 12, 9, 12]];
var upblockpre = [[1, 8, 1, 2], [1, 2, 12, 13], [16, 17, 12, 13], [-20, 2, 10, 11], [7, 8, 10, 11], [10, 11, 10, 11], [15, 50, 10, 11], [2, 3, 8, 9], [2, 3, 12, 13], [2, 4, 16, 17], [4, 7, 3, 4], [4, 5, 7, 8], [5, 7, 5, 6], [4, 6, 12, 13], [4, 5, 14, 15], [5, 6, 16, 17], [6, 7, 14, 15], [7, 8, 8, 9], [7, 8, 9, 10], [10, 11, 9, 10], [7, 10, 16, 17], [7, 11, 12, 13], [6, 9, 8, 9], [8, 9, 6, 7], [9, 17, 1, 2], [11, 12, 3, 4], [14, 15, 3, 4], [12, 14, 6, 7], [10, 16, 8, 9], [12, 14, 12, 13], [10, 11, 14, 15], [11, 12, 16, 17], [12, 13, 14, 15], [13, 16, 16, 17], [15, 16, 12, 13], [16, 17, 14, 15], [1, 3, 10, 11], [15, 17, 10, 11], [1, 3, 9, 10], [15, 17, 9, 10], [2, 3, 14, 15]];
var downblockpre = [[3, 4, 14, 15], [2, 3, 1, 2], [1, 3, 8, 9], [-20, 2, 10, 11], [1, 2, 10, 11], [15, 50, 10, 11], [2, 3, 9, 10], [2, 3, 12, 13], [1, 17, 16, 17], [4, 7, 1, 2], [4, 7, 3, 4], [6, 7, 5, 6], [7, 9, 6, 7], [4, 5, 7, 8], [5, 6, 8, 9], [4, 7, 12, 13], [10, 11, 8, 9], [7, 8, 8, 9], [10, 11, 8, 9], [7, 8, 14, 15], [8, 9, 12, 13], [9, 10, 14, 15], [10, 13, 12, 13], [13, 14, 14, 15], [14, 15, 12, 13], [15, 16, 14, 15], [12, 14, 8, 9], [15, 17, 10, 11], [10, 12, 1, 2], [14, 16, 1, 2], [12, 14, 3, 4], [11, 15, 6, 7], [15, 17, 8, 10], [7, 11, 8, 9], [2, 3, 10, 11], [16, 17, 12, 13], [2, 3, 14, 15]];
var intersectionpre = [[3, 4, 1, 2], [12, 13, 1, 2], [13, 14, 1, 2], [3, 4, 3, 4], [7, 8, 3, 4], [7, 8, 5, 6], [9, 10, 6, 7], [3, 4, 7, 8], [3, 4, 8, 9], [5, 6, 7, 8], [6, 7, 8, 9], [9, 10, 8, 9], [11, 12, 8, 9], [14, 15, 8, 9], [12, 13, 3, 4], [13, 14, 3, 4], [3, 4, 10, 11], [3, 4, 12, 13], [6, 7, 12, 13], [11, 12, 12, 13], [14, 15, 12, 13], [7, 8, 12, 13], [9, 10, 12, 13], [13, 14, 12, 13], [15, 16, 12, 13], [1, 2, 14, 15], [3, 4, 14, 15], [4, 5, 16, 17], [6, 7, 16, 17], [10, 11, 16, 17], [12, 13, 16, 17], [1, 2, 1, 2], [1, 2, 8, 9], [7, 8, 1, 2], [9, 10, 1, 2], [16, 17, 1, 2], [11, 12, 3, 4], [11, 12, 6, 7], [14, 15, 3, 4], [14, 15, 6, 7], [5, 6, 5, 6], [7, 8, 6, 7], [5, 6, 8, 9], [16, 17, 8, 9], [1, 2, 12, 13], [1, 2, 16, 17], [4, 5, 14, 15], [6, 7, 14, 15], [7, 8, 14, 15], [9, 10, 14, 15], [10, 11, 14, 15], [12, 13, 14, 15], [13, 14, 14, 15], [15, 16, 14, 15], [16, 17, 14, 15], [16, 17, 16, 17], [16, 17, 12, 13]];
var rightpushpre = [[1, 7, 1, 2], [3, 7, 3, 4], [1, 3, 8, 9], [3, 5, 7, 8], [5, 7, 5, 6], [7, 9, 6, 7], [5, 8, 8, 9], [13, 14, 6, 7], [11, 12, 3, 4], [-2, 3, 10, 11], [1, 3, 12, 13], [4, 6, 12, 13], [9, 11, 12, 13], [2, 3, 14, 15], [6, 7, 14, 15], [12, 13, 14, 15], [2, 4, 16, 17], [5, 6, 16, 17], [9, 10, 16, 17]];
var leftpushpre = [[10, 17, 8, 9], [10, 17, 1, 2], [12, 13, 6, 7], [14, 15, 3, 4], [15, 18, 10, 11], [7, 9, 12, 13], [12, 14, 12, 13], [15, 17, 12, 13], [4, 5, 14, 15], [10, 11, 14, 15], [16, 17, 14, 15], [7, 9, 16, 17], [11, 12, 16, 17], [13, 16, 16, 17]];
var uppushpre = [[11, 12, 4, 7], [14, 15, 4, 7], [12, 14, 2, 4], [3, 4, 8, 15], [6, 7, 9, 13], [11, 12, 9, 13], [14, 15, 9, 13], [1, 2, 17, 13], [4, 5, 15, 17], [6, 7, 15, 17], [7, 8, 13, 15], [9, 10, 13, 15], [10, 11, 15, 17], [12, 13, 15, 17], [13, 14, 13, 15], [15, 16, 13, 15], [16, 17, 15, 17], [1, 2, 16, 17]];
var downpushpre = [[1, 2, 2, 8], [3, 4, 2, 7], [7, 8, 1, 6], [5, 6, 6, 8], [8, 10, 8, 9], [9, 10, 1, 8], [16, 17, 2, 8]];
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
_byte = 2 * ((window.innerHeight - 100) / (16 * 2.2));
var dotcolor;

if (theme == 'black') {
  dotcolor = "orange";
} else {
  dotcolor = "brown";
} // convert all the block coordinates into pixels


var ctr = 0;

while (ctr < rightblockpre.length) {
  var subjarr = [];
  subjarr.push(rightblockpre[ctr][0] * _byte + window.innerWidth / 4);
  subjarr.push(rightblockpre[ctr][1] * _byte + window.innerWidth / 4);
  subjarr.push(rightblockpre[ctr][2] * _byte);
  subjarr.push(rightblockpre[ctr][3] * _byte);
  rightblock.push(subjarr);
  ctr += 1;
} //console.log(rightblock);


ctr = 0;

while (ctr < leftblockpre.length) {
  var _subjarr = [];

  _subjarr.push(leftblockpre[ctr][0] * _byte + window.innerWidth / 4);

  _subjarr.push(leftblockpre[ctr][1] * _byte + window.innerWidth / 4);

  _subjarr.push(leftblockpre[ctr][2] * _byte);

  _subjarr.push(leftblockpre[ctr][3] * _byte);

  leftblock.push(_subjarr);
  ctr += 1;
}

ctr = 0;

while (ctr < upblockpre.length) {
  var _subjarr2 = [];

  _subjarr2.push(upblockpre[ctr][0] * _byte + window.innerWidth / 4);

  _subjarr2.push(upblockpre[ctr][1] * _byte + window.innerWidth / 4);

  _subjarr2.push(upblockpre[ctr][2] * _byte);

  _subjarr2.push(upblockpre[ctr][3] * _byte);

  upblock.push(_subjarr2);
  ctr += 1;
}

ctr = 0;

while (ctr < downblockpre.length) {
  var _subjarr3 = [];

  _subjarr3.push(downblockpre[ctr][0] * _byte + window.innerWidth / 4);

  _subjarr3.push(downblockpre[ctr][1] * _byte + window.innerWidth / 4);

  _subjarr3.push(downblockpre[ctr][2] * _byte);

  _subjarr3.push(downblockpre[ctr][3] * _byte);

  downblock.push(_subjarr3);
  ctr += 1;
} // intersection


ctr = 0;

while (ctr < intersectionpre.length) {
  var _subjarr4 = [];

  _subjarr4.push((intersectionpre[ctr][0] + 0.48) * _byte + window.innerWidth / 4);

  _subjarr4.push((intersectionpre[ctr][1] - 0.48) * _byte + window.innerWidth / 4);

  _subjarr4.push((intersectionpre[ctr][2] + 0.48) * _byte);

  _subjarr4.push((intersectionpre[ctr][3] - 0.48) * _byte);

  intersection.push(_subjarr4);
  ctr += 1;
} // pushers


ctr = 0;

while (ctr < rightpushpre.length) {
  var _subjarr5 = [];

  _subjarr5.push(rightpushpre[ctr][0] * _byte + window.innerWidth / 4);

  _subjarr5.push(rightpushpre[ctr][1] * _byte + window.innerWidth / 4);

  _subjarr5.push(rightpushpre[ctr][2] * _byte);

  _subjarr5.push(rightpushpre[ctr][3] * _byte);

  rightpush.push(_subjarr5);
  ctr += 1;
}

ctr = 0;

while (ctr < leftpushpre.length) {
  var _subjarr6 = [];

  _subjarr6.push(leftpushpre[ctr][0] * _byte + window.innerWidth / 4);

  _subjarr6.push(leftpushpre[ctr][1] * _byte + window.innerWidth / 4);

  _subjarr6.push(leftpushpre[ctr][2] * _byte);

  _subjarr6.push(leftpushpre[ctr][3] * _byte);

  leftpush.push(_subjarr6);
  ctr += 1;
}

ctr = 0;

while (ctr < uppushpre.length) {
  var _subjarr7 = [];

  _subjarr7.push(uppushpre[ctr][0] * _byte + window.innerWidth / 4);

  _subjarr7.push(uppushpre[ctr][1] * _byte + window.innerWidth / 4);

  _subjarr7.push(uppushpre[ctr][2] * _byte);

  _subjarr7.push(uppushpre[ctr][3] * _byte);

  uppush.push(_subjarr7);
  ctr += 1;
}

ctr = 0;

while (ctr < downpushpre.length) {
  var _subjarr8 = [];

  _subjarr8.push(downpushpre[ctr][0] * _byte + window.innerWidth / 4);

  _subjarr8.push(downpushpre[ctr][1] * _byte + window.innerWidth / 4);

  _subjarr8.push(downpushpre[ctr][2] * _byte);

  _subjarr8.push(downpushpre[ctr][3] * _byte);

  downpush.push(_subjarr8);
  ctr += 1;
}

var rightblockghost = rightblock; //.concat(intersection);

var leftblockghost = leftblock; //.concat(intersection);

var upblockghost = upblock; //.concat(intersection);

var downblockghost = downblock; //.concat(intersection);
// prob not needed but whatever

function drawcircle(x, y, rad, circlr) {
  ctx.beginPath();
  ctx.fillStyle = circlr;
  ctx.arc(x, y, rad, 0, 2 * Math.PI); //-((height)/(boardSize+2)/2)

  ctx.fill();
}

function cir(x, y, rad, circlr, start, end) {
  ctx.beginPath();
  ctx.fillStyle = circlr;
  ctx.arc(x, y, rad, start * Math.PI, end * Math.PI); //-((height)/(boardSize+2)/2)

  ctx.fill();
} // drawing pac man


function drawpac(x, y, rad, dir, openangle) {
  openangle = openangle * 2;
  ctx.beginPath(); //ctx.lineWidth = "10px"; NOT PX JUST INT

  ctx.fillStyle = "rgb(225,175,0)";
  ctx.strokeStyle = "rgb(225,175,0)";

  if (dir == "l") {
    ctx.arc(x, y, rad, 1.25 * Math.PI - 0.125 * Math.PI * openangle, Math.PI * 0.25 - 0.125 * Math.PI * openangle, false);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, y - 1, rad, 1.75 * Math.PI + 0.125 * Math.PI * openangle, Math.PI * 0.75 + 0.125 * Math.PI * openangle, false);
  }

  if (dir == "r") {
    ctx.arc(x, y, rad, 0.75 * Math.PI + 0.125 * Math.PI * openangle, Math.PI * 1.75 + 0.125 * Math.PI * openangle, false);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, y - 1, rad, 0.25 * Math.PI - 0.125 * Math.PI * openangle, Math.PI * 1.25 - 0.125 * Math.PI * openangle, false);
  }

  if (dir == "u") {
    ctx.arc(x, y, rad, 0.25 * Math.PI + 0.125 * Math.PI * openangle, Math.PI * 1.25 + 0.125 * Math.PI * openangle, false);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, y, rad, 1.75 * Math.PI - 0.125 * Math.PI * openangle, Math.PI * 0.75 - 0.125 * Math.PI * openangle, false);
  }

  if (dir == "d") {
    ctx.arc(x, y, rad, 0.75 * Math.PI - 0.125 * Math.PI * openangle, Math.PI * 1.75 - 0.125 * Math.PI * openangle, false);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, y, rad, 1.25 * Math.PI + 0.125 * Math.PI * openangle, Math.PI * 0.25 + 0.125 * Math.PI * openangle, false);
  } //ctx.arc(x, y, rad, 0.75 * Math.PI, 1 * Math.PI); //-((height)/(boardSize+2)/2)


  ctx.stroke();
  ctx.fill();
  ctx.beginPath();
  ctx.fillStyle = theme;
} //draw a ghost @manav @abhinav


function drawghost(x, y, rad, clr, dir) {
  //ctx.arc(x, y, rad, 0.75 * Math.PI, 1 * Math.PI); //-((height)/(boardSize+2)/2)
  ctx.beginPath();
  ctx.fillStyle = clr;
  ctx.strokeStyle = clr;
  ctx.arc(x, y, _byte / 2 * 0.75, 0, 2 * Math.PI);
  ctx.fill();
  ctx.beginPath();
  ctx.fillStyle = 'white';
  ctx.arc(x - _byte / 6, y - _byte / 7, _byte / 6, 0, 2 * Math.PI);
  ctx.arc(x + _byte / 6, y - _byte / 7, _byte / 6, 0, 2 * Math.PI);
  ctx.fill();
  ctx.beginPath();

  if (dir[0] > 0) {
    ctx.arc(x - _byte / 6 + _byte / 12, y - _byte / 7, _byte / 12, 0, 2 * Math.PI);
    ctx.arc(x + _byte / 6 + _byte / 12, y - _byte / 7, _byte / 12, 0, 2 * Math.PI);
  } else if (dir[0] < 0) {
    ctx.arc(x - _byte / 6 - _byte / 12, y - _byte / 7, _byte / 12, 0, 2 * Math.PI);
    ctx.arc(x + _byte / 6 - _byte / 12, y - _byte / 7, _byte / 12, 0, 2 * Math.PI);
  } else if (dir[1] > 0) {
    ctx.arc(x - _byte / 6, y - _byte / 7 + _byte / 12, _byte / 12, 0, 2 * Math.PI);
    ctx.arc(x + _byte / 6, y - _byte / 7 + _byte / 12, _byte / 12, 0, 2 * Math.PI);
  } else if (dir[1] < 0) {
    ctx.arc(x - _byte / 6, y - _byte / 7 - _byte / 12, _byte / 12, 0, 2 * Math.PI);
    ctx.arc(x + _byte / 6, y - _byte / 7 - _byte / 12, _byte / 12, 0, 2 * Math.PI);
  } else {
    ctx.arc(x - _byte / 6, y - _byte / 7, _byte / 12, 0, 2 * Math.PI);
    ctx.arc(x + _byte / 6, y - _byte / 7, _byte / 12, 0, 2 * Math.PI);
  }

  ctx.fillStyle = 'blue';
  ctx.fill();
  ctx.beginPath();
  ctx.fillStyle = clr;
  ctx.strokeStyle = clr;
  ctx.fillRect(x - _byte / 2 * 0.75, y, _byte * 0.75, _byte / 2 * 0.75);
  ctx.beginPath();
  ctx.fillStyle = 'rgba(0,0,0,1)';
  ctx.moveTo(x - _byte / 2 * 0.75, y + _byte / 2 * 0.75);
  ctx.lineTo(x - _byte / 2 * 0.75 + rad * 2 / 7, y + _byte / 2 * 0.75 - rad * 2 / 7);
  ctx.lineTo(x - _byte / 2 * 0.75 + 2 * rad * 2 / 7, y + _byte / 2 * 0.75);
  ctx.lineTo(x - _byte / 2 * 0.75, y + _byte / 2 * 0.75);
  ctx.fill();
  ctx.moveTo(x - _byte / 2 * 0.75 + 2.5 * rad * 2 / 7, y + _byte / 2 * 0.75);
  ctx.lineTo(x - _byte / 2 * 0.75 + 3.5 * rad * 2 / 7, y + _byte / 2 * 0.75 - rad * 2 / 7); //ctx.lineTo(x-byte/2*0.75+4*rad*2/7, y+byte/2*0.75-rad*2/7);

  ctx.lineTo(x - _byte / 2 * 0.75 + 4.5 * rad * 2 / 7, y + _byte / 2 * 0.75);
  ctx.lineTo(x - _byte / 2 * 0.75 + 2.5 * rad * 2 / 7, y + _byte / 2 * 0.75);
  ctx.fill();
  ctx.moveTo(x - _byte / 2 * 0.75 + 5 * rad * 2 / 7, y + _byte / 2 * 0.75);
  ctx.lineTo(x - _byte / 2 * 0.75 + 6 * rad * 2 / 7, y + _byte / 2 * 0.75 - rad * 2 / 7);
  ctx.lineTo(x - _byte / 2 * 0.75 + 7 * rad * 2 / 7, y + _byte / 2 * 0.75);
  ctx.fill(); // bridge covers

  ctx.fillStyle = theme;
  ctx.fillRect(window.innerWidth / 4 - _byte, _byte * 10, 2 * _byte - 15 * scalefactor, _byte);
  ctx.fillRect(window.innerWidth / 4 + _byte * 17 + 15 * scalefactor, _byte * 10, 2 * _byte - 15 * scalefactor, _byte);
} // dont think i asked


var canvas = document.querySelector('.myCanvas');
var ctx = canvas.getContext('2d');
var width = canvas.width = window.innerWidth / 2 + window.innerWidth / 4;
var height = canvas.height = window.innerHeight - 100;
var bounderies = [0, 0, 0, 0];
var score = 0;
var dir = 'r'; // canvas.style.left = "100px";
// canvas.style.top = "100px";
//canvas outline
//ctx.strokeStyle = 'rgb(125,125,125)';

ctx.fillStyle = theme;
ctx.fillRect(0, 0, width, height); //console.log('printeddd');

var speed = height / (boardSize + 2) / (200 - speedfactor) * 0.4; // 1/4 square/frame?

var basespeed = speed;
var xpos = height / (boardSize + 2) * 0.5 + height / (boardSize + 2) * 3 + window.innerWidth / 4;
var ypos = height / (boardSize + 2) * 0.5 + height / (boardSize + 2) * 10.25;
var startingpos = [xpos, ypos];
var thepos = [xpos, ypos];
var g1pos = [height / (boardSize + 2) * 0.5 + height / (boardSize + 2) * 7.25 + window.innerWidth / 4, height / (boardSize + 2) * 0.5 + height / (boardSize + 2) * 10.25];
var g2pos = [height / (boardSize + 2) * 0.5 + height / (boardSize + 2) * 8.25 + window.innerWidth / 4, height / (boardSize + 2) * 0.5 + height / (boardSize + 2) * 10.25];
var g3pos = [height / (boardSize + 2) * 0.5 + height / (boardSize + 2) * 9.25 + window.innerWidth / 4, height / (boardSize + 2) * 0.5 + height / (boardSize + 2) * 10.25];
var g4pos = [height / (boardSize + 2) * 0.5 + height / (boardSize + 2) * 10.25 + window.innerWidth / 4, height / (boardSize + 2) * 0.5 + height / (boardSize + 2) * 10.25];
var lastg1pos = [0, 0];
var lastg2pos = [0, 0];
var lastg3pos = [0, 0];
var lastg4pos = [0, 0];
var kickedoff1 = true;
var kickedoff2 = true;
var kickedoff3 = true;
var kickedoff4 = true;
var g1dir = [0, 0];
var g2dir = [0, 0];
var g3dir = [0, 0];
var g4dir = [0, 0];
var g1timer = 0;
var g2timer = 0;
var g3timer = 0;
var g4timer = 0;
var dotspos = [];
var eraseddots = [];
var thelastpos = [xpos, ypos];
var activated = false;
var activationclr = false;
var activationtimer = 0;
var active = [false, false, false, false];
var activatedarr = [false, false, false, false];
var got = [false, false, false, false];
var returng1 = false;
var returng2 = false;
var returng3 = false;
var returng4 = false;
var greturned = [false, false, false, false];
var returntimerg1 = 100;
var returntimerg2 = 100;
var returntimerg3 = 100;
var returntimerg4 = 100;
var xd = 0;
var yd = 0;
var waiter = '';
var waiter2 = '';
var waiter3 = '';
var startwaiter = false;
var applepos = [Math.floor(Math.random() * (boardSize - 2)) * height / (boardSize + 2) + window.innerWidth / 4 + height / (boardSize + 2) * 1.5 + height / (boardSize + 2), Math.floor(Math.random() * (boardSize - 2)) * height / (boardSize + 2) + height / (boardSize + 2) + height / (boardSize + 2) * 1.5];
var scalefactor = window.innerWidth / 2048;
var initxpos = xpos;
var initypos = ypos;
var breaker = false;
var snakeclr2 = "";
var eatwaiter = 0;
var lastapple = [0, 0];
var elapsedtime = 0;
var door = 0.01;

var _byte = 2 * (height / (boardSize * 2.2));

var basex = window.innerWidth / 4;
var start = Date.now();
var intropc = 0;
var firsttime;
var starting = true;
var oa = 1;
var od = 'c'; // initial drawboard

drawboard(); // actual start var no bs

var started = false;
var reader = localStorage.getItem('firsttime');

if (reader == null) {
  localStorage.setItem('firsttime', 'false');
  firsttime = true;
  closedintro = false;
}

speed = speed; //*(scalefactor);

var sleep = function sleep(ms) {
  return new Promise(function (res) {
    return setTimeout(res, ms);
  });
};

(function _callee() {
  var counter, ct, rejected1, _ct, _rejected, _ct2, _rejected2, _ct3, _rejected3, dotchecker, z1, z2, randnotif, musictime, renderellapse, sum, _avgfps, lps, deviation, newspeed, _openspace, _result, _result2, ct3, ct11, rejected, _ct4, _rejected4, _ct5, _rejected5, _ct6, _rejected6, z3, ending, intro1, playagain, openspace, leaderboard, endscore, endtime, pag, etg, dimmer, looper, looper1, alpha, alpha1;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          counter = 0;

        case 1:
          if (!true) {
            _context.next = 121;
            break;
          }

          // add some living condition later nah its fine i have a breaker
          ctx.clearRect(0, 0, canvas.width, canvas.height); //clear it obv
          //console.log(counter);
          //console.log(waiter);
          // pac man moving algorithm
          // upgrader updater
          // if in range then updatepos

          if (true && startwaiter) {
            // within bounderies
            if (xd > 0) {
              // moving right
              ct = 0;
              rejected1 = false;

              while (ct < rightblock.length && !rejected1) {
                if (thepos[0] >= rightblock[ct][0] + _byte / 2 && thepos[0] <= rightblock[ct][1] && thepos[1] >= rightblock[ct][2] && thepos[1] <= rightblock[ct][3]) {
                  rejected1 = true;
                }

                ct += 1;
              }

              if (!rejected1) {
                thepos = [thepos[0] + xd, thepos[1] + yd];
              }
            } else if (xd < 0) {
              // moving left
              _ct = 0;
              _rejected = false;

              while (_ct < leftblock.length && !_rejected) {
                if (thepos[0] >= leftblock[_ct][0] - _byte / 2 && thepos[0] <= leftblock[_ct][1] - _byte / 2 && thepos[1] >= leftblock[_ct][2] && thepos[1] <= leftblock[_ct][3]) {
                  _rejected = true;
                }

                _ct += 1;
              }

              if (!_rejected) {
                thepos = [thepos[0] + xd, thepos[1] + yd];
              }
            } else if (yd < 0) {
              // moving up
              _ct2 = 0;
              _rejected2 = false;

              while (_ct2 < upblock.length && !_rejected2) {
                if (thepos[0] >= upblock[_ct2][0] && thepos[0] <= upblock[_ct2][1] && thepos[1] >= upblock[_ct2][2] - _byte / 2 && thepos[1] <= upblock[_ct2][3] - _byte / 2) {
                  _rejected2 = true;
                }

                _ct2 += 1;
              }

              if (!_rejected2) {
                thepos = [thepos[0] + xd, thepos[1] + yd];
              }
            } else {
              // moving down
              _ct3 = 0;
              _rejected3 = false;

              while (_ct3 < downblock.length && !_rejected3) {
                if (thepos[0] >= downblock[_ct3][0] && thepos[0] <= downblock[_ct3][1] && thepos[1] >= downblock[_ct3][2] + _byte / 2 && thepos[1] <= downblock[_ct3][3] + _byte / 2) {
                  console.log('rejected down', _ct3);
                  _rejected3 = true;
                }

                _ct3 += 1;
              }

              if (!_rejected3) {
                thepos = [thepos[0] + xd, thepos[1] + yd];
              }
            } // bridge


            if (thepos[0] > window.innerWidth / 4 - _byte && thepos[0] < window.innerWidth / 4 && thepos[1] > _byte * 10 && thepos[1] < _byte * 11 && xd < 0) {
              thepos = [window.innerWidth / 4 + 18.5 * _byte, 10.5 * _byte];
            }

            if (thepos[0] > window.innerWidth / 4 + _byte * 18 && thepos[0] < window.innerWidth / 4 + _byte * 19 && thepos[1] > _byte * 10 && thepos[1] < _byte * 11 && xd > 0) {
              thepos = [window.innerWidth / 4 - 0.5 * _byte, 10.5 * _byte];
            } // ghost bridge ik i shud have made a funciton


            if (g1pos[0] > window.innerWidth / 4 - _byte && g1pos[0] < window.innerWidth / 4 && g1pos[1] > _byte * 10 && g1pos[1] < _byte * 11 && g1dir[0] < 0) {
              g1pos = [window.innerWidth / 4 + 18.5 * _byte, 10.5 * _byte];
            }

            if (g1pos[0] > window.innerWidth / 4 + _byte * 18 && g1pos[0] < window.innerWidth / 4 + _byte * 19 && g1pos[1] > _byte * 10 && g1pos[1] < _byte * 11 && g1dir[0] > 0) {
              g1pos = [window.innerWidth / 4 - 0.5 * _byte, 10.5 * _byte];
            }

            if (g2pos[0] > window.innerWidth / 4 - _byte && g2pos[0] < window.innerWidth / 4 && g2pos[1] > _byte * 10 && g2pos[1] < _byte * 11 && g2dir[0] < 0) {
              g2pos = [window.innerWidth / 4 + 18.5 * _byte, 10.5 * _byte];
            }

            if (g2pos[0] > window.innerWidth / 4 + _byte * 18 && g2pos[0] < window.innerWidth / 4 + _byte * 19 && g2pos[1] > _byte * 10 && g2pos[1] < _byte * 11 && g2dir[0] > 0) {
              g2pos = [window.innerWidth / 4 - 0.5 * _byte, 10.5 * _byte];
            }

            if (g3pos[0] > window.innerWidth / 4 - _byte && g3pos[0] < window.innerWidth / 4 && g3pos[1] > _byte * 10 && g3pos[1] < _byte * 11 && g3dir[0] < 0) {
              g3pos = [window.innerWidth / 4 + 18.5 * _byte, 10.5 * _byte];
            }

            if (g3pos[0] > window.innerWidth / 4 + _byte * 18 && g3pos[0] < window.innerWidth / 4 + _byte * 19 && g3pos[1] > _byte * 10 && g3pos[1] < _byte * 11 && g3dir[0] > 0) {
              g3pos = [window.innerWidth / 4 - 0.5 * _byte, 10.5 * _byte];
            }

            if (g4pos[0] > window.innerWidth / 4 - _byte && g4pos[0] < window.innerWidth / 4 && g4pos[1] > _byte * 10 && g4pos[1] < _byte * 11 && g4dir[0] < 0) {
              g4pos = [window.innerWidth / 4 + 18.5 * _byte, 10.5 * _byte];
            }

            if (g4pos[0] > window.innerWidth / 4 + _byte * 18 && g4pos[0] < window.innerWidth / 4 + _byte * 19 && g4pos[1] > _byte * 10 && g4pos[1] < _byte * 11 && g4dir[0] > 0) {
              g4pos = [window.innerWidth / 4 - 0.5 * _byte, 10.5 * _byte];
            }
          }

          if ((Date.now() - activationtimer) / 1000 >= 10 && (Date.now() - activationtimer) / 1000 < 10.25) {
            activationclr = false;
          } else if ((Date.now() - activationtimer) / 1000 >= 10.25 && (Date.now() - activationtimer) / 1000 < 10.5) {
            activationclr = true;
          } else if ((Date.now() - activationtimer) / 1000 >= 10.5 && (Date.now() - activationtimer) / 1000 < 10.75) {
            activationclr = false;
          } else if ((Date.now() - activationtimer) / 1000 >= 10.75 && (Date.now() - activationtimer) / 1000 < 11) {
            activationclr = true;
          } else if ((Date.now() - activationtimer) / 1000 >= 11 && (Date.now() - activationtimer) / 1000 < 11.25) {
            activationclr = false;
          } else if ((Date.now() - activationtimer) / 1000 >= 11.25 && (Date.now() - activationtimer) / 1000 < 11.5) {
            activationclr = true;
          } else if ((Date.now() - activationtimer) / 1000 >= 11.5) {
            activationclr = false;
            activated = false;
          }

          dotchecker = 0;

          while (dotchecker < dotspos.length) {
            // got it
            //got dots
            if (Math.abs(thepos[0] - dotspos[dotchecker][0]) < _byte / 8 && Math.abs(thepos[1] - dotspos[dotchecker][1]) < _byte / 8) {
              // basically it went over the thing but not on the bridge
              score += 1;

              if (counter >= 1) {
                z1 = document.getElementById('score');
                z1.textContent = 'Score: ' + score;
              } // sfx


              playeatsound += 1;

              if (playeatsound == 2) {
                playeatsound = 0;

                if (eatsfx) {
                  eatsound.pause();
                  eatsound.currentTime = 0.0;
                  eatsound.play();
                }
              } // notif


              z2 = document.getElementById('display');
              randnotif = Math.floor(Math.random() * 6);

              if (randnotif == 0) {
                randnotif = "Good job!";
              } else if (randnotif == 1) {
                randnotif = "Great job!";
              } else if (randnotif == 2) {
                randnotif = "Awesome!";
              } else if (randnotif == 3) {
                randnotif = "Nice!";
              } else if (randnotif == 4) {
                randnotif = "Cringe";
              } else if (randnotif == 5) {
                randnotif = "GG";
              }

              z2.textContent = randnotif; //console.log('score',score);

              eraseddots.push(dotspos[dotchecker]); // if you run over the activation dots got dots

              if (thepos[0] > window.innerWidth / 4 + _byte && thepos[0] < window.innerWidth / 4 + _byte * 2 && thepos[1] > _byte && thepos[1] < _byte * 2 && !active[0]) {
                activated = true;
                activationclr = true;
                activationtimer = Date.now();
                active[0] = true;
                activationarr = [true, true, true, true];
                greturned = [false, false, false, false];
                got = [false, false, false, false];
              } else if (thepos[0] > window.innerWidth / 4 + _byte * 16 && thepos[0] < window.innerWidth / 4 + _byte * 17 && thepos[1] > _byte && thepos[1] < _byte * 2 && !active[1]) {
                activated = true;
                activationclr = true;
                activationtimer = Date.now();
                active[1] = true;
                activationarr = [true, true, true, true];
                greturned = [false, false, false, false];
                got = [false, false, false, false];
              } else if (thepos[0] > window.innerWidth / 4 + _byte * 16 && thepos[0] < window.innerWidth / 4 + _byte * 17 && thepos[1] > _byte * 16 && thepos[1] < _byte * 17 && !active[2]) {
                activated = true;
                activationclr = true;
                activationtimer = Date.now();
                active[2] = true;
                activationarr = [true, true, true, true];
                greturned = [false, false, false, false];
                got = [false, false, false, false];
              } else if (thepos[0] > window.innerWidth / 4 + _byte && thepos[0] < window.innerWidth / 4 + _byte * 2 && thepos[1] > _byte * 16 && thepos[1] < _byte * 17 && !active[3]) {
                activated = true;
                activationclr = true;
                activationtimer = Date.now();
                active[3] = true;
                activationarr = [true, true, true, true];
                greturned = [false, false, false, false];
                got = [false, false, false, false];
              } // deactivate that dot pos


              dotspos[dotchecker] = [0, 0]; // is it that easy lmfao
            }

            dotchecker += 1;
          }

          musictime = audioElement.currentTime; //console.log('music',musictime);

          localStorage.setItem('musictime', String(musictime)); // store theme in storage

          localStorage.setItem('theme', theme); // whys it stuck at 3,4,3,4 fixer

          if (g1pos[0] > basex + _byte * 3 && g1pos[0] < basex + _byte * 4 && g1pos[1] > _byte * 3 && g1pos[1] < _byte * 4 && returng1) {
            g1dir = [0, 0.95 * speed];
            g1pos = [basex + _byte * 3.5, _byte * 4];
          }

          if (g2pos[0] > basex + _byte * 3 && g2pos[0] < basex + _byte * 4 && g2pos[1] > _byte * 3 && g2pos[1] < _byte * 4 && returng2) {
            g2dir = [0, 0.95 * speed];
            g2pos = [basex + _byte * 3.5, _byte * 4];
          }

          if (g3pos[0] > basex + _byte * 3 && g3pos[0] < basex + _byte * 4 && g3pos[1] > _byte * 3 && g3pos[1] < _byte * 4 && returng3) {
            g3dir = [0, 0.95 * speed];
            g3pos = [basex + _byte * 3.5, _byte * 4];
          }

          if (g4pos[0] > basex + _byte * 3 && g4pos[0] < basex + _byte * 4 && g4pos[1] > _byte * 3 && g4pos[1] < _byte * 4 && returng4) {
            g4dir = [0, 0.95 * speed];
            g4pos = [basex + _byte * 3.5, _byte * 4];
          } // set won if won


          if (!(score == 323)) {
            _context.next = 18;
            break;
          }

          won = true;
          elapsedtime = (Date.now() - start) / 1000;
          return _context.abrupt("break", 121);

        case 18:
          if (counter < 200) {
            // sort of unessacary for pac man ig
            // check fps
            renderellapse = Date.now() - lastfps;

            if (renderellapse < 0.5) {
              renderellapse = 6.5;
            }

            fpslst.push(renderellapse); //avgfps = (avgfps+renderellapse)/2;

            sum = fpslst.reduce(function (a, b) {
              return a + b;
            }, 0);
            _avgfps = sum / fpslst.length || 0; //console.log('avg'+fpslst);

            lastfps = Date.now(); // actually fps is not actual fps but delay between frames
            //console.log('acutal fps '+1/avgfps);
            // so basically adjust speed based on deviation from 6.5 ever 100 frames
            //avgfps = time between frames
            // so basically fps = 6.5 milisec between frames
            // lps = loops per sec

            lps = 1000 / _avgfps;
            deviation = 153 / lps; // more loops per sec, lesser 
            //console.log('delay in between frames is'+avgfps);
            //console.log('deviation from 153 lps is '+deviation);
            //bascially deviation is higher if delay is higher
            // adjustment

            newspeed = basespeed * ((deviation - 1) * 0.9 + 1);

            if (newspeed > speed) {
              speed = speed * 1.01;
            } else if (newspeed < speed) {
              speed = speed * 0.99;
            }
          } // we do need timer


          if (counter >= 1 && startwaiter) {
            if (starting) {
              start = Date.now();
              starting = false;
            }

            elapsedtime = (Date.now() - start) / 1000;
            document.getElementById('time').innerHTML = 'Time: ' + elapsedtime + " sec";
          } // reset counter


          if (!startwaiter) {
            counter = 1;
          } // resize html


          if (counter >= 1) {
            btn = document.getElementById('best');
            btn.innerHTML = "Best: " + best;
            cvs = document.getElementById('canvas-container');
            _openspace = window.innerWidth / 2;
            _openspace = (_openspace - _byte * (boardSize + 2)) / 2;
            cvs.style.left = _openspace + 'px';
          } // draw stuff


          drawboard();
          drawpac(thepos[0], thepos[1], height / (boardSize * 2.2) * 0.75, dir, oa);

          if (activationclr && !got[0]) {
            drawghost(g1pos[0], g1pos[1], height / (boardSize * 2.2) * 0.75, 'blue', g1dir);
          } else {
            drawghost(g1pos[0], g1pos[1], height / (boardSize * 2.2) * 0.75, 'pink', g1dir);
          }

          if (activationclr && !got[1]) {
            drawghost(g2pos[0], g2pos[1], height / (boardSize * 2.2) * 0.75, 'blue', g2dir);
          } else {
            drawghost(g2pos[0], g2pos[1], height / (boardSize * 2.2) * 0.75, 'red', g2dir);
          }

          if (activationclr && !got[2]) {
            drawghost(g3pos[0], g3pos[1], height / (boardSize * 2.2) * 0.75, 'blue', g3dir);
          } else {
            drawghost(g3pos[0], g3pos[1], height / (boardSize * 2.2) * 0.75, 'orange', g3dir);
          }

          if (activationclr && !got[3]) {
            drawghost(g4pos[0], g4pos[1], height / (boardSize * 2.2) * 0.75, 'blue', g4dir);
          } else {
            drawghost(g4pos[0], g4pos[1], height / (boardSize * 2.2) * 0.75, 'teal', g4dir);
          } // stopper


          if (counter >= 525) {// adssf();
          }

          if (inghostbox(g1pos) && !kickedoff1) {
            activatedarr[0] = false;
            g1dir = [0, -speed * 0.95];
            got[0] = true;
            returng1 = false;
            greturned[0] = true;
          }

          if (inghostbox(g2pos) && !kickedoff2) {
            activatedarr[1] = false;
            g2dir = [0, -speed * 0.95];
            got[1] = true;
            returng2 = false;
            greturned[1] = true;
          }

          if (inghostbox(g3pos) && !kickedoff3) {
            activatedarr[2] = false;
            g3dir = [0, -speed * 0.95];
            got[2] = true;
            returng3 = false;
            greturned[2] = true;
          }

          if (inghostbox(g4pos) && !kickedoff4) {
            activatedarr[3] = false;
            g4dir = [0, -speed * 0.95];
            got[3] = true;
            returng4 = false;
            greturned[3] = true;
          } // ghost mover for gh1


          if (!returng1 && !activatedarr[0]) {
            _result = moveghost(g1pos, g1dir, g1timer);
            g1pos = _result[0];
            g1dir = _result[1];
            g1timer = _result[2];
          } else {
            _result2 = returnghost(g1pos, g1dir);
            g1pos = _result2[0];
            g1dir = _result2[1];
            g1pos = [g1pos[0] + g1dir[0], g1pos[1] + g1dir[1]];
          } // ghostmover for ghost 2


          if (!returng2 && !activatedarr[1]) {
            result = moveghost(g2pos, g2dir, g2timer);
            g2pos = result[0];
            g2dir = result[1];
            g2timer = result[2];
          } else {
            result = returnghost(g2pos, g2dir);
            g2pos = result[0];
            g2dir = result[1];
            g2pos = [g2pos[0] + g2dir[0], g2pos[1] + g2dir[1]];
          } // move ghost 3


          if (!returng3 && !activatedarr[2]) {
            result = moveghost(g3pos, g3dir, g3timer);
            g3pos = result[0];
            g3dir = result[1];
            g3timer = result[2];
          } else {
            result = returnghost(g3pos, g3dir);
            g3pos = result[0];
            g3dir = result[1];
            g3pos = [g3pos[0] + g3dir[0], g3pos[1] + g3dir[1]];
          } // move ghost 4


          if (!returng4 && !activatedarr[3]) {
            result = moveghost(g4pos, g4dir, g4timer);
            g4pos = result[0];
            g4dir = result[1];
            g4timer = result[2];
          } else {
            result = returnghost(g4pos, g4dir);
            g4pos = result[0];
            g4dir = result[1];
            g4pos = [g4pos[0] + g4dir[0], g4pos[1] + g4dir[1]];
          } // if pacman is stuck in one pos for some time then kick it off in a random dir


          if (lastg1pos == g1pos && !kickedoff1) {
            g1dir = getranddir();
          }

          if (lastg2pos == g2pos && !kickedoff2) {
            g2dir = getranddir();
          }

          if (lastg3pos == g3pos && !kickedoff3) {
            g3dir = getranddir();
          }

          if (lastg4pos == g4pos && !kickedoff4) {
            g4dir = getranddir();
          } // updtae last poses


          lastg1pos = g1pos;
          lastg2pos = g2pos;
          lastg3pos = g3pos;
          lastg4pos = g4pos; // ghost timer for kicking off

          if (counter > 100 && !testingmode && startwaiter) {
            if (g1pos[0] < window.innerWidth / 4 + _byte * 9 && kickedoff1) {
              g1dir = [speed * 0.95, 0];
            } else if (g1pos[1] >= _byte * 8.5 && kickedoff1) {
              g1dir = [0, -speed * 0.95];
            } else if (kickedoff1) {
              g1dir = [-speed * 0.95, 0];
              kickedoff1 = false;
            }
          }

          if (counter > 500 && !testingmode && startwaiter) {
            if (g2pos[1] >= _byte * 8.5 && kickedoff2) {
              g2dir = [0, -speed * 0.95];
            } else if (kickedoff2) {
              g2dir = [speed * 0.95, 0];
              kickedoff2 = false;
            }
          }

          if (counter > 900 && !testingmode && startwaiter) {
            if (g3pos[1] >= _byte * 8.5 && kickedoff3) {
              g3dir = [0, -speed * 0.95];
            } else if (kickedoff3) {
              g3dir = [-speed * 0.95, 0];
              kickedoff3 = false;
            }
          }

          if (counter > 1300 && !testingmode && startwaiter) {
            console.log('counter ok');

            if (g4pos[0] > window.innerWidth / 4 + _byte * 9 && kickedoff4) {
              console.log('kicking off...');
              g4dir = [-speed * 0.95, 0];
            } else if (g4pos[1] >= _byte * 8.5 && kickedoff4) {
              g4dir = [0, -speed * 0.95];
            } else if (kickedoff4) {
              g4dir = [speed * 0.95, 0];
              kickedoff4 = false;
            }
          }

          returntimerg1 += 1;
          returntimerg2 += 1;
          returntimerg3 += 1;
          returntimerg4 += 1; // lose if ghost overlap
          // lost

          if (!(Math.abs(thepos[0] - g1pos[0]) < _byte / 6 && Math.abs(thepos[1] - g1pos[1]) < _byte / 8)) {
            _context.next = 65;
            break;
          }

          if (!((!activated || activated && got[0]) && !greturned[0] && returntimerg1 >= 100 || greturned[0])) {
            _context.next = 60;
            break;
          }

          // figure this out got it letsgooo
          breaker = true;
          lost = true;
          return _context.abrupt("break", 121);

        case 60:
          returntimerg1 = 0;
          returng1 = true;
          activatedarr[0] = false;
          got[0] = true;

          if (sfx) {
            eatghostsound.currentTime = 0.0;
            eatghostsound.play();
          }

        case 65:
          if (!(Math.abs(thepos[0] - g2pos[0]) < _byte / 6 && Math.abs(thepos[1] - g2pos[1]) < _byte / 8)) {
            _context.next = 77;
            break;
          }

          if (!((!activated || activated && got[1]) && !greturned[1] && returntimerg2 >= 100 || greturned[1])) {
            _context.next = 72;
            break;
          }

          breaker = true;
          lost = true;
          return _context.abrupt("break", 121);

        case 72:
          returntimerg2 = 0;
          returng2 = true;
          activatedarr[1] = false;
          got[1] = true;

          if (sfx) {
            eatghostsound.currentTime = 0.0;
            eatghostsound.play();
          }

        case 77:
          if (!(Math.abs(thepos[0] - g3pos[0]) < _byte / 6 && Math.abs(thepos[1] - g3pos[1]) < _byte / 8)) {
            _context.next = 89;
            break;
          }

          if (!((!activated || activated && got[2]) && !greturned[2] && returntimerg3 >= 100 || greturned[2])) {
            _context.next = 84;
            break;
          }

          breaker = true;
          lost = true;
          return _context.abrupt("break", 121);

        case 84:
          returntimerg3 = 0;
          returng3 = true;
          activatedarr[2] = false;
          got[2] = true;

          if (sfx) {
            eatghostsound.currentTime = 0.0;
            eatghostsound.play();
          }

        case 89:
          if (!(Math.abs(thepos[0] - g4pos[0]) < _byte / 6 && Math.abs(thepos[1] - g4pos[1]) < _byte / 8)) {
            _context.next = 101;
            break;
          }

          if (!((!activated || activated && got[3]) && !greturned[3] && returntimerg4 >= 100 || greturned[3])) {
            _context.next = 96;
            break;
          }

          breaker = true;
          lost = true;
          return _context.abrupt("break", 121);

        case 96:
          returntimerg4 = 0;
          returng4 = true;
          activatedarr[3] = false;
          got[3] = true;

          if (sfx) {
            eatghostsound.currentTime = 0.0;
            eatghostsound.play();
          }

        case 101:
          // name storer
          if (lastname != nameinput.value) {
            name1 = nameinput.value;

            if (checkcensor(name1)) {
              // true means bad
              name1 = 'Censored';
              nameinput.value = 'Censored';
            }

            namedisp.textContent = name1;
            localStorage.setItem('name', name1);
          }

          lastname = name1; // pacman mouth mover
          // idk why i named them oa and od
          // oa is the opening angle a decimal 0 to 1 of the percentage of opening
          // od is the direction its currently going in o = opening c = closing
          // stop pac man mouth opening and closing if its not moving

          if (thepos == thelastpos) {
            if (started && oa >= 0.25) {
              oa -= 0.04;
            }
          } else {
            if (od == 'c' && started) {
              oa -= 0.04;
            } else if (started) {
              oa += 0.04;
            }
          } // lmao


          if (oa <= 0 && thepos != thelastpos) {
            od = 'o';
          }

          if (oa >= 1) {
            od = 'c';
          } // end updaters


          thelastpos = thepos;
          xpos += xd;
          ypos += yd;
          counter += 1;
          _context.next = 112;
          return regeneratorRuntime.awrap(sleep(2));

        case 112:
          //console.log('drew at '+xpos+' '+ypos);
          eatwaiter -= 1; // turns the pacman based on waiter
          // turner

          ct3 = window.innerWidth / 4; //console.log(ypos,thepos);

          while (ct3 < thepos[0] + _byte / 2 + height / (boardSize + 2)) {
            if (Math.abs(ct3 - (thepos[0] + _byte / 2)) < 5) {
              if (waiter == 'up') {
                ct11 = 0;
                rejected = false;

                while (ct11 < upblock.length && !rejected) {
                  //console.log('rb'+upblock[ct11]);
                  if (thepos[0] >= upblock[ct11][0] && thepos[0] <= upblock[ct11][1] && thepos[1] >= upblock[ct11][2] && thepos[1] <= upblock[ct11][3]) {
                    // nopt allowed
                    //console.log('rejected',ct11);
                    rejected = true;
                  } else {//console.log('broke1');
                  }

                  ct11 += 1;
                }

                if (!rejected) {
                  thepos = [ct3 - _byte / 2, thepos[1]];
                  xd = 0;
                  yd = -speed;
                  dir = 'u';
                  waiter = '';
                }
              } else if (waiter == 'down') {
                _ct4 = 0;
                _rejected4 = false;

                while (_ct4 < downblock.length && !_rejected4) {
                  //console.log('rb'+downblock[ct11]);
                  if (thepos[0] >= downblock[_ct4][0] && thepos[0] <= downblock[_ct4][1] && thepos[1] >= downblock[_ct4][2] && thepos[1] <= downblock[_ct4][3]) {
                    // nopt allowed
                    //console.log('rejected',ct11);
                    _rejected4 = true;
                  } else {//console.log('broke1');
                  }

                  _ct4 += 1;
                }

                if (!_rejected4) {
                  thepos = [ct3 - _byte / 2, thepos[1]];
                  xd = 0;
                  yd = speed;
                  dir = 'd';
                  waiter = '';
                }
              } //console.log('broke2');


              waiter2 = '';
              waiter3 = '';
            }

            ct3 += height / (boardSize + 2) * 1.025;
          }

          ct3 = height / (boardSize + 2) / 2;

          while (ct3 < thepos[1] + height / (boardSize + 2)) {
            if (Math.abs(ct3 - thepos[1]) < 5) {
              if (waiter == 'right') {
                _ct5 = 0;
                _rejected5 = false;

                while (_ct5 < rightblock.length && !_rejected5) {
                  //console.log('rb'+rightblock[ct11]);
                  if (thepos[0] >= rightblock[_ct5][0] && thepos[0] <= rightblock[_ct5][1] && thepos[1] >= rightblock[_ct5][2] && thepos[1] <= rightblock[_ct5][3]) {
                    // nopt allowed
                    //console.log('rejected',ct11);
                    _rejected5 = true;
                  } else {//console.log('broke1');
                  }

                  _ct5 += 1;
                }

                if (!_rejected5) {
                  thepos = [thepos[0], ct3];
                  xd = speed;
                  yd = 0;
                  dir = 'r';
                  waiter = '';
                }
              } else if (waiter == 'left') {
                _ct6 = 0;
                _rejected6 = false;

                while (_ct6 < leftblock.length && !_rejected6) {
                  //console.log('rb'+leftblock[ct11]);
                  if (thepos[0] >= leftblock[_ct6][0] && thepos[0] <= leftblock[_ct6][1] && thepos[1] >= leftblock[_ct6][2] && thepos[1] <= leftblock[_ct6][3]) {
                    // nopt allowed
                    //console.log('rejected',ct11);
                    _rejected6 = true;
                  } else {//console.log('broke1');
                  }

                  _ct6 += 1;
                }

                if (!_rejected6) {
                  thepos = [thepos[0], ct3];
                  xd = -speed;
                  yd = 0;
                  dir = 'l';
                  waiter = '';
                }
              }

              waiter2 = '';
              waiter3 = '';
            }

            ct3 += height / (boardSize + 2) * 1.02;
          } //   ct1 += (height)/(boardSize+2);


          if (!breaker) {
            _context.next = 119;
            break;
          }

          return _context.abrupt("break", 121);

        case 119:
          _context.next = 1;
          break;

        case 121:
          // turn off main music
          audioElement.pause(); //console.log('did whole thing');

          z3 = document.getElementById('display'); //won = true;
          // lost lose or won

          if (won) {
            _context.next = 131;
            break;
          }

          if (sfx) {
            deathsound.currentTime = 0.0;
            deathsound.play();
            ghosteatspacman.currentTime = 0.0;
            ghosteatspacman.play();
          }

          z3.textContent = 'Game over! reload to play again'; //alert('You lost! stop ok ik we need to make an end screen');
          // all db stuff goes in here
          // all db stuff goes in here

          if (!(lastname == null || lastname.length <= 1)) {
            _context.next = 128;
            break;
          }

          return _context.abrupt("return");

        case 128:
          fetch("https://wfcdaj.deta.dev/insert?username=".concat(lastname, "&score=").concat(score, "&time=").concat(elapsedtime), {
            method: "POST",
            mode: "cors"
          }).then(function (resp) {
            return resp.text();
          }).then(function (text) {
            if (text != "yeet") {
              console.log("INSERT FAILED");
            }
          });
          _context.next = 133;
          break;

        case 131:
          if (sfx) {
            winsound.currentTime = 0.0;
            winsound.play();
          }

          z3.textContent = 'GG you won! reload to play again'; //alert('You Won! stop ok ik we need to make an end screen');

        case 133:
          // send to leaderboard
          //end screen and animation
          ending = document.getElementById('gameover');
          ending.style.width = _byte * (boardSize - 2) + "px";
          ending.style.top = window.innerHeight / 2 - ending.height / 8 + "px";
          ending.style.left = window.innerWidth / 2 - _byte * (boardSize - 2) / 2 + "px";
          intro1 = document.getElementById('gameover-cover');
          intro1.style.left = window.innerWidth / 4 + "px";
          intro1.style.width = window.innerWidth / 2 + "px";
          intro1.style.top = '0px';
          intro1.style.height = '100%';
          playagain = document.getElementById('playagain');
          openspace = window.innerWidth / 2;
          playagain.style.left = (openspace - _byte * (boardSize + 2)) / 2 + window.innerWidth / 4 + _byte * 2 + "px";
          playagain.style.width = _byte * 6 + "px";
          playagain.style.top = _byte * 3.33 + 'px';
          playagain.style.height = _byte * 6 + "px";
          leaderboard = document.getElementById('leaderboard-btn');
          leaderboard.style.left = (openspace - _byte * (boardSize + 2)) / 2 + window.innerWidth / 4 + _byte * 10 + "px";
          leaderboard.style.width = _byte * 6 + "px";
          leaderboard.style.top = _byte * 3.33 + 'px';
          leaderboard.style.height = _byte * 6 + "px";
          endscore = document.getElementById('endscore');
          endscore.textContent = "Score: " + score;
          endscore.style.left = window.innerWidth / 2 - 100 + "px";
          endscore.style.top = _byte * 13 + 'px';
          endtime = document.getElementById('endtime');
          endtime.textContent = "Time: " + elapsedtime;
          endtime.style.left = window.innerWidth / 2 - 125 + "px";
          endtime.style.top = _byte * 15 + 'px';
          pag = document.getElementById('playagain-glow');
          pag.style.left = (openspace - _byte * (boardSize + 2)) / 2 + window.innerWidth / 4 + _byte * 2 - 10 + "px";
          pag.style.width = _byte * 6 + 20 + "px";
          pag.style.top = _byte * 3.33 - 10 + 'px';
          pag.style.height = _byte * 6 + 20 + "px";
          etg = document.getElementById('leaderboard-glow');
          etg.style.left = (openspace - _byte * (boardSize + 2)) / 2 + window.innerWidth / 4 + _byte * 10 - 10 + "px";
          etg.style.width = _byte * 6 + 20 + "px";
          etg.style.top = _byte * 3.33 - 10 + 'px';
          etg.style.height = _byte * 6 + 20 + "px";
          dimmer = 0;

        case 172:
          if (!(dimmer < 0.5)) {
            _context.next = 184;
            break;
          }

          intro1.style.backgroundImage = 'linear-gradient(rgba(0,0,0,' + dimmer + '), rgb(0,0,0,' + (0.5 - 0.5 * (0.5 - dimmer)) + '))';
          dimmer = (0.51 - dimmer) / 20 + dimmer;
          ending.style.top = dimmer / 0.5 * (window.innerHeight / 2 - ending.height / 8) + "px";
          playagain.style.top = dimmer / 0.5 * (_byte * 3.33) + 'px';
          leaderboard.style.top = dimmer / 0.5 * (_byte * 3.33) + 'px';
          endscore.style.top = dimmer / 0.5 * _byte * 13 + 'px';
          endtime.style.top = dimmer / 0.5 * _byte * 15 + 'px';
          _context.next = 182;
          return regeneratorRuntime.awrap(sleep(2));

        case 182:
          _context.next = 172;
          break;

        case 184:
          _context.next = 186;
          return regeneratorRuntime.awrap(sleep(250));

        case 186:
          dimmer = 0.5;
          looper = 0;
          looper1 = -1020;
          alpha = 1;
          alpha1 = 1;

        case 191:
          if (!true) {
            _context.next = 206;
            break;
          }

          if (looper < 100) {
            alpha = looper / 100;
          } else if (looper > 920) {
            alpha = (1020 - looper) / 100;
          } else {
            alpha = 1;
          }

          if (looper1 < 100) {
            alpha1 = looper1 / 100;
          } else if (looper1 > 920) {
            alpha1 = (1020 - looper1) / 100;
          } else {
            alpha1 = 1;
          }

          intro1.style.backgroundImage = 'linear-gradient(rgba(0,0,0,' + dimmer + '), rgb(0,0,0,' + (0.5 - 0.5 * (0.5 - dimmer)) + '))';
          dimmer = (1.51 - dimmer) / 200 + dimmer;
          pag.style.backgroundColor = 'rgba(' + (255 - Math.abs(255 - looper)) + ',' + (255 - Math.abs(510 - looper)) + ',' + (255 - Math.abs(765 - looper)) + ',' + alpha + ')';
          etg.style.backgroundColor = 'rgba(' + (255 - Math.abs(255 - looper1)) + ',' + (255 - Math.abs(510 - looper1)) + ',' + (255 - Math.abs(765 - looper1)) + ',' + alpha1 + ')';

          if (looper >= 1020 * 2) {
            looper = 0;
          }

          if (looper1 >= 1020 * 2) {
            looper1 = 0;
          }

          looper += 3;
          looper1 += 3;
          _context.next = 204;
          return regeneratorRuntime.awrap(sleep(2));

        case 204:
          _context.next = 191;
          break;

        case 206:
        case "end":
          return _context.stop();
      }
    }
  });
})();

(function _callee2() {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          window.addEventListener("keydown", function (event) {
            if (!started) {
              counter = 0;
            }

            started = true;

            if (event.defaultPrevented) {
              return;
            }

            if (!startwaiter && closedintro) {
              xd = speed;
              startwaiter = true;
              counter = 0;
              var z = document.getElementById('display');
              z.textContent = 'Start';
              fpslst = [];
              lastfps = Date.now();
            }

            var ctx = canvas.getContext('2d');
            var actkey = event.code.replace('Key', '');
            var filterletters = 'QWERTYUIOPASDFGHJKLZXCVBNM'; //console.log('pressed'+actkey);

            if (lost && actkey == 'P' && closedintro) {
              location.reload();
            }

            if (lost && actkey == "L" && closedintro) {
              window.location.href = 'https://skparab1.github.io/snake/leaderboard.html';
            } // we only need 1 waiter


            if (actkey == 'ArrowLeft' || actkey == 'A') {
              waiter = 'left';
            }

            if (actkey == 'ArrowRight' || actkey == 'D') {
              waiter = 'right';
            }

            if (actkey == 'ArrowUp' || actkey == 'W') {
              waiter = 'up';
            }

            if (actkey == 'ArrowDown' || actkey == 'S') {
              waiter = 'down';
            }

            console.log(waiter);
          }, true);

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
})();