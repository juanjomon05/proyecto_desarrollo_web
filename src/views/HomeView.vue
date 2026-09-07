<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { getSubjectsByUser } from '@/services/subjectService'
import { getAllActivities } from '@/services/activityService'
import { getDailyLogsByUser } from '@/services/dailyLogService'
import StatCard from '@/components/StatCard.vue'
import type { Subject } from '@/models/Subject'
import type { Activity } from '@/models/Activity'
import type { DailyLog } from '@/models/DailyLog'

const userStore = useUserStore()

const subjects = ref<Subject[]>([])
const activities = ref<Activity[]>([])
const logs = ref<DailyLog[]>([])

onMounted(() => {
  activities.value = getAllActivities()
  if (userStore.currentUser) {
    subjects.value = getSubjectsByUser(userStore.currentUser.id)
    logs.value = getDailyLogsByUser(userStore.currentUser.id)
  }
})

const pendingCount = computed(() => activities.value.filter(a => a.status === 'pendiente').length)

const avgStudyHours = computed(() => {
  if (logs.value.length === 0) return '0'
  const total = logs.value.reduce((sum, log) => sum + log.studyHours, 0)
  return (total / logs.value.length).toFixed(1)
})
</script>

<template>
  <div class="page">
    <template v-if="userStore.isLoggedIn">
      <div class="hero card">
        <h1>Hola, {{ userStore.currentUser?.name }} 👋</h1>
        <p>Lleva el control de tus materias, actividades y hábitos de estudio en un solo lugar.</p>
      </div>

      <div class="grid grid-stats">
        <StatCard icon="📚" :value="subjects.length" label="Materias activas" accent="primary" />
        <StatCard icon="📝" :value="pendingCount" label="Tareas pendientes" accent="accent" />
        <StatCard icon="⏱️" :value="`${avgStudyHours} h`" label="Promedio de estudio diario" accent="success" />
      </div>

      <div class="quick-links">
        <router-link to="/activities" class="btn btn-primary">Ver actividades</router-link>
        <router-link to="/tracking" class="btn btn-secondary">Ir a seguimiento</router-link>
        <router-link to="/subjects" class="btn btn-ghost">Ver materias</router-link>
      </div>
    </template>

    <template v-else>
      <div class="hero hero--guest card">
        <h1>StudEasy</h1>
        <p>Lleva el control de tus materias, actividades y hábitos de estudio en un solo lugar.</p>
        <router-link to="/login" class="btn btn-primary">Inicia sesión para empezar</router-link>
      </div>
    </template>
  </div>
</template>

<style scoped>
.hero {
  background: linear-gradient(135deg, var(--color-primary-light), var(--color-surface));
}

.hero h1 {
  font-size: 1.8rem;
  margin-bottom: 8px;
}

.hero--guest {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  padding: 48px 24px;
}

.quick-links {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
</style>
