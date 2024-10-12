<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DifficultySelector',
  props: {
    defaultDifficulty: {
      type: String,
      default: null
    }
  },
  emits: ['difficultySelected'],
  setup(props, { emit }) {
    const difficulties = ['Easy', 'Medium', 'Hard', 'Asian']

    function DifficultySelectionHandler(difficulty: string) {
      emit('difficultySelected', difficulty)
    }

    return { difficulties, DifficultySelectionHandler }
  }
})
</script>

<template>
  <div class="difficulty-selector">
    <h2>Select Game Difficulty</h2>
    <div class="difficulty-buttons">
      <button
          v-for="level in difficulties"
          :key="level"
          @click="DifficultySelectionHandler(level)"
      >
        {{ level }}
      </button>
    </div>
  </div>
</template>


<style scoped>
.difficulty-selector {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--color-bg-light);
  padding: 2rem;
  border-radius: 8px;
  margin: 2rem;
}

h2 {
  color: var(--color-primary);
  margin-bottom: 1rem;
}

.difficulty-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.difficulty-buttons button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: var(--color-primary);
  color: var(--color-bg-light);
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.difficulty-buttons button:hover {
  background-color: var(--color-accent);
}
</style>

