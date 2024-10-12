<template>
  <h4 class="section-headline">{{ title }}</h4>
</template>

<script setup lang="ts">
defineProps<{ title: string }>();
</script>

<style scoped>
.section-headline {
  /* Your styles here */
}
</style>
