<script setup lang="ts">
import { RouterView } from 'vue-router'
import WebIntro from './components/WebIntro.vue'
</script>

<template>
  <header>
    <div class="header-content">
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" />
      <WebIntro msg="Welcome to the Breakout and Galaxian Game" />
    </div>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/accomplishment">Accomplishment</RouterLink>
    </nav>
  </header>
  <RouterView />
</template>


<style scoped>
header {
  background-color: var(--color-surface);
  color: var(--color-text);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo {
  width: 80px;
  height: 80px;
  margin-bottom: 1rem;
}

nav {
  margin-top: 1rem;
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
    flex-direction: row;
  }

  .logo {
    margin-right: 1rem;
    margin-bottom: 0;
  }
}
</style>
