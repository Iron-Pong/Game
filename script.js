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
    ctx.fillStyle = "red";
    ctx.fillRect(u.x, u.y, u.width, u.height);
  }
  if (object === "player") {
    ctx.fillStyle = "black";
    ctx.fillRect(u.x, u.y, u.width, u.height);
  }
  if ((object === "player") && theGame.thePlayer2.y < 0) {
    theGame.thePlayer2.y = 0;
  }

  if ((object === "player") && theGame.thePlayer2.y > 330) {
    theGame.thePlayer2.y = 340;
  }

  if ((object === "player") && theGame.thePlayer.y < 0) {
    theGame.thePlayer.y = 0;
  }

  if ((object === "player") && theGame.thePlayer.y > 330) {
    theGame.thePlayer.y = 340;
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

let keys = [];
// Speed
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


}

//Start Button

document.getElementById("start-game").onclick = startGame;
let theGame;

function startGame() {
  theGame = new Game();
  mainLoop();
}
