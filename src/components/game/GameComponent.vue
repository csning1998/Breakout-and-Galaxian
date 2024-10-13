<script setup lang="ts">
import {ref, onMounted, onUnmounted, type PropType} from 'vue';
import { initializeCanvas } from '@/tsscripts/game/core/canvas';
import { GameSettings } from '@/tsscripts/game/shared/settings';
import { Ball } from '@/tsscripts/game/components/ball';
import { Paddle } from '@/tsscripts/game/components/paddle';
import { Bricks } from '@/tsscripts/game/components/bricks';
import { GameLogic } from '@/tsscripts/game/core/game-logic';
import { useGameStore } from '@/tsscripts/stores/game';
import { useRouter } from 'vue-router';

interface Props {
  difficulty: string;
}

const props = defineProps<Props>();
console.log('Received Difficulty:', props.difficulty);

const gameCanvas = ref<HTMLCanvasElement | null>(null);
const game = useGameStore();
const router = useRouter();
const isGamePaused = ref<boolean>(false);

let gameLogic: GameLogic;

onMounted(() => {
  if (!gameCanvas.value) {
    console.error('Canvas element not found.');
    return;
  }


  // if (window.innerHeight <= 800) {
  //   gameCanvas.value.width = window.innerWidth
  // }


  console.log('Canvas element found:', gameCanvas.value);

  // Initialize canvas and context
  const {ctx} = initializeCanvas(gameCanvas.value);
  // ctx.canvas.width = 800
  // ctx.canvas.height = 600

  console.log('Canvas context initialized:', ctx);

  // Initialize game settings
  const settings = new GameSettings(props.difficulty, gameCanvas.value);

  // Initialize game components
  const ball = new Ball(gameCanvas.value, settings);
  console.log('Initialized Ball:', ball);

  const paddle = new Paddle(gameCanvas.value, settings);
  console.log('Initialized Paddle:', paddle);

  const bricks = new Bricks(settings);
  console.log('Initialized Bricks:', bricks);

  // Initialize input handler
  // const inputHandler = new InputHandler(paddle, gameCanvas.value, () => {
  //   gameLogic.togglePause();
  // });


  // console.log('Initialized InputHandler:', inputHandler);

  // Create scene object with inputHandler included
  let scene = {
    game,
    ctx,
    canvas: gameCanvas.value!,
    settings,
    ball,
    paddle,
    bricks,
    // inputHandler, // Include inputHandler here
  };

  // Start the game loop
  try {
    gameLogic = new GameLogic(scene);

    gameLogic.onGameWon = function () {
      router.push({name: 'Home'});
    };
  } catch (error) {
    console.error('=== Game-loop Failed ===\n', error);
  }

  onUnmounted(() => {
    game.pause();
    // if (inputHandler) {
    //   inputHandler.destroy();
    // }
    if (gameLogic) {
      gameLogic.pause();
    }
  })
})
// Control game functions
function togglePauseGame() {
  if (gameLogic) {
    if (isGamePaused.value) {
      gameLogic.resume();
    } else {
      gameLogic.pause();
    }
    isGamePaused.value = !isGamePaused.value;
  }
}

function restartGame() {
  if (gameLogic) {
    gameLogic.resetGame();
    gameLogic.resume();
  }
}
function return2Home() {
  gameLogic.resetGame();
  router.push({name: 'Home'})
}

</script>

<template>
  <section class="game-container">
    <div class="game-info">
      <p>Difficulty: {{ difficulty }}</p>
      <p>Score: {{ game.player.score }}</p>
      <p>Lives: {{ game.player.lives }}</p>
    </div>
    <div id="canvas-container">
      <canvas ref="gameCanvas" width="800" height="600"></canvas>
    </div>
    <div class="controls">
      <button @click="togglePauseGame" class="functionality-button">{{ isGamePaused ? 'Resume' : 'Pause' }}</button>
      <button @click="restartGame" class="functionality-button">Restart</button>
      <button @click="return2Home" class="functionality-button">Return to Home</button>
    </div>
  </section>
</template>

<style scoped>
.game-container {
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: var(--color-bg-light);
  padding: 1rem;
  border-radius: 8px;
  margin: 2rem auto;
  max-width: 800px;
}

.game-info {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.game-info p {
  margin: 0;
  font-weight: bold;
  color: var(--color-text);
}

canvas {
  border: 1px solid var(--color-primary);
  margin-top: 20px;
  background-color: #000;
}

.controls {
  margin-top: 20px;
}

.controls button {
  margin: 0 10px;
  padding: 10px 20px;
  background-color: var(--color-primary);
  color: var(--color-bg-light);
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.controls button:hover {
  background-color: var(--color-accent);
}

#canvas-container {
  max-width: 90vw;
}

canvas {
  /* width: 800px; */
  width: 100%;
  height: 600px;
}

</style>
