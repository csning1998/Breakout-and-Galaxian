/*
    * This is the main file that initializes the game and orchestrates the other components.
 */

import { initializeCanvas } from '../core/canvas.js';
import { GameSettings } from '../shared/settings.js';
import { Player } from '../components/player.js';
import { Ball } from '../components/ball.js';
import { Paddle } from '../components/paddle.js';
import { Bricks } from '../components/bricks.js';
import { InputHandler } from '../core/input.js';
import { gameLoop } from '../core/gameLogic.js';
import { getDifficultyFromURL } from '../shared/utils.js';

// Initialize the game when the window loads
window.onload = () =>{
    // Get game settings based on URL parameters
    const difficulty = getDifficultyFromURL();
    // game.ts
    const difficultyLevel = document.getElementById('difficulty-level') as HTMLElement;
    if (difficultyLevel) {
        // Capitalize the first letter
        difficultyLevel.textContent = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
    }
    const settings = new GameSettings(difficulty);

    // Initialize canvas and context
    const {canvas, ctx} = initializeCanvas();

    // Initialize game Components
    const player = new Player();
    const ball = new Ball(canvas, settings);
    const paddle = new Paddle(canvas, settings);
    const bricks = new Bricks(settings);

    // Initialize input handler
    const inputHandler = new InputHandler(paddle, canvas);

    // Start the game loop
    gameLoop(ctx, canvas, settings, player, ball, paddle, bricks, inputHandler);
}