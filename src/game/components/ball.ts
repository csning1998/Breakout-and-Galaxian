/*
 * Contains the ball's properties and functions related to its movement and rendering.
 */

import { GameSettings } from '@/game/shared/settings.js'

export class Ball {
  public x!: number
  public y!: number
  public dx!: number
  public dy!: number
  public radius: number
  public speed: number

  constructor(canvas: HTMLCanvasElement, settings: GameSettings) {
    this.radius = 10
    this.speed = settings.ballSpeed
    this.resetPosition(canvas)
  }

  public resetPosition(canvas: HTMLCanvasElement): void {
    this.x = canvas.width / 2
    this.y = canvas.height - 30

    const angle = (Math.random() * Math.PI) / 2 + Math.PI / 4
    this.dx = this.speed * Math.cos(angle)
    this.dy = this.speed * Math.sin(angle)
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fillStyle = '#0095DD'
    ctx.fill()
    ctx.closePath()
  }
}
