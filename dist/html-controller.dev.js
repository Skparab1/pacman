"use strict";

var overlay = document.getElementById('overlay');
var rulesModal = document.getElementById('rules-modal');
var contributorsModal = document.getElementById('contributors-modal');
var feedback = document.getElementById('feedback-modal');

function starteverything() {
  startwaiter = true;
  started = true;
  counter = 0;
  var z = document.getElementById('display');
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

function changemode() {
  var mode = document.getElementById('mode');
  localStorage.setItem('pacmode', mode.value);
  window.location.reload();
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

function toggleTheme() {
  var sleep = function sleep(ms) {
    return new Promise(function (res) {
      return setTimeout(res, ms);
    });
  };

  if (theme == 'white' || theme == 'rgb(255,255,255)') {
    var clr = 255;

    (function _callee() {
      var setclr;
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(clr >= 0)) {
                _context.next = 49;
                break;
              }

              clr -= 10;
              theme = 'rgb(' + clr + ',' + clr + ',' + clr + ')';
              document.body.style.background = theme;
              setclr = 'rgb(' + (255 - clr) + ',' + (255 - clr) + ',' + (255 - clr) + ')';
              maketheme('header1', setclr);
              maketheme('header2', setclr);
              maketheme('header3', setclr);
              maketheme('title', setclr);
              maketheme('settings', setclr);
              maketheme('theme', setclr);
              clrbtn1('box', setclr);
              clrbtn1('left-panel', setclr);
              clrbtn1('rulesbtn', setclr);
              clrbtn1('mode', setclr);
              maketheme('mode', setclr);
              maketheme('rules', setclr);
              clrbtn1('contributersbtn', setclr);
              maketheme('contributers', setclr);
              clrbtn1('leaderboardbtn', setclr);
              maketheme('leaderboard', setclr);
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
              clrbtn1('up', setclr);
              clrbtn1('left', setclr);
              clrbtn1('down', setclr);
              clrbtn1('right', setclr);
              maketheme('es', setclr);
              maketheme('sf', setclr);
              maketheme('oth', setclr);
              clrbtn1('contributersbtn1', setclr);
              clrbtn1('contributersbtn2', setclr);
              clrbtn1('contributersbtn3', setclr);
              maketheme('cb1', setclr);
              maketheme('cb2', setclr);
              maketheme('cb3', setclr);
              _context.next = 47;
              return regeneratorRuntime.awrap(sleep(2));

            case 47:
              _context.next = 0;
              break;

            case 49:
              if (clr <= 10) {
                theme = 'black';
              }

            case 50:
            case "end":
              return _context.stop();
          }
        }
      });
    })();
  } else {
    var _clr = 0;

    (function _callee2() {
      var setclr;
      return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(_clr <= 255)) {
                _context2.next = 49;
                break;
              }

              _clr += 10;
              theme = 'rgb(' + _clr + ',' + _clr + ',' + _clr + ')';
              document.body.style.background = theme;
              setclr = 'rgb(' + (255 - _clr) + ',' + (255 - _clr) + ',' + (255 - _clr) + ')';
              maketheme('header1', setclr);
              maketheme('header2', setclr);
              maketheme('header3', setclr);
              maketheme('title', setclr);
              maketheme('settings', setclr);
              maketheme('theme', setclr);
              clrbtn1('box', setclr);
              clrbtn1('left-panel', setclr);
              clrbtn1('rulesbtn', setclr);
              clrbtn1('mode', setclr);
              maketheme('mode', setclr);
              maketheme('rules', setclr);
              clrbtn1('contributersbtn', setclr);
              maketheme('contributers', setclr);
              clrbtn1('leaderboardbtn', setclr);
              maketheme('leaderboard', setclr);
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
              maketheme('es', setclr);
              maketheme('sf', setclr);
              maketheme('oth', setclr);
              clrbtn1('contributersbtn1', setclr);
              clrbtn1('contributersbtn2', setclr);
              clrbtn1('contributersbtn3', setclr);
              maketheme('cb1', setclr);
              maketheme('cb2', setclr);
              maketheme('cb3', setclr);
              _context2.next = 47;
              return regeneratorRuntime.awrap(sleep(2));

            case 47:
              _context2.next = 0;
              break;

            case 49:
              if (_clr >= 245) {
                theme = 'white';
              }

            case 50:
            case "end":
              return _context2.stop();
          }
        }
      });
    })();
  }
}

function togglesfx() {
  if (sfx) {
    //eatsfx = false;
    localStorage.setItem('sfx', 'false'); //localStorage.setItem('eatsfx','false');

    sfx = false;
  } else {
    localStorage.setItem('sfx', 'true');
    sfx = true;
  }
}

function toggleeatsfx() {
  if (eatsfx) {
    eatsfx = false;
    localStorage.setItem('eatsfx', 'false');
  } else {
    eatsfx = true;
    localStorage.setItem('eatsfx', 'true');
  }
}

function highlightbtn(id) {
  var el = document.getElementById(id);
  el.style.background = 'rgb(50,50,50)';
  el.style.borderColor = 'white';
  el.style.color = 'white';
}

function mutebtn(id) {
  var el = document.getElementById(id);
  el.style.borderColor = 'gray';
  el.style.color = 'gray';
  el.style.background = 'black';
}

function selectbtn(question, option) {
  if (question == 1) {
    q1 = document.getElementById(question + ',' + option).textContent;
  } else if (question == 2) {
    q2 = document.getElementById(question + ',' + option).textContent;
  } else if (question == 3) {
    q3 = document.getElementById(question + ',' + option).textContent;
  } else if (question == 4) {
    q4 = document.getElementById(question + ',' + option).textContent;
  } else if (question == 5) {
    q5 = document.getElementById(question + ',' + option).textContent;
  } else if (question == 6) {
    q6 = document.getElementById(question + ',' + option).textContent;
  } else if (question == 7) {
    q7 = document.getElementById(question + ',' + option).textContent;
  } else if (question == 8) {
    q8 = document.getElementById(question + ',' + option).textContent;
  }

  var cycler = 1;

  while (cycler <= 5) {
    var idf = question + ',' + cycler;

    if (cycler == option) {
      highlightbtn(idf);
    } else {
      mutebtn(idf);
    }

    cycler += 1;
  }

  if (q1 != '' && q2 != '' && q3 != '' && q4 != '' && q5 != '' && q6 != '' && q7 != '' && q8 != '') {
    highlightbtn('submitter');
  }
}

function submitform() {
  if (q1 != '' && q2 != '' && q3 != '' && q4 != '' && q5 != '' && q6 != '' && q7 != '' && q8 != '') {
    var fb = document.getElementById('fb').value;
    var ps = localStorage.getItem('pacsubmit');
    var ur = 'https://skparab1.github.io/sendmsg/feedback.html?' + q1 + ',' + q2 + ',' + q3 + ',' + q4 + ',' + q5 + ',' + q6 + ',' + q7 + ',' + q8 + ',' + fb + ',' + ps;

    if (ps == null) {
      localStorage.setItem('pacsubmit', '1');
    } else {
      localStorage.setItem('pacsubmit', String([parseInt(ps) + 1]));
    }

    window.open(ur);

    (function _callee3() {
      return regeneratorRuntime.async(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(sleep(500));

            case 2:
              togglefeedback();

            case 3:
            case "end":
              return _context3.stop();
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

function togglefeedback() {
  feedback.classList.toggle('visible');
  feedback.classList.toggle('hidden');
  toggleOverlay();
  var ps = localStorage.getItem('pacsubmit');

  if (ps != null) {
    var nf = document.getElementById('timesn');
    nf.textContent = "You have already submitted this form " + ps + " times. This submission may not be counted to prevent skewing of results.";
    nf.style.display = 'block';
  }

  mutebtn('submitter');
  q1 = '';
  q2 = '';
  q3 = '';
  q4 = '';
  q5 = '';
  q6 = '';
  q7 = '';
  q8 = '';

  if (closedintro) {
    closedintro = false;
  } else {
    closedintro = true;
  }
}

function toggleRules() {
  rulesModal.classList.toggle('visible');
  rulesModal.classList.toggle('hidden');
  toggleOverlay();

  if (closedintro) {
    closedintro = false;
  } else {
    closedintro = true;
  }
}

function toggleContributors() {
  contributorsModal.classList.toggle('visible');
  contributorsModal.classList.toggle('hidden');
  toggleOverlay();

  if (closedintro) {
    closedintro = false;
  } else {
    closedintro = true;
  }
}