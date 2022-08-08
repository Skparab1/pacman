"use strict";

var table = document.getElementById('table');

function mutetab(id) {
  console.log(id);
  console.log('mute');
  var el = document.getElementById(String(id));
  el.style.backgroundColor = 'rgb(0,0,0)';
  el.style.color = 'rgb(76,76,255)';
}

function highlighttab(id) {
  var el = document.getElementById(String(id));
  console.log('hightlight');
  el.style.backgroundColor = 'rgb(76,76,76)';
  el.style.color = 'rgb(23,23,23)';
}

function convdiff(diff) {
  if (diff == 'hard') {
    return 1;
  } else if (diff == 'normal') {
    return 2;
  } else if (diff == 'easy') {
    return 3;
  } else if (diff == 'veryeasy') {
    return 4;
  } else if (diff == 'og3life') {
    return 5;
  }

  return diff;
}

function settabs(diff) {
  diff = convdiff(diff);

  if (diff == 1) {
    highlighttab(1);
    mutetab(2);
    mutetab(3);
    mutetab(4);
    mutetab(5);
  } else if (diff == 2) {
    highlighttab(2);
    mutetab(1);
    mutetab(3);
    mutetab(4);
    mutetab(5);
  } else if (diff == 3) {
    highlighttab(3);
    mutetab(2);
    mutetab(1);
    mutetab(4);
    mutetab(5);
  } else if (diff == 4) {
    highlighttab(4);
    mutetab(2);
    mutetab(3);
    mutetab(1);
    mutetab(5);
  } else if (diff == 5) {
    highlighttab(5);
    mutetab(2);
    mutetab(3);
    mutetab(4);
    mutetab(1);
  }
}

function sendto(diff) {
  var lc = window.location.href;
  lc = lc.replace('?diff=hard', '');
  lc = lc.replace('?diff=normal', '');
  lc = lc.replace('?diff=easy', '');
  lc = lc.replace('?diff=veryeasy', '');
  lc = lc.replace('?diff=og3life', '');
  lc = lc + '?diff=' + diff;
  window.open(lc, '_self');
}

var loc = window.location.href;
loc = loc.replace('file:///Users/homemac/Desktop/Programming/Otherprograms/pacman/leaderboard/leaderboard.html/?', '');
loc = loc.replace('file:///Users/homemac/Desktop/Programming/Otherprograms/pacman/leaderboard/leaderboard.html?', '');
loc = loc.replace('file:///Users/homemac/Desktop/Programming/Otherprograms/pacman/leaderboard/leaderboard.html', '');
loc = loc.replace('https://skparab1.github.io/pacman/leaderboard/leaderboard.html/?', '');
loc = loc.replace('https://skparab1.github.io/pacman/leaderboard/leaderboard.html?', '');
loc = loc.replace('https://skparab1.github.io/pacman/leaderboard/leaderboard.html', '');
loc = loc.replace('diff=', '');

if (loc == '' || loc == ' ') {
  loc = 'normal';
}

settabs(loc);
fetch("https://wfcdaj.deta.dev/leaderboard?number=100&diff=" + loc).then(function (response) {
  return response.json();
}).then(function (data) {
  console.log(data);

  for (var i = 0; i < data.length; i++) {
    var play = data[i];
    table.appendChild(createTableRow(i + 1, play.name, play.score, play.time));
  }
});

function createTableRow(rank, name, score, time) {
  var tableRow = document.createElement('tr');
  tableRow.appendChild(createTableData(rank));
  tableRow.appendChild(createTableData(name));
  tableRow.appendChild(createTableData(score));
  tableRow.appendChild(createTableData(time));
  return tableRow;
}

function createTableData(data) {
  var tableData = document.createElement('td');
  var textData = document.createTextNode(data);
  tableData.appendChild(textData);
  return tableData;
}