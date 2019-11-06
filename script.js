//IronPong JS

var ctx = document.getElementById("game-board").getContext("2d");
ctx.width = 800;
ctx.height = 450;

// console.log('connected')

// variables

let paddleSpeed = 50;
let playerOneScore = 0;
let playerTwoScore = 0;
let isPlaying;
let endGameScore = 10;
let ballRadius = 5;
let ballSpeed = 2.5;
let theme = "";
let player1name = "";
let player2name = "";
let singlePlayerToggle = false;
let url = window.location.search;
let urlSplit = url.substring(1).split("&");
let urlQuery = [];

urlSplit.forEach(function(queries) {
  newQuery = queries.split("=");
  urlQuery.push(newQuery);
});

player1name = urlQuery[0][1]
  .split("+")
  .join(" ")
  .toUpperCase();
player2name = urlQuery[1][1]
  .split("+")
  .join(" ")
  .toUpperCase();
  theme = urlQuery[2][1];
  
  if(urlQuery.length===4){
  singlePlayerMode = urlQuery[3][1];
  } else {
    singlePlayerMode=false;
  }

document.body.classList.add(theme);
document.querySelector("canvas").classList.add(`${theme}-theme`);
document.querySelector("#player1 > #name").innerText = player1name;
document.querySelector("#player2 > #name").innerText = player2name;

if(singlePlayerMode==="true"){
  singlePlayerToggle = true;
}

// console.log(theme);

class Player {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  // Move Player function

  movePlayer(direction, value) {
    this[direction] += value;
  };

  // Single Player Function... if singlePlayerToggle is True then set the computer(player2) to match the ball y
  singlePlayer() {
    if(singlePlayerToggle === true){
      this.y = theGame.theBall.y;
    }
  }
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

//function to increase ball speed every 5.5 secs 
function ballSpeedIncrease(){
  setInterval(()=>{
    ballSpeed += 0.5;
    // console.log('ballspeed increase')
  },5500)
}

const ballImg = new Image();
ballImg.src = `./images/${theme}.png`;

// Draw Function
function draw(u, object) {
  if (object === "ball") {
    ctx.drawImage(ballImg, u.x, u.y, 15, 15);
  }

  if (object === "player") {
    if (theme === "classic") {
      ctx.fillStyle = "white";
    } else if (theme === "ballsoffury") {
      ctx.fillStyle = "red";
    } else {
      ctx.fillStyle = "black";
    }
    ctx.fillRect(u.x, u.y, u.width, u.height);
  }
  if (object === "powerUps") {
    ctx.fillStyle = "red";
    ctx.fillRect(u.x, u.y, u.width, u.height);
  }

  // Restart ball and keep score
  if (theGame.theBall.x < 0) {
    //   stop()
    playerTwoScore += 1;
    document.querySelector(
      ".player-card #player2 #player-score span"
    ).innerText = playerTwoScore;
    obj[theme + "4"].play();
    ballSpeed = 2.5;
    theGame.clearUnusedPowerUps();
    message = `${player2name} Scores!`;
    document.getElementById("game-notification").innerHTML = message;
    document.querySelector('canvas').classList.add('score-shake');
    setTimeout(()=>{
    document.querySelector('canvas').classList.remove('score-shake');
    },600)
    theGame.theBall = new Ball(50, 200, -2, 2, 10, 10);
    // startGame();
  }

  if (theGame.theBall.x > 800) {
    //   stop()
    playerOneScore += 1;
    ballSpeed = 2;
    document.querySelector(
      ".player-card #player1 #player-score span"
    ).innerText = playerOneScore;
    obj[theme + "3"].play();
    theGame.clearUnusedPowerUps();
    message = `${player1name} Scores!`;
    document.getElementById("game-notification").innerHTML = message;
    document.querySelector('canvas').classList.add('score-shake');
    setTimeout(()=>{
    document.querySelector('canvas').classList.remove('score-shake');
    },600)
    theGame.theBall = new Ball(550, 200, 2, -2, 10, 10);
    // startGame();
  }
  if (object === "player" && theGame.thePlayer2.y < 0) {
    theGame.thePlayer2.y = 0;
  }

  if (object === "player" && theGame.thePlayer2.y > 375) {
    theGame.thePlayer2.y = 395;
  }

  if (object === "player" && theGame.thePlayer.y < 0) {
    theGame.thePlayer.y = 0;
  }

  if (object === "player" && theGame.thePlayer.y > 375) {
    theGame.thePlayer.y = 395;
  }
}

// Main Loop - runs animation, draws players
let frames = 0;
function mainLoop() {
  // console.log(frames);
  frames++;
  //console.log("clearRect has occured");
  ctx.clearRect(0, 0, ctx.width, ctx.height);
  draw(theGame.thePlayer, "player");
  draw(theGame.thePlayer2, "player");
  draw(theGame.theBall, "ball");
  theGame.theBallArray.forEach(eachBalls => {
    draw(eachBalls, "ball");
  });
  theGame.powerUpsArray.forEach(eachPowerUps => {
        draw(eachPowerUps, "powerUps")
    // console.log(eachPowerUps.name);
  });

  if (frames % 500 === 0) {
    theGame.spawnPowerUps();
  }
  if (frames % 800 === 0) {
    theGame.clearUnusedPowerUps();
  }
  theGame.thePlayer2.singlePlayer();
  theGame.theBall.moveBall();
  theGame.theBallArray.forEach(eachBalls => {
    eachBalls.moveBall();
  });
  theGame.collisionDetection(theGame.theBall.x, theGame.theBall.y);

  gameOver();

  if (isPlaying === true) {
    requestId = requestAnimationFrame(mainLoop);
  }
}

// Paddle controls
function gameControls(e) {
  if(singlePlayerMode===false){
  if (e.key === "ArrowUp") {
    theGame.thePlayer2.movePlayer("y", - paddleSpeed);
  }
  if (e.key === "ArrowDown") {
    theGame.thePlayer2.movePlayer("y", + paddleSpeed);
  }
  }
  if (e.key === "a" || e.key === "A") {
    theGame.thePlayer.movePlayer("y", - paddleSpeed);
  }
  if (e.key === "z" || e.key === "Z") {
    theGame.thePlayer.movePlayer("y", + paddleSpeed);
  }
}

//allow two player keydown presses
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
  if (mainLoop) {
    cancelAnimationFrame(mainLoop);
  }
}

// Audio Objects
let obj = {
  // Basketball Sounds
  basketball1: new Audio("./sounds/buzzer.mp3"), // opening buzzer
  basketball2: new Audio("./sounds/bounce.mp3"), // bounce off paddle
  basketball3: new Audio("./sounds/Shaq.m4a"), // player 1 scores
  basketball4: new Audio("./sounds/score.m4a"), // player 2 scores
  basketball5: new Audio("./sounds/kg2.mov"), // player 1 or 2 wins
  // Soccer Sounds
  soccer1: new Audio("./sounds/whistle.mp3"), // opening whistle
  soccer2: new Audio("./sounds/kick.m4a"), // kick off paddle
  soccer3: new Audio("./sounds/Goal4.mov"), // play 1 scores
  soccer4: new Audio("./sounds/Goal4.mov"), // play 2 scores
  soccer5: new Audio("./sounds/ole.mov"), // play 1 or 2 wins
  // Classic Sounds
  classic1: new Audio("./sounds/start.wav"), // beep off paddle
  classic2: new Audio("./sounds/Beep2.wav"), // beep off paddle
  classic3: new Audio("./sounds/classicScore.wav"), // player 1 scores
  classic4: new Audio("./sounds/classicScore.wav"), // player 2 scores
  classic5: new Audio("./sounds/victory.mp3"), // player 1 or 2 wins
  // Balls of Fury Sounds
  ballsoffury1: new Audio("./sounds/whistle.mp3"), // opening whistle
  ballsoffury2: new Audio("./sounds/pong.mov"), // ping pong paddle
  ballsoffury3: new Audio("./sounds/fury2.mov"), // player 1 scores
  ballsoffury4: new Audio("./sounds/backhand.mov"), // player 2 scores
  ballsoffury5: new Audio("./sounds/furywin.mov") // player 1 or 2 wins
};

//powerup array for the game
let powerUpsName = [
  // 'slowDown','speedUp',
  'barLarge'
];

//here is where all the classes are called to create the game
class Game {
  constructor() {
    this.thePlayer = new Player(20, 225, 10, 60); //left of screen
    this.thePlayer2 = new Player(770, 225, 10, 60); //right of screen
    this.theBall = new Ball(70, 200, 2, -2, ballRadius);
    this.theBallArray = [];
    this.powerUpsArray = [];
  }

  spawnPowerUps() {
    let rName = powerUpsName[Math.floor(Math.random() * powerUpsName.length)];
    let rX = Math.floor(Math.random() * 400) + 65;
    let rY = 180;
    let rWidth = 45;
    let rHeight = 45;

    let newPowerUps = new PowerUps(rName, rX, rY, rWidth, rHeight);
    this.powerUpsArray.push(newPowerUps);
    // console.log("Spawning!");
  }

  clearUnusedPowerUps() {
    this.powerUpsArray.splice(0, 1);
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
      obj[theme + "2"].play();
    } else if (
      futureX < this.thePlayer2.x + this.thePlayer2.width &&
      futureX + this.theBall.radius > this.thePlayer2.x &&
      futureY < this.thePlayer2.y + this.thePlayer2.height &&
      futureY + this.theBall.radius > this.thePlayer2.y
    ) {
      //   console.log("Collided with player 2");
      this.theBall.x -= 5;
      this.theBall.dx *= -1;
      obj[theme + "2"].play();
      // this.theBall.dy *= -1;
    } else if (this.theBall.y < 0 || this.theBall.y > 435) {
      this.theBall.dy *= -1;
    }

    for (let i = 0; i < this.powerUpsArray.length; i++) {
      if (
        futureX < this.powerUpsArray[i].x + this.powerUpsArray[i].width &&
        futureX + this.theBall.radius > this.powerUpsArray[i].x &&
        futureY < this.powerUpsArray[i].y + this.powerUpsArray[i].height &&
        futureY + this.theBall.radius > this.powerUpsArray[i].y
      ) {
        // console.log(this.powerUpsArray[i], i);
        switch (this.powerUpsArray[i].name) {
          case "slowDown":
            ballSpeed = 1;
            // alert("slowing down");
            break;
          case "speedUp":
            ballSpeed = 3;
            break;
          case "barLarge":
            if (this.theBall.dx === -2) {
              this.thePlayer.height = 200;
              setTimeout(function() {
                theGame.thePlayer.height = 60;
              }, 5000);
            } else if (this.theBall.dx === 2) {
              this.thePlayer2.height = 200;
              setTimeout(function() {
                theGame.thePlayer2.height = 60;
              }, 5000);
            }
            break;
          case "twoBalls":
            let newBalls = new Ball(70, 200, -2, 2, ballRadius);
            this.theBallArray.push(newBalls);
            break;
          case "mouseControl":
            break;
          default:
            break;
        }
        this.powerUpsArray.splice(i, 1);
        // console.log("COLLISION!!");
      }
    }
  }
}
// ""speedUp", "slowDown", "barLarge", "twoBalls", "mouseControl""

function resetPlayerScores() {
  playerOneScore = 0;
  playerTwoScore = 0;

  document.querySelector(
    ".player-card #player1 #player-score span"
  ).innerText = playerOneScore;
  document.querySelector(
    ".player-card #player2 #player-score span"
  ).innerText = playerTwoScore;
}

function countDown(){
  resetPlayerScores();
  let counter = 3;
  let timer = setInterval(function() {
    startCountDown(counter);
  }, 1000);

  function startCountDown() {
    if (counter === 0) {
      clearInterval(timer);
      startGame();
      document.getElementById("game-screen-message").innerHTML = "";
    } else {
      document.getElementById("game-screen-message").innerHTML = counter;
      counter--;
    }
  }
}

//Game Over function

function gameOver() {
  if (playerOneScore === endGameScore) {
    message = `${player1name} WON!`;
    document.getElementById("game-notification").innerHTML = message;
    document.getElementById("game-screen-message").innerHTML = `<a onclick="countDown()"> <i class="fas fa-redo"></i></a>`;
    obj[theme + "5"].play();
    stop();
    // startGame;
  }

  if (playerTwoScore === endGameScore) {
    message = `${player2name} WON!`;
    document.getElementById("game-notification").innerHTML = message;
    document.getElementById("game-screen-message").innerHTML = `<a onclick="countDown()"> <i class="fas fa-redo"></i></a>`;
    obj[theme + "5"].play();
    stop();
    // startGame;
  }
}

//Start Button

document.getElementById("start-game").onclick = countDown;
// document.getElementById("start-game").onclick = startGame;
let theGame;

function startGame() {
  isPlaying = true;
  theGame = new Game();
  mainLoop();
  ballSpeedIncrease();
  obj[theme + "1"].play();
}
