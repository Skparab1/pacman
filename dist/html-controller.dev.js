"use strict";

var overlay = document.getElementById('overlay');
var rulesModal = document.getElementById('rules-modal');
var contributorsModal = document.getElementById('contributors-modal');

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
  var audiobtn = document.getElementById("audio-toggle");

  if (audioElement.paused) {
    audioElement.play();
    audiobtn.textContent = "Pause Music";
  } else {
    audioElement.pause();
    audiobtn.textContent = "Play Music";
  }
}

function toggleTheme() {
  var body = getComputedStyle(document.body);
  var bgColor = body.getPropertyValue('--bgColor');

  if (bgColor === 'black') {
    document.body.style.setProperty('--bgColor', 'white');
    document.body.style.setProperty('--fgColor', 'black');
    theme = 'white';
  } else {
    document.body.style.setProperty('--bgColor', 'black');
    document.body.style.setProperty('--fgColor', 'white');
    theme = 'black';
  }

  var sleep = function sleep(ms) {
    return new Promise(function (res) {
      return setTimeout(res, ms);
    });
  };

  if (theme == 'black') {
    var clr = 255;

    (function _callee() {
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(clr >= 0)) {
                _context.next = 7;
                break;
              }

              clr -= 10;
              theme = 'rgb(' + clr + ',' + clr + ',' + clr + ')';
              _context.next = 5;
              return regeneratorRuntime.awrap(sleep(2));

            case 5:
              _context.next = 0;
              break;

            case 7:
              if (clr <= 40) {
                theme = 'black';
              }

            case 8:
            case "end":
              return _context.stop();
          }
        }
      });
    })();
  } else {
    var _clr = 0;

    (function _callee2() {
      return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(_clr <= 255)) {
                _context2.next = 7;
                break;
              }

              _clr += 10;
              theme = 'rgb(' + _clr + ',' + _clr + ',' + _clr + ')';
              _context2.next = 5;
              return regeneratorRuntime.awrap(sleep(2));

            case 5:
              _context2.next = 0;
              break;

            case 7:
              if (_clr >= 250) {
                theme = 'white';
              }

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      });
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