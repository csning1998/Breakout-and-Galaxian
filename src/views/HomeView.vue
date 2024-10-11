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
  <div class="home-container">
    <h2>  It's you time to make a challenge for yourself.</h2>
    <p>Ready to test your skills? Choose your difficulty and start playing!</p>
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
  background-color: var(--color-bg-light);
  padding: 2rem;
  border-radius: 8px;
  margin: 2rem auto; /* 居中容器 */
  max-width: 600px;
}

h2 {
  color: var(--color-primary);
  margin-bottom: 1rem;
}

p {
  color: var(--color-text);
  margin-bottom: 2rem;
}

.start-game-button {
  padding: 15px 30px;
  font-size: 18px;
  background-color: var(--color-primary);
  color: var(--color-bg-light);
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.start-game-button:hover {
  background-color: var(--color-accent);
}
</style>
