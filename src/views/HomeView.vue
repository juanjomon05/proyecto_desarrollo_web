<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import Chart from 'chart.js/auto'
import { useUserStore } from '@/stores/userStore'
import { getSubjectsByUser } from '@/services/subjectService'
import { getActivitiesForUser, getActivitiesBySubject } from '@/services/activityService'
import { getDailyLogsByUser } from '@/services/dailyLogService'
import { calculateGradeProjection } from '@/utils/gradeProjection'
import StatCard from '@/components/StatCard.vue'
import ChartCard from '@/components/ChartCard.vue'
import type { ActivityInterface, ActivityStatus } from '@/interfaces/ActivityInterface'
import type { DailyLogInterface } from '@/interfaces/DailyLogInterface'
import type { SubjectInterface } from '@/interfaces/SubjectInterface'

const userStore = useUserStore()

const subjects = ref<SubjectInterface[]>([])
const activities = ref<ActivityInterface[]>([])
const logs = ref<DailyLogInterface[]>([])

onMounted(() => {
  if (userStore.currentUser) {
    subjects.value = getSubjectsByUser(userStore.currentUser.id)
    activities.value = getActivitiesForUser(userStore.currentUser.id)
    logs.value = getDailyLogsByUser(userStore.currentUser.id)
  }
  renderCharts()
})

const pendingCount = computed(() => activities.value.filter(a => a.status === 'pendiente').length)

const avgStudyHours = computed(() => {
  if (logs.value.length === 0) return '0'
  const total = logs.value.reduce((sum, log) => sum + log.studyHours, 0)
  return (total / logs.value.length).toFixed(1)
})

const avgSleepHours = computed(() => {
  if (logs.value.length === 0) return '0'
  const total = logs.value.reduce((sum, log) => sum + log.sleepHours, 0)
  return (total / logs.value.length).toFixed(1)
})

// % ya calificado vs % pendiente por materia, para el grafico de progreso de notas.
const subjectProgress = computed(() =>
  subjects.value.map(subject => {
    const gradedWeight = calculateGradeProjection(getActivitiesBySubject(subject.id)).gradedWeight
    return { name: subject.name, graded: gradedWeight, remaining: Math.max(0, 100 - gradedWeight) }
  })
)

const gradesCanvas = ref<HTMLCanvasElement | null>(null)
const statusCanvas = ref<HTMLCanvasElement | null>(null)
const habitsCanvas = ref<HTMLCanvasElement | null>(null)
let gradesChart: Chart | null = null
let statusChart: Chart | null = null
let habitsChart: Chart | null = null

function renderCharts(): void {
  if (gradesChart) gradesChart.destroy()
  if (gradesCanvas.value) {
    gradesChart = new Chart(gradesCanvas.value, {
      type: 'bar',
      data: {
        labels: subjectProgress.value.map(s => s.name),
        datasets: [
          { label: 'Evaluado %', data: subjectProgress.value.map(s => s.graded), backgroundColor: '#3B4CCF' },
          { label: 'Pendiente %', data: subjectProgress.value.map(s => s.remaining), backgroundColor: '#E5E7EB' }
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: { stacked: true },
          y: { stacked: true, min: 0, max: 100, title: { display: true, text: '%' } }
        }
      }
    })
  }

  const statusCounts: Record<ActivityStatus, number> = { pendiente: 0, 'en progreso': 0, completada: 0 }
  activities.value.forEach(a => { statusCounts[a.status] = (statusCounts[a.status] || 0) + 1 })

  if (statusChart) statusChart.destroy()
  if (statusCanvas.value) {
    statusChart = new Chart(statusCanvas.value, {
      type: 'doughnut',
      data: {
        labels: Object.keys(statusCounts),
        datasets: [{ data: Object.values(statusCounts), backgroundColor: ['#F59E0B', '#3B4CCF', '#16A34A'] }]
      },
      options: { responsive: true, plugins: { legend: { position: 'bottom' } } }
    })
  }

  const sortedLogs = [...logs.value].sort((a, b) => a.date.localeCompare(b.date))

  if (habitsChart) habitsChart.destroy()
  if (habitsCanvas.value) {
    habitsChart = new Chart(habitsCanvas.value, {
      type: 'line',
      data: {
        labels: sortedLogs.map(log => log.date),
        datasets: [
          { label: 'Horas de estudio', data: sortedLogs.map(log => log.studyHours), borderColor: '#3B4CCF', tension: 0.3 },
          { label: 'Horas de sueño', data: sortedLogs.map(log => log.sleepHours), borderColor: '#16A34A', tension: 0.3 }
        ]
      },
      options: { responsive: true, scales: { y: { min: 0, title: { display: true, text: 'Horas' } } } }
    })
  }
}
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
        <StatCard icon="😴" :value="`${avgSleepHours} h`" label="Promedio de sueño diario" accent="primary" />
      </div>

      <div class="grid charts-grid">
        <ChartCard title="Progreso de notas por materia">
          <canvas ref="gradesCanvas" height="220"></canvas>
        </ChartCard>
        <ChartCard title="Actividades por estado">
          <canvas ref="statusCanvas" height="220"></canvas>
        </ChartCard>
        <ChartCard title="Estudio y sueño por día" class="charts-grid__wide">
          <canvas ref="habitsCanvas" height="140"></canvas>
        </ChartCard>
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

.charts-grid {
  grid-template-columns: 1fr;
}

@media (min-width: 860px) {
  .charts-grid {
    grid-template-columns: 1fr 1fr;
  }

  .charts-grid__wide {
    grid-column: 1 / -1;
  }
}

.quick-links {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
</style>
