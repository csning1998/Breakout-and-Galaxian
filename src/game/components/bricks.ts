import { GameSettings } from '@/game/shared/settings.js'

interface Brick {
  x: number
  y: number
  status: number
}

export class Bricks {
  public brickRowCount: number
  public brickColumnCount: number
  public bricks: Brick[][]
  public brickWidth: number
  public brickHeight: number
  public brickPadding: number
  public brickOffsetTop: number
  public brickOffsetLeft: number

  constructor(settings: GameSettings) {
    this.brickRowCount = settings.brickRowCount
    this.brickColumnCount = settings.brickColumnCount
    this.brickWidth = settings.brickWidth
    this.brickHeight = settings.brickHeight
    this.brickPadding = settings.brickPadding
    this.brickOffsetTop = settings.brickOffsetTop
    this.brickOffsetLeft = settings.brickOffsetLeft

    // Initialize bricks
    this.bricks = []
    for (let c = 0; c < this.brickColumnCount; c++) {
      this.bricks[c] = []
      for (let r = 0; r < this.brickRowCount; r++) {
        this.bricks[c][r] = { x: 0, y: 0, status: 1 } // Set initial position to (0,0), will be updated in drawBricks()
      }
    }
  }
  public draw(ctx: CanvasRenderingContext2D): void {
    try {
      for (let c = 0; c < this.brickColumnCount; c++) {
        for (let r = 0; r < this.brickRowCount; r++) {
          const b = this.bricks[c][r]
          if (b.status === 1) {
            const brickX = c * (this.brickWidth + this.brickPadding) + this.brickOffsetLeft
            const brickY = r * (this.brickHeight + this.brickPadding) + this.brickOffsetTop
            b.x = brickX
            b.y = brickY

            ctx.beginPath()
            console.log('Drawing Brick', b)
            ctx.rect(brickX, brickY, this.brickWidth, this.brickHeight)
            ctx.fillStyle = '#0095DD'
            ctx.fill()
            ctx.closePath()
          }
        }
      }
    } catch (error) {
      console.error('An error occurred while drawing bricks:', error)
    }
  }

  public resetBricks(): void {
    for (let c = 0; c < this.brickColumnCount; c++) {
      for (let r = 0; r < this.brickRowCount; r++) {
        this.bricks[c][r].status = 1
      }
    }
  }
}
