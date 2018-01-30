var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

// Variables
var width = 800;
var height = 500;
canvas.width = width;
canvas.height = height;
var isLeft = false;
var isRight = false;
var isSpace = false;
var audioJump = new Audio('audio/Jump.mp3');
var audioCoin = new Audio('./audio/coin.wav');
var audioWorldClear = new Audio('./audio/world_clear.wav');
var score = 0;
var played = false;
var end = false;


//DrawElements
var player = new DrawElement("./img/Characters/1/Walk/1.png", canvas.width/2-60, 100, 65, 60);
player.Velocity_Y = 3;
player.Gravity = 20;
player.Weight = 0.1;
var playerJump = new Image();
playerJump.src = "./img/Characters/1/jump.png";


var playerSprite1 = new Image();
playerSprite1.src = "./img/Characters/1/Walk/2.png";
var playerSprite2 = new Image();
playerSprite2.src = "./img/Characters/1/Walk/3.png";
var playerSprite3 = new Image();
playerSprite3.src = "./img/Characters/1/Walk/4.png";

var playerSpriteArray = [player.Sprite, playerSprite1, playerSprite2, playerSprite3];

var block = new Array();
var diamond = new Array();


  //Start
  block[0] = new DrawElement("./img/OtherAssets/ground01.png", 320, 450, 80, 80);
  block[1] = new DrawElement("./img/OtherAssets/ground01.png", 400, 450, 80, 80);
  diamond[0] = new DrawElement("./img/Jewel/1.png", 640, 300, 40, 30);
  block[2] = new DrawElement("./img/OtherAssets/ground01.png", 620, 350, 80, 80);
  block[3] = new DrawElement("./img/OtherAssets/ground01.png", 860, 250, 80, 80);
  block[4] = new DrawElement("./img/OtherAssets/ground01.png", 1080, 450, 80, 80);
  diamond[1] = new DrawElement("./img/Jewel/1.png", 1380, 300, 40, 30);
  block[5] = new DrawElement("./img/OtherAssets/ground01.png", 1360, 350, 80, 80);
  block[6] = new DrawElement("./img/OtherAssets/ground01.png", 1600, 280, 80, 80);
  block[7] = new DrawElement("./img/OtherAssets/ground01.png", 1760, 350, 80, 80);
  block[8] = new DrawElement("./img/OtherAssets/ground01.png", 1932, 400, 80, 80);
  block[9] = new DrawElement("./img/OtherAssets/ground01.png", 2160, 280, 80, 80);
  diamond[2] = new DrawElement("./img/Jewel/1.png", 2380, 105, 40, 30);
  block[10] = new DrawElement("./img/OtherAssets/ground01.png", 2360, 155, 80, 80);
  block[11] = new DrawElement("./img/OtherAssets/ground01.png", 2560, 450, 80, 80);
  block[12] = new DrawElement("./img/OtherAssets/ground01.png", 2760, 350, 80, 80);
  diamond[3] = new DrawElement("./img/Jewel/1.png", 2980, 190, 40, 30);
  block[13] = new DrawElement("./img/OtherAssets/ground01.png", 2960, 240, 80, 80);
  block[14] = new DrawElement("./img/OtherAssets/ground01.png", 3160, 400, 80, 80);
  block[15] = new DrawElement("./img/OtherAssets/ground01.png", 3460, 350, 80, 80);
  block[16] = new DrawElement("./img/OtherAssets/ground01.png", 3620, 450, 80, 80);
  block[17] = new DrawElement("./img/OtherAssets/ground01.png", 3900, 380, 80, 80);
  block[18] = new DrawElement("./img/OtherAssets/ground01.png", 4100, 300, 80, 80);
  diamond[4] = new DrawElement("./img/Jewel/1.png", 4370, 230, 40, 30);
  block[19] = new DrawElement("./img/OtherAssets/ground01.png", 4350, 280, 80, 80);
  block[20] = new DrawElement("./img/OtherAssets/ground01.png", 4800, 450, 80, 80);
  block[21] = new DrawElement("./img/OtherAssets/ground01.png", 4880, 450, 80, 80);


var blocksCounter = block.length-1;
// DevIcons
var devicon_js = new DrawElement("./img/dev_icons/js.png", 630, 360, 60, 60)
var devicon_nodejs = new DrawElement("./img/dev_icons/nodejs.png", 1370, 360, 60, 60);
var devicon_angularjs = new DrawElement("./img/dev_icons/angularjs.png", 2370, 163, 180, 120);
var devicon_git = new DrawElement("./img/dev_icons/git.png", 2970, 250, 90, 90);
var devicon_meteor = new DrawElement("./img/dev_icons/meteor.png", 4450, 290, 90, 90);

var backG = new DrawElement("./img/Backgrounds/1.png", 0, 0, canvas.width, canvas.height)

// EVENTS 37 LEFT - 39 RIGHT - 32 SPACE
window.onkeydown = function(event) {
  var code = event.keyCode;

  if(code === 37) {
    isLeft = true;

  }
  if(code === 39) {
    isRight = true;

  }
  if(code === 32) {
    isSpace = true;

  }
}
window.onkeyup = function(event) {
  var code = event.keyCode;

  if(code === 37) {
    isLeft = false;

  }
  if(code === 39) {
    isRight = false;

  }
  if(code === 32) {
    isSpace = false;
  }
}

//Game Loop
function draw() {
  for(var i = 0; i <= blocksCounter; i++) {
    block[i].X -= player.Velocity_X;
  }

  for(var i = 0; i <= diamond.length-1; i++) {
    diamond[i].X -= player.Velocity_X;
  }

  player.Y += player.Velocity_Y;

  if(isLeft) {
    player.Velocity_X = -3;
  }
  if(isRight) {
    player.Velocity_X = 3;
  }
  if(!isLeft && !isRight) {
    player.Velocity_X = 0;
  }
  if(player.Velocity_Y < player.Gravity) {
    player.Velocity_Y += player.Weight;
  }

  for(var i = 0; i <= blocksCounter; i++) {
    if(player.isCollidingPlatform(block[i]) && player.Y + player.Height < block[i].Y + player.Velocity_Y) {
      player.Y = block[i].Y - player.Height;
      player.Velocity_Y = 0;
    }
  }



  if(isSpace && player.Velocity_Y === 0) {
    player.Velocity_Y = -5;
    audioJump.play();

  }


  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(backG.Sprite, backG.X, backG.Y, backG.Width, backG.Height);

  // console.log("X " + player.X)
  for(var i = 0; i <= blocksCounter; i++) {
    ctx.drawImage(block[i].Sprite, block[i].X, block[i].Y, block[i].Width, block[i].Height)
  }
  if(score === 0) {
    ctx.drawImage(diamond[0].Sprite, diamond[0].X, diamond[0].Y, diamond[0].Width, diamond[0].Height);

  }

  for(var i = 0; i < diamond.length-1; i++) {
    ctx.drawImage(diamond[i].Sprite, diamond[i].X, diamond[i].Y, diamond[i].Width, diamond[i].Height);

  }

    // ctx.drawImage(diamond[0].Sprite, diamond[0].X, diamond[0].Y, diamond[0].Width, diamond[0].Height);
    // ctx.drawImage(diamond[1].Sprite, diamond[1].X, diamond[1].Y, diamond[1].Width, diamond[1].Height);
    // ctx.drawImage(diamond[2].Sprite, diamond[2].X, diamond[2].Y, diamond[2].Width, diamond[2].Height);
    // ctx.drawImage(diamond[3].Sprite, diamond[3].X, diamond[3].Y, diamond[3].Width, diamond[3].Height);
    // ctx.drawImage(diamond[4].Sprite, diamond[4].X, diamond[4].Y, diamond[4].Width, diamond[4].Height);

  if(player.Velocity_Y !== 0) {
    ctx.drawImage(playerJump, player.X, player.Y, player.Width, player.Height);
  } else {
    ctx.drawImage(player.Sprite, player.X, player.Y, player.Width, player.Height)
  }

  //DevIcons
  ctx.drawImage(devicon_js.Sprite, block[2].X+11, devicon_js.Y+2, devicon_js.Width, devicon_js.Height);
  ctx.drawImage(devicon_nodejs.Sprite, block[5].X+11, devicon_nodejs.Y+2, devicon_nodejs.Width, devicon_nodejs.Height);
  ctx.drawImage(devicon_angularjs.Sprite, block[10].X-50, devicon_angularjs.Y-25, devicon_angularjs.Width, devicon_angularjs.Height);
  ctx.drawImage(devicon_git.Sprite, block[13].X-5, devicon_git.Y-10, devicon_git.Width, devicon_git.Height);
  ctx.drawImage(devicon_meteor.Sprite, block[19].X-5, devicon_meteor.Y-10, devicon_meteor.Width, devicon_meteor.Height);

  if(player.Y > 550) {
    document.location.reload();
  }

  for(var i = 0; i < diamond.length; i++) {
    if(player.isCollidingDiamond(diamond[i])) {
      diamond.splice(i, 1);
      audioCoin.play();
      score++;
    }
  }

  if(player.isCollidingPlatform(block[20] || block[21])) {
    end = true;
  }
  if(end) {
    ctx.font = "45px Righteous";
    ctx.fillStyle = "#283747";
    ctx.textAlign = "center";
    ctx.fillText("You Win !", canvas.width/2, canvas.height/2);
    if(!played){
      played = true;
      audioWorldClear.play();
    }
  }

  drawScore();
  //Refresh
  requestAnimationFrame(draw);
};

draw();

//DrawElement Constructor
function DrawElement(img, x, y, width, height) {
  this.Sprite = new Image();
  this.Sprite.src = img;
  this.X = x;
  this.Y = y;
  this.Width = width;
  this.Height = height;
  this.Previous_X;
  this.Previous_Y;
  this.Velocity_X = 0;
  this.Velocity_Y = 0;
  this.Gravity = 0;
  this.Weight = 0;

  // Collision Check
  this.isCollidingPlatform = function(obj) {

    if(this.X+25 > obj.X + obj.Width) {
      return false;
    }

    if(this.X-25 + this.Width < obj.X ) {
      return false;
    }

    if(this.Y > obj.Y + obj.Height) {
      return false;
    }

    if(this.Y + this.Height < obj.Y) {
      return false;

    } else {
      return true;

    }

  }
  this.isCollidingDiamond = function(obj) {

    if(this.X > obj.X + obj.Width) {
      return false;
    }

    if(this.X + this.Width < obj.X ) {
      return false;
    }

    if(this.Y > obj.Y + obj.Height) {
      return false;
    }

    if(this.Y + this.Height < obj.Y) {
      return false;

    } else {
      return true;

    }

  }

}

function drawScore() {
    ctx.font = "22px Righteous";
    ctx.fillStyle = "#283747";
    ctx.textAlign = "center";
    ctx.fillText("Score:  " + score + "  !", canvas.width/2, 50);
}
