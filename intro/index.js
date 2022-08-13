let f1 = document.getElementById('fade1');
let f2 = document.getElementById('fade2');
let f3 = document.getElementById('fade3');

const canvas = document.querySelector('.myCanvas');
const ctx = canvas.getContext('2d');
const w = canvas.width = window.innerWidth; 
const height = canvas.height = window.innerHeight;

function makevisible(id){
  h = document.getElementById(id);
  h.style.display = 'block';
}

function hide(id){
  h = document.getElementById(id);
  h.style.display = 'none';
}

function drawpac(x,y,rad,openangle){
  openangle = openangle*2;
  ctx.beginPath();
  //ctx.lineWidth = "10px"; NOT PX JUST INT
  ctx.fillStyle = "rgb(225,175,0)";
  ctx.strokeStyle = "rgb(225,175,0)";
  // depending on direction
  ctx.arc(x, y, rad, 0.75*Math.PI+(0.125*Math.PI*openangle),(Math.PI*1.75)+(0.125*Math.PI*openangle), false);
  ctx.fill(); 
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(x, y-1, rad, 0.25*Math.PI-(0.125*Math.PI*openangle),(Math.PI*1.25)-(0.125*Math.PI*openangle), false);

  //ctx.arc(x, y, rad, 0.75 * Math.PI, 1 * Math.PI); //-((height)/(boardSize+2)/2)
  ctx.stroke(); 
  ctx.fill();
  ctx.beginPath();
}

const sleep = ms => new Promise(res => setTimeout(res, ms));
let width = 675;
(async () => {
  let c = -250;
  while (c < 875){
    f1.style.width = (c-200)+'px';
    f2.style.left = c+500+'px';
    f2.style.width = '400px';
    f3.style.width = ((675-c)-200)+'px'
    f3.style.left = (c+700+200)+'px'
    c += 5;
    await sleep(2);
  }

  await sleep(400);

  while (c > -250){
    f1.style.width = (c-200)+'px';
    f2.style.left = c+500+'px';
    f2.style.width = '400px';
    f3.style.width = ((675-c)-200)+'px'
    f3.style.left = (c+700+200)+'px'
    c -= 5;
    await sleep(2);
  }

function drawghost(x,y,rad,clr){
  //ctx.arc(x, y, rad, 0.75 * Math.PI, 1 * Math.PI); //-((height)/(boardSize+2)/2)
  ctx.beginPath();
  let byte = window.innerHeight*4/3; //and other was 0.75 window.innerHeight
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
  ctx.arc(x-(byte/6)+byte/12,y-(byte/7),byte/12,0,2*Math.PI);
  ctx.arc(x+(byte/6)+byte/12,y-(byte/7),byte/12,0,2*Math.PI);

  // triangles at bottom
  ctx.fillStyle = 'blue';
  ctx.fill();
  ctx.beginPath();
  ctx.fillStyle = clr;
  ctx.strokeStyle = clr;
  ctx.fillRect(x-byte/2*0.75,y,byte*0.75,byte/2*0.75);
  ctx.beginPath();
  ctx.fillStyle = 'black';
  ctx.moveTo(x-byte/2*0.75, y+byte/2*0.75);
  ctx.lineTo(x-byte/2*0.75+rad*1/6, y+byte/2*0.75-rad*2/7);
  ctx.lineTo(x-byte/2*0.75+rad*2/6, y+byte/2*0.75);
  ctx.lineTo(x-byte/2*0.75, y+byte/2*0.75);
  ctx.fill();
  ctx.moveTo(x-byte/2*0.75+rad*2/6, y+byte/2*0.75);
  ctx.lineTo(x-byte/2*0.75+rad*3/6, y+byte/2*0.75-rad*2/7);
  //ctx.lineTo(x-byte/2*0.75+4*rad*2/7, y+byte/2*0.75-rad*2/7);
  ctx.lineTo(x-byte/2*0.75+rad*4/6, y+byte/2*0.75);
  ctx.lineTo(x-byte/2*0.75+rad*2/6, y+byte/2*0.75);

  ctx.moveTo(x-byte/2*0.75+rad*4/6, y+byte/2*0.75);
  ctx.lineTo(x-byte/2*0.75+rad*5/6, y+byte/2*0.75-rad*2/7);
  //ctx.lineTo(x-byte/2*0.75+4*rad*2/7, y+byte/2*0.75-rad*2/7);
  ctx.lineTo(x-byte/2*0.75+rad*6/6, y+byte/2*0.75);
  ctx.lineTo(x-byte/2*0.75+rad*4/6, y+byte/2*0.75);
  ctx.fill();
  // ctx.moveTo(x-byte/2*0.75+rad*6/7, y+byte/2*0.75-rad*2/7);
  // ctx.lineTo(x-byte/2*0.75+rad*7/7, y+byte/2*0.75);
  // ctx.lineTo(x-byte/2*0.75+rad*6/7, y+byte/2*0.75-rad*2/7);
  ctx.fill();
}
  
if (true){

  let s1 = document.getElementById('screen1');
  let s2 = document.getElementById('screen2');
  let pc = document.getElementById('pc');
  let pc1 = document.getElementById('pc1');
  let pc2 = document.getElementById('pc2');
  let v1 = document.getElementById('v1');
  let v2 = document.getElementById('v2');
  s1.style.display = 'none';
  s2.style.display = 'block';
  pc.style.fontSize = '100px';

  // innerheight is 472
  // width is 2046 but 2048s ok

  c1 = 750;
  while (c1 > 1){
    let c = c1 + 250;
    pc.style.fontSize = c+'px';
    pc.style.left = (850-c)+'px';
    pc.style.top = (-50)+'px';
    pc.style.color = 'rgba(255,255,255,'+(1000-c)/750+')';

    v1.style.opacity = ((1000-c)/750)*0.7;
    v2.style.opacity = ((1000-c)/750)*0.7;

    pc1.style.fontSize = c/6+'px';
    pc1.style.left = (425-c)+'px';
    pc1.style.top = (580+(c-250)/2)+'px';
    pc1.style.color = 'rgba(255,215,0,'+(1000-c)/750+')';

    pc2.style.fontSize = c/6+'px';
    pc2.style.left = (510-c)+'px';
    pc2.style.top = (650+(c-250))+'px';
    pc2.style.color = 'rgba(255,215,0,'+(1000-c)/750+')';

    c1 = c1*0.98;
    await sleep(0.002);
  }

  await sleep(2500);

  let s3 = document.getElementById('screen3');
  s3.style.display = 'block';

  let clist = ['c1','c2','c3','c4','c5','c6','c7','c8','c9','c10','c11','c12'];

  let cr = 0;
  while (cr < clist.length){
    makevisible(clist[cr]);
    await sleep(25);
    cr += 1;
  }

  let s4 = document.getElementById('screen4');
  s2.style.display = 'none';
  s4.style.display = 'block';

  cr = 0;
  while (cr < clist.length){
    hide(clist[cr]);
    await sleep(25);
    cr += 1;
  }

  bg = document.getElementById('coolbg');

  cr = 0;
  while (cr <= 255){
    let cg = cr/255;
    bg.style.backgroundImage = 'linear-gradient(black,rgb('+cg*255+',0,0),rgb('+cg*255+','+cg*165+',0),rgb('+cg*144+','+cg*238+','+cg*144+'),rgb(0,'+cg*255+','+cg*255+'))';
    await sleep(2);
    cr += 1;
  }

  await sleep(2000);

  let s5 = document.getElementById('screen5');
  s5.style.display = 'block';

  var oa = 1;
  var od = 'c';

  let pacx = -1024;
  while (pacx <= 3072){
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    ctx.fillStyle = 'rgb(0,0,0)';
    ctx.fillRect(0,0,pacx,50);
    ctx.fillStyle = 'rgb(255,255,0)';
    drawpac(pacx,window.innerHeight/2,window.innerHeight/2,oa);
    pacx += 10;
    if (od == 'c'){
      oa -= 0.04;
    } else {
      oa += 0.04;
    }

    if (pacx < 2048){
      s5.style.left = (pacx-2048)+'px';
    }

    // change mouth direction lmao
    if (oa <= 0){
      od = 'o';
    }
    if (oa >= 1){
      od = 'c';
    }
    await sleep(2);
  }

  document.getElementById('v4').addEventListener('loadedmetadata', function() {
    this.currentTime = 0;
  }, false);

  await sleep(2000);
  s5.style.display = 'none';
}


  let s6 = document.getElementById('screen6');
  s6.style.display = 'block';

  let s7 = document.getElementById('screen7');

  await sleep(2000);

  oa = 1;
  od = 'c';

  pacx = -1024;
  while (pacx <= 3072+2048){
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    ctx.fillStyle = 'rgb(0,0,0)';
    ctx.fillRect(pacx,0,-1536,window.innerHeight);
    ctx.fillStyle = 'rgb(255,255,0)';

    drawpac(pacx,window.innerHeight/2,window.innerHeight/2,oa);

    if (pacx-1536 < 0){
      drawghost(pacx-1536,window.innerHeight/2,window.innerHeight,'blue');
    } else if (pacx-1536 < 512){
      drawghost(pacx-1536,window.innerHeight/2,window.innerHeight,'teal');
    } else if (pacx-1536 < 1024){
      drawghost(pacx-1536,window.innerHeight/2,window.innerHeight,'blue');
    } else if (pacx-1536 < 1536){
      drawghost(pacx-1536,window.innerHeight/2,window.innerHeight,'teal');
    } else if (pacx-1536 < 2048){
      drawghost(pacx-1536,window.innerHeight/2,window.innerHeight,'blue');
    } else {
      drawghost(pacx-1536,window.innerHeight/2,window.innerHeight,'teal');
    }

    if (pacx+window.innerHeight/2 >= 2048){
      s7.style.display = 'block';
    }

    // pacman things
    if (od == 'c'){
      oa -= 0.04;
    } else {
      oa += 0.04;
    }

    if (oa <= 0){
      od = 'o';
    }
    if (oa >= 1){
      od = 'c';
    }

    pacx += 10;

    await sleep(2);
  }

})();