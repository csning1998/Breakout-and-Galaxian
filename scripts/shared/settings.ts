/*
 * Contains game settings and constants,
 * such as difficulty levels, game dimensions, and any configurable parameters.
 */

export class GameSettings {
    public brickRowCount: number;
    public brickColumnCount: number;
    public brickWidth: number;
    public brickHeight: number;
    public brickPadding: number;
    public brickOffsetTop: number;
    public brickOffsetLeft: number;

    public ballSpeed: number;

    public paddleHeight: number;
    public paddleWidth: number;

    public difficulty: string;

    constructor(difficulty: string) {
        this.difficulty = difficulty;
        console.log(`Initializing game with difficulty: ${this.difficulty}`);

        switch (difficulty) {
            case 'easy':
                this.ballSpeed = 3;
                break;
            case 'normal':
                this.ballSpeed = 6;
                break;
            case 'hard':
                this.ballSpeed = 9;
                break;
            case 'asian':
                this.ballSpeed = 12;
                break;
            default:
                this.ballSpeed = 1;
                break;
        }
        this.brickRowCount = 5;
        this.brickColumnCount = 8;
        this.brickWidth = 75;
        this.brickHeight = 20;
        this.brickPadding = 20;
        this.brickOffsetTop = 30;
        this.brickOffsetLeft = 30;
        this.paddleHeight = 10;
        this.paddleWidth = 5000;
    }
}