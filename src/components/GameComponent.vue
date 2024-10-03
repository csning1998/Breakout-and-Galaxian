<script setup lang="ts">
import { useTemplateRef, onMounted, onUnmounted } from 'vue'
//import { defineProps } from 'vue'
import { initializeCanvas } from '@/game/core/canvas'
import { GameSettings } from '@/game/shared/settings'
import { Player } from '@/game/components/player'
import { Ball } from '@/game/components/ball'
import { Paddle } from '@/game/components/paddle'
import { Bricks } from '@/game/components/bricks'
import { InputHandler } from '@/game/core/input'
import { gameLogic } from '@/game/core/gameLogic'
import { useGameStore } from '@/stores/game'
const props = defineProps({
  difficulty: {
    type: String as PropType<string>,
    required: true
  }
})
console.log('Received Difficulty:', props.difficulty)

// const gameCanvas = ref<HTMLCanvasElement | null>(null)
// const gameCanvas: HTMLCanvasElement = null

const gameCanvas: HTMLCanvasElement = useTemplateRef('gameCanvas')
const score: number = 0
const lives: number = 3

const game = useGameStore()

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
  const player = new Player()
  console.log('Initialized Player: ', player)

  const ball = new Ball(gameCanvas.value, settings)
  console.log('Initialized Ball: ', ball)

  const paddle = new Paddle(gameCanvas.value, settings)
  console.log('Initialized Paddle: ', Paddle)

  const bricks = new Bricks(settings)
  console.log('Initialized Brick: ', Bricks)

  // Initialize input handler
  const inputHandler = new InputHandler(paddle, gameCanvas.value)
  console.log('Initialized InputHandler: ', inputHandler)

  // Start the game loop
  try {
    gameLogic(ctx, gameCanvas.value, settings, player, ball, paddle, bricks, inputHandler)
  } catch (error) {
    console.error('=== Game-loop Failed ===\n', error)
  }

  onUnmounted(() => {
    cancelAnimationFrame(game.requestAnimationFrameValue)
  })
})
</script>

<template>
  <div class="game-container">
    <canvas ref="gameCanvas" width="800" height="600"></canvas>
    <p>Score: {{ score }}</p>
    <p>Lives: {{ lives }}</p>
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
