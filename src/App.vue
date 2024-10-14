<script setup lang="ts">
import { RouterView } from 'vue-router'
import WebIntro from './components/WebIntro.vue'
</script>

<template>
  <header>
    <div class="header-content">
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" />
      <WebIntro msg="Welcome to my Curriculum Vitae" class="web-intro" />
    </div>
    <nav class="nav-links">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/game">Game</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </header>
  <RouterView />
</template>


<style scoped>

*, *::before, *::after {
  box-sizing: border-box;
}

header {
  background-color: var(--color-surface);
  color: var(--color-text);
  width: 90%;
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
}

.header-content {
  display: flex;
  flex-direction: column; /* Keep column direction on all screen sizes */
  align-items: center;
  text-align: center; /* Center text inside WebIntro */
  width: 95%;
}

.logo {
  width: 80px;
  height: 80px;
  margin-bottom: 1rem;
  flex-shrink: 0;
}

nav {
  margin-top: 1rem;
}

.nav-links {
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  max-width: 100vw;
  justify-content: center; /* Make links center aligned */
  gap: 0.5rem; /* Add space between the links */
  box-sizing: border-box;
}

.nav-links a {
  color: var(--color-primary);
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: bold;
  transition: color 0.3s;
}

.nav-links a:hover {
  color: var(--color-secondary);
}

nav a {
  display: inline-block;
  margin: 0 1rem;
  color: var(--color-primary);
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: bold;
}

nav a:hover {
  color: var(--color-secondary);
}

@media (min-width: 1024px) {
  .header-content {
    align-items: center; /* Vertically center items */
    justify-content: center; /* Horizontally center items */
  }

  .logo {
    margin-right: 1rem;
    margin-bottom: 0;
  }

  .web-intro {
    text-align: center;
  }
}
</style>
