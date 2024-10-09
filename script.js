//board
let board;
let boardWidth = 600;
let boardHeight = 600;
let context; 

//players
let playerWidth = 10;
let playerHeight = 60;
let playerVelocityY = 0;

let player1 = {
    x : 10,
    y : boardHeight/2,
    width: playerWidth,
    height: playerHeight,
    velocityY : playerVelocityY
}

let player2 = {
    x : boardWidth - playerWidth - 10,
    y : boardHeight/2,
    width: playerWidth,
    height: playerHeight,
    velocityY : playerVelocityY
}

//ball
let ballWidth = 10;
let ballHeight = 10;
let ball = {
    x : boardWidth/2,
    y : boardHeight/2,
    width : ballWidth,
    height : ballHeight,
    velocityX : 1,
    velocityY : 2,
}

let player1Score = 0;
let player2Score = 0;

window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); //used for drawing on the board
 
     //draw initial player1
     context.fillStyle="white";
     context.fillRect(player1.x, player1.y, player1.width, player1.height);
    
     requestAnimationFrame(update);
     document.addEventListener("keyup", movePlayer);
}

function update() {
    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height);

//player 1
    context.fillStyle = "white";
    //player1.y += player1.velocityY;
    let nextPlayer1Y = player1.y + player1.velocityY;
    if (!outOfBounds(nextPlayer1Y)) {
        player1.y = nextPlayer1Y;
    }
    context.fillRect(player1.x, player1.y, player1.width, player1.height);

//player 2
//player2.y += player2.velocityY;
let nextPlayer2Y = player2.y + player2.velocityY;
if (!outOfBounds(nextPlayer2Y)) {
    player2.y = nextPlayer2Y;
}
context.fillRect(player2.x, player2.y, player2.width, player2.height);

// ball
context.fillStyle = "white";
ball.x += ball.velocityX;
ball.y += ball.velocityY;
context.fillRect(ball.x, ball.y, ball.width, ball.height);

// se a bola tocar a parte superior ou inferior da tela
if (ball.y <= 0 || (ball.y + ball.height >= boardHeight)) {
    ball.velocityY *= -1; //reverter direção
}

//rebater a bola
if (detectCollision(ball, player1)) {
    if (ball.x <= player1.x + player1.width) {
        //o lado esquerdo da bola toca o lado direito do jogador1
        ball.velocityX *= -1; // virar x direção
    }
}
    else if (detectCollision(ball, player2)) {
        if (ball.x + ballWidth >= player2.x) {
            //o lado direito da bola toca o lado esquerdo do jogador2
            ball.velocityX *= -1; // virar x direção 
        }
}

//fim de jogo
if (ball.x < 0) {
    player2Score++;
    resetGame(1);
}
else if (ball.x + ballWidth > boardWidth) {
    player1Score++;
    resetGame(-1);
}
//pontuação
context.font = "45px sans-serif";
context.fillText(player1Score, boardWidth/5, 45);
context.fillText(player2Score, boardWidth*4/5 -45, 45);

// desenhe uma linha pontilhada no meio
for (let i = 10; i < board.height; i += 25){
// i = começando na posição y, desenhe um quadrado a cada 25 pixels para baixo
// (posição x = metade da largura do tabuleiro -10), i = posição y, largura = 5, height = 5
context.fillRect(board.width/2 - 10, i, 5, 5);
}
} 

function outOfBounds(yPosition) {
    return (yPosition < 0 || yPosition + playerHeight > boardHeight); 
}

function movePlayer(e) {
    //player1
    if (e.code == "KeyW") {
    player1.velocityY = -3;
    }
    else if (e.code == "KeyS") {
        player1.velocityY = 3;
    }

    //player2
    if (e.code == "ArrowUp") {
        player2.velocityY = -3;
    }
    else if (e.code == "ArrowDown") {
        player2.velocityY = 3;
    }
}

function detectCollision(a, b) {
    return a.x < b.x + b.width &&  //o canto superior esquerdo de 'A' não alcança o canto superior direito de 'B'
           a.x + a.width > b.x &&  //o canto superior direito de 'A' passa pelo canto superior esquerdo de 'B'
           a.y < b.y + b.height && //o canto esquerdo de 'A' não alcança o canto inferior esquerdo de 'B'
           a.y + a.height > b.y;   //o canto inferior esquerdo de 'A' passa pelo canto superior esquerdo de 'B'
}

function resetGame(direction) {
    ball = {
    x : boardWidth/2,
    y : boardHeight/2,
    width : ballWidth,
    height : ballHeight,
    velocityX : direction,
    velocityY : 2,
}
}