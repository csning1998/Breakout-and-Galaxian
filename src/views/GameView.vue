<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import GameComponent from '@/components/GameComponent.vue'

const route = useRoute()
const router = useRouter()

const difficulty = ref<string>((route.query.difficulty as string) || 'normal')
console.log('GameView loaded with difficulty:', difficulty.value)

</script>

<template>
  <div class="game-view-container">
<!--    <h2>Breakout and Galaxian Game</h2>-->
    <!--    Send the selected difficulty to GameComponent to initialize the game.-->
    <GameComponent :difficulty="difficulty" />
  </div>
</template>

<style scoped>
.game-view-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin: 2rem auto;
}

h2 {
  color: var(--color-primary);
  margin-bottom: 1rem;
}
</style>
