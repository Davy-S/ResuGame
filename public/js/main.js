//Compatibilité requestAnimationFrame
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

const canvas = document.getElementById('canvas')
const ctx =  canvas.getContext('2d');
var backGLoaded = false;
var groundLoaded = false;
var playerLoaded = false;
var posX = 0;

// Canvas Size
var width = 900;
var height = 600;
canvas.width = width;
canvas.height = height;


// BackGround
var backG = new Image();
backG.src = "././img/Backgrounds/1.png";

  backG.onload = function() {
    ctx.drawImage(backG, 0, 0)
}

// Player
var player = {
  x : canvas.width/4,
  y : canvas.height-55,
  width : 90,
  height : -80,
  img : new Image()
}
player.img.src = "././img/Characters/1/Walk/1.png"

// Ground
var ground = {
  x : 0,
  y : canvas.height,
  width : 60,
  height : -61,
  img : new Image()
}
 ground.img.src = "././img/OtherAssets/ground01.png"

// Game Loop
function draw() {
  //Load order 1
  backG.onload = function() {

    return backGLoaded = true;
  }
  //BackGround
  if(backGLoaded) {

    ctx.drawImage(backG, 0, 0)
  }
  // Player
  player.img.onload = function() {

    return playerLoaded = true;
  }
  // Load order 2
  if(playerLoaded && backGLoaded) {

    ctx.drawImage(player.img, player.x, player.y, player.width, player.height)
  }
  // Ground
  ground.img.onload = function() {

    return groundLoaded = true;
  }

  // Load order 3
  if(groundLoaded && playerLoaded && backGLoaded) {

    for (posX = 0; posX < canvas.width; posX+= ground.width) {

      ctx.drawImage(ground.img, ground.x+posX, ground.y, ground.width, ground.height)
     }
  }

  

  // refresh 60fps
  requestAnimationFrame(draw)
}

draw()
