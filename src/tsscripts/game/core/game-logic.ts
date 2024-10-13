/*
 * Contains the main game loop and logic, including collision detection and game updates.
 */

import { InputHandler } from '@/tsscripts/game/core/input';


export class GameLogic {
    private readonly scene: Scene;
    private inputHandler: InputHandler;
    public isPaused: boolean = false;
    public onGameWon = function (): void {
    }

    public pause(): void {
        console.log("The game is paused.")
        this.isPaused = true;
    }

    public resume(): void {
        console.log("The game is resumed.")
        if (!this.isPaused) return;
        this.isPaused = false;
    }

    public togglePause(): void {
        console.log("The game is paused.")
        this.isPaused = !this.isPaused;
    }

    public resetGame() {
        // Reset game state
        const {game, ball, paddle, bricks, canvas} = this.scene;

        game.resetPlayer(); // Reset player score and lives

        // Reset ball and paddle positions
        ball.resetPosition(canvas);
        paddle.x = (canvas.width - paddle.width) / 2;

        // Reset bricks
        bricks.resetBricks();
        this.inputHandler = new InputHandler(paddle, canvas, this);
    }

    constructor(scene: Scene) {
        console.log("scene", scene);


        this.scene = scene;

        const {paddle, canvas} = this.scene;
        this.inputHandler = new InputHandler(paddle, canvas, this);
        this.loop();
    }

    private loop() {
        // console.log("=== GameLoop Started ===");
        // setInterval(() => {
        //   console.log('game.requestAnimationFrameValue', game.requestAnimationFrameValue)
        // }, 1000)

        if (this.isPaused) {
            this.scene.game.requestAnimationFrameValue = requestAnimationFrame(
                this.loop.bind(this)
            );
            return;
        }
        try {
            const {ctx, canvas, bricks, ball, paddle, game} = this.scene;

            // Clear the canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw score and lives
            bricks.draw(ctx);
            ball.draw(ctx);
            paddle.draw(ctx, canvas);

            this.inputHandler.update(paddle, canvas);
            this.updateBallPosition();

            game.requestAnimationFrameValue = requestAnimationFrame(
                this.loop.bind(this)
            );

            // Request the next animation frame
        } catch (err) {
            console.error("=== Error in game loop ===\n", err);
        }
    }

    private updateBallPosition() {
        // Bounce off the left and right edges

        const {ball, paddle, canvas, game} = this.scene;

        if (
            ball.x + ball.dx > canvas.width - ball.radius ||
            ball.x + ball.dx < ball.radius
        ) {
            ball.dx = -ball.dx;
        }

        if (ball.y + ball.dy < ball.radius) {
            ball.dy = -ball.dy; // Bounce off the top edge
        } else if (ball.y + ball.dy > canvas.height - ball.radius) {
            if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
                // Calculate collision point relative to the paddle's center
                const paddleCenter: number = paddle.x + paddle.width / 2;
                const collisionPoint: number = ball.x - paddleCenter;

                // Normalize collision point to range [-1, 1]
                const normalizedCollisionPoint: number = collisionPoint / (paddle.width / 2);

                // Calculate bounce angle (maximum 60 degrees in radians)
                const maxBounceAngle: number = (60 * Math.PI) / 180;
                const bounceAngle: number = normalizedCollisionPoint * maxBounceAngle;

                // Calculate the speed of the ball
                const speed: number = Math.sqrt(ball.dx * ball.dx + ball.dy * ball.dy);

                // Update velocity components based on bounce angle
                ball.dx = speed * Math.sin(bounceAngle);
                ball.dy = -speed * Math.cos(bounceAngle);
            } else {
                game.player.lives--; // Lose a life
                if (game.player.lives <= 0) {
                    game.pause();
                    alert("Game Over!");
                    this.resetGame();
                    // document.location.reload()
                } else {
                    // Reset ball position
                    ball.resetPosition(canvas);
                    paddle.x = (canvas.width - paddle.width) / 2;
                }
            }
        }
        this.collisionDetection();

        ball.x += ball.dx;
        ball.y += ball.dy;
    }

    collisionDetection() {
        const {
            bricks,
            ball,
            settings,
            game,
            // game: { player },
        } = this.scene;

        // const gamePlayer = game.player

        for (let c = 0; c < bricks.brickColumnCount; c++) {
            for (let r = 0; r < bricks.brickRowCount; r++) {
                const b = bricks.bricks[c][r];
                if (
                    b.status === 1 &&
                    ball.x > b.x &&
                    ball.x < b.x + settings.brickWidth &&
                    ball.y > b.y &&
                    ball.y < b.y + settings.brickHeight
                ) {
                    ball.dy = -ball.dy;
                    b.status = 0; // Remove the brick

                    game.player.score++;
                    // player.updatePlayerStatus() // Update score display
                    if (
                        game.player.score ===
                        bricks.brickColumnCount * bricks.brickRowCount
                    ) {
                        alert("YOU WIN, CONGRATULATIONS!");
                        this.resetGame()
                        // this.onGameWon()
                    }
                }
            }
        }
    }
}
