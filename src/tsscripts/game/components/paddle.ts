/*
 * Manages the paddle's properties and functions, including movement and rendering.
 */
// import * as dat from 'dat.gui';
import { GameSettings } from '@/tsscripts/game/shared/settings'

export class Paddle {
  public height: number
  public width: number
  public x: number

  constructor(canvas: HTMLCanvasElement, settings: GameSettings) {
    this.height = settings.paddleHeight
    this.width = settings.paddleWidth
    this.x = (canvas.width - this.width) / 2

    /*
     * For production build, then paddle width is set according to the canvas's width.
     * This line can be un-commanded for the flexibility of changing parameters while developing.
     * */

    // const gui = new dat.GUI();
    //
    // var obj = {
    //   paddleWidth: 100
    // }
    // gui.add(obj, 'paddleWidth').step(5).onChange(() =>{
    //   this.width = obj.paddleWidth
    // });
  }

  public draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {
    ctx.beginPath()
    ctx.rect(this.x, canvas.height - this.height, this.width, this.height)
    ctx.fillStyle = '#0095DD'
    ctx.fill()
    ctx.closePath()
  }
}
