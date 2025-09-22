
// Declaration des variables d'environnement
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext("2d");

// Variable gerant la position et le deplaceemnt de la balle 
let x = canvas.width / 2;
let y = canvas.height - 30;
    //deplacement
let dx = 2;
let dy = -2;
    //rayon de la balle
let ballRadius = 10;
    //taille et placement de la 'raquette'
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
    // stocke l'etat des touches 'gauche' et 'droite' 
let rightPressed = false; 
let leftPressed = false;
    //Stocke la notification Game over 
const gameOverNotify = document.querySelector('.game-over-notify');
    //Stocke la notification de Victoire
const winNotify = document.querySelector('.win-notify');
    //Stock les donnes d'affichage des briques au sein du tableau 
let brickRowCount = 3; 
let brickColumnCount = 4;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 30;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;
    //index de score 
let score = 0;



//Tableau de stockage des briques 
let bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
    bricks [c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0 , y: 0, status: 1 };
    }
}



// Ecouteurs d'evenements pour les touches clavier
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
gameOverNotify.addEventListener("click", function() {
    document.location.reload();
});
winNotify.addEventListener("click", function() {
    document.location.reload();
});



// Fonction permettant de detecter la touche pressee 
function keyDownHandler (e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}



// Fonction permettant de detecter la touche relachee
function keyUpHandler (e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}



// Function permattant de dessiner la balle 
function drawBall () {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius ,0, Math.PI * 2);
    ctx.fillStyle = "#0095DD"
    ctx.fill();
    ctx.closePath()
}



// Fonction permettant de dessiner la raquette
function drawPaddle () {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = '#0095DD'
    ctx.fill();
    ctx.closePath();
}



// Function permattant de definir le placement de chaque briques ainsi que de les dessiner 
function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                let brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                let brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = '#0095DD';
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}



//Fonction de detction des collisions entre la balle et les briques 
function detectionCollision() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            let b = bricks[c][r];
            if (b.status == 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if (score == brickColumnCount * brickRowCount) {
                        winNotify.style.display = 'flex';
                        clearInterval(interval);
                    }
                }
            }
        }
    }
}



//Fonction permettant d'afficher le score
function drawScore () {
    ctx.font = '18px Arial';
    ctx.fillStyle = '#0095DD';
    ctx.fillText(`Score: ${score}`, 8, 20);
}



// fonction permettant d'effacer et redessiner la balle ainsi que le reste du canvas grace a 
// ces differentes fonctions intgrees vus plus haut 
// position differente a chaque frame 
function draw () {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawBall();
    drawBricks();
    drawPaddle();
    detectionCollision();
    drawScore();
    

    // Si la balle 'touche' un mur, elle rebondit dans la direction oppose
        // A gauche et a droite
    if (x + dx < ballRadius || x + dx  > canvas.width-ballRadius) {
        dx = -dx;
    }
        // en haut et en bas (perdu si en bas hors de la raquette) 
    if (y + dy < ballRadius) {
        dy = -dy;
    } else if ( y + dy  > canvas.height-ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        } else {                                    
            gameOverNotify.style.display = 'flex'  
            clearInterval(interval);                //Arrete le deplacement de la balle 
            return;
        }
    }

    

    // Deplacement de la raquette de gauche a droite a l'aide des touches  ==> possiblite de reduire le code 
    if (rightPressed) {
    paddleX += 3; 
    if (paddleX + paddleWidth > canvas.width) {
        paddleX = canvas.width - paddleWidth;
    }
    } else if (leftPressed) {
        paddleX -= 3;
        if (paddleX < 0) {
            paddleX = 0;
        }
    }

    // Deplacement de la balle 
    x += dx;
    y += dy;
}



// stocke et appelle la fonction d'appel a intervale regulier permettant au jeu de demarrer
const interval = setInterval(draw, 10);







