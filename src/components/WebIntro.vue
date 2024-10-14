<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="web-intro-content">
    <h1>{{ msg }}</h1>
    <p>
      This project, which includes a personal introduction and game elements, was developed as part of the Web Fundamentals course.
    </p>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

.web-intro-content {
  width: 100%;
}

h3 {
  font-size: 1.2rem;
}

p {
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow: auto;
  max-width: 100%;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
