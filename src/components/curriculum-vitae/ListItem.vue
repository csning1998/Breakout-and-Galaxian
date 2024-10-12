<!-- src/components/ListItem.vue -->
<template>
  <li>{{ item }}</li>
</template>

<script setup lang="ts">
defineProps<{ item: string }>();
</script>

<style scoped>
/* Your styles here */
</style>
