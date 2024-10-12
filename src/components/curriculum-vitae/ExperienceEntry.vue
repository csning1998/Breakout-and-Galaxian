<!-- src/components/ExperienceEntry.vue -->
<template>
  <div class="experience-entry">
    <h4 class="personal-headline">{{ experience.position }}</h4>
    <div>{{ experience.location }}, {{ experience.duration }}</div>
    <ul>
      <li v-for="(achievement, index) in experience.achievements" :key="index">
        {{ achievement }}
        <ul v-if="index === experience.achievements.length - 1 && experience.subAchievements">
          <li v-for="(subAch, subIndex) in experience.subAchievements" :key="subIndex">
            {{ subAch }}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
defineProps<{ experience: any }>();
</script>

<style scoped>
.personal-headline {
  /* Your styles here */
}
.experience-entry {
  margin-bottom: 20px;
}
</style>
