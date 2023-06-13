// Author: Hoang Tran (https://fb.com/99.hoangtran)

// Github verson (1 file .html): https://github.com/HoangTran0410/3DCarousel/blob/master/index.html

// Give me a coffee <3 https://github.com/HoangTran0410/HoangTran0410/blob/main/DONATE.md


// You can change global variables here:
var radius = 1190; // how big of the radius
var perspective = 5000;
var autoRotate = false; // auto rotate or not
var rotateSpeed = -60; // unit: seconds/360 degrees
var multiplier = 1.1
var imgWidth = 120*multiplier; // width of images (unit: px)
var imgHeight = 170*multiplier; // height of images (unit: px)
// var imgWidth = 206; // width of images (unit: px)
// var imgHeight = 354; // height of images (unit: px)

// Link of background music - set 'null' if you dont want to play background music
var bgMusicURL = 'https://api.soundcloud.com/tracks/143041228/stream?client_id=587aa2d384f7333a886010d5f52f302a';
var bgMusicControls = true; // Show UI music control

/*
     NOTE:
       + imgWidth, imgHeight will work for video
       + if imgWidth, imgHeight too small, play/pause button in <video> will be hidden
       + Music link are taken from: https://hoangtran0410.github.io/Visualyze-design-your-own-/?theme=HauMaster&playlist=1&song=1&background=28
       + Custom from code in tiktok video  https://www.facebook.com/J2TEAM.ManhTuan/videos/1353367338135935/
*/


// ===================== start =======================
// animation start after 1000 miliseconds
setTimeout(init, 1000);

var odrag = document.getElementById('drag-container');
odrag.style.animation = `zoomDown 15s linear`;

var ospin = document.getElementById('spin-container');
// var aImg = ospin.getElementsByTagName('img');
var aImg = ospin.getElementsByClassName('card');
var aVid = ospin.getElementsByTagName('video');
var aEle = [...aImg, ...aVid]; // combine 2 arrays
var aEle_array = Array(aEle.length).fill(0);
var initial_hide = 11
for (var i = 0; i < initial_hide; i++) {
  aEle_array[i] = 1
  aEle_array[aEle.length-1-i] = 1
}

// var aEle_array = [1,1,0,0,0,1]
// var aEle_array = [1,1,1,0,0,0,0,0,0,0,0,0,0,1]
var show_count = aEle.length - 2;
var next_angle = -68;     //IMPORTANT
var prev_angle = next_angle + 360/aEle.length;

var next_angle_hide = 68;   //IMPORTANT
var prev_angle_hide = next_angle_hide - 360/aEle.length;
var hide_count = 3 ;

// Size of images
ospin.style.width = imgWidth + "px";
ospin.style.height = imgHeight + "px";

// Size of ground - depend on radius
var ground = document.getElementById('ground');
ground.style.width = radius * 3 + "px";
ground.style.height = radius * 3 + "px";

var scale = 0;

function init(delayTime) {
  // odrag.style.animation = `zoomDown 14s linear`;
  // odrag.classList.add('drag-container-init');


  for (var i = 0; i < aEle.length; i++) {
    aEle[i].querySelector('.front').classList.add('show');
    aEle[i].querySelector('.back').classList.add('show');
    // aEle[i].src = "back.jpg"
  }
  for (var i = 0; i < aEle.length; i++) {
    aEle[i].style.transform = "rotateY(" + (i * (360 / aEle.length)) + "deg) translateZ(" + radius + "px)";
    // aEle[i].style.transform = "rotateY(" + (i * (360 / 2)) + "deg) translateZ(" + radius + "px)";
    aEle[i].style.transition = "transform 1s";
    aEle[i].style.transitionDelay = delayTime || (aEle.length - i) / 4 + "s";
  }

  for (var i = 0; i < aEle.length; i++) {
    aEle[i].classList.add('card_after');
  }
  checkFace();

}

function init_mouse(delayTime) {

  for (var i = 0; i < aEle.length; i++) {
    aEle[i].style.transform = "rotateY(" + (i * (360 / aEle.length)) + "deg) translateZ(" + radius + "px)";
    // aEle[i].style.transform = "rotateY(" + (i * (360 / 2)) + "deg) translateZ(" + radius + "px)";
    aEle[i].style.transition = "transform 1s";
    aEle[i].style.transitionDelay = delayTime || (aEle.length - i) / 4 + "s";
  }
}

function applyTranform(obj) {
  // Constrain the angle of camera (between 0 and 180)
  if(tY > 15) tY = 15;
  if(tY < 1) tY = 1;

  // Apply the angle
  // obj.style.transform = "rotateX(" + (-tY) + "deg) rotateY(" + (tX) + "deg)";
  obj.style.transform = "rotateX(" + (-tY) + "deg) rotateY(" + (tX) + "deg)";
  // console.log(tY)
}

function checkFace() {
  if(Math.abs(tX) >= 360) tX = 0;

  console.log("Next angle: " + next_angle + " | show count: " + show_count + " | Prev angle: " + prev_angle)
  console.log("Next angle_hide: " + next_angle_hide + " | hide count: " + hide_count + " | Prev angle_hide: " + prev_angle_hide)
  console.log("Tx: " + tX)
  console.log("--------------------------------------------------------")

  if(tX <= next_angle){
    aEle_array[show_count] = 0
    show_count +=1
    if (show_count == aEle.length) show_count = 0

    prev_angle = next_angle
    next_angle -= 360/aEle.length
  }

  if (tX > prev_angle){
    show_count -=1
    if (show_count == -1) show_count = aEle.length - 1

    aEle_array[show_count] = 1

    next_angle = prev_angle
    prev_angle += 360/aEle.length

  }

  if(tX <= prev_angle_hide){
    aEle_array[hide_count] = 1
    hide_count +=1
    if (hide_count == aEle.length) hide_count = 0



    next_angle_hide = prev_angle_hide
    prev_angle_hide -= 360/aEle.length
  }

  if (tX > next_angle_hide){
    hide_count -=1
    if (hide_count == -1) hide_count = aEle.length - 1

    aEle_array[hide_count] = 0

    prev_angle_hide = next_angle_hide
    next_angle_hide += 360/aEle.length


  }

  for (var i = 0; i < aEle.length; i++) {
    if(aEle_array[i] == 0 ){
      aEle[i].querySelector('.front').classList.remove('show');
      aEle[i].querySelector('.back').classList.add('show');
    }
    else{
      aEle[i].querySelector('.front').classList.add('show');
      aEle[i].querySelector('.back').classList.remove('show');
    }
  }
}

function checkFace_old() {
  if(Math.abs(tX) >= 360) tX = 0;


  if(Math.abs(tX) <= 90 || Math.abs(tX) >=270){
    for (var i = 0; i < aEle.length; i++) {
      aEle[i].querySelector('.front').classList.add('show');
      aEle[i].querySelector('.back').classList.remove('show');
    }
  }
  else {
    for (var i = 0; i < aEle.length; i++) {
      aEle[i].querySelector('.front').classList.remove('show');
      aEle[i].querySelector('.back').classList.add('show');
      // aEle[i].src = "back.jpg"
    }
  }
}

function playSpin(yes) {
  ospin.style.animationPlayState = (yes?'running':'paused');
}

var sX, sY, nX, nY, desX = 0,
    desY = 0,
    tX = 0,
    tY = 7;

// auto spin
if (autoRotate) {
  var animationName = (rotateSpeed > 0 ? 'spin' : 'spinRevert');
  ospin.style.animation = `${animationName} ${Math.abs(rotateSpeed)}s infinite linear`;
}

// // add background music
// if (bgMusicURL) {
//   document.getElementById('music-container').innerHTML += `
// <audio src="${bgMusicURL}" ${bgMusicControls? 'controls': ''} autoplay loop>
// <p>If you are reading this, it is because your browser does not support the audio element.</p>
// </audio>
// `;
// }

// setup events
document.onpointerdown = function (e) {
  clearInterval(odrag.timer);
  e = e || window.event;
  var sX = e.clientX,
      sY = e.clientY;

  this.onpointermove = function (e) {
    e = e || window.event;
    var nX = e.clientX,
        nY = e.clientY;
    desX = nX - sX;
    desY = nY - sY;
    tX += desX * 0.05;
    tY += desY * 0.01;
    // console.log(tX);
    checkFace();
    applyTranform(odrag);
    sX = nX;
    sY = nY;
  };

  this.onpointerup = function (e) {
    odrag.timer = setInterval(function () {
      desX *= 0.95;
      desY *= 0.95;
      tX += desX * 0.05;
      tY += desY * 0.01;
      // console.log(tX);
      checkFace();
      applyTranform(odrag);
      playSpin(false);
      if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
        clearInterval(odrag.timer);
        playSpin(true);
      }
    }, 17);
    this.onpointermove = this.onpointerup = null;
  };

  return false;
};

document.onmousewheel = function(e) {


  event.preventDefault(); // prevent scrolling the page

  e = e || window.event;
  var d = e.wheelDelta / 20 || -e.detail;

  var max_scale = 4;

  // var zoomContainer = document.body2;
  var zoomContainer = document.getElementById('body2');


  // tY += d*1;
  // if(tY < 1) tY = 1;
  var new_x = -d*0.08;
  // if (new_x < 1) new_x =1;
  tY += new_x
  if (tY < 2) tY = 2
  if (tY > 30) tY = 30

  // odrag.style.transform = "rotateX(" + (-tY) + "deg)";
  odrag.style.transform = "rotateX(" + (-tY) + "deg) rotateY(" + (tX) + "deg)";

  console.log("new_x: " + new_x)


  // radius += d*15;
  if (radius < 1180) {radius = 1180}
  if (radius > 2300) {radius = 2300}
  else {
    // init(1);
    console.log(radius)

    var perspective = parseInt(document.body.style.perspective) || 180; // get the current perspective or use the default value
    var delta = Math.max(-1, Math.min(1, (event.deltaY || -event.wheelDelta))); // get the scroll direction
    perspective += delta * 20; // change the perspective by 1000 units per scroll step
    console.log("Perspective: " + perspective)
    console.log("radius " + radius)
    if (perspective < 140 ) perspective = 140;
    // if (perspective > 1200 ) perspective = 1200;
    // if (perspective > 3000 ) perspective = 3000;
    document.body.style.perspective = perspective + "em"; // update the perspective of the body element

  }

  // console.log("screen WIDTH: " + document.documentElement.clientWidth)

  // if (document.documentElement.clientWidth < 1100){
  //   console.log("hello")
  //   scale += d*0.005;
  //   if (scale >1) {scale = 1}
  //   if (scale < 0) {scale = 0}
  //   console.log("scale: " + scale)
  //   var current_scale = max_scale*scale + 1

  //   zoomContainer.style.transform = `scale(${current_scale})`;
  // }

};

// while (1==1){
//   // var el = document.getElementById("i-am-rotated");
//   //
//   //
//   // var st = window.getComputedStyle(el);
//   //
//   // var tr = st.getPropertyValue("-webkit-transform") ||
//   //     st.getPropertyValue("-moz-transform") ||
//   //     st.getPropertyValue("-ms-transform") ||
//   //     st.getPropertyValue("-o-transform") ||
//   //     st.getPropertyValue("transform") ||
//   //     "Either no transform set, or browser doesn't do getComputedStyle";
//   console.log(tX);
// }