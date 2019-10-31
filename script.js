//IronPong JS

var ctx = document.getElementById("main-game").getContext("2d");
ctx.width = 600;
ctx.height = 400;

// variables
let keys = [];
let speed = 30;
let playerOneScore = 0;
let playerTwoScore = 0;
class Player {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.score = 0;
  }

  // Move Player function

  movePlayer = (direction, value) => {
    this[direction] += value;
    console.log(this);
  };

  
}


class Ball {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  moveBall() {
    setInterval(() => {
      this.x -= 2;
        
    }, 1000);
    if (this.x === 0 || this.x === 600) {
        clearInterval();
      }
  }
}

// Draw Function

function draw(u, object) {
  if (object === "ball") {
    ctx.beginPath();
    ctx.arc(u.x, u.y, 10, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
  }
  if (object === "player") {
    ctx.fillStyle = "black";
    ctx.fillRect(u.x, u.y, u.width, u.height);
  }
  
  if(theGame.theBall.x<0 ){
      
   playerTwoScore += 1;
   document.querySelector('.player2 > span').innerText = playerTwoScore;
    theGame.theBall.x += 5;
    startGame();
}
 if(theGame.theBall.x>600){
     theGame.theBall.x -= 305;

   playerOneScore += 1;
   document.querySelector('.player1 > span').innerText = playerOneScore;
     startGame();
 }
}

// Main Loop - runs animation, draws players

function mainLoop() {
  frames++;
  console.log("clearRect has occured");
  ctx.clearRect(0, 0, 600, 400);
  draw(theGame.thePlayer, "player");
  draw(theGame.thePlayer2, "player");
  draw(theGame.theBall, "ball");
  theGame.theBall.moveBall();

  requestAnimationFrame(mainLoop);
}


// Paddle controls

function gameControls(e) {
  if (e.key === "ArrowUp") {
    theGame.thePlayer2.movePlayer("y", -speed);
  }
  if (e.key === "ArrowDown") {
    theGame.thePlayer2.movePlayer("y", +speed);
  }
  if (e.key === "a" || e.key === "A") {
    theGame.thePlayer.movePlayer("y", -speed);
  }
  if (e.key === "z" || e.key === "Z") {
    theGame.thePlayer.movePlayer("y", +speed);
  }
}
// function update() {
//   if (keys[38]) {
//     theGame.thePlayer2.movePlayer("y", -speed);
//   }
//   if (keys[40]) {
//     theGame.thePlayer2.movePlayer("y", +speed);
//   }
//   if (keys[65]) {
//     theGame.thePlayer.movePlayer("y", -speed);
//   }
//   if (keys[90]) {
//     theGame.thePlayer.movePlayer("y", +speed);
//   }
// }

// document.onkeypress = gameControls;
document.onkeydown = gameControls;
// document.body.addEventListener("keydown", function(e) {
//   keys[e.keyCode] = true;
// });
// document.body.addEventListener("keyup", function(e) {
//   keys[e.keyCode] = false;
// });
//here is where all the classes are called to create the game
class Game {
  constructor() {
    this.thePlayer = new Player(20, 180, 20, 60);
    this.thePlayer2 = new Player(560, 180, 20, 60);
    this.theBall = new Ball(300, 200, 10, 10);
  }

}

//Game Over function

function gameOver(){
    if(playerOneScore===10){
        message = "Player 1 Wins!"
        document.getElementById('gameNotifcation').innerText = message;
        // alert(message);
    }

    if(playerTwoScore===2){
        
      message = "Player 2 Wins!"
      document.getElementById('gameNotifcation').innerText = message;
      
      setTimeout(function(){ location.reload(true) }, 1000);
  }
  }

//Start Button

document.getElementById("start-game").onclick = startGame;
let theGame;

function startGame() {
  theGame = new Game();
  mainLoop();
  gameOver();
}
