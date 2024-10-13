/*
 * Handles user input, such as keyboard and mouse events.
 */

import {Paddle} from '@/tsscripts/game/components/paddle'
import {GameLogic} from "@/tsscripts/game/core/game-logic";

export class InputHandler {
  private rightPressed: boolean = false;
  private leftPressed: boolean = false;
  private gameLogic: GameLogic;

  private keyDownHandlerRef: (e: KeyboardEvent) => void;
  private keyUpHandlerRef: (e: KeyboardEvent) => void;
  private mouseMoveHandlerRef: (e: MouseEvent) => void;
  private touchMoveHandlerRef: (e: TouchEvent) => void;

  constructor(
      paddle: Paddle,
      canvas: HTMLCanvasElement,
      gameLogic: GameLogic,
  ) {
    this.gameLogic = gameLogic;

    this.keyDownHandlerRef = this.keyDownHandler.bind(this);
    this.keyUpHandlerRef = this.keyUpHandler.bind(this);
    this.mouseMoveHandlerRef = (e: MouseEvent) => this.mouseMoveHandler(e, paddle, canvas);
    this.touchMoveHandlerRef = (e: TouchEvent) => this.touchMoveHandler(e, paddle, canvas);

    document.addEventListener("keydown", this.keyDownHandlerRef, false);
    document.addEventListener("keyup", this.keyUpHandlerRef, false);
    document.addEventListener("mousemove", this.mouseMoveHandlerRef, false);
    document.addEventListener("touchmove", this.touchMoveHandlerRef,{ passive: false });
  }

  private keyDownHandler(e: KeyboardEvent): void {
    if (e.key === "Right" || e.key === "ArrowRight") {
      this.rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
      this.leftPressed = true;
    } else if (e.key === "p" || e.key === "P") {
      this.gameLogic.togglePause();
    }
  }

  private keyUpHandler(e: KeyboardEvent): void {
    if (e.key === "Right" || e.key === "ArrowRight") {
      this.rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
      this.leftPressed = false;
    }
  }

  private mouseMoveHandler(
      e: MouseEvent,
      paddle: Paddle,
      canvas: HTMLCanvasElement,
  ): void {
    const relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
      paddle.x = relativeX - paddle.width / 2;
    }
  }

  private touchMoveHandler(
      e: TouchEvent,
      paddle: Paddle,
      canvas: HTMLCanvasElement,
  ): void {
    // e.preventDefault();

    const touch = e.touches[0];
    const boundingRect = canvas.getBoundingClientRect();
    const paddleCenterX =
      (touch.clientX - boundingRect.left) * (canvas.width / boundingRect.width);

    if (
      paddleCenterX > paddle.width / 2 &&
      paddleCenterX < canvas.width - paddle.width / 2
    ) {
      paddle.x = paddleCenterX - paddle.width / 2;
    }
  }

  public destroy(): void {
    document.removeEventListener("keydown", this.keyDownHandlerRef);
    document.removeEventListener("keyup", this.keyUpHandlerRef);
    document.removeEventListener("mousemove", this.mouseMoveHandlerRef);
    document.removeEventListener("touchmove", this.touchMoveHandlerRef);
  }

  public update(paddle: Paddle, canvas: HTMLCanvasElement): void {
    if (this.rightPressed && paddle.x < canvas.width - paddle.width) {
      paddle.x += 12;
    } else if (this.leftPressed && paddle.x > 0) {
      paddle.x -= 12;
    }
  }
}
