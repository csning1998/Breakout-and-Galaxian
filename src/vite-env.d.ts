///<reference path=""

import { Ball } from "@/game/components/ball.js";
import { Paddle } from "@/game/components/paddle.js";
import { Bricks } from "@/game/components/bricks.js";
import { InputHandler } from "./input.js";
import { GameSettings } from "@/game/shared/settings.js";

declare global {
  interface Scene {
    game: any;
    ctx: CanvasRenderingContext2D;
    ball: Ball;
    canvas: HTMLCanvasElement;
    paddle: Paddle;
    bricks: Bricks;
    settings: GameSettings;
    inputHandler: InputHandler;
  }
}

// Ref: https://stackoverflow.com/questions/42233987/how-to-configure-custom-global-interfaces-d-ts-files-for-typescript
