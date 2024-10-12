/*
 * Contains game settings and constants,
 * such as difficulty levels, game dimensions, and any configurable parameters.
 */

export class GameSettings {
  public brickRowCount: number
  public brickColumnCount: number
  public brickWidth: number
  public brickHeight: number
  public brickPadding: number
  public brickOffsetTop: number
  public brickOffsetLeft: number

  public ballSpeed: number = 1

  public paddleHeight: number = 10
  public paddleWidth: number = 1000

  public difficulty: string

  constructor(difficulty: string) {
    this.difficulty = difficulty
    console.log(`Initializing game with difficulty: ${this.difficulty}`)

    switch (difficulty) {
      case 'Easy':
        this.ballSpeed = 2
        break
      case 'Medium':
        this.ballSpeed = 4
        break
      case 'Hard':
        this.ballSpeed = 8
        break
      case 'Asian':
        this.ballSpeed = 12
        break
      default:
        this.ballSpeed = 1
        break
    }
    console.log(`Initializing ball speed: ${this.ballSpeed}`)
    this.brickRowCount = 5
    this.brickColumnCount = 8
    this.brickWidth = 75
    this.brickHeight = 20
    this.brickPadding = 20
    this.brickOffsetTop = 30
    this.brickOffsetLeft = 30
    // this.paddleHeight = 10
    // this.paddleWidth = 100
  }
}
