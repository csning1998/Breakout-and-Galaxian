/*
 * Contains the main game loop and logic, including collision detection and game updates.
 */

import { Ball } from '@/game/components/ball.js'
import { Paddle } from '@/game/components/paddle.js'
import { Bricks } from '@/game/components/bricks.js'
import { Player } from '@/game/components/player.js'
import { InputHandler } from './input.js'
import { GameSettings } from '@/game/shared/settings.js'

import { useGameStore } from '@/stores/game'
export function gameLogic(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  settings: GameSettings,
  player: Player,
  ball: Ball,
  paddle: Paddle,
  bricks: Bricks,
  inputHandler: InputHandler
) {
  console.log('=== GameLoop Started ===')
  const game = useGameStore()

  // setInterval(() => {
  //   console.log('game.requestAnimationFrameValue', game.requestAnimationFrameValue)
  // }, 1000)
  function loop(): void {
    try {
      // console.log('=== Start looping ===')
      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw score and lives
      bricks.draw(ctx)
      ball.draw(ctx)
      paddle.draw(ctx, canvas)

      // Update game objects
      drawScore(ctx, player)
      drawLives(ctx, player, canvas)
      inputHandler.update(paddle, canvas)
      updateBallPosition(ball, canvas, paddle, player, bricks, settings)

      game.requestAnimationFrameValue = requestAnimationFrame(loop)
      // Request the next animation frame
    } catch (err) {
      console.error('=== Error in game loop ===\n', err)
    }
  }
  loop()
}

function updateBallPosition(
  ball: Ball,
  canvas: HTMLCanvasElement,
  paddle: Paddle,
  player: Player,
  bricks: Bricks,
  settings: GameSettings
) {
  // Bounce off the left and right edges
  if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
    ball.dx = -ball.dx
  }

  if (ball.y + ball.dy < ball.radius) {
    ball.dy = -ball.dy // Bounce off the top edge
  } else if (ball.y + ball.dy > canvas.height - ball.radius) {
    if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
      ball.dy = -ball.dy // Bounce off the paddle
    } else {
      player.lives-- // Lose a life
      player.updatePlayerStatus() // Update lives display
      if (player.lives <= 0) {
        alert('Game Over!')
        resetGame(player, ball, paddle, bricks, settings, canvas)
        document.location.reload()
      } else {
        // Reset ball position
        ball.resetPosition(canvas)
        paddle.x = (canvas.width - paddle.width) / 2
      }
    }
  }
  collisionDetection(ball, bricks, player, settings)

  ball.x += ball.dx
  ball.y += ball.dy
}

function collisionDetection(ball: Ball, bricks: Bricks, player: Player, settings: GameSettings) {
  for (let c = 0; c < bricks.brickColumnCount; c++) {
    for (let r = 0; r < bricks.brickRowCount; r++) {
      const b = bricks.bricks[c][r]
      if (b.status === 1) {
        if (
          ball.x > b.x &&
          ball.x < b.x + settings.brickWidth &&
          ball.y > b.y &&
          ball.y < b.y + settings.brickHeight
        ) {
          ball.dy = -ball.dy
          b.status = 0 // Remove the brick
          player.score++
          player.updatePlayerStatus() // Update score display
          if (player.score === bricks.brickColumnCount * bricks.brickRowCount) {
            alert('YOU WIN, CONGRATULATIONS!')
            document.location.reload()
          }
        }
      }
    }
  }
}

function resetGame(
  player: Player,
  ball: Ball,
  paddle: Paddle,
  bricks: Bricks,
  settings: GameSettings,
  canvas: HTMLCanvasElement
): void {
  // Reset player stats
  player.lives = 3
  player.score = 0
  player.updatePlayerStatus()

  // Reset ball and paddle positions
  ball.resetPosition(canvas)
  paddle.x = (canvas.width - paddle.width) / 2

  // Reset bricks
  bricks.resetBricks()
}

function drawScore(ctx: CanvasRenderingContext2D, player: Player): void {
  ctx.font = '16px Arial'
  ctx.fillStyle = '#0095DD'
  ctx.fillText(`Score: ${player.score}`, 8, 20)
}

// Draw the player's remaining lives on the canvas
function drawLives(ctx: CanvasRenderingContext2D, player: Player, canvas: HTMLCanvasElement): void {
  ctx.font = '16px Arial'
  ctx.fillStyle = '#0095DD'
  ctx.fillText(`Lives: ${player.lives}`, canvas.width - 65, 20)
}
