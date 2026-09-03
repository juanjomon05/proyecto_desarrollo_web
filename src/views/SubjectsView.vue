<script setup>
import { ref, onMounted } from 'vue'
import { getAllSubjects } from '@/services/subjectService'

const subjects = ref([])

onMounted(() => {
  subjects.value = getAllSubjects()
})
</script>

<template>
  <main>
    <h1>Mis materias</h1>
    <ul>
      <li v-for="subject in subjects" :key="subject.id">
        <router-link :to="`/subjects/${subject.id}`">
          {{ subject.name }} — {{ subject.professor }} ({{ subject.credits }} créditos)
        </router-link>
      </li>
    </ul>
  </main>
</template>