<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getSubjectById } from '@/services/subjectService'
import { getActivitiesBySubject } from '@/services/activityService'

const route = useRoute()
const subject = ref(null)
const activities = ref([])

onMounted(() => {
  subject.value = getSubjectById(route.params.id)
  activities.value = getActivitiesBySubject(route.params.id)
})
</script>

<template>
  <main v-if="subject">
    <h1>{{ subject.name }}</h1>
    <p>{{ subject.professor }} — {{ subject.credits }} créditos</p>

    <h2>Actividades</h2>
    <ul>
      <li v-for="activity in activities" :key="activity.id">
        {{ activity.title }} ({{ activity.type }}) — vence {{ activity.dueDate }} —
        {{ activity.status }}
        <span v-if="activity.grade !== null">— nota: {{ activity.grade }}</span>
      </li>
    </ul>
    <router-link to="/activities/new">+ Nueva actividad</router-link>
  </main>
  <main v-else>
    <p>Materia no encontrada.</p>
  </main>
</template>