<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Chart from 'chart.js/auto'
import { useUserStore } from '@/stores/userStore'
import { getDailyLogsByUser, createDailyLog } from '@/services/dailyLogService'
import { getPerformanceData } from '@/services/performanceService'
import ChartCard from '@/components/ChartCard.vue'
import type { RegistroDiario } from '@/models/RegistroDiario'

const userStore = useUserStore()

const logs = ref<RegistroDiario[]>([])
const date = ref('')
const studyHours = ref('')
const sleepHours = ref('')
const daysWindow = ref(3)
const errorMessage = ref('')

const chartCanvas = ref<HTMLCanvasElement | null>(null)
let chartInstance: Chart | null = null

onMounted(() => {
  loadLogs()
  renderChart()
})

function loadLogs(): void {
  if (!userStore.currentUser) return
  logs.value = getDailyLogsByUser(userStore.currentUser.id)
}

function handleSubmit(): void {
  if (!userStore.currentUser) return

  if (!date.value || !studyHours.value || !sleepHours.value) {
    errorMessage.value = 'Completa fecha, horas de estudio y horas de sueño.'
    return
  }
  errorMessage.value = ''

  createDailyLog({
    userId: userStore.currentUser.id,
    date: date.value,
    studyHours: Number(studyHours.value),
    sleepHours: Number(sleepHours.value)
  })

  date.value = ''
  studyHours.value = ''
  sleepHours.value = ''
  loadLogs()
  renderChart()
}

function renderChart(): void {
  if (!userStore.currentUser || !chartCanvas.value) return

  const data = getPerformanceData(userStore.currentUser.id, daysWindow.value)

  if (chartInstance) chartInstance.destroy()

  chartInstance = new Chart(chartCanvas.value, {
    type: 'bar',
    data: {
      labels: data.map(d => d.activityTitle),
      datasets: [
        { label: 'Nota', data: data.map(d => d.grade ?? 0), yAxisID: 'y' },
        { label: `Horas de estudio (prom. ${daysWindow.value} días previos)`, data: data.map(d => d.avgStudyHours ?? 0), yAxisID: 'y1' }
      ]
    },
    options: {
      scales: {
        y: { type: 'linear', position: 'left', min: 0, max: 100, title: { display: true, text: 'Nota' } },
        y1: { type: 'linear', position: 'right', min: 0, grid: { drawOnChartArea: false }, title: { display: true, text: 'Horas de estudio' } }
      }
    }
  })
}
</script>

<template>
  <div class="page">
    <div class="page-header">
      <h1>Seguimiento de estudio y sueño</h1>
    </div>

    <div class="grid grid-2">
      <div class="card">
        <h2 class="section-title">Registrar día</h2>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="date">Fecha</label>
            <input id="date" v-model="date" type="date" class="input" />
          </div>
          <div class="form-group">
            <label for="studyHours">Horas de estudio</label>
            <input id="studyHours" v-model="studyHours" type="number" step="0.5" min="0" class="input" />
          </div>
          <div class="form-group">
            <label for="sleepHours">Horas de sueño</label>
            <input id="sleepHours" v-model="sleepHours" type="number" step="0.5" min="0" class="input" />
          </div>
          <p v-if="errorMessage" class="form-error">{{ errorMessage }}</p>
          <button type="submit" class="btn btn-primary">Registrar</button>
        </form>

        <h2 class="section-title section-title--spaced">Historial</h2>
        <div class="table-wrap">
          <table class="data-table">
            <thead><tr><th>Fecha</th><th>Estudio (h)</th><th>Sueño (h)</th></tr></thead>
            <tbody>
              <tr v-for="log in logs" :key="log.id">
                <td>{{ log.date }}</td>
                <td>{{ log.studyHours }}</td>
                <td>{{ log.sleepHours }}</td>
              </tr>
              <tr v-if="logs.length === 0">
                <td colspan="3" class="empty-state">Sin registros todavía.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <ChartCard title="Notas vs. hábitos de estudio previos">
        <template #actions>
          <select v-model.number="daysWindow" class="input" @change="renderChart">
            <option :value="1">1 día previo</option>
            <option :value="3">3 días previos</option>
            <option :value="7">7 días previos</option>
          </select>
        </template>
        <canvas ref="chartCanvas" height="140"></canvas>
      </ChartCard>
    </div>
  </div>
</template>

<style scoped>
.section-title {
  font-size: 1rem;
  margin-bottom: 14px;
}

.section-title--spaced {
  margin-top: 28px;
}
</style>
