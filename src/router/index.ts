/// <reference types="vite/client" />

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GameView from '../views/GameView.vue'
import AboutView from '../views/AboutView.vue'
import AccomplishmentView from '../views/AccomplishmentView.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/game', name: 'Game', component: GameView },
  { path: '/about', name: 'About', component: AboutView },
  {
    path: '/accomplishment',
    name: 'Accomplishment',
    component: AccomplishmentView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
