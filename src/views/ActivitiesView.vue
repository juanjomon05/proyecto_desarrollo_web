<script setup>
import { ref, onMounted, computed } from 'vue'
import { getAllActivities } from '@/services/activityService'
import { getAllSubjects } from '@/services/subjectService'

const activities = ref([])
const subjects = ref([])
const selectedSubjectId = ref('')

onMounted(() => {
  activities.value = getAllActivities()
  subjects.value = getAllSubjects()
})

const filteredActivities = computed(() => {
  if (!selectedSubjectId.value) return activities.value
  return activities.value.filter(a => a.subjectId === selectedSubjectId.value)
})

function subjectName(subjectId) {
  return subjects.value.find(s => s.id === subjectId)?.name || 'Desconocida'
}
</script>

<template>
  <main>
    <h1>Actividades</h1>

    <label for="subjectFilter">Filtrar por materia</label>
    <select id="subjectFilter" v-model="selectedSubjectId">
      <option value="">Todas</option>
      <option v-for="subject in subjects" :key="subject.id" :value="subject.id">
        {{ subject.name }}
      </option>
    </select>

    <table>
      <thead>
        <tr>
          <th>Título</th>
          <th>Materia</th>
          <th>Tipo</th>
          <th>Vence</th>
          <th>Estado</th>
          <th>Nota</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="activity in filteredActivities" :key="activity.id">
          <td>{{ activity.title }}</td>
          <td>{{ subjectName(activity.subjectId) }}</td>
          <td>{{ activity.type }}</td>
          <td>{{ activity.dueDate }}</td>
          <td>{{ activity.status }}</td>
          <td>{{ activity.grade ?? '—' }}</td>
          <td><router-link :to="`/activities/${activity.id}/edit`">Editar</router-link></td>
        </tr>
      </tbody>
    </table>

    <router-link to="/activities/new">+ Nueva actividad</router-link>
  </main>
</template>