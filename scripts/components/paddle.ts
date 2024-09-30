/*
    * Manages the paddle's properties and functions, including movement and rendering.
 */

import {GameSettings} from "../shared/settings.js";

export class Paddle{
    public height: number;
    public width: number;
    public x: number;

    constructor(canvas: HTMLCanvasElement, settings: GameSettings) {
        this.height = settings.paddleHeight;
        this.width = settings.paddleWidth;
        this.x = (canvas.width - this.width) / 2;
    }

    public draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {
        ctx.beginPath();
        ctx.rect(this.x, canvas.height - this.height, this.width, this.height);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
}