//IronPong JS

var ctx = document.getElementById("main-game").getContext("2d");
ctx.width = 600;
ctx.height = 400;

// variables

let speed = 50;
let playerOneScore = 0;
let playerTwoScore = 0;
var isPlaying; 
let endGameScore = 3;
let ballRadius = 10;
var isPlaying;

class Player {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  // Move Player function

  movePlayer = (direction, value) => {
    this[direction] += value;
  };
}

class Ball {
  constructor(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dy = dy;
    this.dx = dx;
    this.radius = radius;
  }

  moveBall() {
    this.x -= this.dx * 1.5;
    this.y -= this.dy * 1.5;
  }
}

// Draw Function

function draw(u, object) {
  if (object === "ball") {
    ctx.beginPath();
    ctx.arc(u.x, u.y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
  }
  if (object === "player") {
    ctx.fillStyle = "black";
    ctx.fillRect(u.x, u.y, u.width, u.height);
  }

  // Restart ball and keep score
  if (theGame.theBall.x < 0) {
    //   stop()
    playerTwoScore += 1;
    document.querySelector(".player2 > span").innerText = playerTwoScore;
    theGame.theBall = new Ball(50, 200, -2, 2, 10, 10);
    // startGame();
  }
  if (theGame.theBall.x > 600) {
    //   stop()
    playerOneScore += 1;
    document.querySelector(".player1 > span").innerText = playerOneScore;

    theGame.theBall = new Ball(550, 200, 2, -2, 10, 10);
    // startGame();
  }
  if (object === "player" && theGame.thePlayer2.y < 0) {
    theGame.thePlayer2.y = 0;
  }

  if (object === "player" && theGame.thePlayer2.y > 330) {
    theGame.thePlayer2.y = 340;
  }

  if (object === "player" && theGame.thePlayer.y < 0) {
    theGame.thePlayer.y = 0;
  }

  if (object === "player" && theGame.thePlayer.y > 330) {
    theGame.thePlayer.y = 340;
  }
}

// Main Loop - runs animation, draws players

let speed2 = 1;

function mainLoop() {
  //   frames++;
  //console.log("clearRect has occured");
  ctx.clearRect(0, 0, ctx.width, ctx.height);
  draw(theGame.thePlayer, "player");
  draw(theGame.thePlayer2, "player");
  draw(theGame.theBall, "ball");
  theGame.theBall.moveBall();
  theGame.collisionDetection(theGame.theBall.x, theGame.theBall.y);
  gameOver();

  if (isPlaying === true) {
    requestId = requestAnimationFrame(mainLoop);
  }
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
  if (e.key === " ") {
    stop();
  }
}

//https://stackoverflow.com/questions/5203407/how-to-detect-if-multiple-keys-are-pressed-at-once-using-javascript

var map = {}; // You could also use an array
onkeydown = onkeyup = function(e) {
  e = e || event; // to deal with IE
  map[e.key] = e.type == "keydown";
  /* insert conditional here */
  console.log(map);
  for (let k in map) {
    if (map[k]) {
      gameControls({ key: k });
    }
  }
};

function stop() {
  isPlaying = false;

  /// kill any request in progress
  if (mainLoop) cancelAnimationFrame(mainLoop);
}

//here is where all the classes are called to create the game
class Game {
  constructor() {
    this.thePlayer = new Player(20, 180, 20, 60); //left of screen
    this.thePlayer2 = new Player(560, 180, 20, 60); //right of screen
    this.theBall = new Ball(70, 200, 2, -2, ballRadius);
  }

  collisionDetection(futureX, futureY) {
    console.log(this.theBall);
    console.log(futureX);
    console.log(this.thePlayer.x);
    console.log(this.thePlayer.width);
    if (
      futureX < this.thePlayer.x + this.thePlayer.width + this.theBall.radius * 1.2 &&
      futureX + this.theBall.radius > this.thePlayer.x &&
      futureY < this.thePlayer.y + this.thePlayer.height &&
      futureY + this.theBall.radius > this.thePlayer.y
    ) {
      //   console.log("collided with player 1");
      this.theBall.dx *= -1;
    } else if (
      futureX < this.thePlayer2.x + this.thePlayer2.width &&
      futureX + this.theBall.radius > this.thePlayer2.x &&
      futureY < this.thePlayer2.y + this.thePlayer2.height &&
      futureY + this.theBall.radius > this.thePlayer2.y
    ) {
      this.theBall.dx *= -1;
    } else if (this.theBall.y < 0 || this.theBall.y > 400) this.theBall.dy *= -1;
  }
}

//Game Over function

function gameOver() {
  if (playerOneScore === endGameScore) {
    message = "Player 1 Wins!";
    document.getElementById("gameNotifcation").innerText = message;
    setTimeout(function() {
        location.reload(true);
      }, 1800);

  }

  if (playerTwoScore === endGameScore) {
    message = "Player 2 Wins!";
    document.getElementById("gameNotifcation").innerText = message;
    setTimeout(function() {
      location.reload(true);
    }, 1800);
  }

}

//Start Button

document.getElementById("start-game").onclick = startGame;
let theGame;

function startGame() {
    isPlaying = true;
    theGame = new Game();
    mainLoop();
}
