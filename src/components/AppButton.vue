<script setup lang="ts">

</script>

<template>
  <button class="app-button" @click="$emit('click')">
    <slot />
  </button>
</template>

<style scoped>
.app-button {
  padding: 10px 20px;
  background-color: var(--color-primary);
  color: var(--color-bg-light);
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.app-button:hover {
  background-color: var(--color-accent);
}
</style>

