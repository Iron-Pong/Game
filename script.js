//IronPong JS

const ctx = document.getElementById("main-game").getContext("2d");

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
      //   if (this.x > 500) {
      //     clearInterval(travelDown);
      //   }
    }, 600);
  }
}

// Draw Function

function draw(u, object) {
  if (object === "ball") {
    ctx.arc(u.x, u.y, u.width, u.height, Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
  }
  if (object === "player") {
    ctx.fillStyle = "black";
    ctx.fillRect(u.x, u.y, u.width, u.height);
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

// Speed
let keys = [];
let speed = 30;

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
  collisionDetection() {
    if (
      this.theBall.x < this.thePlayer2.x + this.thePlayer2.width &&
      this.theBall.x + this.theBall.width > this.thePlayer2.x &&
      this.theBall.y < this.thePlayer2.y + this.thePlayer2.height &&
      this.theBall.y + this.theBall.height > this.thePlayer2.y
    ) {
      console.log("collision made with player 2!");
    } else if (
      this.theBall.x < this.thePlayer.x + this.thePlayer.width &&
      this.theBall.x + this.theBall.width > this.thePlayer.x &&
      this.theBall.y < this.thePlayer.y + this.thePlayer.height &&
      this.theBall.y + this.theBall.height > this.thePlayer.y
    ) {
      console.log("collision made with player 1!");
    }
  }
}

//Start Button

document.getElementById("start-game").onclick = startGame;
let theGame;

function startGame() {
  theGame = new Game();
  mainLoop();
}
// insert this into collision loop
// if (
//   theGame.theBall.x < theGame.thePlayer2.x + theGame.thePlayer2.width &&
//   theGame.theBall.x + theGame.theBall.width > theGame.thePlayer2.x &&
//   theGame.theBall.y < theGame.thePlayer2.y + theGame.thePlayer2.height &&
//   theGame.theBall.y + theGame.theBall.height > theGame.thePlayer2.y
// ) {
//   console.log("collision made with player 2!");
// } else if (
//   theGame.theBall.x < theGame.thePlayer.x + theGame.thePlayer.width &&
//   theGame.theBall.x + theGame.theBall.width > theGame.thePlayer.x &&
//   theGame.theBall.y < theGame.thePlayer.y + theGame.thePlayer.height &&
//   theGame.theBall.y + theGame.theBall.height > theGame.thePlayer.y
// ) {
//   console.log("collision made with player 1!");
// }
