/*
 * Contains the main game loop and logic, including collision detection and game updates.
 */


export class GameLogic {
  private scene: Scene;
  public onGameWon = function(){}
  constructor(scene: Scene) {
    console.log("scene", scene);

    this.scene = scene;
    this.loop();
  }

  private loop() {
    // console.log("=== GameLoop Started ===");
    // setInterval(() => {
    //   console.log('game.requestAnimationFrameValue', game.requestAnimationFrameValue)
    // }, 1000)
    try {
      const { ctx, canvas, bricks, ball, paddle, inputHandler, game } =
        this.scene;

      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw score and lives
      bricks.draw(ctx);
      ball.draw(ctx);
      paddle.draw(ctx, canvas);

      inputHandler.update(paddle, canvas);
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

    const { ball, paddle, canvas, game } = this.scene;

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
        ball.dy = -ball.dy; // Bounce off the paddle
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
            this.onGameWon()
          }
        }
      }
    }
  }

  resetGame() {
    const { game, ball, paddle, bricks, canvas } = this.scene;

    game.resetPlayer();
    // Reset ball and paddle positions
    ball.resetPosition(canvas);
    paddle.x = (canvas.width - paddle.width) / 2;

    // Reset bricks
    bricks.resetBricks();
  }
}
