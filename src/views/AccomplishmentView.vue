<script lang="ts">
import { defineComponent } from 'vue'
import AccomplishmentList from '@/components/AccomplishmentList.vue'

export default defineComponent({
  name: 'UserAccomplishments',
  components: { AccomplishmentList }
})
</script>

<template>
  <main>
    <AccomplishmentList />
  </main>
</template>

<style scoped></style>
