//IronPong JS

var ctx = document.getElementById("game-board").getContext("2d");
ctx.width = 600;
ctx.height = 400;

// console.log('connected')

// variables

let paddleSpeed = 50;
let playerOneScore = 0;
let playerTwoScore = 0;
let isPlaying;
let endGameScore = 3;
let ballRadius = 5;
let ballSpeed = 2;
let theme = document.querySelector('#title > input').value;
let player1name = document.querySelector('#player1 > #name').innerText;
let player2name = document.querySelector('#player2 > #name').innerText

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
    this.x -= this.dx * ballSpeed;
    this.y -= this.dy * ballSpeed;
  }
}

const ballImg = new Image();
ballImg.src = `./images/${theme}.png`;

// const soccerballImg = new Image();
// soccerballImg.src = "./images/soccerball.png";

// Draw Function
function draw(u, object) {
  if (object === "ball") {
    // ctx.beginPath();
    // ctx.arc(u.x, u.y, ballRadius, 0, Math.PI * 2);
    // ctx.fillStyle = "red";
    // ctx.fill();
    // ctx.closePath();
    ctx.drawImage(ballImg, u.x, u.y, 15, 15);
  }

  if (object === "player") {
    ctx.fillStyle = "black";
    ctx.fillRect(u.x, u.y, u.width, u.height);
  }

  // Restart ball and keep score
  if (theGame.theBall.x < 0) {
    //   stop()
    playerTwoScore += 1;
    document.querySelector('.player-card #player2 #player-score span').innerText = playerTwoScore;
    furyscore.play();

    message = `${player2name} Scores!`;
    document.getElementById("game-notification").innerHTML = message;
    theGame.theBall = new Ball(50, 200, -2, 2, 10, 10);
    // startGame();
  }


//  // Restart ball and keep score
//  if (theGame.theBall.x < 0 && theGame.theBall.x > -3) {
//     playerTwoScore += 0.5;
//     document.querySelector(".player2 > span").innerText = playerTwoScore;
//     message = `${player2name} Scores!`;
//     document.getElementById("game-notification").innerHTML = message;
    
//     theGame.theBall.x += 0.5;
//     theGame.theBall.dx = 0;

//     setTimeout(function() {
//       // document.querySelector(".player2 > span").innerText = playerTwoScore;
//       theGame.thePlayer = new Player(20, 180, 10, 60);
//       theGame.thePlayer2 = new Player(560, 180, 10, 60);
//       theGame.theBall = new Ball(50, 200, -2, 2, 10, 10);
//     }, 1000);
//   }


  if (theGame.theBall.x > 600) {
    //   stop()
    playerOneScore += 1;
    document.querySelector('.player-card #player1 #player-score span').innerText = playerOneScore;
    backhand.play();

    message = `${player1name} Scores!`;
    document.getElementById("game-notification").innerHTML = message;
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
    theGame.thePlayer2.movePlayer("y", -paddleSpeed);
  }
  if (e.key === "ArrowDown") {
    theGame.thePlayer2.movePlayer("y", +paddleSpeed);
  }
  if (e.key === "a" || e.key === "A") {
    theGame.thePlayer.movePlayer("y", -paddleSpeed);
  }
  if (e.key === "z" || e.key === "Z") {
    theGame.thePlayer.movePlayer("y", +paddleSpeed);
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
//   console.log(map);
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

// Play audio Function

var bounce = new Audio('./sounds/bounce.mp3');
var buzzer = new Audio('./sounds/buzzer.mp3');
var shaq = new Audio('./sounds/Shaq.m4a');
var score = new Audio('./sounds/score.m4a');
var kick = new Audio('./sounds/kick.m4a');
var goal = new Audio('./sounds/Goal4.mov');
var kg = new Audio('./sounds/kg2.mov');
var win = new Audio('./sounds/win.mp3');
var classic = new Audio('./sounds/Beep2.wav');
var furyscore = new Audio('./sounds/fury2.mov');
var furywin = new Audio('./sounds/furywin.mov');
var pong = new Audio('./sounds/pong.mov');
var backhand = new Audio('./sounds/backhand.mov')


//here is where all the classes are called to create the game
class Game {
  constructor() {
    this.thePlayer = new Player(20, 180, 10, 60); //left of screen
    this.thePlayer2 = new Player(560, 180, 10, 60); //right of screen
    this.theBall = new Ball(70, 200, 2, -2, ballRadius);
  }

  collisionDetection(futureX, futureY) {
    // console.log(this.theBall);
    // console.log(futureX);
    // console.log(this.thePlayer.x);
    // console.log(this.thePlayer.width);
    if (
      futureX < this.thePlayer.x + this.thePlayer.width + this.theBall.radius &&
      futureX + this.theBall.radius > this.thePlayer.x &&
      futureY < this.thePlayer.y + this.thePlayer.height &&
      futureY + this.theBall.radius > this.thePlayer.y
    ) {
    //   console.log("collided with player 1");
      this.theBall.x += 5;
      this.theBall.dx *= -1;
      pong.play();
    } else if (
      futureX < this.thePlayer2.x + this.thePlayer2.width &&
      futureX + this.theBall.radius > this.thePlayer2.x &&
      futureY < this.thePlayer2.y + this.thePlayer2.height &&
      futureY + this.theBall.radius > this.thePlayer2.y
    ) {
    //   console.log("Collided with player 2");
      this.theBall.x -= 5;
      this.theBall.dx *= -1;
      pong.play();
      // this.theBall.dy *= -1;
    } else if (this.theBall.y < 0 || this.theBall.y > 400) this.theBall.dy *= -1;
  }
}


//Game Over function

function gameOver() {
  if (playerOneScore === endGameScore) {
    message = `${player1name} WON!`;
    document.getElementById("game-notification").innerHTML = message;
    furywin.play();
    stop();
  }

  if (playerTwoScore === endGameScore) {
    message = `${player2name} WON!`;
    document.getElementById("game-notification").innerHTML = message;
    furywin.play();
   stop();
  }
}

//Start Button

document.getElementById("start-game").onclick = startGame;
let theGame;

function startGame() {
  isPlaying = true;
  buzzer.play();
  theGame = new Game();
  mainLoop();
}
