<script setup lang="ts">
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import DifficultySelector from '@/components/DifficultySelector.vue'

const router = useRouter()
const showDifficultySelector = ref(false)
function showSelector() {
  showDifficultySelector.value = true
}

function navigate2Game(difficulty: string) {
  console.log('Navigating to GameView with difficulty:', difficulty)
  router
    .push({
      name: 'Game',
      query: { difficulty }
    })
    .catch((err) => {
      console.error('Navigation error:', err)
    })
}

onMounted(() => {
  showDifficultySelector.value = false
})
</script>

<template>
  <div class="home-container" :key="$route.fullPath">
    <button v-if="!showDifficultySelector" @click="showSelector" class="start-game-button">
      Start Game
    </button>
    <DifficultySelector v-if="showDifficultySelector" @difficultySelected="navigate2Game" />
  </div>
</template>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.start-game-button {
  padding: 20px 40px;
  font-size: 24px;
  cursor: pointer;
  margin: 20px;
}

.nav-bar a {
  margin: 0 15px;
  text-decoration: none;
  color: #333;
}

.nav-bar a:hover {
  color: #0095dd;
}
</style>
