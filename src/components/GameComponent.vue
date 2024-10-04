<script setup lang="ts">
import { useTemplateRef, onMounted, onUnmounted } from 'vue'
//import { defineProps } from 'vue'
import { initializeCanvas } from '@/game/core/canvas'
import { GameSettings } from '@/game/shared/settings'
import { Ball } from '@/game/components/ball'
import { Paddle } from '@/game/components/paddle'
import { Bricks } from '@/game/components/bricks'
import { InputHandler } from '@/game/core/input'
import { GameLogic } from '@/game/core/game-logic'
import { useGameStore } from '@/stores/game'
import { useRouter } from 'vue-router'
// import { storeToRefs } from 'pinia'

const props = defineProps({
  difficulty: {
    type: String as PropType<string>,
    required: true
  }
})
console.log('Received Difficulty:', props.difficulty)

const gameCanvas: HTMLCanvasElement = useTemplateRef('gameCanvas')
const game = useGameStore()
const router = useRouter()

onMounted(() => {
  if (!gameCanvas.value) {
    console.error(404, 'Canvas element not found.')
    return
  }
  console.log('Canvas element found:', gameCanvas.value)

  // Initialize canvas and context
  const { ctx } = initializeCanvas(gameCanvas.value)
  console.log('Canvas context initialized:', ctx)

  // game.ts
  const settings = new GameSettings(props.difficulty)

  // Initialize game Components

  const ball = new Ball(gameCanvas.value, settings)
  console.log('Initialized Ball: ', ball)

  const paddle = new Paddle(gameCanvas.value, settings)
  console.log('Initialized Paddle: ', Paddle)

  const bricks = new Bricks(settings)
  console.log('Initialized Brick: ', Bricks)

  // Initialize input handler
  const inputHandler = new InputHandler(paddle, gameCanvas.value)
  console.log('Initialized InputHandler: ', inputHandler)

  var scene = {
    game,
    ctx,
    canvas: gameCanvas.value,
    settings,
    ball,
    paddle,
    bricks,
    inputHandler
  }

  // Start the game loop
  try {
    const gameLogic = new GameLogic(scene)

    gameLogic.onGameWon = function() {
      router.push({'name': 'Home'})
    }


  } catch (error) {
    console.error('=== Game-loop Failed ===\n', error)
  }

  onUnmounted(() => {
    game.pause()
  })
})
</script>

<template>
  <div class="game-container">
    <p>Score: {{ game.player.score }}</p>
    <p>Lives: {{ game.player.lives }}</p>
    <canvas ref="gameCanvas" width="800" height="600"></canvas>
  </div>
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
