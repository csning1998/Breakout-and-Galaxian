/*
 * Handles user input, such as keyboard and mouse events.
 */

import { Paddle } from '@/game/components/paddle.js'

export class InputHandler {
  private rightPressed: boolean = false
  private leftPressed: boolean = false

  constructor(paddle: Paddle, canvas: HTMLCanvasElement) {
    document.addEventListener('keydown', (e) => this.keyDownHandler(e), false)
    document.addEventListener('keyup', (e) => this.keyUpHandler(e), false)
    document.addEventListener('mousemove', (e) => this.mouseMoveHandler(e, paddle, canvas), false)
  }

  private keyDownHandler(e: KeyboardEvent): void {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
      this.rightPressed = true
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
      this.leftPressed = true
    }
  }
  private keyUpHandler(e: KeyboardEvent): void {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
      this.rightPressed = false
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
      this.leftPressed = false
    }
  }

  private mouseMoveHandler(e: MouseEvent, paddle: Paddle, canvas: HTMLCanvasElement): void {
    const relativeX = e.clientX - canvas.offsetLeft
    if (relativeX > 0 && relativeX < canvas.width) {
      paddle.x = relativeX - paddle.width / 2
    }
  }

  public update(paddle: Paddle, canvas: HTMLCanvasElement): void {
    if (this.rightPressed && paddle.x < canvas.width - paddle.width) {
      paddle.x += 12
    } else if (this.leftPressed && paddle.x > 0) {
      paddle.x -= 12
    }
  }
}
