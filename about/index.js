// hehe
(async () => {
  let counter = -50;
  const sleep = ms => new Promise(res => setTimeout(res, ms));

  // def all teh consts
  let h1 = document.getElementById('header1');
  let h2 = document.getElementById('header2');
  let h3 = document.getElementById('header3');
  let h4 = document.getElementById('header4');
  let title = document.getElementById('title');
  let nav = document.getElementById('nav1');
  let head = document.getElementById('head');
  let pac = document.getElementById('pac');
  let lbtn = document.getElementById('lbuttons');
  let rbtn = document.getElementById('rbuttons');
  let htop = head.offsetTop;
  while (counter <= 100){
    let cl = (counter/100)*255;
    let cl2 = cl*2-255/2;
    let dimclr = 'rgb('+cl+','+cl+','+cl+')';
    let dimclr2 = 'rgb('+cl2+','+cl2+','+cl2+')';

    // header fade
    h1.style.color = dimclr;
    h2.style.color = dimclr;
    h3.style.color = dimclr;
    h4.style.color = dimclr;
    title.style.color = dimclr;
    nav.style.borderColor = dimclr;
    pac.style.opacity = counter/100;
    lbtn.style.opacity = counter*2/100;
    rbtn.style.opacity = counter*2/100;

    head.style.color = dimclr2;

    await sleep(2);
    if (counter <= 100){
      counter = counter + (105-counter)/100;
    }
  }
})();

const sleep = ms => new Promise(res => setTimeout(res, ms));
(async () => {
  let componentlst = ['devs','fft','i1','d1','d1.5','i2','d2','d2.5','i3','d3','d3.5','i4','d4','d4.5','i5','d5','d5.5','i6','d6','d6.5','i7','d7','d7.5','i8','d8','d8.5','i9','d9','d9.5'];
  var clrs = [211,255,'opac',255,211,'opac',255,211,'opac',255,211,'opac',255,211,'opac',255,211,'opac',255,211,'opac',255,211,'opac',255,211,'opac',255,211];
  var gotcomponenets = [];
  let g = 0;
  while (g < gotcomponenets.length){
    gotcomponenets.push(false);
    g += 1;
  }
  while (true){
    let c = 0;
    while (c < componentlst.length){
      el = document.getElementById(componentlst[c]);
      console.log(window.scrollY+window.innerHeight, el.offsetTop, c);
      if (window.scrollY+window.innerHeight-50 >= el.offsetTop && !gotcomponenets[c]){
        fadein(componentlst[c],clrs[c]);
        gotcomponenets[c] = true;
      }
      c += 1;
    }
    await sleep(2);
  }
})();

function fadein(id,l){
  console.log('faded',id);
  (async () => {
    let counter2 = -50;
    const sleep = ms => new Promise(res => setTimeout(res, ms));
  
    // def all teh consts
    let idx = document.getElementById(id);
    while (counter2 <= 100){
      let cl = (counter2/100)*l;
      let dimclr = 'rgb('+cl+','+cl+','+cl+')';
  
      // header fade
      if (l == 'opac'){
        idx.style.opacity = counter2/100;
      } else {
        idx.style.color = dimclr;
      }
  
      await sleep(2);
      if (counter2 <= 100){
        counter2 = counter2 + (105-counter2)/100;
      }
    }
  })();
}