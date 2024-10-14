<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const goToAbout = () => {
  router.push('/about')
}
</script>

<template>
  <section class="home-container">
    <h2>Hello World!</h2>
    <div class="hello-world-info">
      <p>Welcome to my Web project using Vue + Vite.</p>
      <p>This is a simple Hello World page with Google Material Dark 2 styling.</p>
    </div>
    <button @click="goToAbout">Learn More About Us</button>
  </section>
</template>

<style scoped>
.home-container {
  width: 90%;
  max-width: 1200px;
  padding: 1cm;
  margin: 1cm auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: var(--color-bg-light);
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}

.hello-world-info {
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

h2 {
  color: var(--color-primary);
  margin-bottom: 1rem;
}

p {
  color: var(--color-text);
  margin-bottom: 2rem;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: var(--color-primary);
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #36a574;
}
</style>
