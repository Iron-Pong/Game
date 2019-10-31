//IronPong JS

const ctx = document.getElementById('main-game').getContext('2d');

class Player{
    constructor(x,y,width,height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}

function draw(u){
    ctx.fillStyle = 'black';
    ctx.fillRect( u.x, u.y, u.width, u.height);
}

function mainLoop(){
    frames++;
    console.log('clearRect has occured');
    draw(theGame.thePlayer);

    requestAnimationFrame(mainLoop);
}

// class Ball{

// }

class Game {
    //here is where all the classes are called to create the game
    constructor(){
        this.thePlayer = new Player(0, 0, 20, 20);
    }
}

document.getElementById('start-game').onclick = startGame;
let theGame;

function startGame(){
    theGame = new Game();
    mainLoop();
}