/*
 * Contains game settings and constants,
 * such as difficulty levels, game dimensions, and any configurable parameters.
 */


export class GameSettings {
  public brickRowCount: number = 0
  public brickColumnCount: number = 0
  public brickWidth: number = 0
  public brickHeight: number = 0
  public brickPadding: number = 0
  public brickOffsetTop: number = 0
  public brickOffsetLeft: number = 0
  public ballSpeed: number = 1
  public paddleWidth: number = 0
  public paddleHeight: number = 0

  public difficulty: string = 'Easy'

  constructor(difficulty: string, canvas: HTMLCanvasElement) {
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
    // this.brickWidth = 75
    this.brickHeight = 20
    this.brickPadding = 20
    this.brickOffsetTop = 30
    this.brickOffsetLeft = 30


    console.log('canvas.width', canvas.width)
    // this.brickWidth = (canvas.width * 0.125) - (this.brickPadding)
    this.brickWidth = canvas.width * 0.09375

    this.paddleHeight = 10

    // if(!process.env.NODE_ENV === 'development') {
    //   this.paddleWidth = canvas.width * .25
    // }
    // this.paddleWidth = obj.paddleWidth
    // this.paddleWidth = canvas.width * .25

    
    // this.paddleWidth = 100
  }
}
