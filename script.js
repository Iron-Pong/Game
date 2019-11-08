var ctx = document.getElementById("game-board").getContext("2d");
ctx.width = 800;
ctx.height = 450;

// variables
const paddleSpeed = 50;
const endGameScore = 10;
const ballRadius = 5;
let playerOneScore = 0;
let rallyScore = 0;
let playerTwoScore = 0;
let isPlaying;
let ballSpeed = 2.5;
let theme = "";
let player1name = "";
let player2name = "";
let singlePlayerToggle = false;
let url = window.location.search;
let urlSplit = url.substring(1).split("&");
let urlQuery = [];
let theTimer = 120;

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

let singlePlayerMode = false;

if (urlQuery.length === 4 && urlQuery[3][0] === "singlePlayerMode") singlePlayerMode = true;
else if (urlQuery.length === 5) singlePlayerMode = true;
else singlePlayerMode = false;

let timerMode = false;

if (urlQuery.length === 4 && urlQuery[3][0] === "timedMode") timerMode = true;
else if (urlQuery.length === 5) timerMode = true;
else {
  timerMode = false;
  document.querySelector("#header > div:nth-child(3)").innerHTML = "";
}

if (!timerMode) document.querySelector("#header > div:nth-child(3)").innerHTML = "";
const vid = document.getElementById("myVideo");
if (theme === "ballsoffury") vid.play();
else {
  vid.style.display = "none";
  document.getElementById("skip-video-button").style.display = "none";
  vid.pause();
}

function skipVideo() {
  vid.style.display = "none";
  document.getElementById("skip-video-button").style.display = "none";
  vid.pause();
}

document.body.classList.add(theme);
document.querySelector("canvas").classList.add(`${theme}-theme`);
document.querySelector("#player1 > #name").innerText = player1name;
document.querySelector("#player2 > #name").innerText = player2name;

if (singlePlayerMode === true) singlePlayerToggle = true;

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
  }

  // Single Player Function... if singlePlayerToggle is True then set the computer(player2) to match the ball y
  singlePlayer() {
    if (singlePlayerToggle) {
      this.y = theGame.theBallArray[0].y;
      for (let i = 0; i < theGame.theBallArray.length - 1; i++) {
        if (theGame.theBallArray[i].dx === -2) {
          this.y = theGame.theBallArray[i].y;
          if (theGame.theBallArray.length > 1 && theGame.theBallArray[i].x > theGame.theBallArray[i + 1].x) {
            this.y = theGame.theBallArray[i].y;
          }
        }
      }
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
function ballSpeedIncrease() {
  ballSpeed = 2.5;
  setInterval(() => {
    ballSpeed += 0.5;
  }, 5500);
}

const ballImg = new Image();
ballImg.src = `./images/${theme}.png`;

const twoBallsImg = new Image();
twoBallsImg.src = `./images/powerups/${theme}1.png`;

const speedUpImg = new Image();
speedUpImg.src = `./images/powerups/${theme}2.png`;

const barLargeImg = new Image();
barLargeImg.src = `./images/powerups/${theme}3.png`;

const slowDownImg = new Image();
slowDownImg.src = `./images/powerups/${theme}4.png`;

// Draw Function
const draw = (u, object) => {
  if (object === "ball") ctx.drawImage(ballImg, u.x, u.y, 15, 15);
  if (object === "player") {
    const fillStyle = { classic: "white", ballsoffury: "red" }[theme] || "black";
    ctx.fillStyle = fillStyle;
    ctx.fillRect(u.x, u.y, u.width, u.height);
  }
  if (object === "twoBalls") ctx.drawImage(twoBallsImg, u.x, u.y, u.width, u.height);
  if (object === "speedUp") ctx.drawImage(speedUpImg, u.x, u.y, u.width, u.height);
  if (object === "barLarge") ctx.drawImage(barLargeImg, u.x, u.y, u.width, u.height);
  if (object === "slowDown") ctx.drawImage(slowDownImg, u.x, u.y, u.width, u.height);
  if (object === "player" && theGame.thePlayer2.y < 0) theGame.thePlayer2.y = 0;
  if (object === "player" && theGame.thePlayer2.y > 375) theGame.thePlayer2.y = 395;
  if (object === "player" && theGame.thePlayer.y < 0) theGame.thePlayer.y = 0;
  if (object === "player" && theGame.thePlayer.y > 375) theGame.thePlayer.y = 395;
};

// Main Loop - runs animation, draws players
let frames = 0;
function mainLoop() {
  frames++;
  ctx.clearRect(0, 0, ctx.width, ctx.height);
  draw(theGame.thePlayer, "player");
  draw(theGame.thePlayer2, "player");
  theGame.theBallArray.forEach(eachBalls => {
    draw(eachBalls, "ball");
    eachBalls.moveBall();
    theGame.handleCollision(eachBalls);
  });
  theGame.powerUpsArray.forEach(eachPowerUps => {
    if (eachPowerUps.name === "twoBalls") draw(eachPowerUps, "twoBalls");
    if (eachPowerUps.name === "speedUp") draw(eachPowerUps, "speedUp");
    if (eachPowerUps.name === "barLarge") draw(eachPowerUps, "barLarge");
    if (eachPowerUps.name === "slowDown") draw(eachPowerUps, "slowDown");
  });
  if (frames % 150 === 0) theGame.spawnPowerUps();
  if (frames % 800 === 0) theGame.clearUnusedPowerUps();
  theGame.thePlayer2.singlePlayer();
  if (!timerMode) gameOver();
  if (isPlaying === true) requestId = requestAnimationFrame(mainLoop);
}

// Paddle controls
document.onkeydown = function(e) {
  if (singlePlayerMode === false) {
    if (e.key === "ArrowUp") theGame.thePlayer2.movePlayer("y", -paddleSpeed);
    if (e.key === "ArrowDown") theGame.thePlayer2.movePlayer("y", +paddleSpeed);
  }
  if (e.key === "a" || e.key === "A") theGame.thePlayer.movePlayer("y", -paddleSpeed);
  if (e.key === "z" || e.key === "Z") theGame.thePlayer.movePlayer("y", +paddleSpeed);
};

//allow two player keydown strokes
//https://stackoverflow.com/questions/5203407/how-to-detect-if-multiple-keys-are-pressed-at-once-using-javascript

const map = {}; // You could also use an array
onkeydown = onkeyup = function(e) {
  e = e || event; // to deal with IE
  map[e.key] = e.type == "keydown";
  /* insert conditional here */
  for (let k in map) {
    if (map[k]) gameControls({ key: k });
  }
};

function stop() {
  isPlaying = false;

  /// kill any request in progress
  mainLoop ? cancelAnimationFrame : false;
}

// Audio Objects
const obj = {
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
  // "slowDown",
  "speedUp",
  // "barLarge",
  "twoBalls"
];

let increaseRally = function() {
  document.querySelector("#rally > span").innerText = rallyScore;
};

//here is where all the classes are called to create the game
class Game {
  constructor() {
    this.thePlayer = new Player(20, 225, 10, 60); //left of screen
    this.thePlayer2 = new Player(770, 225, 10, 60); //right of screen
    this.theBall = new Ball(70, 200, 2, -2, ballRadius);
    this.theBallArray = [this.theBall];
    this.powerUpsArray = [];
  }

  spawnPowerUps() {
    let rName = powerUpsName[Math.floor(Math.random() * powerUpsName.length)];
    let rX = Math.floor(Math.random() * 600) + 65;
    let rY = Math.floor(Math.random() * 300) + 25;
    let rWidth = 45;
    let rHeight = 45;

    let newPowerUps = new PowerUps(rName, rX, rY, rWidth, rHeight);
    this.powerUpsArray.push(newPowerUps);
  }

  clearUnusedPowerUps() {
    this.powerUpsArray.splice(0, 1);
  }

  handleCollision(eachBall) {
    if (
      eachBall.x < this.thePlayer.x + this.thePlayer.width + eachBall.radius * 1.1 &&
      eachBall.x + eachBall.radius > this.thePlayer.x &&
      eachBall.y < this.thePlayer.y + this.thePlayer.height &&
      eachBall.y + eachBall.radius > this.thePlayer.y
    ) {
      obj[theme + "2"].play();
      eachBall.x += 5;
      eachBall.dx *= -1;
      rallyScore++;
      increaseRally();
    } else if (
      eachBall.x < this.thePlayer2.x + this.thePlayer2.width + eachBall.radius * 2 &&
      eachBall.x + eachBall.radius * 2 > this.thePlayer2.x &&
      eachBall.y < this.thePlayer2.y + this.thePlayer2.height &&
      eachBall.y + eachBall.radius * 2 > this.thePlayer2.y
    ) {
      eachBall.x -= 5;
      eachBall.dx *= -1;
      obj[theme + "2"].play();
      rallyScore++;
      increaseRally();
    } else if (eachBall.y < 0 || eachBall.y > 450) {
      eachBall.dy *= -1;
    }
    // Restart ball and keep score
    for (let i = 0; i < this.theBallArray.length; i++) {
      let randomY = Math.floor(Math.random() * 300) + 65;
      if (eachBall.x < 0) {
        playerTwoScore += 1;
        ballSpeed = 2;
        document.querySelector(".player-card #player2 #player-score span").innerText = playerTwoScore;
        obj[theme + "4"].play();
        rallyScore = 0;
        increaseRally();
        this.clearUnusedPowerUps();
        let message = `${player2name} Scores!`;
        document.getElementById("game-notification").innerHTML = message;
        document.querySelector("canvas").classList.add("score-shake");
        setTimeout(() => {
          document.querySelector("canvas").classList.remove("score-shake");
        }, 600);
        this.theBallArray.splice(i, this.theBallArray.length);
        let newBalls = new Ball(70, randomY, -2, 2, ballRadius);
        this.theBallArray.push(newBalls);
      }
      if (eachBall.x > 800) {
        playerOneScore += 1;
        ballSpeed = 2;
        document.querySelector(".player-card #player1 #player-score span").innerText = playerOneScore;
        obj[theme + "3"].play();
        rallyScore = 0;
        increaseRally();
        this.clearUnusedPowerUps();
        let message = `${player1name} Scores!`;
        document.getElementById("game-notification").innerHTML = message;
        document.querySelector("canvas").classList.add("score-shake");
        setTimeout(() => {
          document.querySelector("canvas").classList.remove("score-shake");
        }, 600);
        this.theBallArray.splice(i, this.theBallArray.length);
        let newBalls = new Ball(760, randomY, 2, 2, ballRadius);
        this.theBallArray.push(newBalls);
      }
    }
    for (let i = 0; i < this.powerUpsArray.length; i++) {
      if (
        eachBall.x < this.powerUpsArray[i].x + this.powerUpsArray[i].width &&
        eachBall.x + eachBall.radius > this.powerUpsArray[i].x &&
        eachBall.y < this.powerUpsArray[i].y + this.powerUpsArray[i].height &&
        eachBall.y + eachBall.radius > this.powerUpsArray[i].y
      ) {
        switch (this.powerUpsArray[i].name) {
          case "slowDown":
            ballSpeed = 1.5;
            setTimeout(function() {
              ballSpeed = 2.5;
            }, 5000);
            break;
          case "speedUp":
            ballSpeed += 1.5;
            setTimeout(function() {
              ballSpeed = 2.5;
            }, 5000);
            break;
          case "barLarge":
            if (eachBall.dx === -2) {
              if ((singlePlayerToggle = true)) {
                this.thePlayer.height = 200;
                setTimeout(function() {
                  theGame.thePlayer.height = 60;
                }, 10000);
              } else {
                this.thePlayer.height = 200;
                setTimeout(function() {
                  theGame.thePlayer.height = 60;
                }, 5000);
              }
            } else if (eachBall.dx === 2) {
              this.thePlayer2.height = 200;
              setTimeout(function() {
                theGame.thePlayer2.height = 60;
              }, 5000);
            }
            break;
          case "twoBalls":
            let randomXOne = Math.floor(Math.random() * 400);
            let randomXTwo = Math.floor(Math.random() * 390) + 400;
            let randomY = Math.floor(Math.random() * 300) + 65;
            if (eachBall.dx === -2) {
              let newBalls = new Ball(randomXTwo, randomY, 2, 2, ballRadius);
              this.theBallArray.push(newBalls);
            } else if (eachBall.dx === 2) {
              let newBalls = new Ball(randomXOne, randomY, -2, 2, ballRadius);
              this.theBallArray.push(newBalls);
            }
            break;
          default:
            break;
        }
        this.powerUpsArray.splice(i, 1);
      }
    }
  }
}

resetPlayerScores = () => {
  playerOneScore = 0;
  playerTwoScore = 0;
  document.querySelector(".player-card #player1 #player-score span").innerText = playerOneScore;
  document.querySelector(".player-card #player2 #player-score span").innerText = playerTwoScore;
  document.querySelector("#game-notification").innerText = "New Game";
  ballSpeed = 2.5;
};

countDown = () => {
  resetPlayerScores();
  let counter = 3;
  let timer = setInterval(() => startCountDown(counter), 1000);
  startCountDown = () => {
    if (counter === 0) {
      clearInterval(timer);
      startGame();
      document.getElementById("game-screen-message").innerHTML = "";
    } else {
      document.getElementById("game-screen-message").innerHTML = counter;
      counter--;
    }
  };
};

//Game Over function

function gameOver() {
  if (playerOneScore === endGameScore) {
    message = `${player1name} WON! `;
    document.getElementById("game-notification").innerHTML = message;
    document.getElementById(
      "game-screen-message"
    ).innerHTML = `<a onclick="countDown()"> <i class="fas fa-redo"></i></a>`;
    obj[theme + "5"].play();
    stop();
  }

  if (playerTwoScore === endGameScore) {
    message = `${player2name} WON!`;
    document.getElementById("game-notification").innerHTML = message;
    document.getElementById(
      "game-screen-message"
    ).innerHTML = `<a onclick="countDown()"> <i class="fas fa-redo"></i></a>`;
    obj[theme + "5"].play();
    stop();
  }
}

//Timed Game Over Function

gameOver2 = () => {
  if (playerOneScore > playerTwoScore) {
    if (singlePlayerToggle === true) {
      message = `${player1name} WON! <a href="http://avrahm.com/ironpong/highscores.php${url}&playerScore=${playerOneScore}">Submit Scores</a>`;
    } else {
      message = `${player1name} WON!`;
    }
    document.getElementById("game-notification").innerHTML = message;
    document.getElementById(
      "game-screen-message"
    ).innerHTML = `<a onclick="countDown()"> <i class="fas fa-redo"></i></a>`;
    obj[theme + "5"].play();
    stop();
  } else if (playerTwoScore > playerOneScore) {
    message = `${player2name} WON!`;
    document.getElementById("game-notification").innerHTML = message;
    document.getElementById(
      "game-screen-message"
    ).innerHTML = `<a onclick="countDown()"> <i class="fas fa-redo"></i></a>`;
    obj[theme + "5"].play();
    stop();
  } else {
    message = `TIE GAME!`;
    document.getElementById("game-notification").innerHTML = message;
    document.getElementById(
      "game-screen-message"
    ).innerHTML = `<a onclick="countDown()"> <i class="fas fa-redo"></i></a>`;
    obj[theme + "5"].play();
    stop();
  }
};

// Timer Function

function timerToggle() {
  timerMode === true ? timerFuction() : gameOver();
}

timerFuction = () => {
  let counter1 = theTimer;
  let timer1 = setInterval(() => startCountUp(counter1), 1000);
  startCountUp = () => {
    if (counter1 === 0) {
      clearInterval(timer1);
      document.querySelector("#header > div:nth-child(3) > span").innerHTML = 0;
      gameOver2();
    } else {
      counter1--;
      document.querySelector("#header > div:nth-child(3) > span").innerHTML = counter1;
    }
  };
};

//Start Button

document.getElementById("start-game").onclick = countDown;

startGame = () => {
  isPlaying = true;
  theGame = new Game();
  timerToggle();
  mainLoop();
  ballSpeedIncrease();
  obj[`${theme}1`].play();
};
