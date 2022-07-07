"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// this is just to force resiez
//window.reload();
// act nvm
var audioElement = new Audio('audio.mp3');
audioElement.addEventListener("canplaythrough", function (event) {
  /* the audio is now playable; play it if permissions allow */
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
});
audioElement.controls = true;
audioElement.loop = true;
var volume = document.querySelector("#volume-control");
volume.addEventListener("change", function (e) {
  audioElement.volume = e.currentTarget.value / 100;
}); // alr anindit here are the toggle constants

var boardSize = 16; //so 20 means 20x20 and 40 would be 40x40 and you can change it to anything you want

var speedfactor = 189; //directly porportional to these many pixels per second (but not exactly)

var pixelbackground1 = 'rgb(0,0,0)'; // this is like the pixel background pattern

var pixelbackground2 = 'rgb(0,0,0)'; // its in rgb but you can make it hex or hsv if u want
// emphasis background colors

var pixelbackground1EMP = 'rgb(0,120,0)';
var pixelbackground2EMP = 'rgb(0,160,0)';
var bordercolor = 'rgb(100,100,100)'; //bordercolor

var snakecolor1 = 'rgb(0,0,100)'; //snakecolor1

var snakecolor2 = 'rgb(0,0,255)'; //snakecolor2

var snakeheadcolor = 'rgb(200,100,0)'; //apple color
// arrays for the same things above for logistical things

var snakecolor1ARR = [0, 100, 0]; //snakecolor1

var snakecolor2ARR = [0, 0, 255]; //snakecolor2

var snakeheadcolorARR = [200, 100, 0];
; //apple color

var eyesize = 2; // squarelength/this pixels

var applecolor = 'rgb(150,0,0)'; //apple color

var seglength = 75; //snake segment length in pixels

var addlength = 30; //increase snake length by these many pixels when it eats an apple

var borderleniance = 0.5; // the game will ignore a wall hit as long as it is less than 0.5 boxes away from the border

var rendertime = 10; // render every 10 snake circles

var endcurtainspeed = 0.25; // seconds wait in between frames of each pixel expansion (for game over animation)

var autopilot = false; // this is for fun but it turns on with the localstorage reader

var lost = false;
var theme = "black";
var best = localStorage.getItem("bestpac");
var lastfps = Date.now();
var avgfps = 0;
var fpslst = [];
var snakeclr4 = "1aP";
var censored = "tawt;erohw a fo nos;hctib a fo nos;tuls;rekcufretsis;ssa tihs;tihs;kcirp;ssip;aggin;rekcufrehtom;tihs ni;tihsesroh;tihs yloh;lleh;nmadsdog;nmaddog;kcuf;reggirf;rekcufrehtaf;gniffe;nmad;tnuc;parc;rekcuskcoc;kcoc;rekcuf-dlihc;tihsllub;reggub;rekcufrehtorb;skcollob;hctib;dratsab;elohssa;ssa;esra";
censored = censored.split("").reverse().join("").split(";");
var firstrender = true; //console.log(censored);

if (localStorage.getItem("pac") == null) {
  localStorage.setItem("bestpac", 0); //openintro();

  best = 0;
} //console.log('best',best);


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
} // dont do anythign below this


var turningPrecision = true;
snakeclr4 += "EJSX";

function drawline(x, y, x1, y1, clr) {
  ctx.beginPath();
  ctx.lineWidth = 4 * scalefactor;
  ctx.strokeStyle = clr;
  ctx.fillStyle = clr;
  ctx.moveTo(x, y);
  ctx.lineTo(x1, y1);
  ctx.stroke();
}

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

function getoppdir(dir) {
  return [-dir[0], -dir[1]];
}

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
}

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
}

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
}

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
}

function drawboard() {
  ctx.beginPath();
  var x = 0;
  var actx = window.innerWidth / 4 + _byte;
  var clrnow = pixelbackground1; // clear else keeps adding

  while (x < boardSize * 2 - 1) {
    var y = 0;
    var acty = _byte / 2;

    while (y < boardSize * 2 - 1) {
      acty += height / (boardSize + 2) * 0.51;
      y += 1; // grid
      //ctx.strokeRect(actx,acty,(height)/(boardSize+2),(height)/(boardSize+2));
      //dots

      ctx.fillStyle = 'orange';
      var ed = 0;
      var deactivated = false;

      while (ed < eraseddots.length) {
        if (Math.abs(eraseddots[ed][0] - (actx + _byte / 2 + _byte / 20)) < _byte / 4 && Math.abs(eraseddots[ed][1] - (acty + _byte / 2 + _byte / 20)) < _byte / 4) {
          deactivated = true;
        }

        ed += 1;
      }

      if (!deactivated) {
        ctx.fillRect(actx + _byte / 2, acty + _byte / 2, height / (boardSize + 2) / 10, height / (boardSize + 2) / 10);
      } //console.log(eraseddots.length);


      if (firstrender) {
        dotspos.push([actx + _byte / 2 + _byte / 20, acty + _byte / 2 + _byte / 20]);
      }
    }

    actx += height / (boardSize + 2) * 0.51;
    x += 1;
  }

  firstrender = false; // the exit dot overlay

  ctx.fillStyle = "black";
  ctx.fillRect(window.innerWidth / 4 + _byte * 1, _byte * 9 - 4, _byte * 2 + 4, _byte * 2 + 8);
  ctx.fillRect(window.innerWidth / 4 + _byte * 15 - 4, _byte * 9 - 4, _byte * 2 + 8, _byte * 2 + 8);
  var linecolor = "rgb(42, 198, 250)";
  ctx.strokeStyle = linecolor;
  ctx.lineWidth = 4 * scalefactor;
  var leniance = height / (boardSize + 2) * borderleniance;
  bounderies = [window.innerWidth / 4 + height / (boardSize + 2) * 1.5 - leniance + 10 * scalefactor, height / (boardSize + 2) * 1.5 - leniance + 10 * scalefactor, window.innerWidth / 4 + height * ((boardSize - 1) / boardSize) - height / (boardSize + 2) / 2.5 + leniance - 10 * scalefactor, height * (boardSize - 1) / boardSize - height / (boardSize + 2) / 2 + leniance - 10 * scalefactor];
  ctx.strokeRect(window.innerWidth / 4 + height / (boardSize + 2), height / (boardSize + 2), _byte * boardSize, _byte * boardSize);
  ctx.strokeRect(window.innerWidth / 4 + height / (boardSize + 2) - 10 * scalefactor, height / (boardSize + 2) - 10 * scalefactor, _byte * boardSize + 20 * scalefactor, _byte * boardSize + 20 * scalefactor); // some dot cover fillrects

  ctx.fillRect(window.innerWidth / 4 + _byte * 1, _byte * 11, _byte * 2 + 4, _byte * 1 + 4);
  ctx.fillRect(window.innerWidth / 4 + _byte * 14.75, _byte * 11, _byte * 2 + 4, _byte * 1 + 4);
  ctx.fillRect(window.innerWidth / 4 + height / (boardSize + 2) - _byte, _byte * (boardSize / 2) + _byte * 1 + 10 * scalefactor, _byte * 3, _byte * 2.5);
  ctx.fillRect(window.innerWidth / 4 + _byte * boardSize - _byte, _byte * (boardSize / 2) + _byte * 1, _byte * 3, _byte * 3);
  drawline(window.innerWidth / 4 + height / (boardSize + 2), _byte * (boardSize / 2) + 3 * _byte + 2, window.innerWidth / 4 + height / (boardSize + 2), _byte * (boardSize / 2) + 3 * _byte + 2 + _byte, 'black');
  drawline(window.innerWidth / 4 + height / (boardSize + 2), _byte * (boardSize / 2) + 3 * _byte + 2 + _byte, window.innerWidth / 4 + height / (boardSize + 2) + 2 * _byte, _byte * (boardSize / 2) + 3 * _byte + 2 + _byte, linecolor);
  drawline(window.innerWidth / 4 + height / (boardSize + 2) + 2 * _byte, _byte * (boardSize / 2) + 3 * _byte + 2 + _byte, 2 * _byte + window.innerWidth / 4 + height / (boardSize + 2), _byte * (boardSize / 2) + 3 * _byte, linecolor);
  drawline(window.innerWidth / 4 + height / (boardSize + 2) - 10 * scalefactor, _byte * (boardSize / 2) + 4 * _byte - 10 * scalefactor, 2 * _byte + window.innerWidth / 4 + height / (boardSize + 2) - 10 * scalefactor, _byte * (boardSize / 2) + 4 * _byte - 10 * scalefactor, linecolor);
  drawline(window.innerWidth / 4 + height / (boardSize + 2) - 10 * scalefactor - 2, _byte * (boardSize / 2) + 3 * _byte, 2 * _byte + window.innerWidth / 4 + height / (boardSize + 2), _byte * (boardSize / 2) + 3 * _byte, linecolor);
  drawline(window.innerWidth / 4 + height / (boardSize + 2) - 10 * scalefactor + 2, _byte * (boardSize / 2) + 3 * _byte + 10 * scalefactor, 2 * _byte + window.innerWidth / 4 + height / (boardSize + 2) - 10 * scalefactor, _byte * (boardSize / 2) + 3 * _byte + 10 * scalefactor, linecolor);
  drawline(2 * _byte + window.innerWidth / 4 + height / (boardSize + 2) - 10 * scalefactor, _byte * (boardSize / 2) + 3 * _byte + 10 * scalefactor, 2 * _byte + window.innerWidth / 4 + height / (boardSize + 2) - 10 * scalefactor, _byte * (boardSize / 2) + 4 * _byte - 10 * scalefactor, linecolor);
  drawline(window.innerWidth / 4 + _byte - 10 * scalefactor - 1, _byte * 11 + 10 * scalefactor + 2, window.innerWidth / 4 + _byte - 10 * scalefactor - 1, _byte * 12 - 10 * scalefactor - 2, 'black');
  drawline(window.innerWidth / 4 + _byte - 10 * scalefactor + 2, _byte * 11 + 10 * scalefactor + 2, window.innerWidth / 4 + _byte - 10 * scalefactor + 2, _byte * 12 - 10 * scalefactor - 2, 'black');
  drawline(window.innerWidth / 4 + height / (boardSize + 2) - 10 * scalefactor, _byte * (boardSize / 2) + _byte * 3 + 2, window.innerWidth / 4 + height / (boardSize + 2) - 10 * scalefactor, _byte * (boardSize / 2) + _byte * 3 + 10 * scalefactor, linecolor);
  drawline(window.innerWidth / 4 + height / (boardSize + 2), _byte * (boardSize / 2) + _byte, 2 * _byte + window.innerWidth / 4 + height / (boardSize + 2), _byte * (boardSize / 2) + _byte, linecolor);
  drawline(window.innerWidth / 4 + height / (boardSize + 2), _byte * (boardSize / 2) + 2 + _byte, window.innerWidth / 4 + height / (boardSize + 2), _byte * (boardSize / 2) + 10 * scalefactor - 2 + _byte, 'black');
  drawline(window.innerWidth / 4 + height / (boardSize + 2) - 10 * scalefactor, _byte * (boardSize / 2) + 10 * scalefactor + _byte, 2 * _byte + window.innerWidth / 4 + height / (boardSize + 2) - 10 * scalefactor, _byte * (boardSize / 2) + 10 * scalefactor + _byte, linecolor);
  drawline(2 * _byte + window.innerWidth / 4 + height / (boardSize + 2), _byte * (boardSize / 2) + _byte, 2 * _byte + window.innerWidth / 4 + height / (boardSize + 2), _byte * (boardSize / 2) + _byte * 2, linecolor);
  drawline(window.innerWidth / 4 + height / (boardSize + 2) - 10 * scalefactor, _byte * (boardSize / 2) - 10 * scalefactor + _byte * 2, 2 * _byte + window.innerWidth / 4 + height / (boardSize + 2) - 10 * scalefactor, _byte * (boardSize / 2) - 10 * scalefactor + _byte * 2, linecolor);
  drawline(2 * _byte + window.innerWidth / 4 + height / (boardSize + 2) - 10 * scalefactor, _byte * (boardSize / 2) + _byte + 10 * scalefactor, 2 * _byte + window.innerWidth / 4 + height / (boardSize + 2) - 10 * scalefactor, _byte * (boardSize / 2) + _byte * 2 - 10 * scalefactor, linecolor);
  drawline(window.innerWidth / 4 + height / (boardSize + 2) - 10 * scalefactor, _byte * (boardSize / 2) + _byte * 2, 2 * _byte + window.innerWidth / 4 + height / (boardSize + 2), _byte * (boardSize / 2) + _byte * 2, linecolor);
  drawline(window.innerWidth / 4 + height / (boardSize + 2) - 10 * scalefactor, _byte * (boardSize / 2) + _byte * 2, window.innerWidth / 4 + height / (boardSize + 2) - 10 * scalefactor, _byte * (boardSize / 2) + _byte * 2 - 10 * scalefactor, linecolor); //drawline(window.innerWidth/4+byte*boardSize+byte,byte*(boardSize/2)+2*byte,window.innerWidth/4+byte*boardSize-byte,byte*(boardSize/2)+2*byte,linecolor);

  drawline(window.innerWidth / 4 + _byte * boardSize + _byte + 10 * scalefactor, _byte * (boardSize / 2) + 3 * _byte, window.innerWidth / 4 + _byte * boardSize - _byte, _byte * (boardSize / 2) + 3 * _byte, linecolor); //drawline(window.innerWidth/4+byte*boardSize+byte,byte*(boardSize/2)+2*byte+2,window.innerWidth/4+byte*boardSize+byte,byte*(boardSize/2)+2*byte+2+10*scalefactor,'black');
  //drawline(window.innerWidth/4+byte*boardSize+byte,byte*(boardSize/2)+2*byte+10*scalefactor,window.innerWidth/4+byte*boardSize-byte,byte*(boardSize/2)+2*byte+10*scalefactor,linecolor);
  //drawline(window.innerWidth/4+byte*boardSize-byte,byte*(boardSize/2)+2*byte,window.innerWidth/4+byte*boardSize-byte,byte*(boardSize/2)+2*byte+10*scalefactor,linecolor);

  drawline(window.innerWidth / 4 + _byte * boardSize + _byte, _byte * (boardSize / 2) + _byte, window.innerWidth / 4 + _byte * boardSize - _byte, _byte * (boardSize / 2) + _byte, linecolor);
  drawline(window.innerWidth / 4 + _byte * boardSize + _byte + scalefactor * 10, _byte * (boardSize / 2) + _byte + scalefactor * 10, window.innerWidth / 4 + _byte * boardSize - _byte + scalefactor * 10, _byte * (boardSize / 2) + _byte + scalefactor * 10, linecolor);
  drawline(window.innerWidth / 4 + _byte * boardSize + _byte + scalefactor * 10, _byte * (boardSize / 2) + _byte * 2, window.innerWidth / 4 + _byte * boardSize - _byte, _byte * (boardSize / 2) + _byte * 2, linecolor);
  drawline(window.innerWidth / 4 + _byte * boardSize - _byte, _byte * (boardSize / 2) + _byte + scalefactor, window.innerWidth / 4 + _byte * boardSize - _byte, _byte * (boardSize / 2) + _byte * 2, linecolor);
  drawline(window.innerWidth / 4 + _byte * boardSize + _byte + scalefactor * 10 - 1, _byte * (boardSize / 2) + _byte + scalefactor * 10, window.innerWidth / 4 + _byte * boardSize + _byte + scalefactor * 10 - 1, _byte * (boardSize / 2) + _byte, linecolor);
  drawline(window.innerWidth / 4 + _byte * boardSize + _byte + scalefactor * 10, _byte * (boardSize / 2) + _byte * 2 - scalefactor * 10, window.innerWidth / 4 + _byte * boardSize - _byte + scalefactor * 10, _byte * (boardSize / 2) + _byte * 2 - scalefactor * 10, linecolor);
  drawline(window.innerWidth / 4 + _byte * boardSize - _byte + scalefactor * 10, _byte * (boardSize / 2) + _byte * 2 - scalefactor * 10, window.innerWidth / 4 + _byte * boardSize - _byte + scalefactor * 10, _byte * (boardSize / 2) + _byte + scalefactor * 10, linecolor);
  drawline(window.innerWidth / 4 + _byte * boardSize + _byte + scalefactor * 10, _byte * (boardSize / 2) + _byte * 2 - scalefactor * 10, window.innerWidth / 4 + _byte * boardSize + _byte + scalefactor * 10, _byte * (boardSize / 2) + _byte * 2, linecolor); //drawline(window.innerWidth/4+byte*boardSize+byte+scalefactor*10,byte*(boardSize/2)+byte*4-scalefactor*10,window.innerWidth/4+byte*boardSize-byte+scalefactor*10,byte*(boardSize/2)+byte*4-scalefactor*10,linecolor);
  //drawline(window.innerWidth/4+byte*boardSize+byte,byte*(boardSize/2)+byte*4,window.innerWidth/4+byte*boardSize-byte+scalefactor*10,byte*(boardSize/2)+byte*4,linecolor);
  // all the fillrects

  ctx.fillStyle = 'black';
  ctx.fillRect(window.innerWidth / 4 + _byte * 2 + 2, _byte * 2 + 2, _byte + 4, _byte * 6 + 4);
  ctx.fillRect(window.innerWidth / 4 + _byte * 4 + 2, _byte * 2 + 2, _byte * 3 + 4, _byte + 4);
  ctx.fillRect(window.innerWidth / 4 + _byte * 4 + 2, _byte * 4 + 2, _byte * 3 + 4, _byte + 4);
  ctx.fillRect(window.innerWidth / 4 + _byte * 4 + 2, _byte * 4 + 2, _byte * 1 + 4, _byte * 3 + 4);
  ctx.fillRect(window.innerWidth / 4 + _byte * 7, _byte * 9, _byte * 4 + 4, _byte * 3 + 4);
  ctx.fillRect(window.innerWidth / 4 + _byte * 8, _byte * 1, _byte * 1 + 4, _byte * 5 + 4);
  ctx.fillRect(window.innerWidth / 4 + _byte * 6, _byte * 6, _byte * 1 + 4, _byte * 2 + 4);
  ctx.fillRect(window.innerWidth / 4 + _byte * 7, _byte * 7, _byte * 2 + 4, _byte * 1 + 4);
  ctx.fillRect(window.innerWidth / 4 + _byte * 4, _byte * 8, _byte * 1 + 4, _byte * 4 + 4);
  ctx.fillRect(window.innerWidth / 4 + _byte * 5, _byte * 9, _byte * 1 + 4, _byte * 3 + 4); //ctx.fillRect(window.innerWidth/4+byte*1,byte*10.25,byte*1.75+4,byte*0.5+4);

  ctx.fillRect(window.innerWidth / 4 + _byte * 12, _byte * 9, _byte * 2 + 4, _byte * 3 + 4);
  ctx.fillRect(window.innerWidth / 4 + _byte * 10, _byte * 2, _byte * 2 + 4, _byte * 1 + 4);
  ctx.fillRect(window.innerWidth / 4 + _byte * 14, _byte * 2, _byte * 2 + 4, _byte * 1 + 4);
  ctx.fillRect(window.innerWidth / 4 + _byte * 10, _byte * 2, _byte * 1 + 4, _byte * 6 + 4);
  ctx.fillRect(window.innerWidth / 4 + _byte * 15, _byte * 2, _byte * 1 + 4, _byte * 6 + 4);
  ctx.fillRect(window.innerWidth / 4 + _byte * 10, _byte * 7, _byte * 6 + 4, _byte * 1 + 4);
  ctx.fillRect(window.innerWidth / 4 + _byte * 12, _byte * 4, _byte * 2 + 4, _byte * 2 + 4); //ctx.fillRect(window.innerWidth/4+byte*15,byte*11,byte*2+4,byte*1+4);
  //ctx.fillRect(window.innerWidth/4+byte*16,byte*12,byte*1+4,byte*2+4);

  ctx.fillRect(window.innerWidth / 4 + _byte * 2, _byte * 13, _byte * 1 + 4, _byte * 1 + 4);
  ctx.fillRect(window.innerWidth / 4 + _byte * 2, _byte * 15, _byte * 1 + 4, _byte * 1 + 4);
  ctx.fillRect(window.innerWidth / 4 + _byte * 3, _byte * 15, _byte * 1 + 4, _byte * 1 + 4);
  ctx.fillRect(window.innerWidth / 4 + _byte * 4, _byte * 13, _byte * 3 + 4, _byte * 1 + 4);
  ctx.fillRect(window.innerWidth / 4 + _byte * 5, _byte * 14, _byte * 1 + 4, _byte * 2 + 4);
  ctx.fillRect(window.innerWidth / 4 + _byte * 8, _byte * 13, _byte * 1 + 4, _byte * 2 + 4);
  ctx.fillRect(window.innerWidth / 4 + _byte * 7, _byte * 15, _byte * 3 + 4, _byte * 1 + 4);
  ctx.fillRect(window.innerWidth / 4 + _byte * 10, _byte * 13, _byte * 3 + 4, _byte * 1 + 4);
  ctx.fillRect(window.innerWidth / 4 + _byte * 11, _byte * 14, _byte * 1 + 4, _byte * 2 + 4);
  ctx.fillRect(window.innerWidth / 4 + _byte * 14, _byte * 13, _byte * 1 + 4, _byte * 2 + 4);
  ctx.fillRect(window.innerWidth / 4 + _byte * 13, _byte * 15, _byte * 3 + 4, _byte * 1 + 4);
  ctx.fillRect(window.innerWidth / 4 + _byte * 12, _byte * 1.75, _byte * 2 + 4, _byte * 0.5 + 4);
  ctx.fillRect(window.innerWidth / 4 + _byte * 12, _byte * 2.75, _byte * 2 + 4, _byte * 0.5 + 4);
  ctx.fillRect(window.innerWidth / 4 + _byte * 8, _byte * 9 - 4, _byte * 2 + 4, _byte * 1 + 4); // middle dot in o enterance
  //ctx.fillRect(window.innerWidth/4+byte*12.75,byte*2.25,byte*0.5+4,byte*0.5+4);

  ctx.strokeStyle = linecolor;
  ctx.beginPath(); // block 1

  ctx.strokeStyle = 'rgb(255,0,0)';
  ctx.strokeRect(window.innerWidth / 4 + _byte * 2, _byte * 2, _byte, _byte * 6); // -10*scalefactor to make it fit but then it doesnt align
  // block 2

  ctx.strokeStyle = 'rgb(0,255,0)';
  ctx.strokeRect(window.innerWidth / 4 + _byte * 4, _byte * 2, _byte * 3, _byte); // weird shape

  drawline(window.innerWidth / 4 + _byte * 4, _byte * 4, window.innerWidth / 4 + _byte * 7, _byte * 4, 'rgb(255,255,0)');
  drawline(window.innerWidth / 4 + _byte * 4, _byte * 4, window.innerWidth / 4 + _byte * 4, _byte * 7, 'rgb(255,255,0)');
  drawline(window.innerWidth / 4 + _byte * 5, _byte * 5, window.innerWidth / 4 + _byte * 7, _byte * 5, 'rgb(255,255,0)');
  drawline(window.innerWidth / 4 + _byte * 5, _byte * 5, window.innerWidth / 4 + _byte * 5, _byte * 7, 'rgb(255,255,0)');
  drawline(window.innerWidth / 4 + _byte * 7, _byte * 4, window.innerWidth / 4 + _byte * 7, _byte * 5, 'rgb(255,255,0)');
  drawline(window.innerWidth / 4 + _byte * 4, _byte * 7, window.innerWidth / 4 + _byte * 5, _byte * 7, 'rgb(255,255,0)');
  ctx.fillStyle = 'black'; // ghost box

  ctx.strokeStyle = 'white';
  ctx.strokeRect(window.innerWidth / 4 + _byte * 7, _byte * 10, _byte * 4, _byte * 2);
  ctx.strokeRect(window.innerWidth / 4 + _byte * 7, _byte * 9, _byte * 1, _byte * 1);
  ctx.strokeRect(window.innerWidth / 4 + _byte * 10, _byte * 9, _byte * 1, _byte * 1);
  drawline(window.innerWidth / 4 + _byte * 7 + 2, _byte * 10 - 2, window.innerWidth / 4 + _byte * 11 - 2, _byte * 10 - 2, "black");
  drawline(window.innerWidth / 4 + _byte * 7 + 2, _byte * 10 + 1, window.innerWidth / 4 + _byte * 11 - 2, _byte * 10 + 1, "black");
  drawline(window.innerWidth / 4 + _byte * 8, _byte * 10 - 2, window.innerWidth / 4 + _byte * 10, _byte * 10 - 2, "orange"); // box 4

  ctx.strokeStyle = linecolor;
  ctx.fillStyle = 'black';
  ctx.strokeRect(window.innerWidth / 4 + _byte * 8, _byte * 1, _byte, _byte * 5);
  drawline(window.innerWidth / 4 + _byte * 8, _byte - 2, window.innerWidth / 4 + _byte * 9, _byte - 2, 'black');
  drawline(window.innerWidth / 4 + _byte * 8, _byte + 1, window.innerWidth / 4 + _byte * 9, _byte + 1, 'black'); // another weird shape

  drawline(window.innerWidth / 4 + _byte * 6, _byte * 6, window.innerWidth / 4 + _byte * 6, _byte * 8, 'rgb(255,0,0)');
  drawline(window.innerWidth / 4 + _byte * 6, _byte * 8, window.innerWidth / 4 + _byte * 9, _byte * 8, 'rgb(255,0,0)');
  drawline(window.innerWidth / 4 + _byte * 7, _byte * 7, window.innerWidth / 4 + _byte * 9, _byte * 7, 'rgb(255,0,0)');
  drawline(window.innerWidth / 4 + _byte * 6, _byte * 6, window.innerWidth / 4 + _byte * 7, _byte * 6, 'rgb(255,0,0)');
  drawline(window.innerWidth / 4 + _byte * 9, _byte * 8, window.innerWidth / 4 + _byte * 9, _byte * 7, 'rgb(255,0,0)');
  drawline(window.innerWidth / 4 + _byte * 7, _byte * 6, window.innerWidth / 4 + _byte * 7, _byte * 7, 'rgb(255,0,0)'); // big o shape

  ctx.strokeStyle = 'rgb(0,255,0)';
  ctx.strokeRect(window.innerWidth / 4 + _byte * 10, _byte * 2, _byte * 6, _byte * 6);
  drawline(window.innerWidth / 4 + _byte * 12, _byte * 2 - 1, window.innerWidth / 4 + _byte * 14, _byte * 2 - 1, 'black');
  drawline(window.innerWidth / 4 + _byte * 12, _byte * 2 + 2, window.innerWidth / 4 + _byte * 14, _byte * 2 + 2, 'black');
  ctx.strokeStyle = 'rgb(0,255,0)';
  ctx.strokeRect(window.innerWidth / 4 + _byte * 11, _byte * 3, _byte * 4, _byte * 4);
  drawline(window.innerWidth / 4 + _byte * 12, _byte * 3, window.innerWidth / 4 + _byte * 14, _byte * 3, 'black');
  ctx.strokeStyle = 'rgb(0,255,0)';
  drawline(window.innerWidth / 4 + _byte * 12, _byte * 2, window.innerWidth / 4 + _byte * 12, _byte * 3);
  drawline(window.innerWidth / 4 + _byte * 14, _byte * 2, window.innerWidth / 4 + _byte * 14, _byte * 3);
  ctx.strokeRect(window.innerWidth / 4 + _byte * 12, _byte * 4, _byte * 2, _byte * 2); //block 5 with a block on side

  ctx.strokeStyle = 'rgb(255,255,0)';
  ctx.strokeRect(window.innerWidth / 4 + _byte * 4, _byte * 9, _byte * 2, _byte * 3);
  ctx.strokeRect(window.innerWidth / 4 + _byte * 4, _byte * 8, _byte * 1, _byte * 1);
  drawline(window.innerWidth / 4 + _byte * 4 + 2, _byte * 9 - 1, window.innerWidth / 4 + _byte * 5 - 2, _byte * 9 - 1, 'black');
  drawline(window.innerWidth / 4 + _byte * 4 + 2, _byte * 9 + 2, window.innerWidth / 4 + _byte * 5 - 2, _byte * 9 + 2, 'black'); // block 6 removed to push the ghost box up

  ctx.strokeStyle = linecolor; //ctx.strokeRect(window.innerWidth/4+byte*7,byte*9,byte*7,byte*1);
  // block 7

  ctx.strokeStyle = linecolor;
  ctx.strokeRect(window.innerWidth / 4 + _byte * 15, _byte * 11, _byte * 2, _byte * 1);
  ctx.strokeRect(window.innerWidth / 4 + _byte * 16, _byte * 13, _byte * 1, _byte * 1); //ctx.fillStyle = 'black';

  ctx.fillRect(window.innerWidth / 4 + _byte * 16 + 2, _byte * 13 + 2, _byte * 1 + 2, _byte * 1 - 4);
  drawline(window.innerWidth / 4 + _byte * 17 + 1, _byte * 11 + 2, window.innerWidth / 4 + _byte * 17 + 1, _byte * 12 - 2, 'black');
  drawline(window.innerWidth / 4 + _byte * 17 - 1, _byte * 11 + 2, window.innerWidth / 4 + _byte * 17 - 2, _byte * 12 - 2, 'black'); //drawline(window.innerWidth/4+byte*16-1,byte*12,window.innerWidth/4+byte*17-1,byte*12,'black');
  //drawline(window.innerWidth/4+byte*16+2,byte*12,window.innerWidth/4+byte*17+1,byte*12,'black');
  //drawline(window.innerWidth/4+byte*16,byte*12-1,window.innerWidth/4+byte*17-2,byte*12-1,'black');
  //drawline(window.innerWidth/4+byte*16,byte*12+1,window.innerWidth/4+byte*17-2,byte*12+1,'black');

  drawline(window.innerWidth / 4 + _byte * 17 - 1, _byte * 14, window.innerWidth / 4 + _byte * 17 - 1, _byte * 14 + 8, linecolor);
  drawline(window.innerWidth / 4 + _byte * boardSize + _byte + scalefactor * 10, _byte * (boardSize / 2) + _byte * 4 - scalefactor * 10, window.innerWidth / 4 + _byte * boardSize - _byte + scalefactor * 10, _byte * (boardSize / 2) + _byte * 4 - scalefactor * 10, linecolor);
  drawline(window.innerWidth / 4 + _byte * boardSize + _byte + scalefactor * 10, _byte * (boardSize / 2) + _byte * 3 + scalefactor * 10, window.innerWidth / 4 + _byte * boardSize - _byte + scalefactor * 10, _byte * (boardSize / 2) + _byte * 3 + scalefactor * 10, linecolor);
  drawline(window.innerWidth / 4 + _byte * boardSize - _byte + scalefactor * 10, _byte * (boardSize / 2) + _byte * 4 - scalefactor * 10, window.innerWidth / 4 + _byte * boardSize - _byte + scalefactor * 10, _byte * (boardSize / 2) + _byte * 3 + scalefactor * 10, linecolor);
  drawline(window.innerWidth / 4 + _byte * boardSize + _byte + scalefactor * 10 - 1, _byte * (boardSize / 2) + _byte * 4 - scalefactor * 10, window.innerWidth / 4 + _byte * boardSize + _byte + scalefactor * 10 - 1, _byte * (boardSize / 2) + _byte * 4, linecolor);
  drawline(window.innerWidth / 4 + _byte * boardSize + _byte + scalefactor * 10 - 1, _byte * (boardSize / 2) + _byte * 3, window.innerWidth / 4 + _byte * boardSize + _byte + scalefactor * 10 - 1, _byte * (boardSize / 2) + _byte * 3 + 10 * scalefactor, linecolor); // t shape thing

  ctx.strokeStyle = 'rgb(0,255,0)';
  ctx.strokeRect(window.innerWidth / 4 + _byte * 13, _byte * 15, _byte * 3, _byte * 1);
  ctx.strokeRect(window.innerWidth / 4 + _byte * 14, _byte * 13, _byte * 1, _byte * 2);
  drawline(window.innerWidth / 4 + _byte * 14, _byte * 15 + 1, window.innerWidth / 4 + _byte * 15, _byte * 15 + 1, 'black');
  drawline(window.innerWidth / 4 + _byte * 14, _byte * 15 - 1, window.innerWidth / 4 + _byte * 15, _byte * 15 - 1, 'black'); // 2nd t shape

  ctx.strokeStyle = 'rgb(255,255,0)';
  ctx.strokeRect(window.innerWidth / 4 + _byte * 10, _byte * 13, _byte * 3, _byte * 1);
  ctx.strokeRect(window.innerWidth / 4 + _byte * 11, _byte * 14, _byte * 1, _byte * 2);
  drawline(window.innerWidth / 4 + _byte * 11, _byte * 14 + 1, window.innerWidth / 4 + _byte * 12, _byte * 14 + 1, 'black');
  drawline(window.innerWidth / 4 + _byte * 11, _byte * 14 - 1, window.innerWidth / 4 + _byte * 12, _byte * 14 - 1, 'black'); // 3rd t shape thing

  ctx.strokeStyle = 'rgb(255,0,0)';
  ctx.strokeRect(window.innerWidth / 4 + _byte * 7, _byte * 15, _byte * 3, _byte * 1);
  ctx.strokeRect(window.innerWidth / 4 + _byte * 8, _byte * 13, _byte * 1, _byte * 2);
  drawline(window.innerWidth / 4 + _byte * 8, _byte * 15 + 1, window.innerWidth / 4 + _byte * 9, _byte * 15 + 1, 'black');
  drawline(window.innerWidth / 4 + _byte * 8, _byte * 15 - 1, window.innerWidth / 4 + _byte * 9, _byte * 15 - 1, 'black'); // block 8

  ctx.strokeStyle = 'rgb(255,0,0)';
  ctx.strokeRect(window.innerWidth / 4 + _byte * 12, _byte * 9, _byte * 2, _byte * 3); // 4th t shape

  ctx.strokeStyle = linecolor;
  ctx.strokeRect(window.innerWidth / 4 + _byte * 5, _byte * 14, _byte * 1, _byte * 2);
  ctx.strokeRect(window.innerWidth / 4 + _byte * 4, _byte * 13, _byte * 3, _byte * 1);
  drawline(window.innerWidth / 4 + _byte * 6, _byte * 14 - 1, window.innerWidth / 4 + _byte * 5, _byte * 14 - 1, 'black');
  drawline(window.innerWidth / 4 + _byte * 6, _byte * 14 + 1, window.innerWidth / 4 + _byte * 5, _byte * 14 + 1, 'black'); // l shaped thing

  ctx.strokeStyle = 'rgb(0,255,0)';
  ctx.strokeRect(window.innerWidth / 4 + _byte * 2, _byte * 15, _byte * 2, _byte * 1); //drawline(window.innerWidth/4+byte*3-2,byte*15-1,window.innerWidth/4+byte*2+2,byte*15-1,'black');
  //drawline(window.innerWidth/4+byte*3-2,byte*15+1,window.innerWidth/4+byte*2+2,byte*15+1,'black');
  // block 9

  ctx.strokeStyle = 'rgb(0,255,0)';
  ctx.strokeRect(window.innerWidth / 4 + _byte * 2, _byte * 13, _byte * 1, _byte * 1);
  var cr = 0;
  ctx.fillStyle = 'rgb(0,255,0)';

  while (cr < intersection.length) {
    ctx.fillRect(intersection[cr][0], intersection[cr][2], intersection[cr][1] - intersection[cr][0], intersection[cr][3] - intersection[cr][2]);
    cr += 1;
  }
} // put in in terms of bytes, ill add a converter
// assign blocks


var rightblockpre = [[3, 4, 8, 12], [1, 2, 2, 8], [3, 4, 2, 3], [10, 11, 9, 12], [3, 4, 4, 7], [1, 2, 11, 12], [1, 2, 13, 14], [1, 2, 15, 16], [3, 4, 13, 14], [4, 5, 14, 16], [7, 8, 1, 6], [5, 6, 6, 8], [6, 7, 9, 12], [7, 8, 13, 15], [6, 7, 15, 16], [9, 10, 2, 8], [11, 12, 4, 6], [14, 15, 3, 7], [13, 14, 2, 3], [16, 17, 1, 9], [11, 12, 9, 12], [14, 15, 9, 10], [14, 15, 11, 12], [15, 16, 13, 14], [16, 17, 12, 13], [9, 10, 13, 14], [10, 11, 14, 16], [13, 14, 13, 15], [12, 13, 15, 16], [16, 17, 14, 17], [8.5, 9.5, 9, 10]];
var leftblockpre = [[1, 2, 1, 9], [3, 4, 2, 8], [7, 8, 9, 12], [1, 2, 12, 17], [3, 4, 11, 12], [3, 4, 9, 10], [3, 4, 13, 14], [4, 5, 15, 16], [7, 8, 2, 3], [7, 8, 4, 5], [5, 6, 5, 7], [5, 6, 8, 9], [6, 7, 9, 12], [7, 8, 13, 14], [6, 7, 14, 16], [7, 8, 6, 7], [9, 10, 7, 8], [9, 10, 1, 6], [9, 10, 13, 15], [10, 11, 15, 16], [12, 13, 2, 3], [11, 12, 3, 7], [14, 15, 4, 6], [16, 17, 2, 8], [8.5, 9.5, 9, 10], [14, 15, 9, 12], [13, 14, 13, 14], [12, 13, 14, 16], [15, 16, 13, 15], [16, 17, 15, 16]];
var upblockpre = [[1, 8, 1, 2], [1, 2, 12, 13], [16, 17, 12, 13], [-20, 2, 10, 11], [7, 8, 10, 11], [10, 11, 10, 11], [15, 50, 10, 11], [2, 3, 8, 9], [2, 3, 12, 13], [2, 4, 16, 17], [4, 7, 3, 4], [4, 5, 7, 8], [5, 7, 5, 6], [4, 6, 12, 13], [4, 5, 14, 15], [5, 6, 16, 17], [6, 7, 14, 15], [7, 8, 8, 9], [7, 8, 9, 10], [10, 11, 9, 10], [7, 10, 16, 17], [7, 11, 12, 13], [6, 9, 8, 9], [8, 9, 6, 7], [9, 17, 1, 2], [11, 12, 3, 4], [14, 15, 3, 4], [12, 14, 6, 7], [10, 16, 8, 9], [12, 14, 12, 13], [10, 11, 14, 15], [11, 12, 16, 17], [12, 13, 14, 15], [13, 16, 16, 17], [15, 16, 12, 13], [16, 17, 14, 15], [1, 3, 10, 11], [15, 17, 10, 11], [1, 3, 9, 10], [15, 17, 9, 10]];
var downblockpre = [[3, 4, 14, 15], [2, 3, 1, 2], [1, 3, 8, 9], [-20, 2, 10, 11], [1, 2, 10, 11], [15, 50, 10, 11], [2, 3, 9, 10], [2, 3, 12, 13], [1, 17, 16, 17], [4, 7, 1, 2], [4, 7, 3, 4], [6, 7, 5, 6], [7, 9, 6, 7], [4, 5, 7, 8], [5, 6, 8, 9], [4, 7, 12, 13], [10, 11, 8, 9], [7, 8, 8, 9], [10, 11, 8, 9], [7, 8, 14, 15], [8, 9, 12, 13], [9, 10, 14, 15], [10, 13, 12, 13], [13, 14, 14, 15], [14, 15, 12, 13], [15, 16, 14, 15], [12, 14, 8, 9], [15, 17, 10, 11], [10, 12, 1, 2], [14, 16, 1, 2], [12, 14, 3, 4], [11, 15, 6, 7], [15, 17, 8, 10], [7, 11, 8, 9], [2, 3, 10, 11], [16, 17, 12, 13]];
var intersectionpre = [[3, 4, 1, 2], [12, 13, 1, 2], [13, 14, 1, 2], [3, 4, 3, 4], [7, 8, 3, 4], [7, 8, 5, 6], [9, 10, 6, 7], [3, 4, 7, 8], [3, 4, 8, 9], [5, 6, 7, 8], [6, 7, 8, 9], [9, 10, 8, 9], [11, 12, 8, 9], [14, 15, 8, 9], [12, 13, 3, 4], [13, 14, 3, 4], [3, 4, 10, 11], [3, 4, 12, 13], [6, 7, 12, 13], [11, 12, 12, 13], [14, 15, 12, 13], [7, 8, 12, 13], [9, 10, 12, 13], [13, 14, 12, 13], [15, 16, 12, 13], [1, 2, 14, 15], [3, 4, 14, 15], [4, 5, 16, 17], [6, 7, 16, 17], [10, 11, 16, 17], [12, 13, 16, 17], []];
var rightblock = [];
var leftblock = [];
var upblock = [];
var downblock = [];
var intersection = [];
_byte = 2 * ((window.innerHeight - 100) / (16 * 2.2));
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
}

ctr = 0;

while (ctr < intersectionpre.length) {
  var _subjarr4 = [];

  _subjarr4.push((intersectionpre[ctr][0] + 0.48) * _byte + window.innerWidth / 4);

  _subjarr4.push((intersectionpre[ctr][1] - 0.48) * _byte + window.innerWidth / 4);

  _subjarr4.push((intersectionpre[ctr][2] + 0.48) * _byte);

  _subjarr4.push((intersectionpre[ctr][3] - 0.48) * _byte);

  intersection.push(_subjarr4);
  ctr += 1;
}

var rightblockghost = rightblock; //.concat(intersection);

var leftblockghost = leftblock; //.concat(intersection);

var upblockghost = upblock; //.concat(intersection);

var downblockghost = downblock; //.concat(intersection);

function openintro() {
  closedintro = false; //console.log('opened it');

  var credits = document.getElementById('credits');
  credits.style.display = "none";
  var intro = document.getElementById('introducer');
  var intro1 = document.getElementById('introducer-cover');
  intro.style.display = "block";
  intro1.style.display = "block"; // let starter = document.querySelector('.starter');
  // starter.addEventListener('click', closeintro());

  intropc = 0;

  (function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(intropc <= 50)) {
              _context.next = 8;
              break;
            }

            //console.log('in');
            intro1.style.opacity = intropc + '%';
            intro.style.opacity = intropc * 2 + '%';
            _context.next = 5;
            return regeneratorRuntime.awrap(sleep(2));

          case 5:
            intropc += 1;
            _context.next = 0;
            break;

          case 8:
          case "end":
            return _context.stop();
        }
      }
    });
  })();

  intro.style.display = "block"; //intro1.style.display = "block";
}

function opencredits() {
  console.log('opened credits');
  closedintro = false;
  var intro = document.getElementById('credits');
  var intro1 = document.getElementById('introducer-cover');
  intro.style.display = "block";
  intro1.style.display = "block"; // let starter = document.querySelector('.starter');
  // starter.addEventListener('click', closeintro());

  intropc = 0;

  (function _callee2() {
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(intropc <= 50)) {
              _context2.next = 9;
              break;
            }

            console.log('in');
            intro1.style.opacity = intropc + '%';
            intro.style.opacity = intropc * 2 + '%';
            _context2.next = 6;
            return regeneratorRuntime.awrap(sleep(2));

          case 6:
            intropc += 1;
            _context2.next = 0;
            break;

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    });
  })();

  intro.style.display = "block"; //intro1.style.display = "block";
}

function opensnake() {
  startwaiter = true;
  xd = speed;
  closedintro = false;
  var intro = document.getElementById('snakestyle');
  var intro1 = document.getElementById('introducer-cover');
  intro.style.display = "block"; //intro1.style.display = "block";
  // let starter = document.querySelector('.starter');
  // starter.addEventListener('click', closeintro());

  intropc = 0;

  (function _callee3() {
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!(intropc <= 50)) {
              _context3.next = 8;
              break;
            }

            console.log('in'); //intro1.style.opacity = intropc+'%';

            intro.style.opacity = intropc * 2 + '%';
            _context3.next = 5;
            return regeneratorRuntime.awrap(sleep(2));

          case 5:
            intropc += 1;
            _context3.next = 0;
            break;

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    });
  })();

  intro.style.display = "block"; //intro1.style.display = "block";
}

function animateboard() {
  ctx.beginPath();

  (function _callee4() {
    var anim, x, actx, clrnow, y, acty, reserve;
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            anim = 0;

          case 1:
            if (!(anim < 101)) {
              _context4.next = 11;
              break;
            }

            x = 0;
            actx = window.innerWidth / 4;
            clrnow = pixelbackground1EMP;

            while (x < boardSize + 2) {
              y = 0;
              acty = 0;

              while (y < boardSize + 4) {
                if (clrnow == pixelbackground1EMP) {
                  clrnow = pixelbackground2EMP;
                } else {
                  clrnow = pixelbackground1EMP;
                } //console.log(anim,'wut');


                ctx.fillStyle = clrnow;

                if (x == 0 || x == boardSize + 1 || y == 0 || y == boardSize + 1) {
                  if (clrnow == pixelbackground1EMP) {
                    clrnow = pixelbackground2EMP;
                  } else {
                    clrnow = pixelbackground1EMP;
                  }

                  reserve = clrnow;
                  ctx.fillStyle = bordercolor;
                  ctx.fillRect(actx, acty, height / (boardSize + 2) * anim / 100, height / (boardSize + 2) * anim / 100);
                  clrnow = reserve; //console.log(anim,'in first');
                } else {
                  //clrnow = 'rgb(0,0,0)';
                  ctx.fillStyle = clrnow;
                  ctx.fillRect(actx, acty, height / (boardSize + 2), height / (boardSize + 2) * anim / 100); //console.log(anim,'in');
                }

                acty += height / (boardSize + 2);
                y += 1; //console.log('drew smth');
              }

              if (clrnow == pixelbackground1EMP) {
                clrnow = pixelbackground2EMP;
              } else {
                clrnow = pixelbackground1EMP;
              }

              actx += height / (boardSize + 2);
              x += 1;
            } //console.log(anim,'in but out');


            _context4.next = 8;
            return regeneratorRuntime.awrap(sleep(2));

          case 8:
            anim += 2;
            _context4.next = 1;
            break;

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    });
  })();
}

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
}

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
  ctx.fillStyle = 'black';
  ctx.fillRect(window.innerWidth / 4 - _byte, _byte * 10, 2 * _byte - 15 * scalefactor, _byte);
  ctx.fillRect(window.innerWidth / 4 + _byte * 17 + 15 * scalefactor, _byte * 10, 2 * _byte - 15 * scalefactor, _byte);
}

function drawghost(x, y, rad, clr) {
  //ctx.arc(x, y, rad, 0.75 * Math.PI, 1 * Math.PI); //-((height)/(boardSize+2)/2)
  ctx.fillStyle = clr;
  ctx.strokeStyle = 'blue';
  ctx.stroke();
  ctx.fill();
  ctx.beginPath();
  ctx.arc(x, y, rad, 0.75 * Math.PI + 0.125 * Math.PI * 0, Math.PI * 1.75 + 0.125 * Math.PI * 0, false);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.fillStyle = clr;
  ctx.strokeStyle = 'blue';
  ctx.arc(x, y - 1, rad, 0.25 * Math.PI - 0.125 * Math.PI * 0, Math.PI * 1.25 - 0.125 * Math.PI * 0, false);
  ctx.fill();
}

function closeintro() {
  console.log('closed it');
  closedintro = true;

  (function _callee5() {
    var intro, namer, intro1, intropc1, namehandler, namedisp;
    return regeneratorRuntime.async(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            intro = document.getElementById('introducer');
            namer = document.getElementById('name');
            namer = namer.value;
            localStorage.setItem("name", namer);
            intro1 = document.getElementById('introducer-cover'); // intro1.style.display = "none";
            // intro.style.display = "none";

            intropc1 = 50;

          case 6:
            if (!(intropc1 >= 0)) {
              _context5.next = 14;
              break;
            }

            //console.log('was '+intropc1);
            intro1.style.opacity = intropc1 + '%';
            intro.style.opacity = intropc1 + '%';
            _context5.next = 11;
            return regeneratorRuntime.awrap(sleep(2));

          case 11:
            intropc1 -= 1;
            _context5.next = 6;
            break;

          case 14:
            intro1.style.display = "none";
            intro.style.display = "none";
            censorer = 0; //console.log('checked');

            namehandler = document.getElementById('name');
            namedisp = document.getElementById('namedisplay'); //(censored,namehandler.value);

            while (censorer < censored.length) {
              if (namehandler.value.toLowerCase().includes(censored[censorer].toLowerCase())) {
                namedisp.innerHTML = "Name: Censored";
                console.log(namedisp.textContent);
                name = "Censored";
                console.log(censored[censorer], namehandler.value);
                localStorage.setItem('name', "Censored");
              }

              censorer += 1;
            }

          case 20:
          case "end":
            return _context5.stop();
        }
      }
    });
  })();
}

function closecredits() {
  closedintro = true;

  (function _callee6() {
    var intro, intro1, intropc1;
    return regeneratorRuntime.async(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            intro = document.getElementById('credits');
            intro1 = document.getElementById('introducer-cover'); // intro1.style.display = "none";
            // intro.style.display = "none";

            intropc1 = 50;

          case 3:
            if (!(intropc1 >= 0)) {
              _context6.next = 11;
              break;
            }

            //console.log('was '+intropc1);
            intro1.style.opacity = intropc1 + '%';
            intro.style.opacity = intropc1 + '%';
            _context6.next = 8;
            return regeneratorRuntime.awrap(sleep(2));

          case 8:
            intropc1 -= 1;
            _context6.next = 3;
            break;

          case 11:
            intro1.style.display = "none";
            intro.style.display = "none";

          case 13:
          case "end":
            return _context6.stop();
        }
      }
    });
  })();
}

function closesnake() {
  closedintro = true;

  (function _callee7() {
    var intro, intro1, intropc1;
    return regeneratorRuntime.async(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            intro = document.getElementById('snakestyle');
            intro1 = document.getElementById('introducer-cover'); // intro1.style.display = "none";
            // intro.style.display = "none";

            intropc1 = 50;

          case 3:
            if (!(intropc1 >= 0)) {
              _context7.next = 11;
              break;
            }

            //console.log('was '+intropc1);
            intro1.style.opacity = intropc1 + '%';
            intro.style.opacity = intropc1 + '%';
            _context7.next = 8;
            return regeneratorRuntime.awrap(sleep(2));

          case 8:
            intropc1 -= 1;
            _context7.next = 3;
            break;

          case 11:
            intro1.style.display = "none";
            intro.style.display = "none";

          case 13:
          case "end":
            return _context7.stop();
        }
      }
    });
  })();
}

var canvas = document.querySelector('.myCanvas');
var ctx = canvas.getContext('2d');
var width = canvas.width = window.innerWidth / 2 + window.innerWidth / 4;
var height = canvas.height = window.innerHeight - 100;
var bounderies = [0, 0, 0, 0];
var score = 0;
var snakeclr = "g";
var snakeclr3 = "g";
var dir = 'r';
snakeclr4 += "flEM";
canvas.style.left = "100px";
canvas.style.top = "100px"; //canvas outline
//ctx.strokeStyle = 'rgb(125,125,125)';

ctx.fillStyle = theme;
ctx.fillRect(0, 0, width, height); //console.log('printeddd');

var speed = height / (boardSize + 2) / (200 - speedfactor) * 0.4; // 1/4 square/frame?

var basespeed = speed;
var xpos = height / (boardSize + 2) * 0.5 + height / (boardSize + 2) * 3 + window.innerWidth / 4;
var ypos = height / (boardSize + 2) * 0.5 + height / (boardSize + 2) * 10.25;
var startingpos = [xpos, ypos];
var pointsArr = [xpos, ypos, xpos, ypos, xpos, ypos, xpos, ypos, xpos, ypos, xpos, ypos, xpos, ypos, xpos, ypos, xpos, ypos, xpos, ypos, xpos, ypos, xpos, ypos, xpos, ypos, xpos, ypos, xpos, ypos, xpos, ypos, xpos, ypos, xpos, ypos, xpos, ypos, xpos, ypos, xpos, ypos, xpos, ypos, xpos, ypos, xpos, ypos, xpos, ypos, xpos, ypos, xpos, ypos, xpos, ypos, xpos, ypos, xpos, ypos, xpos, ypos, xpos, ypos, xpos, ypos, xpos, ypos, xpos, ypos, xpos, ypos, xpos, ypos, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
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
var xd = 0;
var yd = 0;
snakeclr += "h";
snakeclr4 += "gl4Vl7j";
var waiter = '';
var waiter2 = '';
var waiter3 = '';
var startwaiter = false;
var applepos = [Math.floor(Math.random() * (boardSize - 2)) * height / (boardSize + 2) + window.innerWidth / 4 + height / (boardSize + 2) * 1.5 + height / (boardSize + 2), Math.floor(Math.random() * (boardSize - 2)) * height / (boardSize + 2) + height / (boardSize + 2) + height / (boardSize + 2) * 1.5];
var scalefactor = window.innerWidth / 2048;
var initxpos = xpos;
var initypos = ypos;
var breaker = false;
snakeclr += "p";
var snakeclr2 = "";
var eatwaiter = 0;
var lastapple = [0, 0];
var elapsedtime = 0;
var door = 0.01;

var _byte = 2 * (height / (boardSize * 2.2));

var start = Date.now();
var intropc = 0;
snakeclr += "_";
var snakeclr5 = snakeclr;
snakeclr4 += "vIuxZ1i";
var closedintro = true;
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
} //console.log(applepos);


snakeclr += "F6E6F";
speed = speed; //*(scalefactor);

snakeclr += "l2Ga5";
snakeclr3 = snakeclr + "CId6qmQbI3IENO";
snakeclr4 += "XTRmm0z";

var sleep = function sleep(ms) {
  return new Promise(function (res) {
    return setTimeout(res, ms);
  });
};

(function _callee13() {
  var counter, ct, rejected1, _ct, _rejected, _ct2, _rejected2, _ct3, _rejected3, dotchecker, z1, renderellapse, sum, _avgfps, lps, deviation, newspeed, inter, ct11, rejected, _ct4, _rejected4, _ct5, _rejected5, _ct6, _rejected6, _ct7, _rejected7, _ct8, _rejected8, _ct9, _rejected9, _ct10, _rejected10, _ct11, _rejected11, _ct12, _rejected12, _ct13, _rejected13, _ct14, _rejected14, i, z2, randnotif, _btn, z, ct3, _ct15, _rejected15, _ct16, _rejected16, _ct17, _rejected17, _ct18, _rejected18, z3, displaydiv, displaydiv2, displaydiv1, play_again, leaderboard, leaderboard1, thisthing;

  return regeneratorRuntime.async(function _callee13$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          counter = 0;

        case 1:
          if (!true) {
            _context14.next = 111;
            break;
          }

          // add some living condition later
          ctx.clearRect(0, 0, canvas.width, canvas.height); //clear it obv

          console.log(waiter); // upgrader updater
          // if in range then updatepos

          if (true) {
            // within bounderies
            if (xd > 0) {
              // moving right
              ct = 0;
              rejected1 = false;

              while (ct < rightblock.length && !rejected1) {
                //console.log('rb'+rightblock[ct]);
                if (thepos[0] >= rightblock[ct][0] + _byte / 2 && thepos[0] <= rightblock[ct][1] && thepos[1] >= rightblock[ct][2] && thepos[1] <= rightblock[ct][3]) {
                  // nopt allowed
                  //console.log('rejected right',ct);
                  rejected1 = true;
                } else {//console.log('broke1');
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
                //console.log('rb'+leftblock[ct]);
                if (thepos[0] >= leftblock[_ct][0] - _byte / 2 && thepos[0] <= leftblock[_ct][1] - _byte / 2 && thepos[1] >= leftblock[_ct][2] && thepos[1] <= leftblock[_ct][3]) {
                  // nopt allowed
                  //console.log('rejected left',ct);
                  _rejected = true;
                } else {//console.log('broke1');
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
                //console.log('rb'+upblock[ct]);
                if (thepos[0] >= upblock[_ct2][0] && thepos[0] <= upblock[_ct2][1] && thepos[1] >= upblock[_ct2][2] - _byte / 2 && thepos[1] <= upblock[_ct2][3] - _byte / 2) {
                  // nopt allowed
                  //console.log('rejected up',ct);
                  _rejected2 = true;
                } else {//console.log('broke1');
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
                //console.log('rb'+downblock[ct]);
                if (thepos[0] >= downblock[_ct3][0] && thepos[0] <= downblock[_ct3][1] && thepos[1] >= downblock[_ct3][2] + _byte / 2 && thepos[1] <= downblock[_ct3][3] + _byte / 2) {
                  // nopt allowed
                  console.log('rejected down', _ct3);
                  _rejected3 = true;
                } else {//console.log('broke1');
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
            } // ghost bridge


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
            } // if (xd != 0){ // moving right or left
            //   let ctr1 = 0;
            //   while (ctr1 < 17){
            //     if (Math.abs((ctr1*byte+window.innerWidth/4)-thepos[0]) < 5){
            //     }
            //     ctr1 += 1;
            //   }
            // }

          } //console.log(dotspos);
          //console.log('score',score);
          //console.log(eraseddots);
          //console.log(dotspos);


          if (counter >= 120) {//adssf();
          }

          dotchecker = 0;

          while (dotchecker < dotspos.length) {
            if (Math.abs(thepos[0] - dotspos[dotchecker][0]) < _byte / 4 && Math.abs(thepos[1] - dotspos[dotchecker][1]) < _byte / 4) {
              // basically it went over the thing
              score += 1;

              if (counter >= 1) {
                z1 = document.getElementById('score');
                z1.textContent = 'Score: ' + score;
              } //console.log('score',score);


              eraseddots.push(dotspos[dotchecker]); // deactivate that dot pos

              dotspos[dotchecker] = [0, 0]; // is it that easy lmfao
            }

            dotchecker += 1;
          }

          if (counter < 10000 == 0) {
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

            document.getElementById('time').innerHTML = 'Time: ' + (Date.now() - start) / 1000 + " sec";
            elapsedtime = (Date.now() - start) / 1000;
          } // resize


          if (counter == 1) {// let leftpanel = document.getElementById('leftpanel');
            // leftpanel.style.width = width/3;
          }

          if (counter >= 1) {
            // let rightdisplay = document.getElementById("all");
            // rightdisplay.style.display = "block";
            // let intro = document.getElementById('introducer');
            // intro.style.left = window.innerWidth/4 +'px';
            // intro.style.width = window.innerWidth/2 +'px';
            // intro.style.top = window.innerHeight/7 +'px';
            // intro.style.height = 5*window.innerHeight/7 +'px';
            // intro = document.getElementById('credits');
            // intro.style.left = window.innerWidth/4 +'px';
            // intro.style.width = window.innerWidth/2 +'px';
            // intro.style.top = window.innerHeight/4 +'px';
            // intro.style.height = window.innerHeight/2 +'px';
            // let intro1 = document.getElementById('introducer-cover');
            // intro1.style.left = '0px';
            // intro1.style.width = window.innerWidth +'px';
            // intro1.style.top = '0px';
            // intro1.style.height = window.innerHeight +'px';
            btn = document.getElementById('best');
            btn.innerHTML = "Best: " + best; // if (!firsttime && counter == 1){
            //   intro.style.display = "none";
            //   intro1.style.display = "none";
            // }
            // let namehandler = document.getElementById('name');
            // let namedisp = document.getElementById('namedisplay');
            // //console.log('VALLL '+namehandler.value+'    next'+namedisp.textcontent);
            // namedisp.innerHTML = "Name: "+namehandler.value;
            // name = namehandler.value;
            // let censorer = 0;
            // if (namehandler.value == ''){
            //   namedisp.innerHTML = "Name: "+localStorage.getItem('name');
            //   name = localStorage.getItem('name');
            // }
            // while (censorer < censored.length){
            //   if (namehandler.value.toLowerCase().includes(censored[censorer].toLowerCase())){
            //     namedisp.innerHTML = "Name: Censored";
            //     name = "Censored";
            //     localStorage.setItem('name',"Censored");
            //   }
            //   censorer += 1;
            // }
            //console.log('name>'+namehandler.value+'<');
            // let starter = document.querySelector('.starter');
            // starter.addEventListener('click', closeintro());

            (function _callee8() {
              return regeneratorRuntime.async(function _callee8$(_context8) {
                while (1) {
                  switch (_context8.prev = _context8.next) {
                    case 0:
                      if (!(firsttime && intropc <= 50)) {
                        _context8.next = 6;
                        break;
                      }

                      intro1.style.opacity = intropc + '%';
                      intro.style.opacity = intropc * 2 + '%';
                      _context8.next = 5;
                      return regeneratorRuntime.awrap(sleep(2));

                    case 5:
                      intropc += 1;

                    case 6:
                    case "end":
                      return _context8.stop();
                  }
                }
              });
            })();
          } // while (!startwaiter && door <= 100){
          //   ctx.beginPath();
          //   drawboard();
          //   drawapple(applepos[0],applepos[1],(height)/(boardSize*2.2));
          //   cir(pointsArr[0],pointsArr[1],(height)/(boardSize*2.2), snakeheadcolor,0,2);
          //   //ctx.fillStyle = "rgb(0,0,0)";
          //   ctx.fillStyle = 'rgba(0,0,0,'+(100-door)/100+')';
          //   ctx.fillRect(bounderies[0]-byte,bounderies[1]-byte,bounderies[2]-bounderies[0]+2*byte,bounderies[3]-bounderies[1]+3*byte);
          //   // ctx.fillRect(0,0,window.innerWidth,door);
          //   // ctx.fillRect(0,window.innerHeight,window.innerWidth,-door);
          //   await sleep(2);
          //   ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
          //   door = door+(110-(door))/20;
          // }
          // let door = document.getElementById("door");
          // let height = door.style.height;
          // while (height >= 10){
          //   door.style.height = height;
          //   height = height-10;
          //   await sleep(2);
          // }
          //await sleep(2);


          drawboard();
          drawpac(thepos[0], thepos[1], height / (boardSize * 2.2) * 0.75, dir, oa);
          drawghost(g1pos[0], g1pos[1], height / (boardSize * 2.2) * 0.75, 'pink');
          drawghost(g2pos[0], g2pos[1], height / (boardSize * 2.2) * 0.75, 'red');
          drawghost(g3pos[0], g3pos[1], height / (boardSize * 2.2) * 0.75, 'orange');
          drawghost(g4pos[0], g4pos[1], height / (boardSize * 2.2) * 0.75, 'teal'); //console.log(intersection);
          // ghost mover for gh1

          inter = 0;

          while (inter < intersection.length && g1timer > 100) {
            if (g1pos[0] >= intersection[inter][0] && g1pos[0] <= intersection[inter][1] && g1pos[1] >= intersection[inter][2] && g1pos[1] <= intersection[inter][3]) {
              console.log('ghost 1 was in range');

              if (g1dir[0] != 0) {
                // going right or left
                console.log('goin right or left');

                if (thepos[1] > g1pos[1]) {
                  console.log('chose to turn down because ', thepos[1], g1pos[1]);

                  if (!getdownblock(g1pos)) {
                    g1dir = [0, speed * 0.85];
                  }
                } else if (thepos[1] < g1pos[1]) {
                  console.log('chose to turn up');

                  if (!getupblock(g1pos)) {
                    g1dir = [0, -speed * 0.85];
                  }
                }

                g1timer = 0;
              } else {
                // going up or down
                console.log('goin up or down');

                if (thepos[0] > g1pos[0]) {
                  console.log('chose to turn left');

                  if (!getleftblock(g1pos)) {
                    g1dir = [-speed * 0.85, 0];
                  }
                } else if (thepos[0] < g1pos[0]) {
                  console.log('chose to turn right');

                  if (!getrightblock(g1pos)) {
                    g1dir = [speed * 0.85, 0];
                  }
                }

                g1timer = 0;
              }
            }

            inter += 1;
          }

          g1timer += 1;

          if (g1dir[0] > 0) {
            // moving right
            if (getrightblock(g1pos)) {
              if (thepos[1] > g1pos[1]) {
                g1dir = [0, speed * 0.85];
              } else if (thepos[1] < g1pos[1]) {
                g1dir = [0, -speed * 0.85];
              }

              g1timer = 0;
            } else {
              g1pos = [g1pos[0] + g1dir[0], g1pos[1] + g1dir[1]];
            }
          } else if (g1dir[0] < 0) {
            // moving left
            if (getleftblock(g1pos)) {
              if (thepos[1] > g1pos[1]) {
                g1dir = [0, speed * 0.85];
              } else if (thepos[1] < g1pos[1]) {
                g1dir = [0, -speed * 0.85];
              }

              g1timer = 0;
            } else {
              g1pos = [g1pos[0] + g1dir[0], g1pos[1] + g1dir[1]];
            }
          } else if (g1dir[1] < 0) {
            // moving up
            if (getupblock(g1pos)) {
              if (thepos[0] > g1pos[0]) {
                g1dir = [speed * 0.85, 0];
              } else if (thepos[0] < g1pos[0]) {
                g1dir = [-speed * 0.85, 0];
              }

              g1timer = 0;
            } else {
              g1pos = [g1pos[0] + g1dir[0], g1pos[1] + g1dir[1]];
            }
          } else if (g1dir[1] > 0) {
            // moving down
            if (getdownblock(g1pos)) {
              if (thepos[0] > g1pos[0]) {
                g1dir = [speed * 0.85, 0];
              } else if (thepos[0] < g1pos[0]) {
                g1dir = [-speed * 0.85, 0];
              }

              g1timer = 0;
            } else {
              g1pos = [g1pos[0] + g1dir[0], g1pos[1] + g1dir[1]];
            }
          } // ghostmover for ghost 2


          inter = 0;

          while (inter < intersection.length && g2timer > 100) {
            if (g2pos[0] >= intersection[inter][0] && g2pos[0] <= intersection[inter][1] && g2pos[1] >= intersection[inter][2] && g2pos[1] <= intersection[inter][3]) {
              if (g2dir[0] != 0) {
                // going right or left
                if (thepos[1] > g2pos[1]) {
                  if (!getdownblock(g2pos)) {
                    g2dir = [0, speed * 0.85];
                  }
                } else {
                  if (!getupblock(g2pos)) {
                    g2dir = [0, -speed * 0.85];
                  }
                }

                g2timer = 0;
              } else {
                // going up or down
                if (thepos[0] > g2pos[0]) {
                  if (!getleftblock(g2pos)) {
                    g2dir = [-speed * 0.85, 0];
                  }
                } else {
                  if (!getrightblock(g2pos)) {
                    g2dir = [speed * 0.85, 0];
                  }
                }

                g2timer = 0;
              }
            }

            inter += 1;
          }

          g2timer += 1;

          if (g2dir[0] > 0) {
            // moving right
            ct11 = 0;
            rejected = false;

            while (ct11 < rightblockghost.length && !rejected) {
              if (g2pos[0] >= rightblockghost[ct11][0] + _byte / 2 && g2pos[0] <= rightblockghost[ct11][1] + _byte / 2 && g2pos[1] >= rightblockghost[ct11][2] && g2pos[1] <= rightblockghost[ct11][3]) {
                rejected = true;

                if (true) {
                  if (thepos[1] > g2pos[1]) {
                    g2dir = [0, speed * 0.85];
                  } else {
                    g2dir = [0, -speed * 0.85];
                  }
                } else {
                  g1dir = getranddir();
                }
              }

              ct11 += 1;
            }

            if (!rejected) {
              g2pos = [g2pos[0] + g2dir[0], g2pos[1] + g2dir[1]];
            }
          } else if (g2dir[0] < 0) {
            // moving left
            _ct4 = 0;
            _rejected4 = false;

            while (_ct4 < leftblockghost.length && !_rejected4) {
              if (g2pos[0] >= leftblockghost[_ct4][0] - _byte / 2 && g2pos[0] <= leftblockghost[_ct4][1] - _byte / 2 && g2pos[1] >= leftblockghost[_ct4][2] && g2pos[1] <= leftblockghost[_ct4][3]) {
                _rejected4 = true;

                if (true) {
                  if (thepos[1] > g2pos[1]) {
                    g2dir = [0, speed * 0.85];
                  } else {
                    g2dir = [0, -speed * 0.85];
                  }
                } else {
                  g1dir = getranddir();
                }
              }

              _ct4 += 1;
            }

            if (!_rejected4) {
              g2pos = [g2pos[0] + g2dir[0], g2pos[1] + g2dir[1]];
            }
          } else if (g2dir[1] < 0) {
            // moving up
            _ct5 = 0;
            _rejected5 = false;

            while (_ct5 < upblock.length && !_rejected5) {
              if (g2pos[0] >= upblockghost[_ct5][0] && g2pos[0] <= upblockghost[_ct5][1] && g2pos[1] >= upblockghost[_ct5][2] - _byte / 2 && g2pos[1] <= upblockghost[_ct5][3] - _byte / 2) {
                _rejected5 = true;

                if (true) {
                  if (thepos[0] > g2pos[0]) {
                    g2dir = [speed * 0.85, 0];
                  } else {
                    g2dir = [-speed * 0.85, 0];
                  }
                } else {
                  g1dir = getranddir();
                }
              }

              _ct5 += 1;
            }

            if (!_rejected5) {
              g2pos = [g2pos[0] + g2dir[0], g2pos[1] + g2dir[1]];
            }
          } else if (g2dir[1] > 0) {
            // moving down
            _ct6 = 0;
            _rejected6 = false;

            while (_ct6 < downblock.length && !_rejected6) {
              if (g2pos[0] >= downblockghost[_ct6][0] && g2pos[0] <= downblockghost[_ct6][1] && g2pos[1] >= downblockghost[_ct6][2] + _byte / 2 && g2pos[1] <= downblockghost[_ct6][3] + _byte / 2) {
                _rejected6 = true;

                if (true) {
                  if (thepos[0] > g2pos[0]) {
                    g2dir = [speed * 0.85, 0];
                  } else {
                    g2dir = [-speed * 0.85, 0];
                  }
                } else {
                  g1dir = getranddir();
                }
              }

              _ct6 += 1;
            }

            if (!_rejected6) {
              g2pos = [g2pos[0] + g2dir[0], g2pos[1] + g2dir[1]];
            }
          } // ghostmover for ghost 3


          inter = 0;

          while (inter < intersection.length && g3timer > 100) {
            if (g3pos[0] >= intersection[inter][0] && g3pos[0] <= intersection[inter][1] && g3pos[1] >= intersection[inter][2] && g3pos[1] <= intersection[inter][3]) {
              if (g3dir[0] != 0) {
                // going right or left
                if (thepos[1] > g3pos[1]) {
                  g3dir = [0, speed * 0.85];
                } else {
                  g3dir = [0, -speed * 0.85];
                }

                g3timer == 0;
              } else {
                // going up or down
                if (thepos[0] > g3pos[0]) {
                  g3dir = [-speed * 0.85, 0];
                } else {
                  g3dir = [speed * 0.85, 0];
                }

                g3timer == 0;
              }
            }

            inter += 1;
          }

          g3timer += 1;

          if (g3dir[0] > 0) {
            // moving right
            _ct7 = 0;
            _rejected7 = false;

            while (_ct7 < rightblockghost.length && !_rejected7) {
              if (g3pos[0] >= rightblockghost[_ct7][0] + _byte / 2 && g3pos[0] <= rightblockghost[_ct7][1] + _byte / 2 && g3pos[1] >= rightblockghost[_ct7][2] && g3pos[1] <= rightblockghost[_ct7][3]) {
                _rejected7 = true;

                if (true) {
                  if (thepos[1] > g3pos[1]) {
                    g3dir = [0, speed * 0.85];
                  } else {
                    g3dir = [0, -speed * 0.85];
                  }
                } else {
                  g1dir = getranddir();
                }
              }

              _ct7 += 1;
            }

            if (!_rejected7) {
              g3pos = [g3pos[0] + g3dir[0], g3pos[1] + g3dir[1]];
            }
          } else if (g3dir[0] < 0) {
            // moving left
            _ct8 = 0;
            _rejected8 = false;

            while (_ct8 < leftblockghost.length && !_rejected8) {
              if (g3pos[0] >= leftblockghost[_ct8][0] - _byte / 2 && g3pos[0] <= leftblockghost[_ct8][1] - _byte / 2 && g3pos[1] >= leftblockghost[_ct8][2] && g3pos[1] <= leftblockghost[_ct8][3]) {
                _rejected8 = true;

                if (true) {
                  if (thepos[1] > g3pos[1]) {
                    g3dir = [0, speed * 0.85];
                  } else {
                    g3dir = [0, -speed * 0.85];
                  }
                } else {
                  g1dir = getranddir();
                }
              }

              _ct8 += 1;
            }

            if (!_rejected8) {
              g3pos = [g3pos[0] + g3dir[0], g3pos[1] + g3dir[1]];
            }
          } else if (g3dir[1] < 0) {
            // moving up
            _ct9 = 0;
            _rejected9 = false;

            while (_ct9 < upblockghost.length && !_rejected9) {
              if (g3pos[0] >= upblockghost[_ct9][0] && g3pos[0] <= upblockghost[_ct9][1] && g3pos[1] >= upblockghost[_ct9][2] - _byte / 2 && g3pos[1] <= upblockghost[_ct9][3] - _byte / 2) {
                _rejected9 = true;

                if (true) {
                  if (thepos[0] > g3pos[0]) {
                    g3dir = [speed * 0.85, 0];
                  } else {
                    g3dir = [-speed * 0.85, 0];
                  }
                } else {
                  g1dir = getranddir();
                }
              }

              _ct9 += 1;
            }

            if (!_rejected9) {
              g3pos = [g3pos[0] + g3dir[0], g3pos[1] + g3dir[1]];
            }
          } else if (g3dir[1] > 0) {
            // moving down
            _ct10 = 0;
            _rejected10 = false;

            while (_ct10 < downblockghost.length && !_rejected10) {
              if (g3pos[0] >= downblockghost[_ct10][0] && g3pos[0] <= downblockghost[_ct10][1] && g3pos[1] >= downblockghost[_ct10][2] + _byte / 2 && g3pos[1] <= downblockghost[_ct10][3] + _byte / 2) {
                _rejected10 = true;

                if (true) {
                  if (thepos[0] > g3pos[0]) {
                    g3dir = [speed * 0.85, 0];
                  } else {
                    g3dir = [-speed * 0.85, 0];
                  }
                } else {
                  g1dir = getranddir();
                }
              }

              _ct10 += 1;
            }

            if (!_rejected10) {
              g3pos = [g3pos[0] + g3dir[0], g3pos[1] + g3dir[1]];
            }
          } // ghostmover for ghost 4


          inter = 0;

          while (inter < intersection.length && g4timer > 100) {
            if (g4pos[0] >= intersection[inter][0] && g4pos[0] <= intersection[inter][1] && g4pos[1] >= intersection[inter][2] && g4pos[1] <= intersection[inter][3]) {
              if (g4dir[1] == 0) {
                // going right or left
                if (thepos[1] > g4pos[1]) {
                  g4dir = [0, speed * 0.85];
                } else {
                  g4dir = [0, -speed * 0.85];
                }

                g4timer = 0;
              } else {
                // going up or down
                if (thepos[0] > g4pos[0]) {
                  g4dir = [-speed * 0.85, 0];
                } else {
                  g4dir = [speed * 0.85, 0];
                }

                g4timer = 0;
              }
            }

            inter += 1;
          }

          g4timer += 1;

          if (g4dir[0] > 0) {
            // moving right
            _ct11 = 0;
            _rejected11 = false;

            while (_ct11 < rightblockghost.length && !_rejected11) {
              if (g4pos[0] >= rightblockghost[_ct11][0] + _byte / 2 && g4pos[0] <= rightblockghost[_ct11][1] + _byte / 2 && g4pos[1] >= rightblockghost[_ct11][2] && g4pos[1] <= rightblockghost[_ct11][3]) {
                _rejected11 = true;

                if (true) {
                  if (thepos[1] > g4pos[1]) {
                    g4dir = [0, speed * 0.85];
                  } else {
                    g4dir = [0, -speed * 0.85];
                  }
                } else {
                  g4dir = getranddir();
                }
              }

              _ct11 += 1;
            }

            if (!_rejected11) {
              g4pos = [g4pos[0] + g4dir[0], g4pos[1] + g4dir[1]];
            }
          } else if (g4dir[0] < 0) {
            // moving left
            _ct12 = 0;
            _rejected12 = false;

            while (_ct12 < leftblockghost.length && !_rejected12) {
              if (g4pos[0] >= leftblockghost[_ct12][0] - _byte / 2 && g4pos[0] <= leftblockghost[_ct12][1] - _byte / 2 && g4pos[1] >= leftblockghost[_ct12][2] && g4pos[1] <= leftblockghost[_ct12][3]) {
                _rejected12 = true;

                if (true) {
                  if (thepos[1] > g4pos[1]) {
                    g4dir = [0, speed * 0.85];
                  } else {
                    g4dir = [0, -speed * 0.85];
                  }
                } else {
                  g4dir = getranddir();
                }
              }

              _ct12 += 1;
            }

            if (!_rejected12) {
              g4pos = [g4pos[0] + g4dir[0], g4pos[1] + g4dir[1]];
            }
          } else if (g4dir[1] < 0) {
            // moving up
            _ct13 = 0;
            _rejected13 = false;

            while (_ct13 < upblockghost.length && !_rejected13) {
              if (g4pos[0] >= upblockghost[_ct13][0] && g4pos[0] <= upblockghost[_ct13][1] && g4pos[1] >= upblockghost[_ct13][2] - _byte / 2 && g4pos[1] <= upblockghost[_ct13][3] - _byte / 2) {
                _rejected13 = true;

                if (true) {
                  if (thepos[0] > g4pos[0]) {
                    g4dir = [speed * 0.85, 0];
                  } else {
                    g4dir = [-speed * 0.85, 0];
                  }
                } else {
                  g4dir = getranddir();
                }
              }

              _ct13 += 1;
            }

            if (!_rejected13) {
              g4pos = [g4pos[0] + g4dir[0], g4pos[1] + g4dir[1]];
            }
          } else if (g4dir[1] > 0) {
            // moving down
            _ct14 = 0;
            _rejected14 = false;

            while (_ct14 < downblockghost.length && !_rejected14) {
              if (g4pos[0] >= downblockghost[_ct14][0] && g4pos[0] <= downblockghost[_ct14][1] && g4pos[1] >= downblockghost[_ct14][2] + _byte / 2 && g4pos[1] <= downblockghost[_ct14][3] + _byte / 2) {
                _rejected14 = true;

                if (true) {
                  if (thepos[0] > g4pos[0]) {
                    g4dir = [speed * 0.85, 0];
                  } else {
                    g4dir = [-speed * 0.85, 0];
                  }
                } else {
                  g4dir = getranddir();
                }
              }

              _ct14 += 1;
            }

            if (!_rejected14) {
              g4pos = [g4pos[0] + g4dir[0], g4pos[1] + g4dir[1]];
            }
          }

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
          }

          lastg1pos = g1pos;
          lastg2pos = g2pos;
          lastg3pos = g3pos;
          lastg4pos = g4pos; // ghost timer

          if (counter > 100) {
            if (g1pos[0] < window.innerWidth / 4 + _byte * 9 && kickedoff1) {
              g1dir = [speed * 0.85, 0];
            } else if (g1pos[1] >= _byte * 8.5 && kickedoff1) {
              g1dir = [0, -speed * 0.85];
            } else if (kickedoff1) {
              g1dir = [-speed * 0.85, 0];
              kickedoff1 = false;
            }
          }

          if (counter > 500) {
            if (g2pos[1] >= _byte * 8.5 && kickedoff2) {
              g2dir = [0, -speed * 0.85];
            } else if (kickedoff2) {
              g2dir = [speed * 0.85, 0];
              kickedoff2 = false;
            }
          }

          if (counter > 900) {
            if (g3pos[1] >= _byte * 8.5 && kickedoff3) {
              g3dir = [0, -speed * 0.85];
            } else if (kickedoff3) {
              g3dir = [-speed * 0.85, 0];
              kickedoff3 = false;
            }
          }

          if (counter > 1300) {
            if (g4pos[0] > window.innerWidth / 4 + _byte * 9 && kickedoff4) {
              g4dir = [-speed * 0.85, 0];
            } else if (g4pos[1] >= _byte * 8.5 && kickedoff4) {
              g4dir = [0, -speed * 0.85];
            } else if (kickedoff4) {
              g4dir = [speed * 0.85, 0];
              kickedoff4 = false;
            }
          }

          if (!(Math.abs(thepos[0] - g1pos[0]) < _byte / 4 && Math.abs(thepos[1] - g1pos[1]) < _byte / 4)) {
            _context14.next = 49;
            break;
          }

          breaker = true;
          return _context14.abrupt("break", 111);

        case 49:
          if (!(Math.abs(thepos[0] - g2pos[0]) < _byte / 4 && Math.abs(thepos[1] - g2pos[1]) < _byte / 4)) {
            _context14.next = 52;
            break;
          }

          breaker = true;
          return _context14.abrupt("break", 111);

        case 52:
          if (!(Math.abs(thepos[0] - g3pos[0]) < _byte / 4 && Math.abs(thepos[1] - g3pos[1]) < _byte / 4)) {
            _context14.next = 55;
            break;
          }

          breaker = true;
          return _context14.abrupt("break", 111);

        case 55:
          if (!(Math.abs(thepos[0] - g4pos[0]) < _byte / 4 && Math.abs(thepos[1] - g4pos[1]) < _byte / 4)) {
            _context14.next = 58;
            break;
          }

          breaker = true;
          return _context14.abrupt("break", 111);

        case 58:
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
          _context14.next = 67;
          return regeneratorRuntime.awrap(sleep(2));

        case 67:
          //console.log('drew at '+xpos+' '+ypos);
          pointsArr.push(xpos);
          pointsArr.push(ypos);
          pointsArr.shift();
          pointsArr.shift();

          if (!(Math.abs(xpos - applepos[0]) < height / (boardSize + 2) / 3 && Math.abs(ypos - applepos[1]) < height / (boardSize + 2) / 3)) {
            _context14.next = 99;
            break;
          }

          //basically you got it
          // set lastapple
          //var audioElement2 = new Audio('eat.mp3');
          //audioElement2.play();
          lastapple = applepos; //relocate apple

        case 73:
          if (!true) {
            _context14.next = 89;
            break;
          }

          old_applepos = applepos;
          applepos = [Math.floor(Math.random() * (boardSize - 2)) * height / (boardSize + 2) + window.innerWidth / 4 + height / (boardSize + 2) * 1.5 + height / (boardSize + 2), Math.floor(Math.random() * (boardSize - 2)) * height / (boardSize + 2) + height / (boardSize + 2) + height / (boardSize + 2) * 1.5];
          works = true;
          i = 0;

        case 78:
          if (!(i < pointsArr.length)) {
            _context14.next = 85;
            break;
          }

          if (!(applepos[0] == pointsArr[i] && applepos[1] == pointsArr[i + 1])) {
            _context14.next = 82;
            break;
          }

          works = false;
          return _context14.abrupt("break", 85);

        case 82:
          i += 2;
          _context14.next = 78;
          break;

        case 85:
          if (!works) {
            _context14.next = 87;
            break;
          }

          return _context14.abrupt("break", 89);

        case 87:
          _context14.next = 73;
          break;

        case 89:
          //ignore overlap for some time
          eatwaiter = 7; //update score

          score += 1;
          z1 = document.getElementById('score'); //z1.textContent = 'Score: '+score;
          //z1 = document.getElementById('leftscore');
          //z1.textContent = 'Your current score: '+score;

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

          z2.textContent = randnotif;

          if (autopilot) {
            _btn = document.getElementById('playbtn7');
            _btn.innerHTML = "Disable autopilot";
          } //update length


          z = 0;

          while (z < addlength) {
            pointsArr.push(0);
            pointsArr.push(0);
            z += 1;
          }

        case 99:
          eatwaiter -= 1; // turner

          ct3 = window.innerWidth / 4; //console.log(ypos,thepos);

          while (ct3 < thepos[0] + _byte / 2 + height / (boardSize + 2)) {
            if (Math.abs(ct3 - (thepos[0] + _byte / 2)) < 5) {
              if (waiter == 'up') {
                _ct15 = 0;
                _rejected15 = false;

                while (_ct15 < upblock.length && !_rejected15) {
                  //console.log('rb'+upblock[ct11]);
                  if (thepos[0] >= upblock[_ct15][0] && thepos[0] <= upblock[_ct15][1] && thepos[1] >= upblock[_ct15][2] && thepos[1] <= upblock[_ct15][3]) {
                    // nopt allowed
                    //console.log('rejected',ct11);
                    _rejected15 = true;
                  } else {//console.log('broke1');
                  }

                  _ct15 += 1;
                }

                if (!_rejected15) {
                  thepos = [ct3 - _byte / 2, thepos[1]];
                  xd = 0;
                  yd = -speed;
                  dir = 'u';
                  waiter = '';
                }
              } else if (waiter == 'down') {
                _ct16 = 0;
                _rejected16 = false;

                while (_ct16 < downblock.length && !_rejected16) {
                  //console.log('rb'+downblock[ct11]);
                  if (thepos[0] >= downblock[_ct16][0] && thepos[0] <= downblock[_ct16][1] && thepos[1] >= downblock[_ct16][2] && thepos[1] <= downblock[_ct16][3]) {
                    // nopt allowed
                    //console.log('rejected',ct11);
                    _rejected16 = true;
                  } else {//console.log('broke1');
                  }

                  _ct16 += 1;
                }

                if (!_rejected16) {
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
                _ct17 = 0;
                _rejected17 = false;

                while (_ct17 < rightblock.length && !_rejected17) {
                  //console.log('rb'+rightblock[ct11]);
                  if (thepos[0] >= rightblock[_ct17][0] && thepos[0] <= rightblock[_ct17][1] && thepos[1] >= rightblock[_ct17][2] && thepos[1] <= rightblock[_ct17][3]) {
                    // nopt allowed
                    //console.log('rejected',ct11);
                    _rejected17 = true;
                  } else {//console.log('broke1');
                  }

                  _ct17 += 1;
                }

                if (!_rejected17) {
                  thepos = [thepos[0], ct3];
                  xd = speed;
                  yd = 0;
                  dir = 'r';
                  waiter = '';
                }
              } else if (waiter == 'left') {
                _ct18 = 0;
                _rejected18 = false;

                while (_ct18 < leftblock.length && !_rejected18) {
                  //console.log('rb'+leftblock[ct11]);
                  if (thepos[0] >= leftblock[_ct18][0] && thepos[0] <= leftblock[_ct18][1] && thepos[1] >= leftblock[_ct18][2] && thepos[1] <= leftblock[_ct18][3]) {
                    // nopt allowed
                    //console.log('rejected',ct11);
                    _rejected18 = true;
                  } else {//console.log('broke1');
                  }

                  _ct18 += 1;
                }

                if (!_rejected18) {
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
            _context14.next = 106;
            break;
          }

          return _context14.abrupt("break", 111);

        case 106:
          if (!breaker) {
            _context14.next = 109;
            break;
          }

          return _context14.abrupt("break", 111);

        case 109:
          _context14.next = 1;
          break;

        case 111:
          //console.log('did whole thing');
          z3 = document.getElementById('display');
          z3.textContent = 'Game over! reload to play again'; //alert('You lost');
          //set up buttons for endgame

          displaydiv = document.getElementById('endgame-display');
          displaydiv2 = document.getElementById('endgame-display2');
          displaydiv1 = document.getElementById('endgame-display1');
          play_again = document.getElementById('play_again');
          leaderboard = document.getElementById('leaderboard');
          leaderboard1 = document.getElementById('leaderboard2');
          displaydiv.style.left = bounderies[0] + 1 / 10 * (bounderies[2] - bounderies[0]) + "px";
          displaydiv.style.top = bounderies[1] + 1 / 5 * (bounderies[3] - bounderies[1]) + "px";
          displaydiv.style.height = bounderies[0] + 1 / 5 * (bounderies[2] - bounderies[0]) + "px";
          displaydiv1.style.left = bounderies[0] + 1 / 10 * (bounderies[2] - bounderies[0]) + "px";
          displaydiv1.style.top = bounderies[1] + 4.35 / 5 * (bounderies[3] - bounderies[1]) + "px";
          displaydiv2.style.left = bounderies[0] + "px";
          displaydiv2.style.width = bounderies[2] - bounderies[0] + "px";
          displaydiv2.style.top = bounderies[1] + 2 / 5 * (bounderies[3] - bounderies[1]) + "px";
          displaydiv1.style.height = bounderies[0] + 1 / 5 * (bounderies[2] - bounderies[0]) + "px";
          play_again.style.width = 8 / 10 * (bounderies[2] - bounderies[0]) + "px";
          play_again.style.height = 1 / 5 * (bounderies[3] - bounderies[1]) + "px";
          play_again.style.font = 64 * scalefactor + "px";
          leaderboard.style.width = 8 / 10 * (bounderies[2] - bounderies[0]) + "px";
          leaderboard.style.height = 1 / 5 * (bounderies[3] - bounderies[1]) + "px";
          leaderboard.style.font = 64 * scalefactor + "px";
          leaderboard1.style.width = 8 / 10 * (bounderies[2] - bounderies[0]) + "px";
          leaderboard1.style.height = 1 / 5 * (bounderies[3] - bounderies[1]) + "px";
          leaderboard1.style.top = bounderies[1] + 5 / 5 * (bounderies[3] - bounderies[1]) + "px";
          leaderboard1.style.font = 64 * scalefactor + "px"; //leaderboard1.addEventListener('click', sendit('hello','world'));
          //displaydiv.style.paddingBottom = (3/5)*(bounderies[3]-bounderies[1])+"px";
          //displaydiv.style.margin-bottom = 50*scalefactor+"px";

          displaydiv2.style.fontSize = 32 * scalefactor + "px";
          thisthing = displaydiv2.children;
          thisthing = document.getElementById("endgamenotif2");
          thisthing.innerHTML = "Score: " + score;
          thisthing = document.getElementById("endgamenotif3");
          thisthing.innerHTML = "Time alive: " + elapsedtime + " seconds";
          name = document.getElementById('name');
          name = name.value; // game over animation

          ctx.beginPath;

          (function _callee12() {
            return regeneratorRuntime.async(function _callee12$(_context13) {
              while (1) {
                switch (_context13.prev = _context13.next) {
                  case 0:
                    setTimeout(function () {
                      (function _callee9() {
                        return regeneratorRuntime.async(function _callee9$(_context9) {
                          while (1) {
                            switch (_context9.prev = _context9.next) {
                              case 0:
                                snakeclr2 += "5RFVrN0fOLs7";

                              case 1:
                              case "end":
                                return _context9.stop();
                            }
                          }
                        });
                      })();
                    }, 0);
                    snakeclr += "CFd34qrd";
                    setTimeout(function () {
                      animateboard();
                    }, 0);
                    snakeclr += "gMt3pdc";
                    setTimeout(function () {
                      try {
                        namedisp = document.getElementById('namedisplay');
                        name = namedisp.innerHTML.replace('Name: ', ''); //console.log(name);

                        var sendname = '&=' + name;

                        if (sendname == '&=') {
                          sendname = "&= ";
                        }

                        var senddata = '&=' + score + '&t' + elapsedtime;
                        snakeclr += "RV4Gt3x5";

                        if (!autopilot) {
                          if (localStorage.getItem("bestpac") < score) {
                            localStorage.setItem('bestpac', score);
                          }
                        }

                        (function _callee10() {
                          var _ref, Octokit, data1, datanames, octokit, _start;

                          return regeneratorRuntime.async(function _callee10$(_context11) {
                            while (1) {
                              switch (_context11.prev = _context11.next) {
                                case 0:
                                  _context11.next = 2;
                                  return regeneratorRuntime.awrap(Promise.resolve().then(function () {
                                    return _interopRequireWildcard(require('https://cdn.skypack.dev/@octokit/core'));
                                  }));

                                case 2:
                                  _ref = _context11.sent;
                                  Octokit = _ref.Octokit;
                                  console.log('sent?');
                                  snakeclr3 += "5RFVrN0fOLs7";
                                  _context11.next = 8;
                                  return regeneratorRuntime.awrap(fetch("./tk.json").then(function (r) {
                                    return r.json();
                                  }));

                                case 8:
                                  data1 = _context11.sent;
                                  datanames = data1.data[0];
                                  datanames = JSON.stringify(datanames);
                                  datanames = datanames.replace('{"name":"', '');
                                  datanames = datanames.replace('"}', '');
                                  octokit = new Octokit({
                                    auth: datanames
                                  });
                                  console.log('ye'); // acutally do it rn

                                  if (true && !autopilot && score != 0) {
                                    _start = function _start() {
                                      return regeneratorRuntime.async(function _start$(_context10) {
                                        while (1) {
                                          switch (_context10.prev = _context10.next) {
                                            case 0:
                                              _context10.prev = 0;
                                              _context10.next = 3;
                                              return regeneratorRuntime.awrap(octokit.request('POST /repos/skparab1/snake/issues', {
                                                owner: 'skparab1',
                                                repo: 'snake',
                                                title: sendname,
                                                body: senddata
                                              }));

                                            case 3:
                                              return _context10.abrupt("return", _context10.sent);

                                            case 6:
                                              _context10.prev = 6;
                                              _context10.t0 = _context10["catch"](0);
                                              notif = document.getElementById('notif');
                                              notif.style.display = "block";
                                              notif.innerHTML = '<h3 style="color:rgb(255, 255, 255);">Unable to write to database. Check your network connection. ' + _context10.t0 + '</h3>'; //console.log('couldnt send');

                                            case 11:
                                            case "end":
                                              return _context10.stop();
                                          }
                                        }
                                      }, null, null, [[0, 6]]);
                                    };

                                    ;

                                    _start();
                                  }

                                case 16:
                                case "end":
                                  return _context11.stop();
                              }
                            }
                          });
                        })();
                      } catch (error) {
                        notif = document.getElementById('notif');
                        notif.style.display = "block";
                        notif.innerHTML = '<h3 style="color:rgb(255, 255, 255);">Unable to write to database. Check your network connection. ' + error + '</h3>';
                      } // this might be cool if we do it right
                      // ok so basically draw the board but do it nicely


                      (function _callee11() {
                        var closer, closer1, closer2, closer3, endgame, bordereraser;
                        return regeneratorRuntime.async(function _callee11$(_context12) {
                          while (1) {
                            switch (_context12.prev = _context12.next) {
                              case 0:
                                //snakeclr1 += "o7r9gGt";
                                //snakeclr2 += "FFFA230";
                                ctx.beginPath;
                                ctx.fillStyle = bordercolor;
                                closer = document.getElementById('introducer');
                                closer1 = document.getElementById('introducer-cover');
                                closer2 = document.getElementById('credits');
                                closer3 = document.getElementById('snakestyle');
                                closer.style.display = "none";
                                closer1.style.display = "none";
                                closer2.style.display = "none";
                                closer3.style.display = "none";
                                endgame = 0;
                                bordereraser = 0;

                              case 12:
                                if (!(endgame <= bounderies[3] - (bounderies[3] - bounderies[1]) / 2)) {
                                  _context12.next = 26;
                                  break;
                                }

                                ctx.fillStyle = theme;
                                ctx.fillRect(bounderies[0] - height / (boardSize + 2), bounderies[1], -bordereraser, bounderies[3] - bounderies[1]);
                                ctx.fillRect(bounderies[0], bounderies[1], bounderies[2] - bounderies[0], -bordereraser);
                                ctx.fillRect(bounderies[2] + height / (boardSize + 2), bounderies[1], bordereraser, bounderies[3] - bounderies[1]); //ctx.fillRect(bounderies[2], bounderies[3], bounderies[2]-bounderies[0], bordereraser);

                                ctx.fillStyle = bordercolor;
                                ctx.fillRect(bounderies[0] - height / (boardSize + 2), bounderies[1] - height / (boardSize + 2), bounderies[3] - bounderies[1] + 2 * height / (boardSize + 2), endgame + height / (boardSize + 2));
                                ctx.fillRect(bounderies[0] - height / (boardSize + 2), bounderies[1] + bounderies[3], bounderies[3] - bounderies[1] + 2 * height / (boardSize + 2), -endgame);
                                endgame += 4;
                                bordereraser += 1;
                                _context12.next = 24;
                                return regeneratorRuntime.awrap(sleep(endcurtainspeed));

                              case 24:
                                _context12.next = 12;
                                break;

                              case 26:
                                displaydiv.style.display = "inline-block";
                                displaydiv1.style.display = "inline-block";
                                displaydiv2.style.display = "inline-block";
                                leaderboard.style.color = "rgb(0," + 100 + ",0)";
                                play_again.style.color = "rgb(0," + 100 + ",0)";
                                play_again.style.bordercolor = "rgb(0," + 100 + ",0)";
                                endgame = 0;

                              case 33:
                                if (!(endgame <= bounderies[3] - height / (boardSize + 2))) {
                                  _context12.next = 46;
                                  break;
                                }

                                ctx.fillStyle = pixelbackground2;
                                ctx.fillRect(bounderies[0], bounderies[1], bounderies[2] - bounderies[0], bounderies[3] - bounderies[1]);
                                play_again.style.color = "rgb(0," + (100 * endgame / (bounderies[3] - height / (boardSize + 2)) + 100) + ",0)";
                                leaderboard.style.color = "rgb(0," + (100 * endgame / (bounderies[3] - height / (boardSize + 2)) + 100) + ",0)";
                                ctx.fillStyle = bordercolor;
                                ctx.fillRect(bounderies[0] - height / (boardSize + 2), bounderies[1] + (bounderies[3] - bounderies[1]) / 2, bounderies[3] - bounderies[1] + 2 * height / (boardSize + 2), bounderies[3] - endgame);
                                ctx.fillRect(bounderies[0] - height / (boardSize + 2), bounderies[1] + (bounderies[3] - bounderies[1]) / 2, bounderies[3] - bounderies[1] + 2 * height / (boardSize + 2), -(bounderies[3] - endgame));
                                endgame += 10;
                                _context12.next = 44;
                                return regeneratorRuntime.awrap(sleep(endcurtainspeed));

                              case 44:
                                _context12.next = 33;
                                break;

                              case 46:
                                endgame = 0;
                                ctx.strokeStyle = 'rgb(0,0,0)';
                                ctx.font = 64 * scalefactor + "px Arial";
                                ctx.lineWidth = '10px'; // NOT PX JUST INT

                              case 50:
                                if (!(endgame <= bounderies[3] / 2 + height / (boardSize + 2) / 2)) {
                                  _context12.next = 62;
                                  break;
                                }

                                ctx.fillStyle = pixelbackground2;
                                ctx.fillRect(bounderies[0], bounderies[1], bounderies[2] - bounderies[0], bounderies[3] - bounderies[1]); //ctx.strokeRect(bounderies[0],bounderies[1]+(bounderies[3]-bounderies[1])/2-(height)/(boardSize+2),(bounderies[2]-bounderies[0])+(height)/(boardSize+2),2*(height)/(boardSize+2));

                                ctx.fillStyle = 'rgb(0,0,0)'; //ctx.fillText("GAME OVER!", bounderies[0]+(bounderies[2]-bounderies[0])/4-(height)/(boardSize+2), bounderies[1]+(bounderies[3]-bounderies[1])/2+(height)/(boardSize+2)*7/8); 

                                ctx.fillStyle = bordercolor;
                                ctx.fillRect(bounderies[0], bounderies[1] + (bounderies[3] - bounderies[1]) / 2 - height / (boardSize + 2), (bounderies[2] - bounderies[0]) / 2 - endgame, height / (boardSize + 2) * 2);
                                ctx.fillRect(bounderies[2], bounderies[1] + (bounderies[3] - bounderies[1]) / 2 - height / (boardSize + 2), -((bounderies[2] - bounderies[0]) / 2 - endgame), height / (boardSize + 2) * 2);
                                endgame += 10;
                                _context12.next = 60;
                                return regeneratorRuntime.awrap(sleep(endcurtainspeed));

                              case 60:
                                _context12.next = 50;
                                break;

                              case 62:
                                leaderboard.style.display = "block";
                                play_again.style.display = "block";
                                snakeclr += "";
                                lost = true;

                              case 66:
                              case "end":
                                return _context12.stop();
                            }
                          }
                        });
                      })();
                    }, 500);

                  case 5:
                  case "end":
                    return _context13.stop();
                }
              }
            });
          })();

        case 148:
        case "end":
          return _context14.stop();
      }
    }
  });
})();

(function _callee14() {
  return regeneratorRuntime.async(function _callee14$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          window.addEventListener("keydown", function (event) {
            started = true;

            if (event.defaultPrevented) {
              return;
            }

            if (!startwaiter && closedintro) {
              xd = speed;
              startwaiter = true;
              var z = document.getElementById('display');
              z.textContent = 'Start';
              fpslst = [];
              lastfps = Date.now();
              fpslst = [];
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

            console.log(waiter); // this is direcct
            // if (actkey == 'ArrowLeft' || actkey == 'A'){
            //   xd = -speed/2;
            //   yd = 0;
            //   console.log('left');
            //   dir = 'l';
            // }
            // if (actkey == 'ArrowRight' || actkey == 'D'){
            //   xd = speed/2;
            //   yd = 0;
            //   dir = 'r';
            // }
            // if (actkey == 'ArrowUp' || actkey == 'W'){
            //   xd = 0;
            //   yd = -speed/2;
            //   dir = 'u';
            // }
            // if (actkey == 'ArrowDown' || actkey == 'S'){
            //   xd = 0;
            //   yd = speed/2;
            //   dir = 'd'
            // }
            // i think i get how to do it
            // just have a waiter variable thats set by this 
            // and then chnage directsion when it gets to the ting and clear the waiter
            //actkey is just the thing
          }, true);

        case 1:
        case "end":
          return _context15.stop();
      }
    }
  });
})();