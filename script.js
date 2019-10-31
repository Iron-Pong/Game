//IronPong JS

const ctx = document.getElementById('main-game').getContext('2d');

class Player{
    constructor(x,y,width,height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

// Move Player function

    movePlayer = (direction, value) => {
        this[direction] += value;
        console.log(this)
    }
}

// Draw Function

function draw(u){
    ctx.fillStyle = 'black';
    ctx.fillRect( u.x, u.y, u.width, u.height);
}

// Main Loop - runs animation, draws players

function mainLoop(){
    frames++;
    console.log('clearRect has occured');
    ctx.clearRect(0, 0, 600, 400);
    draw(theGame.thePlayer);
    draw(theGame.thePlayer2);
    requestAnimationFrame(mainLoop);
}

// class Ball{

// }


// Speed

let speed = 15;

// Paddle controls

function gameControls(e) {
    if (e.key === "ArrowUp") {
        theGame.thePlayer2.movePlayer("y", -speed)
    }
    if (e.key === "ArrowDown") {
        theGame.thePlayer2.movePlayer("y", +speed)
    }
    if (e.key === "a") {
        theGame.thePlayer.movePlayer("y", -speed)
    }
    if (e.key === "z") {
        theGame.thePlayer.movePlayer("y", +speed)
    }
}

document.onkeydown = gameControls;



//here is where all the classes are called to create the game
class Game {
    
    constructor(){
        this.thePlayer = new Player(20, 180, 20, 60);
        this.thePlayer2 = new Player(560, 180, 20, 60);
    }
}


//Start Button

document.getElementById('start-game').onclick = startGame;
let theGame;

function startGame(){
    theGame = new Game();
    mainLoop();
}