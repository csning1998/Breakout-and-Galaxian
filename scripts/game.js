
function getDifficultyFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.has('difficulty');
}
function updatePlayerStatus() {
    document.getElementById('lives-count').textContent; // 假設初始生命值為 3
    document.getElementById('current-score').textContent; // 假設初始分數為 0
}

function initializeGame(){

    console.log("Initializing Game...");

    const canvasContainer = document.getElementById('game-canvas');
    if(!canvasContainer){
        console.error("Canvas container not found.");
        return;
    }

    const difficultyLevel = document.getElementById('difficulty-level');
    difficultyLevel.textContent = getDifficultyFromURL();

    const canvas = document.getElementById('game-canvas');

    // Setting up Brick vars
    const brickRowCount = 3;
    const brickColumnCount =5;
    const brickWidth = 75;
    const brickHeight = 20;
    const brickPadding = 20;
    const brickOffsetTop = 30;
    const brickOffsetLeft = 30;
    const bricks = [];

    for (let c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (let r =0; r < brickRowCount; r++) {
            bricks[c][r] = {x:0, y:0};
        }
    }

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    canvas.style.border = '2px solid #BB86FC';
    canvas.style.backgroundColor = '#1E1E1E';

    const ctx = canvas.getContext('2d');

    const paddleHeight = 10;
    const paddleWidth = 75;
    let paddleX = (canvas.width - paddleWidth) / 2;

    let x = canvas.width / 2;
    let y = canvas.height - 30;

    let dx = 2;
    let dy = -2;

    const ballRadius = 10;

    // Pressed buttons can be defined and initialized with boolean variables
    let rightPressed = false;
    let leftPressed = false;

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

    let interval = 0;

    function drawBall() {
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawPaddle();
        drawBall();
        drawBricks();
        x += dx;
        y += dy;
        if (y + dy < ballRadius) {
            dy = -dy;
        } else if (y + dy > canvas.height - ballRadius) {
            if (x > paddleX && x < paddleX + paddleWidth) {
                dy=-dy;
            } else {
                alert("GAME OVER");
                document.location.reload();
                clearInterval(interval); // Needed for Chrome to end game
            }
        }
        if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
            dx = -dx;
        }
        if (rightPressed) {
            paddleX = Math.min(paddleX + 7, canvas.width - paddleWidth);
        } else if (leftPressed) {
            paddleX = Math.max(paddleX - 7, 0);
        }
    }
    function drawPaddle() {
        ctx.beginPath();
        ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

    function keyDownHandler(e) {
        if (e.key === "Right" || e.key === "ArrowRight") {
            rightPressed = true;
        } else if (e.key === "Left" || e.key === "ArrowLeft") {
            leftPressed = true;
        }
    }

    function keyUpHandler(e) {
        if (e.key === "Right" || e.key === "ArrowRight") {
            rightPressed = false;
        } else if (e.key === "Left" || e.key === "ArrowLeft") {
            leftPressed = false;
        }
    }

    function drawBricks(){
        for (let c = 0; c < brickColumnCount; c++) {
            for (let r =0; r < brickRowCount; r++) {
                const brickX = c*(brickWidth + brickPadding) +brickOffsetLeft;
                const brickY = r*(brickHeight + brickPadding) +brickOffsetTop;
                bricks[c][r].x = 0;
                bricks[c][r].y = 0;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }


    interval = setInterval(draw, 7);
    updatePlayerStatus();
}
window.onload = initializeGame;