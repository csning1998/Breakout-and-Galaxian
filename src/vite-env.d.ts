///<reference path=""

import { Ball } from "@/tsscripts/game/components/ball.js";
import { Paddle } from "@/tsscripts/game/components/paddle.js";
import { Bricks } from "@/tsscripts/game/components/bricks.js";
import { InputHandler } from "./input.js";
import { GameSettings } from "@/tsscripts/game/shared/settings.js";

declare global {
  interface Scene {
    game: any;
    ctx: CanvasRenderingContext2D;
    ball: Ball;
    canvas: HTMLCanvasElement;
    paddle: Paddle;
    bricks: Bricks;
    settings: GameSettings;
    // inputHandler: InputHandler;
  }
}

interface ImportMetaEnv {
  readonly VITE_YOUR_URL: string;
  readonly VITE_REALM: string;
  readonly VITE_CLIENT_ID: string;

}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Ref: https://stackoverflow.com/questions/42233987/how-to-configure-custom-global-interfaces-d-ts-files-for-typescript
