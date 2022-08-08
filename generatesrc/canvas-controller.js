// Pacman generator

const boardSize = 16; //so 20 means 20x20 and 40 would be 40x40 and you can change it to anything you want
const speedfactor = 189; //directly porportional to these many pixels per second (but not exactly)
var eyesize = 2 // squarelength/this pixels
const borderleniance = 0.5 // the game will ignore a wall hit as long as it is less than 0.5 boxes away from the border
const endcurtainspeed = 0.25 // seconds wait in between frames of each pixel expansion (for game over animation)
var autopilot = false; // this is for fun but it turns on with the localstorage reader
var lostlives = 0;
var difficulty = localStorage.getItem('pacmode');
if (difficulty == null){
  localStorage.setItem('pacmode','normal');
  difficulty = 'normal';
}
// other things
var lost = false;
var theme = localStorage.getItem('theme');
if (theme == null){
  theme = 'black';
}

function settheme(clr){
  setclr = clr;  // to make ritam not complain about how long this is i mean what kind of developer complains about useful comments smh 
  maketheme('header1',setclr);maketheme('header2',setclr);maketheme('header3',setclr);maketheme('title',setclr);maketheme('settings',setclr);maketheme('theme',setclr);clrbtn1('box',setclr);clrbtn1('left-panel',setclr);clrbtn1('rulesbtn',setclr);clrbtn1('mode',setclr);maketheme('rules',setclr);clrbtn1('contributersbtn',setclr);maketheme('contributers',setclr);clrbtn1('leaderboardbtn',setclr);maketheme('leaderboard',setclr);maketheme('audio',setclr);clrbtn1('audiobtn',setclr);maketheme('audio-toggle',setclr);clrbtn1('right-panel',setclr);maketheme('info',setclr);maketheme('name',setclr);maketheme('score',setclr);maketheme('best',setclr);maketheme('time',setclr);maketheme('display',setclr);maketheme('game-controls',setclr);clrbtn('up',setclr);clrbtn('left',setclr);clrbtn('down',setclr);clrbtn('right',setclr);
}

//console.log(theme);

if (theme == 'white' || theme == 'rgb(255,255,255)'){
  settheme('black'); // opp color because contrast color
}

document.body.style.background = theme;
var best = parseInt(localStorage.getItem("bestpac"));
console.log(best);
var lastfps = Date.now();
var avgfps = 0;
var fpslst = [];
var won = false;
var closedintro = true;
var lastname = '';
var firstrender = true;

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

// draw the board
function drawboard(){
  ctx.beginPath();
  let x = 0;
  let actx = window.innerWidth/4+byte;
  // clear else keeps adding
  while (x < boardSize*2-1){
    let y = 0;
    let acty = byte/2;
    while (y < boardSize*2-1){
      acty += (height)/(boardSize+2)*0.51;
      y += 1;
      // grid
      //ctx.strokeRect(actx,acty,(height)/(boardSize+2),(height)/(boardSize+2));

      //dots
      ctx.fillStyle = dotcolor;
      let deactivated = false;

      let ed = 0;
      while (ed < eraseddots.length-1){ // ok -1 is for some bug but yeah thats fine
        ctx.fillStyle = limecolor;
        let xc = eraseddots[ed][0];
        let yc = eraseddots[ed][1];

        xc = xc.replace('a','10');
        xc = xc.replace('b','11');
        xc = xc.replace('c','12');
        xc = xc.replace('d','13');
        xc = xc.replace('e','14');
        xc = xc.replace('f','15');
        xc = xc.replace('g','16');
        xc = xc.replace('h','17');

        // now yc
        yc = yc.replace('a','10');
        yc = yc.replace('b','11');
        yc = yc.replace('c','12');
        yc = yc.replace('d','13');
        yc = yc.replace('e','14');
        yc = yc.replace('f','15');
        yc = yc.replace('g','16');
        yc = yc.replace('h','17');

        xc = parseFloat(xc);
        yc = parseFloat(yc);

        if (Math.abs((basex+xc*byte) - (actx+byte/2+byte/20)) < byte/4 && Math.abs((yc*byte) - (acty+byte/2+byte/20)) < byte/4){
          deactivated = true;
        }

        ed += 1;
      }
      
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

  var linecolor;
  var limecolor;
  var yellowcolor;
  var redcolor;
  var ghostbcolor;
  if (theme == 'white' || theme == 'rgb(255,255,255)'){
    linecolor = "rgb(0, 0, 255)";
    dotcolor = "brown";
    limecolor = 'rgb(0, 150, 40)'
    yellowcolor = 'rgb(100, 100, 0)'
    redcolor = 'rgb(100, 0, 0)'
    ghostbcolor = 'rgb(0, 0, 0)'
  } else {
    linecolor = "rgb(42, 198, 250)";
    dotcolor = "orange";
    limecolor = 'rgb(0, 255, 0)'
    yellowcolor = 'rgb(255, 255, 0)'
    redcolor = 'rgb(255, 0, 0)'
    ghostbcolor = 'rgb(255, 255, 255)'
  }

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
  //drawline(window.innerWidth/4+byte*16-1,byte*12,window.innerWidth/4+byte*17-1,byte*12,theme);
  //drawline(window.innerWidth/4+byte*16+2,byte*12,window.innerWidth/4+byte*17+1,byte*12,theme);
  //drawline(window.innerWidth/4+byte*16,byte*12-1,window.innerWidth/4+byte*17-2,byte*12-1,theme);
  //drawline(window.innerWidth/4+byte*16,byte*12+1,window.innerWidth/4+byte*17-2,byte*12+1,theme);
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
  ctx.fillStyle = 'red';
  let ll = 0;
  let txl = '';
  while (ll < (3-lostlives) && difficulty == 'og'){
    txl += '❤️';
    ll += 1;
  }

  ctx.fillText(txl, basex+byte*15, 0.55*byte, byte*10);
  //intersections
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
  // while (cr < upblock.length){
  //   ctx.fillRect(upblock[cr][0],upblock[cr][2],upblock[cr][1]-upblock[cr][0],upblock[cr][3]-upblock[cr][2]);
  //   cr += 1;
  // }
  // cr = 0;
  // ctx.fillStyle = linecolor;
  // while (cr < upblock.length){
  //   ctx.fillRect(upblock[cr][0],upblock[cr][2],upblock[cr][1]-upblock[cr][0],upblock[cr][3]-upblock[cr][2]);
  //   cr += 1;
  // }
  // cr = 0;
  // ctx.fillStyle = yellowcolor;
  // while (cr < downpush.length){
  //   ctx.fillRect(downpush[cr][0],downpush[cr][2],downpush[cr][1]-downpush[cr][0],downpush[cr][3]-downpush[cr][2]);
  //   cr += 1;
  // }

}

// put in in terms of bytes, ill add a converter
// assign blocks
var rightblockpre = [[3,4,8,12],[1,2,2,8],[3,4,2,3],[10,11,9,12],[3,4,4,7],[1,2,11,12],[1,2,13,14],[1,2,15,16],[3,4,13,14],[4,5,14,16],[7,8,1,6],[5,6,6,8],[6,7,9,12],[7,8,13,15],[6,7,15,16],[9,10,2,8],[11,12,4,6],[14,15,3,7],[13,14,2,3],[16,17,1,9],[11,12,9,12],[14,15,9,10],[14,15,11,12],[15,16,13,14],[16,17,12,13],[9,10,13,14],[10,11,14,16],[13,14,13,15],[12,13,15,16],[16,17,14,17],[8.5,9.5,9,10]];
var leftblockpre = [[1,2,1,9],[3,4,2,8],[7,8,9,12],[1,2,12,17],[3,4,11,12],[3,4,9,10],[3,4,13,14],[4,5,15,16],[7,8,2,3],[7,8,4,5],[5,6,5,7],[5,6,8,9],[6,7,9,12],[7,8,13,14],[6,7,14,16],[7,8,6,7],[9,10,7,8],[9,10,1,6],[9,10,13,15],[10,11,15,16],[12,13,2,3],[11,12,3,7],[14,15,4,6],[16,17,2,8],[8.5,9.5,9,10],[14,15,9,12],[13,14,13,14],[12,13,14,16],[15,16,13,15],[16,17,15,16],[11.5,12,9,12]];
var upblockpre = [[1,8,1,2],[1,2,12,13],[16,17,12,13],[-20,2,10,11],[7,8,10,11],[10,11,10,11],[15,50,10,11],[2,3,8,9],[2,3,12,13],[2,4,16,17],[4,7,3,4],[4,5,7,8],[5,7,5,6],[4,6,12,13],[4,5,14,15],[5,6,16,17],[6,7,14,15],[7,8,8,9],[7,8,9,10],[10,11,9,10],[7,10,16,17],[7,11,12,13],[6,9,8,9],[8,9,6,7],[9,17,1,2],[11,12,3,4],[14,15,3,4],[12,14,6,7],[10,16,8,9],[12,14,12,13],[10,11,14,15],[11,12,16,17],[12,13,14,15],[13,16,16,17],[15,16,12,13],[16,17,14,15],[1,3,10,11],[15,17,10,11],[1,3,9,10],[15,17,9,10],[2,3,14,15]];
var downblockpre = [[3,4,14,15],[2,3,1,2],[1,3,8,9],[-20,2,10,11],[1,2,10,11],[15,50,10,11],[2,3,9,10],[2,3,12,13],[1,17,16,17],[4,7,1,2],[4,7,3,4],[6,7,5,6],[7,9,6,7],[4,5,7,8],[5,6,8,9],[4,7,12,13],[10,11,8,9],[7,8,8,9],[10,11,8,9],[7,8,14,15],[8,9,12,13],[9,10,14,15],[10,13,12,13],[13,14,14,15],[14,15,12,13],[15,16,14,15],[12,14,8,9],[15,17,10,11],[10,12,1,2],[14,16,1,2],[12,14,3,4],[11,15,6,7],[15,17,8,10],[7,11,8,9],[2,3,10,11],[16,17,12,13],[2,3,14,15]];
var intersectionpre = [[3,4,1,2],[12,13,1,2],[13,14,1,2],[3,4,3,4],[7,8,3,4],[7,8,5,6],[9,10,6,7],[3,4,7,8],[3,4,8,9],[5,6,7,8],[6,7,8,9],[9,10,8,9],[11,12,8,9],[14,15,8,9],[12,13,3,4],[13,14,3,4],[3,4,10,11],[3,4,12,13],[6,7,12,13],[11,12,12,13],[14,15,12,13],[7,8,12,13],[9,10,12,13],[13,14,12,13],[15,16,12,13],[1,2,14,15],[3,4,14,15],[4,5,16,17],[6,7,16,17],[10,11,16,17],[12,13,16,17],[1,2,1,2],[1,2,8,9],[7,8,1,2],[9,10,1,2],[16,17,1,2],[11,12,3,4],[11,12,6,7],[14,15,3,4],[14,15,6,7],[5,6,5,6],[7,8,6,7],[5,6,8,9],[16,17,8,9],[1,2,12,13],[1,2,16,17],[4,5,14,15],[6,7,14,15],[7,8,14,15],[9,10,14,15],[10,11,14,15],[12,13,14,15],[13,14,14,15],[15,16,14,15],[16,17,14,15],[16,17,16,17],[16,17,12,13]];
var rightpushpre = [[1,7,1,2],[3,7,3,4],[1,3,8,9],[3,5,7,8],[5,7,5,6],[7,9,6,7],[5,8,8,9],[13,14,6,7],[11,12,3,4],[-2,3,10,11],[1,3,12,13],[4,6,12,13],[9,11,12,13],[2,3,14,15],[6,7,14,15],[12,13,14,15],[2,4,16,17],[5,6,16,17],[9,10,16,17]];
var leftpushpre = [[10,17,8,9],[10,17,1,2],[12,13,6,7],[14,15,3,4],[15,18,10,11],[7,9,12,13],[12,14,12,13],[15,17,12,13],[4,5,14,15],[10,11,14,15],[16,17,14,15],[7,9,16,17],[11,12,16,17],[13,16,16,17]];
var uppushpre = [[11,12,4,7],[14,15,4,7],[12,14,2,4],[3,4,8,15],[6,7,9,13],[11,12,9,13],[14,15,9,13],[1,2,13,17],[4,5,15,17],[6,7,15,17],[7,8,13,15],[9,10,13,15],[10,11,15,17],[12,13,15,17],[13,14,13,15],[15,16,13,15],[16,17,15,17],[1,2,16,17]];
var downpushpre = [[1,2,2,8],[3,4,2,7],[7,8,1,6],[5,6,6,8],[8,10,8,9],[9,10,1,8],[16,17,2,8]];
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
byte = 2*((window.innerHeight-100)/(16*2.2));

var dotcolor;
if (theme == 'black'){
  dotcolor = "orange";
} else {
  dotcolor = "brown";
}

// prob not needed but whatever
function drawcircle(x,y,rad,circlr){
  ctx.beginPath();
  ctx.fillStyle = circlr;
  ctx.arc(x, y, rad, 0, 2 * Math.PI); //-((height)/(boardSize+2)/2)
  ctx.fill(); 
}
function cir(x,y,rad,circlr,start,end){
  ctx.beginPath();
  ctx.fillStyle = circlr;
  ctx.arc(x, y, rad, start * Math.PI, end * Math.PI); //-((height)/(boardSize+2)/2)
  ctx.fill(); 
}

// drawing pac man
function drawpac(x,y,rad,dir,openangle){
  openangle = openangle*2;
  ctx.beginPath();
  //ctx.lineWidth = "10px"; NOT PX JUST INT
  ctx.fillStyle = "rgb(225,175,0)";
  ctx.strokeStyle = "rgb(225,175,0)";
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

function downloadcvs(){
  document.body.appendChild( tmpLink );  
  tmpLink.click();  
  document.body.removeChild( tmpLink );
}

function copylink(){
  navigator.clipboard.writeText(window.location.href);
  copier = document.getElementById('cpy');
  copier.textContent = 'Copy image link  ✅';
}

// dont think i asked
const canvas = document.querySelector('.myCanvas');
const ctx = canvas.getContext('2d');
const width = canvas.width = window.innerWidth/2+window.innerWidth/4; 
const height = canvas.height = window.innerHeight-100;

var bounderies = [0,0,0,0];
var score = 0;
var dir = 'l';
// canvas.style.left = "100px";
// canvas.style.top = "100px";

//canvas outline
//ctx.strokeStyle = 'rgb(125,125,125)';
ctx.fillStyle = theme;
ctx.fillRect(0, 0, width, height);
//console.log('printeddd');

var speed = ((height)/(boardSize+2))/(200-speedfactor)*0.4; // 1/4 square/frame?
var basespeed = speed;
let xpos = (height)/(boardSize+2)*0.5+(height)/(boardSize+2)*3+window.innerWidth/4;
let ypos = (height)/(boardSize+2)*0.5+(height)/(boardSize+2)*10.25;
let startingpos = [xpos,ypos];
var thepos = [xpos,ypos];
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

cvs = document.getElementById('canvas-container');
let openspace = window.innerWidth/2;
openspace = (openspace - (byte*(boardSize+2)))/2;
cvs.style.left = openspace + 'px';
cvs.style.top = byte*0.5 + 'px'

var testurl = window.location.href;
//testurl = 'https://skparab1.github.io/pacman/generatesrc/?7.51,12.6,u&n=14.5,4.87,0,-1.5&n=7.49,12.4,1.56,0&n=9.53,10.5,0,0&n=10.5,10.5,0,0&n=3.5,a.5;3.5,b.0;3.5,b.5;3.5,c.0;3.5,c.5;4.0,c.5;4.5,c.5;5.0,c.5;5.5,c.5;6.0,c.5;6.5,c.5;7.0,c.5;7.5,c.5;8.0,c.5;8.5,c.5;9.0,c.5;9.5,c.5;a.0,c.5;a.5,c.5;b.0,c.5;b.5,c.5;c.0,c.5;c.5,c.5;d.0,c.5;d.5,c.5;d.5,d.0;d.5,d.5;d.5,e.0;d.5,e.5;d.0,e.5;c.5,e.5;c.5,f.0;c.5,f.5;c.5,g.0;c.5,g.5;c.0,g.5;b.5,g.5;b.0,g.5;a.5,g.5;a.0,g.5;9.5,g.5;9.0,g.5;8.5,g.5;8.0,g.5;7.5,g.5;7.0,g.5;6.5,g.5;6.5,g.0;6.5,f.5;6.5,f.0;6.5,e.5;7.0,e.5;7.5,e.5;7.5,e.0;7.5,d.5;7.5,d.0;&n=pink,red,orange,teal';
testurl = testurl.replace('https://skparab1.github.io/pacman/generatesrc/?','');
testurl = testurl.replace('https://skparab1.github.io/pacman/generatesrc?','');
let parts = testurl.split('&n=');

let pacpos = parts[0].split(',');
console.log(pacpos);
thepos = [basex+byte*parseFloat(pacpos[0]),byte*parseFloat(pacpos[1])];
dir = pacpos[2];

let ghost1 = parts[1].split(',');
g1pos = [basex+byte*parseFloat(ghost1[0]),byte*parseFloat(ghost1[1])];
g1dir = [parseFloat(ghost1[2]),parseFloat(ghost1[3])];

let ghost2 = parts[2].split(',');
g2pos = [basex+byte*parseFloat(ghost2[0]),byte*parseFloat(ghost2[1])];
g2dir = [parseFloat(ghost2[2]),parseFloat(ghost2[3])];

let ghost3 = parts[3].split(',');
g3pos = [basex+byte*parseFloat(ghost3[0]),byte*parseFloat(ghost3[1])];
g3dir = [parseFloat(ghost3[2]),parseFloat(ghost3[3])];

let ghost4 = parts[4].split(',');
g4pos = [basex+byte*parseFloat(ghost4[0]),byte*parseFloat(ghost4[1])];
g4dir = [parseFloat(ghost4[2]),parseFloat(ghost4[3])];

let gottendots = parts[5].split(';');
let idek = 0;
while (idek < gottendots.length){
  let subj1 = gottendots[idek].split(',');
  eraseddots.push(subj1);
  idek += 1;
}

let ghclr = parts[6].split(',');

console.log(eraseddots);


oa = 0.25;
drawboard();

drawpac(thepos[0],thepos[1],(height)/(boardSize*2.2)*0.75,dir,oa);

drawghost(g1pos[0],g1pos[1],(height)/(boardSize*2.2)*0.75,ghclr[0],g1dir);
drawghost(g2pos[0],g2pos[1],(height)/(boardSize*2.2)*0.75,ghclr[1],g2dir);
drawghost(g3pos[0],g3pos[1],(height)/(boardSize*2.2)*0.75,ghclr[2],g3dir);
drawghost(g4pos[0],g4pos[1],(height)/(boardSize*2.2)*0.75,ghclr[3],g4dir);

var imageData = canvas.toDataURL();
var tmpLink = document.createElement( 'a' );  
tmpLink.download = 'image.png'; // set the name of the download file 
tmpLink.href = imageData;  
  
// temporarily add link to body and initiate the download  


//window.open(tmpLink);

console.log('downloaded in theory');