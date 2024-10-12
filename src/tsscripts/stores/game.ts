import { ref } from 'vue'
import { defineStore } from 'pinia'

const defaultPlayerState = {
  score: 0,
  lives: 3
}

export const useGameStore = defineStore('game', () => {
  let requestAnimationFrameValue = ref(0)
  let player = ref({
    ...defaultPlayerState
  })

  const resetPlayer = function () {
    player.value = {
      ...defaultPlayerState
    }
  }

  function pause() {
    cancelAnimationFrame(requestAnimationFrameValue.value)
  }

  return {
    requestAnimationFrameValue,
    player,
    resetPlayer,
    pause
  }
})
