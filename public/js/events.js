window.onkeydown = function(event) {
  var code = event.keyCode;
  // 32 spacebar -- 87 W

  //Right Key
  if(code === 39) {
     if(!walkMovement) {
       walkMovement = true;
        animation = window.setInterval(function() {

         //walking animation counter
         count++;
         count %= animationLength;

         //collision canvas
         if(player1.x > (canvas.width - canvas.width/10)) {
           player1.x = (canvas.width - canvas.width/10) + 16;
         } else {
           //Déplacement
           player1.x += 16;

         }


       }, 40)



      }//(!movement)


    }//(code === 39)

    //Left
    if(code === 37) {
      if(!walkMovement) {
        walkMovement = true;
      //  animationSwitch = true;

        animation = window.setInterval(function() {

          //animation
          count++;
          count %= animationLength;

          //collision canvas
          if(player1.x < 0 + 16) {
            player1.x = -10
          } else {
           //Déplacement
            player1.x -= 16

          }

        }, 40)
    }
  }//(code === 37)

  //Spacebar Key
  if(code === 32) {
    if(!jumpMovement) {

      playerYSnapshot = player1.y;
      jumpMovement = true;

      jumpAnimation = window.setInterval(function() {
        jumpSprite = true;
        // Jump UP
        if((playerYSnapshot - canvas.height/3) <= player1.y && !jumpSwitch) {
          player1.y -= 12
          console.log(playerYSnapshot + " " + player1.y)
        }// Stop jump UP
        else if(jumpSwitch) {
          clearInterval(jumpAnimation);
        }

      }, 20)
    }

  }


  window.onkeyup = function(event) {
    var code = event.keyCode;

    // Left or Right key
    if(code === 37 || code === 39) {
      clearInterval(animation)
      count = 0;
      walkMovement = false;
    }
    //Spacebar Key
    if(code === 32) {
      jumpSwitch = true;
      //Jump Down
      jumpAnimation2 = window.setInterval(function() {

        player1.y += 12

        //Stop jump Down + Reset
        if(player1.y > canvas.height-55) {
          clearInterval(jumpAnimation2);
          player1.y = canvas.height-55;
          jumpSprite = false;
          jumpMovement = false;
          jumpSwitch= false;
          count = 0;

        }

      }, 30)

    }

  }
}
