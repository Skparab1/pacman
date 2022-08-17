const table = document.getElementById('table');

function mutetab(id){
    console.log(id);
    console.log('mute');
    let el = document.getElementById(String(id));
    el.style.backgroundColor = 'rgb(0,0,0)';
    el.style.color = 'rgb(76,76,255)';
}

function highlighttab(id){
    let el = document.getElementById(String(id));
    console.log('hightlight');
    el.style.backgroundColor = 'rgb(76,76,76)';
    el.style.color = 'rgb(23,23,23)';
}

function convdiff(diff){
    if (diff == 'hard'){
       return 1;
    } else if (diff == 'normal'){
        return 2;
    } else if (diff == 'easy'){
        return 3;
    } else if (diff == 'veryeasy'){
        return 4;
    } else if (diff == 'og3life'){
        return 5;
    }
    return diff;
}

function purediff(d){
    try {
        if (d.includes('very')){
            return 'veryeasy';
        } else if (d.includes('og') || d.includes('OG') || d.includes('life')){
            return 'og3life';
        }
    } catch (error) {
        // didndt ask
    }
    return d;
}

function settabs(diff){

    diff = convdiff(diff);

    if (diff == 1){
        highlighttab(1);mutetab(2);mutetab(3);mutetab(4);mutetab(5);
    } else if (diff == 2){
        highlighttab(2);mutetab(1);mutetab(3);mutetab(4);mutetab(5);
    } else if (diff == 3){
        highlighttab(3);mutetab(2);mutetab(1);mutetab(4);mutetab(5);
    } else if (diff == 4){
        highlighttab(4);mutetab(2);mutetab(3);mutetab(1);mutetab(5);
    } else if (diff == 5){
        highlighttab(5);mutetab(2);mutetab(3);mutetab(4);mutetab(1);
    }
}

function sendto(diff){
    if (diff == 'back'){
        window.open('https://skparab1.github.io/pacman','_self');
    } else {
        let lc = window.location.href;
        lc = lc.replace('?diff=hard','');
        lc = lc.replace('?diff=normal','');
        lc = lc.replace('?diff=easy','');
        lc = lc.replace('?diff=veryeasy','');
        lc = lc.replace('?diff=og3life','');
        lc = lc+'?diff='+diff;
        window.open(lc,'_self');
    }
}

var loc = window.location.href;
loc = loc.replace('file:///Users/homemac/Desktop/Programming/Otherprograms/pacman/leaderboard/leaderboard.html/?','');
loc = loc.replace('file:///Users/homemac/Desktop/Programming/Otherprograms/pacman/leaderboard/leaderboard.html?','');
loc = loc.replace('file:///Users/homemac/Desktop/Programming/Otherprograms/pacman/leaderboard/leaderboard.html','');
loc = loc.replace('https://skparab1.github.io/pacman/leaderboard/leaderboard.html/?','');
loc = loc.replace('https://skparab1.github.io/pacman/leaderboard/leaderboard.html?','');
loc = loc.replace('https://skparab1.github.io/pacman/leaderboard/leaderboard.html','');
loc = loc.replace('diff=','');
if (loc == '' || loc == ' '){
    loc = 'normal';
}

settabs(loc);

let b1 = document.getElementById('bar1');
let b2 = document.getElementById('bar2');
let b3 = document.getElementById('bar3');
var loaded = false;
var fadeload = false;

const sleep = ms => new Promise(res => setTimeout(res, ms));
(async () => {
    let g = 0;
    let times = 0;
    while (g < 202){
        b2.style.width = (100-Math.abs(100-g))*0.9+'%';

        if (g > 100){
            b1.style.width = (g-100)*0.9+'%';
        } else {
            b1.style.width = '0%';
        }

        if (g < 100){
            b3.style.width = (100-g)*0.9+'%';
        } else {
            b3.style.width = '0%';
        }

        if (loaded){
            break;
        }

        await sleep(2);
        g += 0.66;

        if (g >= 200){
            g = 0;
            times += 1;

            if (times == 7 && !fadeload){
                (async () => {
                    let fader = 0;
                    let ot = document.getElementById('overtimer');
                    ot.style.display = 'block';
                    while (fader <= 100){
                        ot.style.opacity = (fader/100);
    
                        await sleep(2);
                        fader = fader + (101-fader)/50;
                    }
                })();
            }
        }
    }
})();

var lb = document.getElementById('leaderboard');
var loader = document.getElementById('loader');

fetch(("https://wfcdaj.deta.dev/leaderboard?number=10000"))
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);

        fadeload = true;
        (async () => {
            let fader = 0;
            while (fader <= 100){
                loader.style.opacity = 1-(fader/100);
                lb.style.opacity = (fader/100);

                await sleep(2);
                fader = fader + (101-fader)/50;
            }
            loaded = true;
        })();

        let ctr = 0;
        for (let i = 0; i < data.length; i++) {
            const play = data[i];
            // difficulty = 'hard';
            // difficulty = 'normal';
            // difficulty = 'easy';
            // difficulty = 'veryeasy';
            // difficulty = 'og3life';

            console.log(play.difficulty);
            //console.log(loc);
            // filter
            //                                      verify score
            if (purediff(play.difficulty) == loc && play.score < 583){
                table.appendChild(createTableRow(ctr + 1, play.name, play.score, play.time));
                ctr += 1;
            }
            if (ctr > 100){
                break;
            }
        }
    });

function createTableRow(rank, name, score, time) {
    const tableRow = document.createElement('tr');
    tableRow.appendChild(createTableData(rank));
    tableRow.appendChild(createTableData(name));
    tableRow.appendChild(createTableData(score));
    tableRow.appendChild(createTableData(time));
    return tableRow;
}

function createTableData(data) {
    const tableData = document.createElement('td');
    const textData = document.createTextNode(data);
    tableData.appendChild(textData);
    return tableData;
}