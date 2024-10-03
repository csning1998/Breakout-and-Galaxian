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
      <button v-for="level in difficulties" :key="level" @click="DifficultySelectionHandler(level)">
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
}

.difficulty-buttons {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.difficulty-buttons button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>
