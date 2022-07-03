
// this is just to force resiez
//window.reload();
// act nvm
var audioElement = new Audio('audio.mp3');
audioElement.addEventListener("canplaythrough", event => {
  /* the audio is now playable; play it if permissions allow */
  audioElement.play();
  var playable;
  if (audioElement.duration > 0 && !audioElement.paused){
    //console.log('playing');
    playable = true;
  } else {
    playable = false;
    //console.log('not playing');
    //alert('Unable to play audio');
    if (!playable){
      let notif = document.getElementById('notif');
      notif.style.display = "block";
      notif.innerHTML = '<h3 style="color:rgb(255, 255, 255);">Unable to play Audio. Check audio permissions and try again. See how to allow audio <a href="https://github.com/Skparab1/snake/blob/main/fix-audio.md">here<a></h3>';
    }
  }
});
audioElement.controls = true;
audioElement.loop = true;
let volume = document.querySelector("#volume-control");
volume.addEventListener("change", function(e) {
audioElement.volume = e.currentTarget.value/100;
})

// alr anindit here are the toggle constants
const boardSize = 16; //so 20 means 20x20 and 40 would be 40x40 and you can change it to anything you want
const speedfactor = 189; //directly porportional to these many pixels per second (but not exactly)
const pixelbackground1 = 'rgb(0,0,0)'; // this is like the pixel background pattern
const pixelbackground2 = 'rgb(0,0,0)'; // its in rgb but you can make it hex or hsv if u want
// emphasis background colors
const pixelbackground1EMP = 'rgb(0,120,0)';
const pixelbackground2EMP = 'rgb(0,160,0)';
var bordercolor = 'rgb(100,100,100)'; //bordercolor
const snakecolor1 = 'rgb(0,0,100)'; //snakecolor1
const snakecolor2 = 'rgb(0,0,255)'; //snakecolor2
const snakeheadcolor = 'rgb(200,100,0)'; //apple color
// arrays for the same things above for logistical things
var snakecolor1ARR = [0,100,0]; //snakecolor1
var snakecolor2ARR = [0,0,255]; //snakecolor2
var snakeheadcolorARR = [200,100,0];; //apple color
var eyesize = 2 // squarelength/this pixels
const applecolor = 'rgb(150,0,0)'; //apple color
const seglength = 75; //snake segment length in pixels
const addlength = 30; //increase snake length by these many pixels when it eats an apple
const borderleniance = 0.5 // the game will ignore a wall hit as long as it is less than 0.5 boxes away from the border
const rendertime = 10 // render every 10 snake circles
const endcurtainspeed = 0.25 // seconds wait in between frames of each pixel expansion (for game over animation)
var autopilot = false; // this is for fun but it turns on with the localstorage reader
var lost = false;
var theme = "black";
var best = localStorage.getItem("best");
var lastfps = Date.now();
var avgfps = 0;
var fpslst = [];
var snakeclr4 = "1aP";
var censored = "tawt;erohw a fo nos;hctib a fo nos;tuls;rekcufretsis;ssa tihs;tihs;kcirp;ssip;aggin;rekcufrehtom;tihs ni;tihsesroh;tihs yloh;lleh;nmadsdog;nmaddog;kcuf;reggirf;rekcufrehtaf;gniffe;nmad;tnuc;parc;rekcuskcoc;kcoc;rekcuf-dlihc;tihsllub;reggub;rekcufrehtorb;skcollob;hctib;dratsab;elohssa;ssa;esra";
censored = censored.split("").reverse().join("").split(";");
var firstrender = true;
//console.log(censored);

if (localStorage.getItem("best") == null){
  localStorage.setItem("best",0);
  best = 0;
}

//console.log('best',best);

if (localStorage.getItem('autopilot') == "true"){
  autopilot = true;
  bordercolor = "rgb(100,0,0)";
}

if (localStorage.getItem('autopilot') == null){
  autopilot = false;
  localStorage.setItem('autopilot',"false");
}

if (window.location.href.includes('?autopilot=true')){ // this is an override in case anyone still uses it
  autopilot = true;
  bordercolor = "rgb(100,0,0)";
}

// dont do anythign below this
const turningPrecision = true;
snakeclr4 += "EJSX";

function drawline(x,y,x1,y1,clr){
  ctx.beginPath();
  ctx.lineWidth = 4*scalefactor;
  ctx.strokeStyle = clr;
  ctx.fillStyle = clr;
  ctx.moveTo(x,y);
  ctx.lineTo(x1,y1)
  ctx.stroke();
}

function drawboard(){
  ctx.beginPath();
  let x = 0;
  let actx = window.innerWidth/4+byte;
  let clrnow = pixelbackground1;
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
      ctx.fillStyle = 'orange';
      ctx.fillRect(actx+byte/2,acty+byte/2,(height)/(boardSize+2)/10,(height)/(boardSize+2)/10);

      ctx.fillStyle = 'red';
      let ed = 0;
      let deactivated = false;
      while (ed < eraseddots.length){
        //ctx.fillRect(eraseddots[ed][0],eraseddots[ed][1],(height)/(boardSize+2)/10,(height)/(boardSize+2)/10);
        ed += 1;
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
  ctx.fillStyle = "black";
  ctx.fillRect(window.innerWidth/4+byte*1,byte*9-4,byte*2+4,byte*2+8);
  ctx.fillRect(window.innerWidth/4+byte*15-4,byte*9-4,byte*2+8,byte*2+8);

  var linecolor = "rgb(42, 198, 250)";

  ctx.strokeStyle = linecolor;
  ctx.lineWidth = 4*scalefactor;
  let leniance = ((height)/(boardSize+2))*borderleniance;
  bounderies = [window.innerWidth/4+(height)/(boardSize+2)*1.5-leniance+10*scalefactor,(height)/(boardSize+2)*1.5-leniance+10*scalefactor,(window.innerWidth/4+height*((boardSize-1)/boardSize))-(height)/(boardSize+2)/2.5+leniance-10*scalefactor,height*(boardSize-1)/boardSize-(height)/(boardSize+2)/2+leniance-10*scalefactor];
  ctx.strokeRect(window.innerWidth/4+(height)/(boardSize+2),(height)/(boardSize+2),byte*boardSize,byte*boardSize);
  ctx.strokeRect(window.innerWidth/4+(height)/(boardSize+2)-10*scalefactor,(height)/(boardSize+2)-10*scalefactor,byte*boardSize+20*scalefactor,byte*boardSize+20*scalefactor);



  ctx.fillRect(window.innerWidth/4+(height)/(boardSize+2)-byte,byte*(boardSize/2)+byte,byte*3,byte);
  ctx.fillRect(window.innerWidth/4+byte*boardSize-byte,byte*(boardSize/2)+byte,byte*3,byte);

  //drawline(window.innerWidth/4+(height)/(boardSize+2),byte*(boardSize/2)+3*byte-10*scalefactor,2*byte+window.innerWidth/4+(height)/(boardSize+2)-10*scalefactor,byte*(boardSize/2)+3*byte-10*scalefactor,linecolor);
  drawline(window.innerWidth/4+(height)/(boardSize+2),byte*(boardSize/2)+2*byte+2,window.innerWidth/4+(height)/(boardSize+2),byte*(boardSize/2)+2*byte+2+byte,'black');
  drawline(window.innerWidth/4+(height)/(boardSize+2),byte*(boardSize/2)+2*byte+2+byte,window.innerWidth/4+(height)/(boardSize+2)+2*byte,byte*(boardSize/2)+2*byte+2+byte,linecolor);
  drawline(window.innerWidth/4+(height)/(boardSize+2)+2*byte,byte*(boardSize/2)+2*byte+2+byte,2*byte+window.innerWidth/4+(height)/(boardSize+2),byte*(boardSize/2)+2*byte,linecolor);

  //drawline(window.innerWidth/4+(height)/(boardSize+2),byte*(boardSize/2)+3*byte,2*byte+window.innerWidth/4+(height)/(boardSize+2),byte*(boardSize/2)+3*byte,linecolor);
  //drawline(2*byte+window.innerWidth/4+(height)/(boardSize+2),byte*(boardSize/2)+3*byte,2*byte+window.innerWidth/4+(height)/(boardSize+2),byte*(boardSize/2)+2*byte,linecolor);
  //drawline(window.innerWidth/4+(height)/(boardSize+2)-10*scalefactor,byte*(boardSize/2)+3*byte,window.innerWidth/4+(height)/(boardSize+2)-10*scalefactor,byte*(boardSize/2)+2*byte,linecolor);
  drawline(window.innerWidth/4+(height)/(boardSize+2)-10*scalefactor-2,byte*(boardSize/2)+2*byte,2*byte+window.innerWidth/4+(height)/(boardSize+2),byte*(boardSize/2)+2*byte,linecolor);
  //drawline(window.innerWidth/4+(height)/(boardSize+2)-2,byte*(boardSize/2)+2*byte+10*scalefactor,2*byte+window.innerWidth/4+(height)/(boardSize+2)-10*scalefactor,byte*(boardSize/2)+2*byte+10*scalefactor,linecolor);
  //drawline(2*byte+window.innerWidth/4+(height)/(boardSize+2)-10*scalefactor,byte*(boardSize/2)+2*byte+10*scalefactor,2*byte+window.innerWidth/4+(height)/(boardSize+2)-10*scalefactor,byte*(boardSize/2)+3*byte-10*scalefactor,linecolor);
  //drawline(window.innerWidth/4+(height)/(boardSize+2),byte*(boardSize/2)+2*byte+10*scalefactor,window.innerWidth/4+(height)/(boardSize+2),byte*(boardSize/2)+3*byte-10*scalefactor,linecolor);

  drawline(window.innerWidth/4+(height)/(boardSize+2)-10*scalefactor,byte*(boardSize/2)+byte,2*byte+window.innerWidth/4+(height)/(boardSize+2),byte*(boardSize/2)+byte,linecolor);
  //drawline(window.innerWidth/4+(height)/(boardSize+2),byte*(boardSize/2)-2+byte,window.innerWidth/4+(height)/(boardSize+2),byte*(boardSize/2)-10*scalefactor-2+byte,'black');
  //drawline(window.innerWidth/4+(height)/(boardSize+2),byte*(boardSize/2)-10*scalefactor+byte,2*byte+window.innerWidth/4+(height)/(boardSize+2),byte*(boardSize/2)-10*scalefactor+byte,linecolor);
  //drawline(2*byte+window.innerWidth/4+(height)/(boardSize+2),byte*(boardSize/2)+byte,2*byte+window.innerWidth/4+(height)/(boardSize+2),byte*(boardSize/2)-10*scalefactor+byte,linecolor);

  drawline(window.innerWidth/4+byte*boardSize+byte+10*scalefactor,byte*(boardSize/2)+2*byte,window.innerWidth/4+byte*boardSize-byte,byte*(boardSize/2)+2*byte,linecolor);
  //drawline(window.innerWidth/4+byte*boardSize+byte,byte*(boardSize/2)+2*byte+2,window.innerWidth/4+byte*boardSize+byte,byte*(boardSize/2)+2*byte+2+10*scalefactor,'black');
  //drawline(window.innerWidth/4+byte*boardSize+byte,byte*(boardSize/2)+2*byte+10*scalefactor,window.innerWidth/4+byte*boardSize-byte,byte*(boardSize/2)+2*byte+10*scalefactor,linecolor);
  //drawline(window.innerWidth/4+byte*boardSize-byte,byte*(boardSize/2)+2*byte,window.innerWidth/4+byte*boardSize-byte,byte*(boardSize/2)+2*byte+10*scalefactor,linecolor);

  drawline(window.innerWidth/4+byte*boardSize+byte+10*scalefactor,byte*(boardSize/2)+byte,window.innerWidth/4+byte*boardSize-byte,byte*(boardSize/2)+byte,linecolor);
  //drawline(window.innerWidth/4+byte*boardSize+byte,byte*(boardSize/2)-2+byte,window.innerWidth/4+byte*boardSize+byte,byte*(boardSize/2)-10*scalefactor-2+byte,'black');
  //drawline(window.innerWidth/4+byte*boardSize+byte,byte*(boardSize/2)-10*scalefactor+byte,window.innerWidth/4+byte*boardSize-byte,byte*(boardSize/2)-10*scalefactor+byte,linecolor);
  //drawline(window.innerWidth/4+byte*boardSize-byte,byte*(boardSize/2)+byte,window.innerWidth/4+byte*boardSize-byte,byte*(boardSize/2)-10*scalefactor+byte,linecolor);

  // all the fillrects
  ctx.fillStyle = 'black';
  ctx.fillRect(window.innerWidth/4+byte*2+2,byte*2+2,byte+4,byte*6+4); 
  ctx.fillRect(window.innerWidth/4+byte*4+2,byte*2+2,byte*3+4,byte+4);
  ctx.fillRect(window.innerWidth/4+byte*4+2,byte*4+2,byte*3+4,byte+4);
  ctx.fillRect(window.innerWidth/4+byte*4+2,byte*4+2,byte*1+4,byte*3+4);
  ctx.fillRect(window.innerWidth/4+byte*7,byte*9,byte*4+4,byte*3+4);
  ctx.fillRect(window.innerWidth/4+byte*8,byte*1,byte*1+4,byte*5+4);
  ctx.fillRect(window.innerWidth/4+byte*6,byte*6,byte*1+4,byte*2+4);
  ctx.fillRect(window.innerWidth/4+byte*7,byte*7,byte*2+4,byte*1+4);
  ctx.fillRect(window.innerWidth/4+byte*4,byte*8,byte*1+4,byte*4+4);
  ctx.fillRect(window.innerWidth/4+byte*5,byte*9,byte*1+4,byte*3+4);
  ctx.fillRect(window.innerWidth/4+byte*1,byte*10.25,byte*1.75+4,byte*0.5+4);
  ctx.fillRect(window.innerWidth/4+byte*12,byte*9,byte*2+4,byte*3+4);
  ctx.fillRect(window.innerWidth/4+byte*10,byte*2,byte*2+4,byte*1+4);
  ctx.fillRect(window.innerWidth/4+byte*14,byte*2,byte*2+4,byte*1+4);
  ctx.fillRect(window.innerWidth/4+byte*10,byte*2,byte*1+4,byte*6+4);
  ctx.fillRect(window.innerWidth/4+byte*15,byte*2,byte*1+4,byte*6+4);
  ctx.fillRect(window.innerWidth/4+byte*10,byte*7,byte*6+4,byte*1+4);
  ctx.fillRect(window.innerWidth/4+byte*12,byte*4,byte*2+4,byte*2+4);
  ctx.fillRect(window.innerWidth/4+byte*15,byte*11,byte*2+4,byte*1+4);
  ctx.fillRect(window.innerWidth/4+byte*16,byte*12,byte*1+4,byte*2+4);
  ctx.fillRect(window.innerWidth/4+byte*2,byte*12,byte*1+4,byte*1+4);
  ctx.fillRect(window.innerWidth/4+byte*2,byte*14,byte*1+4,byte*2+4);
  ctx.fillRect(window.innerWidth/4+byte*3,byte*15,byte*1+4,byte*1+4);
  ctx.fillRect(window.innerWidth/4+byte*4,byte*13,byte*3+4,byte*1+4);
  ctx.fillRect(window.innerWidth/4+byte*5,byte*14,byte*1+4,byte*2+4);
  ctx.fillRect(window.innerWidth/4+byte*8,byte*13,byte*1+4,byte*2+4);
  ctx.fillRect(window.innerWidth/4+byte*7,byte*15,byte*3+4,byte*1+4);
  ctx.fillRect(window.innerWidth/4+byte*10,byte*13,byte*3+4,byte*1+4);
  ctx.fillRect(window.innerWidth/4+byte*11,byte*14,byte*1+4,byte*2+4);
  ctx.fillRect(window.innerWidth/4+byte*14,byte*13,byte*1+4,byte*2+4);
  ctx.fillRect(window.innerWidth/4+byte*13,byte*15,byte*3+4,byte*1+4);
  ctx.fillRect(window.innerWidth/4+byte*12,byte*1.75,byte*2+4,byte*0.5+4);
  ctx.fillRect(window.innerWidth/4+byte*12,byte*2.75,byte*2+4,byte*0.5+4);
  // middle dot in o enterance
  //ctx.fillRect(window.innerWidth/4+byte*12.75,byte*2.25,byte*0.5+4,byte*0.5+4);

  ctx.strokeStyle = linecolor;
  ctx.beginPath();
  // block 1
  ctx.strokeStyle = 'rgb(255,0,0)';
  ctx.strokeRect(window.innerWidth/4+byte*2,byte*2,byte,byte*6); // -10*scalefactor to make it fit but then it doesnt align
  // block 2
  ctx.strokeStyle = 'rgb(0,255,0)';
  ctx.strokeRect(window.innerWidth/4+byte*4,byte*2,byte*3,byte);

  // weird shape
  drawline(window.innerWidth/4+byte*4,byte*4,window.innerWidth/4+byte*7,byte*4,'rgb(255,255,0)');
  drawline(window.innerWidth/4+byte*4,byte*4,window.innerWidth/4+byte*4,byte*7,'rgb(255,255,0)');
  drawline(window.innerWidth/4+byte*5,byte*5,window.innerWidth/4+byte*7,byte*5,'rgb(255,255,0)');
  drawline(window.innerWidth/4+byte*5,byte*5,window.innerWidth/4+byte*5,byte*7,'rgb(255,255,0)');
  drawline(window.innerWidth/4+byte*7,byte*4,window.innerWidth/4+byte*7,byte*5,'rgb(255,255,0)');
  drawline(window.innerWidth/4+byte*4,byte*7,window.innerWidth/4+byte*5,byte*7,'rgb(255,255,0)');
  ctx.fillStyle = 'black';

  // ghost box
  ctx.strokeStyle = 'white';

  ctx.strokeRect(window.innerWidth/4+byte*7,byte*10,byte*4,byte*2);
  ctx.strokeRect(window.innerWidth/4+byte*7,byte*9,byte*1.5,byte*1);
  ctx.strokeRect(window.innerWidth/4+byte*9.5,byte*9,byte*1.5,byte*1);
  
  drawline(window.innerWidth/4+byte*7+2,byte*10-2,window.innerWidth/4+byte*11-2,byte*10-2,"black");
  drawline(window.innerWidth/4+byte*7+2,byte*10+1,window.innerWidth/4+byte*11-2,byte*10+1,"black");
  drawline(window.innerWidth/4+byte*8.5,byte*10-2,window.innerWidth/4+byte*9.5,byte*10-2,"orange");

  // box 4
  ctx.strokeStyle = linecolor;
  ctx.fillStyle = 'black';
  ctx.strokeRect(window.innerWidth/4+byte*8,byte*1,byte,byte*5);
  drawline(window.innerWidth/4+byte*8,byte-2,window.innerWidth/4+byte*9,byte-2,'black');
  drawline(window.innerWidth/4+byte*8,byte+1,window.innerWidth/4+byte*9,byte+1,'black');

  // another weird shape
  drawline(window.innerWidth/4+byte*6,byte*6,window.innerWidth/4+byte*6,byte*8,'rgb(255,0,0)');
  drawline(window.innerWidth/4+byte*6,byte*8,window.innerWidth/4+byte*9,byte*8,'rgb(255,0,0)');
  drawline(window.innerWidth/4+byte*7,byte*7,window.innerWidth/4+byte*9,byte*7,'rgb(255,0,0)');
  drawline(window.innerWidth/4+byte*6,byte*6,window.innerWidth/4+byte*7,byte*6,'rgb(255,0,0)');
  drawline(window.innerWidth/4+byte*9,byte*8,window.innerWidth/4+byte*9,byte*7,'rgb(255,0,0)');
  drawline(window.innerWidth/4+byte*7,byte*6,window.innerWidth/4+byte*7,byte*7,'rgb(255,0,0)');

  // big o shape
  ctx.strokeStyle = 'rgb(0,255,0)';
  ctx.strokeRect(window.innerWidth/4+byte*10,byte*2,byte*6,byte*6);
  drawline(window.innerWidth/4+byte*12,byte*2-1,window.innerWidth/4+byte*14,byte*2-1,'black');
  drawline(window.innerWidth/4+byte*12,byte*2+2,window.innerWidth/4+byte*14,byte*2+2,'black');
  ctx.strokeStyle = 'rgb(0,255,0)';
  ctx.strokeRect(window.innerWidth/4+byte*11,byte*3,byte*4,byte*4);
  drawline(window.innerWidth/4+byte*12,byte*3,window.innerWidth/4+byte*14,byte*3,'black');
  ctx.strokeStyle = 'rgb(0,255,0)';
  drawline(window.innerWidth/4+byte*12,byte*2,window.innerWidth/4+byte*12,byte*3)
  drawline(window.innerWidth/4+byte*14,byte*2,window.innerWidth/4+byte*14,byte*3)
  ctx.strokeRect(window.innerWidth/4+byte*12,byte*4,byte*2,byte*2);

  //block 5 with a block on side
  ctx.strokeStyle = 'rgb(255,255,0)';
  ctx.strokeRect(window.innerWidth/4+byte*4,byte*9,byte*2,byte*3);
  ctx.strokeRect(window.innerWidth/4+byte*4,byte*8,byte*1,byte*1);
  drawline(window.innerWidth/4+byte*4+2,byte*9-1,window.innerWidth/4+byte*5-2,byte*9-1,'black');
  drawline(window.innerWidth/4+byte*4+2,byte*9+2,window.innerWidth/4+byte*5-2,byte*9+2,'black');
  
  // block 6 removed to push the ghost box up
  ctx.strokeStyle = linecolor;
  //ctx.strokeRect(window.innerWidth/4+byte*7,byte*9,byte*7,byte*1);

  // block 7
  ctx.strokeStyle = linecolor;
  ctx.strokeRect(window.innerWidth/4+byte*15,byte*11,byte*2,byte*1);
  ctx.strokeRect(window.innerWidth/4+byte*16,byte*12,byte*1,byte*2);
  drawline(window.innerWidth/4+byte*17+1,byte*11+2,window.innerWidth/4+byte*17+1,byte*14-2,'black');
  drawline(window.innerWidth/4+byte*17-1,byte*11+2,window.innerWidth/4+byte*17-2,byte*14-2,'black');
  drawline(window.innerWidth/4+byte*16-1,byte*12,window.innerWidth/4+byte*17-1,byte*12,'black');
  drawline(window.innerWidth/4+byte*16+2,byte*12,window.innerWidth/4+byte*17+1,byte*12,'black');
  drawline(window.innerWidth/4+byte*16,byte*12-1,window.innerWidth/4+byte*17-2,byte*12-1,'black');
  drawline(window.innerWidth/4+byte*16,byte*12+1,window.innerWidth/4+byte*17-2,byte*12+1,'black');
  drawline(window.innerWidth/4+byte*17-1,byte*14,window.innerWidth/4+byte*17-1,byte*14+8,linecolor);

  // t shape thing
  ctx.strokeStyle = 'rgb(0,255,0)';
  ctx.strokeRect(window.innerWidth/4+byte*13,byte*15,byte*3,byte*1);
  ctx.strokeRect(window.innerWidth/4+byte*14,byte*13,byte*1,byte*2);
  drawline(window.innerWidth/4+byte*14,byte*15+1,window.innerWidth/4+byte*15,byte*15+1,'black');
  drawline(window.innerWidth/4+byte*14,byte*15-1,window.innerWidth/4+byte*15,byte*15-1,'black');

  // 2nd t shape
  ctx.strokeStyle = 'rgb(255,255,0)';
  ctx.strokeRect(window.innerWidth/4+byte*10,byte*13,byte*3,byte*1);
  ctx.strokeRect(window.innerWidth/4+byte*11,byte*14,byte*1,byte*2);
  drawline(window.innerWidth/4+byte*11,byte*14+1,window.innerWidth/4+byte*12,byte*14+1,'black');
  drawline(window.innerWidth/4+byte*11,byte*14-1,window.innerWidth/4+byte*12,byte*14-1,'black');

  // 3rd t shape thing
  ctx.strokeStyle = 'rgb(255,0,0)';
  ctx.strokeRect(window.innerWidth/4+byte*7,byte*15,byte*3,byte*1);
  ctx.strokeRect(window.innerWidth/4+byte*8,byte*13,byte*1,byte*2);
  drawline(window.innerWidth/4+byte*8,byte*15+1,window.innerWidth/4+byte*9,byte*15+1,'black');
  drawline(window.innerWidth/4+byte*8,byte*15-1,window.innerWidth/4+byte*9,byte*15-1,'black');

  // block 8
  ctx.strokeStyle = 'rgb(255,0,0)';
  ctx.strokeRect(window.innerWidth/4+byte*12,byte*9,byte*2,byte*3);

  // 4th t shape
  ctx.strokeStyle = linecolor;
  ctx.strokeRect(window.innerWidth/4+byte*5,byte*14,byte*1,byte*2);
  ctx.strokeRect(window.innerWidth/4+byte*4,byte*13,byte*3,byte*1);
  drawline(window.innerWidth/4+byte*6,byte*14-1,window.innerWidth/4+byte*5,byte*14-1,'black');
  drawline(window.innerWidth/4+byte*6,byte*14+1,window.innerWidth/4+byte*5,byte*14+1,'black');

  // l shaped thing
  ctx.strokeStyle = 'rgb(0,255,0)';
  ctx.strokeRect(window.innerWidth/4+byte*2,byte*14,byte*1,byte*1);
  ctx.strokeRect(window.innerWidth/4+byte*2,byte*15,byte*2,byte*1);
  drawline(window.innerWidth/4+byte*3-2,byte*15-1,window.innerWidth/4+byte*2+2,byte*15-1,'black');
  drawline(window.innerWidth/4+byte*3-2,byte*15+1,window.innerWidth/4+byte*2+2,byte*15+1,'black');

  // block 9
  ctx.strokeStyle = 'rgb(0,255,0)';
  ctx.strokeRect(window.innerWidth/4+byte*2,byte*12,byte*1,byte*1);
}

// put in in terms of bytes, ill add a converter
// assign blocks
var rightblockpre = [[3,4,8,12],[1,2,2,8],[3,4,2,3],[3,4,4,7],[1,2,11,12],[1,2,13,16],[3,4,13,14],[4,5,14,16],[7,8,1,6],[5,6,6,8],[6,7,9,12],[7,8,13,15],[6,7,15,16],[9,10,2,8],[11,12,4,6],[14,15,3,7],[13,14,2,3],[16,17,1,9],[11,12,9,12],[16,17,10,11],[14,15,11,12],[15,16,12,14],[9,10,13,14],[10,11,14,16],[13,14,13,15],[12,13,15,16],[16,17,14,17],[8.5,9.5,9,10]];
var leftblockpre = [[1,2,1,9],[3,4,2,8],[1,2,10,17],[3,4,11,12],[3,4,13,15],[4,5,15,16],[7,8,2,3],[7,8,4,5],[5,6,5,7],[5,6,8,9],[6,7,9,12],[7,8,13,14],[6,7,14,16],[7,8,6,7],[9,10,7,8],[9,10,1,6],[11,12,9,12],[9,10,13,15],[10,11,15,16],[12,13,2,3],[11,12,3,7],[14,15,4,6],[16,17,2,8],[8.5,9.5,9,10],[14,15,9,12],[13,14,13,14],[12,13,14,16],[15,16,13,15],[16,17,15,16]];
var upblockpre = [[1,8,1,2],[2,3,8,9],[2,3,12,13],[2,4,16,17],[4,7,3,4],[4,5,7,8],[5,7,5,6],[4,6,12,13],[4,5,14,15],[5,6,16,17],[6,7,14,15],[7,10,16,17],[7,11,12,13],[6,9,8,9],[8,9,6,7],[9,17,1,2],[11,12,3,4],[14,15,3,4],[12,14,6,7],[10,16,8,9],[12,14,12,13],[10,11,14,15],[11,12,16,17],[12,13,14,15],[13,16,16,17],[15,16,12,13],[16,17,14,15],[1,3,10,11],[15,17,10,11],[1,3,9,10],[15,17,9,10]];
var downblockpre = [[3,4,14,15],[2,3,1,2],[1,3,8,9],[2,3,9,10],[2,3,12,13],[1,17,16,17],[4,7,1,2],[4,7,3,4],[6,7,5,6],[7,9,6,7],[4,5,7,8],[5,6,8,9],[4,7,12,13],[7,11,8,9],[10,11,8,9],[7,8,14,15],[8,9,12,13],[9,10,14,15],[10,13,12,13],[13,14,14,15],[14,15,12,13],[15,16,14,15],[12,14,8,12],[15,17,10,11],[10,12,1,2],[14,16,1,2],[12,14,3,4],[11,15,6,7],[15,17,8,10]];
var rightblock = [];
var leftblock = [];
var upblock = [];
var downblock = [];
byte = 2*((window.innerHeight-100)/(16*2.2));

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
console.log(rightblock);
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

function openintro(){
  closedintro = false;
  //console.log('opened it');
  let credits = document.getElementById('credits');
  credits.style.display= "none";
  let intro = document.getElementById('introducer');
  let intro1 = document.getElementById('introducer-cover');

  intro.style.display = "block";
  intro1.style.display = "block";

  // let starter = document.querySelector('.starter');
  // starter.addEventListener('click', closeintro());

  intropc = 0;
  (async () => {
    while (intropc <= 50){
      //console.log('in');
      intro1.style.opacity = intropc+'%';
      intro.style.opacity = intropc*2+'%';
      await sleep(2);
      intropc += 1;
    }
  })();
  intro.style.display = "block";
  //intro1.style.display = "block";
}

function opencredits(){
  console.log('opened credits');
  closedintro = false;
  let intro = document.getElementById('credits');
  let intro1 = document.getElementById('introducer-cover');

  intro.style.display = "block";
  intro1.style.display = "block";

  // let starter = document.querySelector('.starter');
  // starter.addEventListener('click', closeintro());

  intropc = 0;
  (async () => {
    while (intropc <= 50){
      console.log('in');
      intro1.style.opacity = intropc+'%';
      intro.style.opacity = intropc*2+'%';
      await sleep(2);
      intropc += 1;
    }
  })();
  intro.style.display = "block";
  //intro1.style.display = "block";
}

function opensnake(){
  startwaiter = true;
  xd = speed;
  closedintro = false;
  let intro = document.getElementById('snakestyle');
  let intro1 = document.getElementById('introducer-cover');

  intro.style.display = "block";
  //intro1.style.display = "block";

  // let starter = document.querySelector('.starter');
  // starter.addEventListener('click', closeintro());

  intropc = 0;
  (async () => {
    while (intropc <= 50){
      console.log('in');
      //intro1.style.opacity = intropc+'%';
      intro.style.opacity = intropc*2+'%';
      await sleep(2);
      intropc += 1;
    }
  })();
  intro.style.display = "block";
  //intro1.style.display = "block";
}

function animateboard(){
  ctx.beginPath();
  (async () => {
    let anim = 0;
    while (anim < 101){
      let x = 0;
      let actx = window.innerWidth/4;
      let clrnow = pixelbackground1EMP;

      while (x < boardSize+2){
        let y = 0;
        let acty = 0;
        while (y < boardSize+4){
          
          if (clrnow == pixelbackground1EMP){
            clrnow = pixelbackground2EMP;
          } else {
            clrnow = pixelbackground1EMP;
          }

          //console.log(anim,'wut');
          ctx.fillStyle = clrnow;
          if (x == 0 || x == boardSize+1 || y == 0 || y == boardSize+1){
            if (clrnow == pixelbackground1EMP){
              clrnow = pixelbackground2EMP;
            } else {
              clrnow = pixelbackground1EMP;
            }
            let reserve = clrnow;
            ctx.fillStyle = bordercolor;
            ctx.fillRect(actx, acty, (height/(boardSize+2))*anim/100, (height/(boardSize+2))*anim/100);
            clrnow = reserve;
            //console.log(anim,'in first');
          } else {
            //clrnow = 'rgb(0,0,0)';
            ctx.fillStyle = clrnow;
            ctx.fillRect(actx, acty, (height/(boardSize+2)), (height/(boardSize+2))*anim/100);
            //console.log(anim,'in');
          }
          acty += (height)/(boardSize+2);
          y += 1;
          //console.log('drew smth');
          }
        
        if (clrnow == pixelbackground1EMP){
          clrnow = pixelbackground2EMP;
        } else {
          clrnow = pixelbackground1EMP;
        }
        actx += (height)/(boardSize+2);
        x += 1;
      }
      //console.log(anim,'in but out');
      await sleep(2);
      anim += 2;
    }
  })();
}

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
  ctx.fillStyle = 'black';
  ctx.fillRect(window.innerWidth/4-byte,byte*9,2*byte-15*scalefactor,byte);
  ctx.fillRect(window.innerWidth/4+byte*17+15*scalefactor,byte*9,2*byte-15*scalefactor,byte);
}

function closeintro(){
  console.log('closed it');
  closedintro = true;
  (async () => {
    let intro = document.getElementById('introducer');
    let namer = document.getElementById('name');
    namer = namer.value;
    localStorage.setItem("name", namer);
    let intro1 = document.getElementById('introducer-cover');
    // intro1.style.display = "none";
    // intro.style.display = "none";
    let intropc1 = 50;
    while (intropc1 >= 0){
      //console.log('was '+intropc1);
      intro1.style.opacity = intropc1+'%';
      intro.style.opacity = intropc1+'%';
      await sleep(2);
      intropc1 -= 1;
    }
    intro1.style.display = "none";
    intro.style.display = "none";
    censorer = 0;
    //console.log('checked');
    let namehandler = document.getElementById('name');
    let namedisp = document.getElementById('namedisplay');
    //(censored,namehandler.value);
    while (censorer < censored.length){
      if (namehandler.value.toLowerCase().includes(censored[censorer].toLowerCase())){
        namedisp.innerHTML = "Name: Censored";
        console.log(namedisp.textContent);
        name = "Censored";
        console.log(censored[censorer],namehandler.value);
        localStorage.setItem('name',"Censored");
      }
      censorer += 1;
    }
  })();
}

function closecredits(){
  closedintro = true;
  (async () => {
    let intro = document.getElementById('credits');
    let intro1 = document.getElementById('introducer-cover');
    // intro1.style.display = "none";
    // intro.style.display = "none";
    let intropc1 = 50;
    while (intropc1 >= 0){
      //console.log('was '+intropc1);
      intro1.style.opacity = intropc1+'%';
      intro.style.opacity = intropc1+'%';
      await sleep(2);
      intropc1 -= 1;
    }
    intro1.style.display = "none";
    intro.style.display = "none";
  })();
}

function closesnake(){
  closedintro = true;
  (async () => {
    let intro = document.getElementById('snakestyle');
    let intro1 = document.getElementById('introducer-cover');
    // intro1.style.display = "none";
    // intro.style.display = "none";
    let intropc1 = 50;
    while (intropc1 >= 0){
      //console.log('was '+intropc1);
      intro1.style.opacity = intropc1+'%';
      intro.style.opacity = intropc1+'%';
      await sleep(2);
      intropc1 -= 1;
    }
    intro1.style.display = "none";
    intro.style.display = "none";
  })();
}

const canvas = document.querySelector('.myCanvas');
const ctx = canvas.getContext('2d');
const width = canvas.width = window.innerWidth/2+window.innerWidth/4; 
const height = canvas.height = window.innerHeight-100;
var bounderies = [0,0,0,0];
var score = 0;
var snakeclr = "g";
var snakeclr3 = "g";
var dir = 'r';
snakeclr4 += "flEM";
canvas.style.left = "100px";
canvas.style.top = "100px";

//canvas outline
//ctx.strokeStyle = 'rgb(125,125,125)';
ctx.fillStyle = theme;
ctx.fillRect(0, 0, width, height);
//console.log('printeddd');

var speed = ((height)/(boardSize+2))/(200-speedfactor)*0.4; // 1/4 square/frame?
var basespeed = speed;
let xpos = window.innerWidth/4+(height)/(boardSize+2)*1.5+(height)/(boardSize+2)*2;
let ypos = ((height)/(boardSize+2)*1.5)+(height)/(boardSize+2)*(boardSize/2);
let startingpos = [xpos,ypos];
var pointsArr = [xpos,ypos,xpos,ypos,xpos,ypos,xpos,ypos,xpos,ypos,xpos,ypos,xpos,ypos,xpos,ypos,xpos,ypos,xpos,ypos,xpos,ypos,xpos,ypos,xpos,ypos,xpos,ypos,xpos,ypos,xpos,ypos,xpos,ypos,xpos,ypos,xpos,ypos,xpos,ypos,xpos,ypos,xpos,ypos,xpos,ypos,xpos,ypos,xpos,ypos,xpos,ypos,xpos,ypos,xpos,ypos,xpos,ypos,xpos,ypos,xpos,ypos,xpos,ypos,xpos,ypos,xpos,ypos,xpos,ypos,xpos,ypos,xpos,ypos,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var thepos = [xpos,ypos];
var dotspos = [];
var eraseddots = [];
var thelastpos = [xpos,ypos];
var xd = 0;
var yd = 0
snakeclr += "h";
snakeclr4 += "gl4Vl7j";
var waiter = '';
var waiter2 = '';
var waiter3 = '';
var startwaiter = false;
var applepos = [Math.floor(Math.random()*(boardSize-2))*(height)/(boardSize+2)+window.innerWidth/4+(height)/(boardSize+2)*1.5+(height)/(boardSize+2), Math.floor(Math.random()*(boardSize-2))*(height)/(boardSize+2)+(height)/(boardSize+2)+((height)/(boardSize+2)*1.5)];
var scalefactor = window.innerWidth/2048;
var initxpos = xpos;
var initypos = ypos;
var breaker = false;
snakeclr += "p";
var snakeclr2 = "";
var eatwaiter = 0;
var lastapple = [0,0];
var elapsedtime = 0;
var door = 0.01;
var byte = 2*((height)/(boardSize*2.2));
var start = Date.now();
var intropc = 0;
snakeclr += "_";
var snakeclr5= snakeclr;
snakeclr4 += "vIuxZ1i";
var closedintro = true;
var firsttime;
var starting = true;
var oa = 1;
var od = 'c';

// initial drawboard
drawboard();

// actual start var no bs
var started = false;

let reader = localStorage.getItem('firsttime');
if (reader == null){
  localStorage.setItem('firsttime','false');
  firsttime = true;
  closedintro = false;
}

//console.log(applepos);
snakeclr += "F6E6F";
speed = speed;//*(scalefactor);
snakeclr += "l2Ga5";
snakeclr3 = snakeclr+"CId6qmQbI3IENO";
snakeclr4 += "XTRmm0z";

const sleep = ms => new Promise(res => setTimeout(res, ms));

(async () => {
  let counter = 0;
  while (true){ // add some living condition later
    ctx.clearRect(0, 0, canvas.width, canvas.height); //clear it obv

    console.log(waiter);
    // upgrader updater
    // if in range then updatepos
    if (true){ // within bounderies
      if (xd > 0){ // moving right
        let ct = 0;
        let rejected1 = false;
        while (ct < rightblock.length && !rejected1){
          //console.log('rb'+rightblock[ct]);
          if (thepos[0] >= rightblock[ct][0]+byte/2 && thepos[0] <= rightblock[ct][1] && thepos[1] >= rightblock[ct][2] && thepos[1] <= rightblock[ct][3]){
            // nopt allowed
            console.log('rejected right',ct);
            rejected1 = true;
          } else {
            //console.log('broke1');
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
          //console.log('rb'+leftblock[ct]);
          if (thepos[0] >= leftblock[ct][0]-byte/2 && thepos[0] <= leftblock[ct][1]-byte/2 && thepos[1] >= leftblock[ct][2] && thepos[1] <= leftblock[ct][3]){
            // nopt allowed
            console.log('rejected left',ct);
            rejected1 = true;
          } else {
            //console.log('broke1');
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
          //console.log('rb'+upblock[ct]);
          if (thepos[0] >= upblock[ct][0] && thepos[0] <= upblock[ct][1] && thepos[1] >= upblock[ct][2]-byte/2 && thepos[1] <= upblock[ct][3]-byte/2){
            // nopt allowed
            console.log('rejected up',ct);
            rejected1 = true;
          } else {
            //console.log('broke1');
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
          //console.log('rb'+downblock[ct]);
          if (thepos[0] >= downblock[ct][0] && thepos[0] <= downblock[ct][1] && thepos[1] >= downblock[ct][2]+byte/2 && thepos[1] <= downblock[ct][3]+byte/2){
            // nopt allowed
            console.log('rejected down',ct);
            rejected1 = true;
          } else {
            //console.log('broke1');
          }
          ct += 1;
        }
        if (!rejected1){
          thepos = [thepos[0]+xd,thepos[1]+yd];
        }
      }
      if (thepos[0] > window.innerWidth/4-byte && thepos[0] < window.innerWidth/4 && thepos[1] > byte*9 && thepos[1] < byte*10 && xd < 0){
        thepos = [window.innerWidth/4 + 18.5*byte,9.5*byte];
      }
      if (thepos[0] > window.innerWidth/4+byte*18 && thepos[0] < window.innerWidth/4+byte*19 && thepos[1] > byte*9 && thepos[1] < byte*10 && xd > 0){
        thepos = [window.innerWidth/4 - 0.5*byte,9.5*byte];
      }

      // if (xd != 0){ // moving right or left
      //   let ctr1 = 0;
      //   while (ctr1 < 17){
      //     if (Math.abs((ctr1*byte+window.innerWidth/4)-thepos[0]) < 5){

      //     }
      //     ctr1 += 1;
      //   }
      // }
    }
    //console.log(dotspos);
    //console.log('score',score);
    console.log(eraseddots);

    let dotchecker = 0;
    while (dotchecker < dotspos.length){
      if (Math.abs(thepos[0]-dotspos[dotchecker][0]) < byte/4 && Math.abs(thepos[1]-dotspos[dotchecker][1]) < byte/4){ // basically it went over the thing
        score += 1;
        if (counter >= 1){
          var z1 = document.getElementById('score');
          z1.textContent = 'Score: '+score;
        }
        console.log('score',score);
        // deactivate that dot pos
        dotspos[dotchecker] = [0,0]; // is it that easy lmfao
        eraseddots.push(dotspos[dotchecker]);
      }
      dotchecker += 1;
    }

    if (counter % 100 == 0 || true){  // sort of unessacary for pac man ig
      // check fps
      let renderellapse = (Date.now() - lastfps);
      if (renderellapse < 0.5){
        renderellapse = 6.5;
      }
      fpslst.push(renderellapse);
      //avgfps = (avgfps+renderellapse)/2;
      let sum = fpslst.reduce((a, b) => a + b, 0);
      let avgfps = (sum / fpslst.length) || 0;
      //console.log('avg'+fpslst);
      lastfps = Date.now();

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
      if (newspeed > speed){
        speed = speed*1.01;
      } else if (newspeed < speed){
        speed = speed*0.99;
      }
    }

    // we do need timer
    if (counter >= 1 && startwaiter){
      if (starting){
            start = Date.now();
            starting = false;
      }
      document.getElementById('time').innerHTML = 'Time: '+(Date.now() - start)/1000 +" sec";
      elapsedtime = (Date.now() - start)/1000;
    }

    // resize
    if (counter == 1){
      let leftpanel = document.getElementById('leftpanel');
      leftpanel.style.width = width/3;
    }

    if (counter >= 1){

      let rightdisplay = document.getElementById("all");
      rightdisplay.style.display = "block";
      
      let intro = document.getElementById('introducer');
      intro.style.left = window.innerWidth/4 +'px';
      intro.style.width = window.innerWidth/2 +'px';
      intro.style.top = window.innerHeight/7 +'px';
      intro.style.height = 5*window.innerHeight/7 +'px';

      intro = document.getElementById('credits');
      intro.style.left = window.innerWidth/4 +'px';
      intro.style.width = window.innerWidth/2 +'px';
      intro.style.top = window.innerHeight/4 +'px';
      intro.style.height = window.innerHeight/2 +'px';

      let intro1 = document.getElementById('introducer-cover');
      intro1.style.left = '0px';
      intro1.style.width = window.innerWidth +'px';
      intro1.style.top = '0px';
      intro1.style.height = window.innerHeight +'px';

      btn = document.getElementById('best');
      btn.innerHTML = "Best: "+best;

      if (!firsttime && counter == 1){
        intro.style.display = "none";
        intro1.style.display = "none";
      }

      let namehandler = document.getElementById('name');
      let namedisp = document.getElementById('namedisplay');
      //console.log('VALLL '+namehandler.value+'    next'+namedisp.textcontent);
      namedisp.innerHTML = "Name: "+namehandler.value;
      name = namehandler.value;
      let censorer = 0;
      if (namehandler.value == ''){
        namedisp.innerHTML = "Name: "+localStorage.getItem('name');
        name = localStorage.getItem('name');
      }
      while (censorer < censored.length){
        if (namehandler.value.toLowerCase().includes(censored[censorer].toLowerCase())){
          namedisp.innerHTML = "Name: Censored";
          name = "Censored";
          localStorage.setItem('name',"Censored");
        }
        censorer += 1;
      }
      //console.log('name>'+namehandler.value+'<');

      // let starter = document.querySelector('.starter');
      // starter.addEventListener('click', closeintro());

      (async () => {
        if (firsttime && intropc <= 50){
          intro1.style.opacity = intropc+'%';
          intro.style.opacity = intropc*2+'%';
          await sleep(2);
          intropc += 1;
        }
      })();
    }

    // while (!startwaiter && door <= 100){
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
    drawpac(thepos[0],thepos[1],(height)/(boardSize*2.2)*0.75,dir,oa);


    // idk why i named them oa and od
    // oa is the opening angle a decimal 0 to 1 of the percentage of opening
    // od is the direction its currently going in o = opening c = closing

    // stop pac man mouth opening and closing if its not moving
    if (thepos == thelastpos){
      if (started && oa >= 0.25){
        oa -= 0.03;
      }
    } else {
      if (od == 'c' && started){
        oa -= 0.03;
      } else if (started){
        oa += 0.03;
      }
    }
    // lmao
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
    counter += 1;
    await sleep(2);
    //console.log('drew at '+xpos+' '+ypos);
    pointsArr.push(xpos);
    pointsArr.push(ypos);
    pointsArr.shift();
    pointsArr.shift();

    if (Math.abs(xpos-applepos[0]) < (height)/(boardSize+2)/3 && Math.abs(ypos-applepos[1]) < (height)/(boardSize+2)/3){
      //basically you got it
      // set lastapple
      //var audioElement2 = new Audio('eat.mp3');
      //audioElement2.play();
      lastapple = applepos;

      //relocate apple
      while (true) { 
        old_applepos = applepos;
        applepos = [Math.floor(Math.random()*(boardSize-2))*(height)/(boardSize+2)+window.innerWidth/4+(height)/(boardSize+2)*1.5+(height)/(boardSize+2), Math.floor(Math.random()*(boardSize-2))*(height)/(boardSize+2)+(height)/(boardSize+2)+((height)/(boardSize+2)*1.5)];
        works = true 
        for (let i =0; i < pointsArr.length; i += 2) {
          if (applepos[0] == pointsArr[i] && applepos[1] == pointsArr[i + 1]) {
            works = false; break; 
          }
        }
        
        if (works) {
          break; 
        }  

      }
      
      //ignore overlap for some time
      eatwaiter = 7;

      //update score
      score += 1;
      var z1 = document.getElementById('score');
      z1.textContent = 'Score: '+score;
      //z1 = document.getElementById('leftscore');
      //z1.textContent = 'Your current score: '+score;
      let z2 = document.getElementById('display');
      let randnotif = Math.floor(Math.random()*6);
      if (randnotif == 0){
        randnotif = "Good job!";
      } else if (randnotif == 1){
        randnotif = "Great job!";
      } else if (randnotif == 2){
        randnotif = "Awesome!";
      } else if (randnotif == 3){
        randnotif = "Nice!";
      } else if (randnotif == 4){
        randnotif = "Cringe";
      } else if (randnotif == 5){
        randnotif = "GG";
      }
      
      z2.textContent = randnotif;

      if (autopilot){
        let btn = document.getElementById('playbtn7');
        btn.innerHTML = "Disable autopilot";
      }


      //update length
      let z = 0;
      while (z < addlength){
        pointsArr.push(0);
        pointsArr.push(0);
        z += 1;
      }
    }

    eatwaiter -= 1;

    // turner
    let ct3 = window.innerWidth/4;
    //console.log(ypos,thepos);
    while (ct3 < (thepos[0]+byte/2) + (height)/(boardSize+2)){
      if (Math.abs(ct3-(thepos[0]+byte/2)) < 5){
        if (waiter == 'up'){
          let ct11 = 0;
          let rejected = false;
          
          while (ct11 < upblock.length && !rejected){
            console.log('rb'+upblock[ct11]);
            if (thepos[0] >= upblock[ct11][0] && thepos[0] <= upblock[ct11][1] && thepos[1] >= upblock[ct11][2] && thepos[1] <= upblock[ct11][3]){
              // nopt allowed
              console.log('rejected',ct11);
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
            waiter = '';
          }
        } else if (waiter == 'down'){
          let ct11 = 0;
          let rejected = false;
          
          while (ct11 < downblock.length && !rejected){
            console.log('rb'+downblock[ct11]);
            if (thepos[0] >= downblock[ct11][0] && thepos[0] <= downblock[ct11][1] && thepos[1] >= downblock[ct11][2] && thepos[1] <= downblock[ct11][3]){
              // nopt allowed
              console.log('rejected',ct11);
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
            console.log('rb'+rightblock[ct11]);
            if (thepos[0] >= rightblock[ct11][0] && thepos[0] <= rightblock[ct11][1] && thepos[1] >= rightblock[ct11][2] && thepos[1] <= rightblock[ct11][3]){
              // nopt allowed
              console.log('rejected',ct11);
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
            console.log('rb'+leftblock[ct11]);
            if (thepos[0] >= leftblock[ct11][0] && thepos[0] <= leftblock[ct11][1] && thepos[1] >= leftblock[ct11][2] && thepos[1] <= leftblock[ct11][3]){
              // nopt allowed
              console.log('rejected',ct11);
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

    
    if (breaker){
      break;
    }

    //console.log('-- ', breaker);
    if (breaker){
      break;
      breaker = false;
    }
  }
  //console.log('did whole thing');
  let z3 = document.getElementById('display');
  z3.textContent = 'Game over! reload to play again';
  //alert('You lost');

  //set up buttons for endgame

  let displaydiv = document.getElementById('endgame-display');
  let displaydiv2 = document.getElementById('endgame-display2');
  let displaydiv1 = document.getElementById('endgame-display1');
  let play_again = document.getElementById('play_again');
  let leaderboard = document.getElementById('leaderboard');
  let leaderboard1 = document.getElementById('leaderboard2');
  displaydiv.style.left = bounderies[0]+(1/10)*(bounderies[2]-bounderies[0])+"px";
  displaydiv.style.top = bounderies[1]+(1/5*(bounderies[3]-bounderies[1]))+"px";
  displaydiv.style.height = bounderies[0]+(1/5*(bounderies[2]-bounderies[0]))+"px";
  displaydiv1.style.left = bounderies[0]+(1/10)*(bounderies[2]-bounderies[0])+"px";
  displaydiv1.style.top = bounderies[1]+(4.35/5)*(bounderies[3]-bounderies[1])+"px";
  displaydiv2.style.left = bounderies[0]+"px";
  displaydiv2.style.width = (bounderies[2]-bounderies[0])+"px";
  displaydiv2.style.top = bounderies[1]+(2/5)*(bounderies[3]-bounderies[1])+"px";
  displaydiv1.style.height = bounderies[0]+(1/5*(bounderies[2]-bounderies[0]))+"px";
  play_again.style.width = (8/10)*(bounderies[2]-bounderies[0])+"px";
  play_again.style.height = (1/5)*(bounderies[3]-bounderies[1])+"px";
  play_again.style.font = 64*scalefactor+"px";
  leaderboard.style.width = (8/10)*(bounderies[2]-bounderies[0])+"px";
  leaderboard.style.height = (1/5)*(bounderies[3]-bounderies[1])+"px";
  leaderboard.style.font = 64*scalefactor+"px";
  leaderboard1.style.width = (8/10)*(bounderies[2]-bounderies[0])+"px";
  leaderboard1.style.height = (1/5)*(bounderies[3]-bounderies[1])+"px";
  leaderboard1.style.top = bounderies[1]+(5/5)*(bounderies[3]-bounderies[1])+"px";
  leaderboard1.style.font = 64*scalefactor+"px";
  //leaderboard1.addEventListener('click', sendit('hello','world'));
  //displaydiv.style.paddingBottom = (3/5)*(bounderies[3]-bounderies[1])+"px";
  //displaydiv.style.margin-bottom = 50*scalefactor+"px";
  displaydiv2.style.fontSize = 32*scalefactor+"px";
  let thisthing = displaydiv2.children;
  thisthing = document.getElementById("endgamenotif2");
  thisthing.innerHTML = "Score: "+score;
  thisthing = document.getElementById("endgamenotif3");
  thisthing.innerHTML = "Time alive: "+elapsedtime+" seconds";
  name = document.getElementById('name');
  name = name.value;

  // game over animation
  ctx.beginPath;

  (async () => {

    setTimeout(function(){

      (async () => {
        let z = 0;
        while (z < 50){
          //drawboard();
          let i = 0;
          while (i <= pointsArr.length-1){
            if (i <= (pointsArr.length-15)){
              if (i % seglength*2 < seglength){
                cir(pointsArr[i],pointsArr[i+1],(height)/(boardSize*2.2), snakecolor1,0,2);
              } else {
                cir(pointsArr[i],pointsArr[i+1],(height)/(boardSize*2.2), snakecolor2,0,2);
              }
            } else {
              // this is the head
              let se = 0;
              while (se < 2){
                cir(pointsArr[i],pointsArr[i+1],(height)/(boardSize*2.2)+z*scalefactor, snakeheadcolor,se,se+0.1);
                se += 0.2;
              }
            }
            i += 2;
          }
          await sleep(2);
          z += (55-z)/20;
        }
        snakeclr2 += "5RFVrN0fOLs7";
      })();
    },0);

    snakeclr += "CFd34qrd";

    setTimeout(function(){
      animateboard();
    }, 1200);

    snakeclr += "gMt3pdc";

    setTimeout(function(){
      try {
        namedisp = document.getElementById('namedisplay');
        name = namedisp.innerHTML.replace('Name: ','');
        //console.log(name);
        let sendname = '&='+name;
        if (sendname == '&='){
          sendname = "&= ";
        }
        let senddata = '&='+score+'&t'+elapsedtime;
        snakeclr += "RV4Gt3x5";

        if (!autopilot){
          if (localStorage.getItem("best") < score){
            localStorage.setItem('best', score);
          }
        }

        (async () => {
          const { Octokit } = await import('https://cdn.skypack.dev/@octokit/core');
          console.log('sent?');
          snakeclr3 += "5RFVrN0fOLs7"
          const data1 = await fetch("./tk.json").then(r => r.json());
          var datanames = data1.data[0];
          datanames = JSON.stringify(datanames);
          datanames = datanames.replace('{"name":"','');
          datanames = datanames.replace('"}','');
          const octokit = new Octokit({ auth: datanames});

          console.log('ye');
          // acutally do it rn
          if (true && !autopilot && score != 0){
            async function start(){
              try {
                //console.log('into');
                //console.log('done');
                return await octokit.request('POST /repos/skparab1/snake/issues', {
                    owner: 'skparab1',
                    repo: 'snake',
                    title: sendname,
                    body: senddata,
                  })
                } catch(error) {
                  notif = document.getElementById('notif');
                  notif.style.display = "block";
                  notif.innerHTML = '<h3 style="color:rgb(255, 255, 255);">Unable to write to database. Check your network connection. '+error+'</h3>';
                  //console.log('couldnt send');
                }
            };
            start();
          }
        })();
      } catch(error) {
        notif = document.getElementById('notif');
        notif.style.display = "block";
        notif.innerHTML = '<h3 style="color:rgb(255, 255, 255);">Unable to write to database. Check your network connection. '+error+'</h3>';

      }
      
      // this might be cool if we do it right
      // ok so basically draw the board but do it nicely
      (async () => {
        //snakeclr1 += "o7r9gGt";
        //snakeclr2 += "FFFA230";
        ctx.beginPath;
        ctx.fillStyle = bordercolor;

        let closer = document.getElementById('introducer');
        let closer1 = document.getElementById('introducer-cover');
        let closer2 = document.getElementById('credits');
        let closer3 = document.getElementById('snakestyle');

        closer.style.display = "none";
        closer1.style.display = "none";
        closer2.style.display = "none";
        closer3.style.display = "none";

        let endgame = 0;
        let bordereraser = 0;
        while (endgame <= bounderies[3] - (bounderies[3]-bounderies[1])/2){
          ctx.fillStyle = theme;
          ctx.fillRect(bounderies[0]-(height)/(boardSize+2), bounderies[1], -bordereraser, bounderies[3]-bounderies[1]);
          ctx.fillRect(bounderies[0], bounderies[1], bounderies[2]-bounderies[0], -bordereraser);
          ctx.fillRect(bounderies[2]+(height)/(boardSize+2), bounderies[1], bordereraser, bounderies[3]-bounderies[1]);
          //ctx.fillRect(bounderies[2], bounderies[3], bounderies[2]-bounderies[0], bordereraser);
          ctx.fillStyle = bordercolor;
          ctx.fillRect(bounderies[0]-(height)/(boardSize+2), bounderies[1]-(height)/(boardSize+2), bounderies[3]-bounderies[1]+2*(height)/(boardSize+2), endgame+(height)/(boardSize+2))
          ctx.fillRect(bounderies[0]-(height)/(boardSize+2), bounderies[1]+bounderies[3], bounderies[3]-bounderies[1]+2*(height)/(boardSize+2), -endgame)
          endgame += 4;
          bordereraser += 1;
          await sleep(endcurtainspeed);
        }

        displaydiv.style.display = "inline-block";
        displaydiv1.style.display = "inline-block";
        displaydiv2.style.display = "inline-block";
        
        leaderboard.style.color = "rgb(0,"+100+",0)";
        play_again.style.color = "rgb(0,"+100+",0)";
        play_again.style.bordercolor = "rgb(0,"+100+",0)";

        endgame = 0;
        while (endgame <= bounderies[3]-(height)/(boardSize+2)){
          ctx.fillStyle = pixelbackground2;
          ctx.fillRect(bounderies[0],bounderies[1],bounderies[2]-bounderies[0],bounderies[3]-bounderies[1]);
          
          play_again.style.color = "rgb(0,"+(100*endgame/(bounderies[3]-(height)/(boardSize+2))+100)+",0)";
          leaderboard.style.color = "rgb(0,"+(100*endgame/(bounderies[3]-(height)/(boardSize+2))+100)+",0)";

          ctx.fillStyle = bordercolor;
          ctx.fillRect(bounderies[0]-(height)/(boardSize+2), bounderies[1]+(bounderies[3]-bounderies[1])/2, bounderies[3]-bounderies[1]+2*(height)/(boardSize+2), bounderies[3]-endgame)
          ctx.fillRect(bounderies[0]-(height)/(boardSize+2), bounderies[1]+(bounderies[3]-bounderies[1])/2, bounderies[3]-bounderies[1]+2*(height)/(boardSize+2), -(bounderies[3]-endgame))
          endgame += 10;
          await sleep(endcurtainspeed);
        }
      
        endgame = 0;
        ctx.strokeStyle = 'rgb(0,0,0)';
        ctx.font = 64*scalefactor+"px Arial";
        ctx.lineWidth = '10px'; // NOT PX JUST INT
        while (endgame <= bounderies[3]/2+(height)/(boardSize+2)/2){
          ctx.fillStyle = pixelbackground2;
          ctx.fillRect(bounderies[0],bounderies[1],bounderies[2]-bounderies[0],bounderies[3]-bounderies[1]);
          //ctx.strokeRect(bounderies[0],bounderies[1]+(bounderies[3]-bounderies[1])/2-(height)/(boardSize+2),(bounderies[2]-bounderies[0])+(height)/(boardSize+2),2*(height)/(boardSize+2));
          ctx.fillStyle = 'rgb(0,0,0)';
          //ctx.fillText("GAME OVER!", bounderies[0]+(bounderies[2]-bounderies[0])/4-(height)/(boardSize+2), bounderies[1]+(bounderies[3]-bounderies[1])/2+(height)/(boardSize+2)*7/8); 
          ctx.fillStyle = bordercolor;
          ctx.fillRect(bounderies[0], bounderies[1]+(bounderies[3]-bounderies[1])/2-(height)/(boardSize+2),(bounderies[2]-bounderies[0])/2-endgame, (height)/(boardSize+2)*2);
          ctx.fillRect(bounderies[2], bounderies[1]+(bounderies[3]-bounderies[1])/2-(height)/(boardSize+2),-((bounderies[2]-bounderies[0])/2-endgame), (height)/(boardSize+2)*2);
          endgame += 10;
          await sleep(endcurtainspeed);
        }
        leaderboard.style.display = "block";
        play_again.style.display = "block";
        snakeclr += "";
        lost = true;
      })();
    },1500);
  })();
})();

(async () => {
window.addEventListener("keydown", function(event) {
  started = true;
  if (event.defaultPrevented) {
    return;
  }


  if (!startwaiter && (closedintro)){
      xd = speed;
      startwaiter = true;
      let z = document.getElementById('display');
      z.textContent = 'Start';
      fpslst = [];
      lastfps = Date.now();
      fpslst = [];
  }

  const ctx = canvas.getContext('2d');
  
  let actkey = event.code.replace('Key','')
  let filterletters = 'QWERTYUIOPASDFGHJKLZXCVBNM';
  //console.log('pressed'+actkey);

  if (lost && actkey == 'P' && closedintro){
    location.reload();
  }
  if (lost && actkey == "L" && closedintro){
    window.location.href = 'https://skparab1.github.io/snake/leaderboard.html';
  }

  // we only need 1 waiter
  if (actkey == 'ArrowLeft' || actkey == 'A'){
    waiter = 'left';
  }
  if (actkey == 'ArrowRight' || actkey == 'D'){
    waiter = 'right';
  }
  if (actkey == 'ArrowUp' || actkey == 'W'){
    waiter = 'up';
  }
  if (actkey == 'ArrowDown' || actkey == 'S'){
    waiter = 'down';
  }
  console.log(waiter);

  // this is direcct
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
})();
