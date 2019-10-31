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
  };
}

class Ball {
  constructor(x, y, dx, dy, width, height) {
    this.x = x;
    this.y = y;
    this.dy = dy;
    this.dx = dx;
    this.width = width;
    this.height = height;
  }
  moveBall(futureX, futureY) {
    this.x -= this.dx;
    // setInterval(() => {
    // futureY = this.y;
    //   if (this.x > 500) {
    //     clearInterval(travelDown);
    //   }
    // }, 1000);
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

  if (theGame.theBall.x < 0) {
    playerTwoScore += 1;
    document.querySelector(".player2 > span").innerText = playerTwoScore;
    theGame.theBall.x += 5;
    startGame();
  }
  if (theGame.theBall.x > 600) {
    theGame.theBall.x -= 305;

    playerOneScore += 1;
    document.querySelector(".player1 > span").innerText = playerOneScore;
    startGame();
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
  frames++;
  //console.log("clearRect has occured");
  ctx.clearRect(0, 0, 600, 400);
  draw(theGame.thePlayer, "player");
  draw(theGame.thePlayer2, "player");
  draw(theGame.theBall, "ball");
  theGame.theBall.moveBall();
  theGame.collisionDetection(theGame.theBall.x, theGame.theBall.y);

  requestAnimationFrame(mainLoop);
}


/*function loop(timestamp) {
    var progress = timestamp - lastRender
  
    update(progress)
    draw()
  
    lastRender = timestamp
    window.requestAnimationFrame(loop)
  }
  var lastRender = 0
  window.requestAnimationFrame(loop) */



// Paddle controls

function gameControls(e) {
  if (e.key === "'") {
          theGame.thePlayer2.movePlayer("y", -speed);
      }
  if (e.key === "/") {
          theGame.thePlayer2.movePlayer("y", +speed);
      }
  if (e.key === "a" || e.key === "A") {
    theGame.thePlayer.movePlayer("y", -speed);
  }
  if (e.key === "z" || e.key === "Z") {
    theGame.thePlayer.movePlayer("y", +speed);
  }
}


//https://stackoverflow.com/questions/5203407/how-to-detect-if-multiple-keys-are-pressed-at-once-using-javascript

var map = {}; // You could also use an array
onkeydown = onkeyup = function(e){
    e = e || event; // to deal with IE
    map[e.key] = e.type == 'keydown';
    /* insert conditional here */
    console.log(map)
    for(let k in map){
        if(map[k]){
            gameControls({key:k})
        }
    }
    
}

//here is where all the classes are called to create the game
class Game {
  constructor() {
    this.thePlayer = new Player(20, 180, 20, 60);
    this.thePlayer2 = new Player(560, 180, 20, 60);
    this.theBall = new Ball(300, 200, 0, 2, 10, 10);
  }

  collisionDetection(futureX, futureY) {
    //console.log(this.theBall);
    // console.log(futureX);
    // console.log(this.thePlayer2.x);
    // console.log(this.thePlayer2.width);
    if (
      futureX < this.thePlayer.x + this.thePlayer.width &&
      futureX + this.theBall.width > this.thePlayer.x &&
      futureY < this.thePlayer.y + this.thePlayer.height &&
      futureY + this.theBall.height > this.thePlayer.y
    ) {
      console.log("collided with player 1");
      this.theBall.dx *= -1;
    } else if (
      futureX < this.thePlayer2.x + this.thePlayer2.width &&
      futureX + this.theBall.width > this.thePlayer2.x &&
      futureY < this.thePlayer2.y + this.thePlayer2.height &&
      futureY + this.theBall.height > this.thePlayer2.y
    ) {
      this.theBall.dx *= -1;
    } else if (this.theBall.x < 0) {
      this.theBall.dx *= -1;
    } else if (this.theBall.x > 600) {
      this.theBall.dx *= -1;
    }
   }
}
        

//Game Over function

function gameOver() {
  if (playerOneScore === 10) {
    message = "Player 1 Wins!";
    document.getElementById("gameNotifcation").innerText = message;
    // alert(message);
  }

  if (playerTwoScore === 2) {
    message = "Player 2 Wins!";
    document.getElementById("gameNotifcation").innerText = message;

    setTimeout(function() {
      location.reload(true);
    }, 1000);
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
