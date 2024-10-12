<!-- src/components/EducationEntry.vue -->
<template>
  <div class="education-entry">
    <h4>{{ education.degree }}</h4>
    <div>{{ education.institution }}, {{ education.location }}, {{ education.duration }}</div>
    <ul>
      <li v-for="(detail, index) in education.details" :key="index">
        {{ detail }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
defineProps<{ education: any }>();
</script>

<style scoped>
.education-entry {
  margin-bottom: 20px;
}
</style>
