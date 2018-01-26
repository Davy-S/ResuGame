function draw() {

  if(backGLoaded) {

    //Background
    ctx.drawImage(backG, 0, 0, backG.width, backG.height)

    //Air platform

    ctx.drawImage(airPlatform.img, 600, 400, airPlatform.width, airPlatform.height)


    if(jumpSprite) {
      ctx.drawImage(playerJump.img, player1.x, player1.y, player1.width, player1.height)
    }
    // count -> events.js
    else if(count === 0) {
      //Player
      ctx.drawImage(player1.img, player1.x, player1.y, player1.width, player1.height)
    }
    else if(count === 1) {
      ctx.drawImage(player2.img, player1.x, player1.y, player1.width, player1.height)
    }
    else if(count === 2) {
      ctx.drawImage(player3.img, player1.x, player1.y, player1.width, player1.height)
    }
    else if(count === 3) {
      ctx.drawImage(player4.img, player1.x, player1.y, player1.width, player1.height)
    }

    //Test hitbox
    ctx.fillStyle = 'red';
    ctx.fillRect(600, 300, ground.width*3, ground.height);



    //Ground Loop
    for (posXGround = 0; posXGround < canvas.width; posXGround+= ground.width) {

      ctx.drawImage(ground.img, ground.x+posXGround, ground.y, ground.width, ground.height)
   }
 }




  // Refresh
  requestAnimationFrame(draw)

}


draw()
