// Retrieve the 'difficulty' parameter from the URL or return 'Normal' if not found
function getDifficultyFromURL(): string {
    const params = new URLSearchParams(window.location.search);
    return params.get('difficulty') || 'Normal';
}

// Global game variables
let score: number = 0;  // Player's current score
let lives: number = 3;  // Player's remaining lives

// Update the player's lives and score display in the HTML
function updatePlayerStatus(): void {
    const livesCount = document.getElementById('lives-count') as HTMLElement | null;
    if (!livesCount) {
        console.error("Lives count element not found.");
        return;
    }
    const currentScore = document.getElementById('current-score') as HTMLElement | null;
    if (!currentScore) {
        console.error("Score element not found.");
        return;
    }

    // Update the display of lives and score
    livesCount.textContent = lives.toString();
    currentScore.textContent = score.toString();
}

// Initialize the game when the window loads
window.onload = initializeGame;

function initializeGame(): void {
    console.log("Initializing Game...");

    // Get the canvas element and set up the drawing context
    const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
    if (!canvas) {
        console.error("Canvas not found.");
        return;
    } else {
        console.log("Game initialized.");
    }

    // Display the difficulty level
    const difficultyLevel = document.getElementById('difficulty-level') as HTMLElement;
    if (difficultyLevel) {
        difficultyLevel.textContent = getDifficultyFromURL();
    }

    // Canvas setup
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    canvas.style.border = '2px solid #BB86FC';
    canvas.style.backgroundColor = '#1E1E1E';

    // Get the 2D drawing context
    const ctx = canvas.getContext('2d')!;
    if (!ctx) {
        console.error("Failed to get Canvas context.");
        return;
    }

    // Game variables
    const brickRowCount: number = 5;    // Number of brick rows
    const brickColumnCount: number = 8; // Number of brick columns
    const brickWidth: number = 75;      // Width of each brick
    const brickHeight: number = 20;     // Height of each brick
    const brickPadding: number = 20;    // Padding between bricks
    const brickOffsetTop: number = 30;  // Top offset for the bricks
    const brickOffsetLeft: number = 30; // Left offset for the bricks

    // Paddle variables
    const paddleHeight: number = 10;
    const paddleWidth: number = 75;
    let paddleX: number = (canvas.width - paddleWidth) / 2; // Starting X position of the paddle

    // Ball variables
    let ballSpeed: number = 8; // Default speed of ball movement;
    let x: number = canvas.width / 2;   // Ball's starting X position
    let y: number = canvas.height - 30; // Ball's starting Y position
    let dx: number = ballSpeed;         // Ball's movement in the X direction
    let dy: number = -ballSpeed;        // Ball's movement in the Y direction
    const ballRadius: number = 10;      // Radius of the ball

    // Control variables
    let rightPressed: boolean = false;  // Flag for right arrow key pressed
    let leftPressed: boolean = false;   // Flag for left arrow key pressed

    // Brick definition using an interface
    interface Brick {
        x: number;
        y: number;
        status: number; // 1 = visible, 0 = destroyed
    }

    // Create the bricks array and initialize each brick
    let bricks: Brick[][] = [];
    for (let c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (let r = 0; r < brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, status: 1 }; // Set initial position to (0,0), will be updated in drawBricks()
        }
    }

    // Event listeners for keyboard and mouse controls
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    document.addEventListener("mousemove", mouseMoveHandler, false);

    // Event handler for keydown events
    function keyDownHandler(e: KeyboardEvent): void {
        if (e.key === "Right" || e.key === "ArrowRight") {
            rightPressed = true;
        } else if (e.key === "Left" || e.key === "ArrowLeft") {
            leftPressed = true;
        }
    }

    // Event handler for keyup events
    function keyUpHandler(e: KeyboardEvent): void {
        if (e.key === "Right" || e.key === "ArrowRight") {
            rightPressed = false;
        } else if (e.key === "Left" || e.key === "ArrowLeft") {
            leftPressed = false;
        }
    }

    // Event handler for mouse movement to control the paddle
    function mouseMoveHandler(e: MouseEvent): void {
        const relativeX = e.clientX - canvas.offsetLeft;
        if (relativeX > 0 && relativeX < canvas.width) {
            paddleX = relativeX - paddleWidth / 2;
        }
    }

    // Draw the player's score on the canvas
    function drawScore(): void {
        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText(`Score: ${score}`, 8, 20);
    }

    // Draw the player's remaining lives on the canvas
    function drawLives(): void {
        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText(`Lives: ${lives}`, canvas.width - 65, 20);
    }

    // Detect collisions between the ball and the bricks
    function collisionDetection(): void {
        for (let c = 0; c < brickColumnCount; c++) {
            for (let r = 0; r < brickRowCount; r++) {
                let b = bricks[c][r];
                if (b.status === 1) {
                    if (
                        x > b.x &&
                        x < b.x + brickWidth &&
                        y > b.y &&
                        y < b.y + brickHeight
                    ) {
                        dy = -dy;
                        b.status = 0; // Remove the brick
                        score++;
                        updatePlayerStatus(); // Update score display
                        if (score === brickColumnCount * brickRowCount) {
                            alert("YOU WIN, CONGRATULATIONS!");
                            document.location.reload();
                        }
                    }
                }
            }
        }
    }

    // Draw the ball on the canvas
    function drawBall(): void {
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

    // Draw the paddle on the canvas
    function drawPaddle(): void {
        ctx.beginPath();
        ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

    // Draw the bricks on the canvas
    function drawBricks(): void {
        for (let c = 0; c < brickColumnCount; c++) {
            for (let r = 0; r < brickRowCount; r++) {
                if (bricks[c][r].status === 1) {
                    const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                    const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                    bricks[c][r].x = brickX;
                    bricks[c][r].y = brickY;
                    ctx.beginPath();
                    ctx.rect(brickX, brickY, brickWidth, brickHeight);
                    ctx.fillStyle = "#0095DD";
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
    }

    // The main game loop: updates game objects and renders them
    function draw(): void {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw game objects
        drawBricks();
        drawBall();
        drawPaddle();
        drawScore();
        drawLives();

        // Collision detection
        collisionDetection();

        // Ball movement logic
        if (y + dy < ballRadius) {
            dy = -dy; // Bounce off the top edge
        } else if (y + dy > canvas.height - ballRadius) {
            if (x > paddleX && x < paddleX + paddleWidth) {
                dy = -dy; // Bounce off the paddle
            } else {
                lives--; // Lose a life
                updatePlayerStatus(); // Update lives display
                if (lives <= 0) {
                    alert("Game Over!");
                    document.location.reload();
                } else {
                    // Reset ball position
                    x = canvas.width / 2;
                    y = canvas.height - 30;
                    dx = 3;
                    dy = -3;
                    paddleX = (canvas.width - paddleWidth) / 2;
                }
            }
        }

        // Bounce off the left and right edges
        if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
            dx = -dx;
        }

        // Paddle movement based on keyboard input
        if (rightPressed && paddleX < canvas.width - paddleWidth) {
            paddleX += 12;
        } else if (leftPressed && paddleX > 0) {
            paddleX -= 12;
        }

        // Update ball position
        x += dx;
        y += dy;

        // Request the next animation frame
        requestAnimationFrame(draw);
    }

    // Start the game loop and update the player status display
    draw();
    updatePlayerStatus(); // Initial update of player status
}