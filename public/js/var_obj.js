//Compatibilité requestAnimationFrame
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

const canvas = document.getElementById('canvas')
const ctx =  canvas.getContext('2d');
var backGLoaded = false;
var posXGround = 0;
var count = 0;
var animationLength = 3;
var jumpSwitch = false;
var walkMovement = false;
var jumpSprite = false;
var jumpMovement = false;
var playerYSnapshot = canvas.height-55;


// Canvas Size
var width = 1200;
var height = 600;
canvas.width = width;
canvas.height = height;


// BackGround
var backG = new Image();
backG.src = "././img/Backgrounds/1.png";
backG.width = canvas.width;
backG.height = canvas.height;

//Load background before displaying
backG.onload = function() {

  return backGLoaded = true;
}

// Player Sprite#1
var player1 = {
  x : canvas.width/4,
  y : canvas.height-55,
  width : 90,
  height : -80,
  img : new Image()
}
player1.img.src = "././img/Characters/1/Walk/1.png";

// Player Sprite#2
var player2 = {
  img : new Image()
}
player2.img.src = "././img/Characters/1/Walk/2.png";

// Player Sprite#3
var player3 = {
  img : new Image()
}
player3.img.src = "././img/Characters/1/Walk/3.png";

// Player Sprite#4
var player4 = {
  img : new Image()
}
player4.img.src = "././img/Characters/1/Walk/4.png";

// Player jumpSprite
var playerJump = {
  img : new Image()
}
playerJump.img.src = "././img/Characters/1/jump.png";

// Ground
var ground = {
  x : 0,
  y : canvas.height,
  width : 60,
  height : -61,
  img : new Image()
}
 ground.img.src = "././img/OtherAssets/ground01.png";

 var airPlatform = {
   x: 10,
   y: 50,
   width: 269,
   height: 123,
   img: new Image()
 }
 airPlatform.img.src = "././img/OtherAssets/AirPlatform01.png";
