<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { initializeCanvas } from '@/game/core/canvas';
import { GameSettings } from '@/game/shared/settings';
import { Ball } from '@/game/components/ball';
import { Paddle } from '@/game/components/paddle';
import { Bricks } from '@/game/components/bricks';
import { InputHandler } from '@/game/core/input';
import { GameLogic } from '@/game/core/game-logic';
import { useGameStore } from '@/stores/game';
import { useRouter } from 'vue-router';

const props = defineProps({
  difficulty: {
    type: String as PropType<string>,
    required: true,
  },
});
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
  console.log('Canvas element found:', gameCanvas.value);

  // Initialize canvas and context
  const {ctx} = initializeCanvas(gameCanvas.value);
  console.log('Canvas context initialized:', ctx);

  // Initialize game settings
  const settings = new GameSettings(props.difficulty);

  // Initialize game components
  const ball = new Ball(gameCanvas.value, settings);
  console.log('Initialized Ball:', ball);

  const paddle = new Paddle(gameCanvas.value, settings);
  console.log('Initialized Paddle:', paddle);

  const bricks = new Bricks(settings);
  console.log('Initialized Bricks:', bricks);

  // Initialize input handler
  const inputHandler = new InputHandler(paddle, gameCanvas.value, () => {
    gameLogic.togglePause();
  });
  console.log('Initialized InputHandler:', inputHandler);

  // Create scene object with inputHandler included
  var scene = {
    game,
    ctx,
    canvas: gameCanvas.value,
    settings,
    ball,
    paddle,
    bricks,
    inputHandler, // Include inputHandler here
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
    if (inputHandler) {
      inputHandler.destroy();
    }
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
    isGamePaused.value = !isGamePaused.value; // 切换暂停状态
  }
}

function restartGame() {
  if (gameLogic) {
    gameLogic.resetGame();
    gameLogic.resume();
  }
}
</script>


<template>
  <section class="game-container">
    <p>Score: {{ game.player.score }}</p>
    <p>Lives: {{ game.player.lives }}</p>
    <canvas ref="gameCanvas" width="800" height="600"></canvas>
    <div class="controls">
      <button @click="togglePauseGame">{{ isGamePaused ? 'Resume' : 'Pause' }}</button>
      <button @click="restartGame">Restart</button>
    </div>
  </section>
</template>

<style scoped>
.game-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

canvas {
  border: 1px solid #ccc;
  margin-top: 20px;
}
</style>
