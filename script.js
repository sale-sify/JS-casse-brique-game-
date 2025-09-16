
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
    // stocke la fonction d'appel a intervale regulier permettant au jeu de demarrer
const interval = setInterval(draw, 10);
    //Stock les donnes d'affichage des briques au sein du tableau 
let brickRowCount = 3; 
let brickColumnCount = 4;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 30;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;



//Tableau de stockage des briques 
let bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
    bricks [c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0 , y: 0 };
    }
}



// Ecouteurs d'evenements pour les touches clavier
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


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
    ctx.fillStyle = "0095DD"
    ctx.fill();
    ctx.closePath()
}



// Fonction permettant de dessiner la raquette
function drawPaddle () {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = '0095DD'
    ctx.fill();
    ctx.closePath();
}



// Function permattant de definir le placement de chaque briques ainsi que de les dessiner 
function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            let brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
            let brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
            bricks[c][r].x = 0;
            bricks[c][r].y = 0;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = '#0095DD';
            ctx.fill();
            ctx.closePath();
        }
    }
}




// fonction permettant d'effacer et redessiner la balle avec une 
// position differente a chaque frame 
function draw () {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawBall();
    drawBricks();
    drawPaddle();
    

    // Si la balle 'touche' un mur, elle rebondit dans la direction oppose
        // en haut et en bas (perdu si en bas hors de la raquette) 
    if (y + dy < ballRadius) {
        dy = -dy;
    } else if ( y + dy  > canvas.height-ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        } else {                                    
            alert('GAME OVER.. TRY AGAIN !') 
            document.location.reload();             //Recharge la page 
            clearInterval(interval);                //Arrete le deplacement de la balle 
            x = canvas.width / 2;                   //Replace la balle a son point de depart
            y = canvas.height - 30;
        }
    }

        // A gauche et a droite
    if (x + dx < ballRadius || x + dx  > canvas.width-ballRadius) {
        dx = -dx;
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


//Appel de la fonction draw toutes les 10ms
setInterval(draw, 10);







