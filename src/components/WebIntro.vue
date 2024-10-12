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
    <p>
      This project will be continuing updated during my free time, adding more elements based on the skills I acquire.
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
  white-space: pre-wrap; /* Allow the text to wrap */
  word-wrap: break-word; /* Break long words */
  overflow: auto; /* Add scroll if content overflows */
  max-width: 100%; /* Ensure it doesn't exceed parent width */
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
