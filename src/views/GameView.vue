<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import DifficultySelector from "@/components/game/DifficultySelector.vue";
import GameComponent from '@/components/game/GameComponent.vue';

const route = useRoute();
const router = useRouter();

const showDifficultySelector = ref(false);
function showSelector() {
  showDifficultySelector.value = true;
}

const difficulty = ref<string | null>(null);

function onDifficultySelected(selectedDifficulty: string) {
  console.log('Difficulty selected:', selectedDifficulty);
  difficulty.value = selectedDifficulty;
  showDifficultySelector.value = false;
  router.replace({ query: { difficulty: selectedDifficulty } });
}

onMounted(() => {
  if (route.query.difficulty) {
    difficulty.value = route.query.difficulty as string;
  }
});

console.log('GameView loaded with difficulty:', difficulty.value);
</script>

<template>
  <div class="home-container" v-if="!difficulty">
    <div class="home-container">
      <h2>  It's you time to make a challenge for yourself.</h2>
      <p>Ready to test your skills? Choose your difficulty and start playing!</p>
    </div>
    <button v-if="!showDifficultySelector" @click="showSelector" class="start-game-button">
      Start Game
    </button>
    <DifficultySelector v-else @difficultySelected="onDifficultySelected" />
  </div>
  <div class="game-view-container" v-else>
    <GameComponent :difficulty="<string>difficulty" />
  </div>
</template>

<style scoped>

.home-container {
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: var(--color-bg-light);
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  padding: 1cm;
  margin: 1cm auto;
  max-width: 1200px;
}

.game-view-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin: 2rem auto;
  //box-sizing: border-box;
}

h2 {
  color: var(--color-primary);
  //margin-bottom: 1rem;
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
