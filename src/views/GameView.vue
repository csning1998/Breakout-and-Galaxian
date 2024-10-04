<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import GameComponent from '@/components/GameComponent.vue'

const route = useRoute()
const router = useRouter()

const difficulty = ref<string>((route.query.difficulty as string) || 'normal')
console.log('GameView loaded with difficulty:', difficulty.value)

function return2Home() {
  router.push({name: 'Home'})
}
</script>

<template>
  <div class="game-view-container">
    <h1>Breakout and Galaxian Game</h1>
    <p>
      Selected Difficulty: <strong>{{ difficulty }}</strong>
    </p>
    <!--    Send the selected difficulty to GameComponent to initialize the game.-->
    <GameComponent :difficulty="difficulty" />
    <button @click="return2Home()" class="back-to-home-button">Return to Home</button>
  </div>
</template>

<style scoped>
.game-view-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.back-to-home-button {
  margin-top: 20px;
  padding: 15px 30px;
  font-size: 18px;
  cursor: pointer;
}
</style>
