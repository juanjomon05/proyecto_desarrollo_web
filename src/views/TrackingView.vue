<script setup>
import { ref, onMounted } from 'vue'
import Chart from 'chart.js/auto'
import { useUserStore } from '@/stores/userStore'
import { getDailyLogsByUser, createDailyLog } from '@/services/dailyLogService'
import { getPerformanceData } from '@/services/performanceService'

const userStore = useUserStore()

const logs = ref([])
const date = ref('')
const studyHours = ref('')
const sleepHours = ref('')
const daysWindow = ref(3)

const chartCanvas = ref(null)
let chartInstance = null

onMounted(() => {
  loadLogs()
  renderChart()
})

function loadLogs() {
  logs.value = getDailyLogsByUser(userStore.currentUser.id)
}

function handleSubmit() {
  if (!date.value || !studyHours.value || !sleepHours.value) {
    alert('Completa fecha, horas de estudio y horas de sueño.')
    return
  }

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

function renderChart() {
  const data = getPerformanceData(userStore.currentUser.id, daysWindow.value)

  if (chartInstance) chartInstance.destroy()

  chartInstance = new Chart(chartCanvas.value, {
    type: 'bar',
    data: {
      labels: data.map(d => d.activityTitle),
      datasets: [
        { label: 'Nota', data: data.map(d => d.grade), yAxisID: 'y' },
        { label: `Horas de estudio (prom. ${daysWindow.value} días previos)`, data: data.map(d => d.avgStudyHours), yAxisID: 'y1' }
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
  <main>
    <h1>Seguimiento de estudio y sueño</h1>

    <form @submit.prevent="handleSubmit">
      <div><label for="date">Fecha</label><input id="date" v-model="date" type="date" /></div>
      <div><label for="studyHours">Horas de estudio</label><input id="studyHours" v-model="studyHours" type="number" step="0.5" min="0" /></div>
      <div><label for="sleepHours">Horas de sueño</label><input id="sleepHours" v-model="sleepHours" type="number" step="0.5" min="0" /></div>
      <button type="submit">Registrar</button>
    </form>

    <table>
      <thead><tr><th>Fecha</th><th>Estudio (h)</th><th>Sueño (h)</th></tr></thead>
      <tbody>
        <tr v-for="log in logs" :key="log.id">
          <td>{{ log.date }}</td>
          <td>{{ log.studyHours }}</td>
          <td>{{ log.sleepHours }}</td>
        </tr>
      </tbody>
    </table>

    <h2>Notas vs. hábitos de estudio previos</h2>
    <label for="window">Ventana de días previos a analizar</label>
    <select id="window" v-model.number="daysWindow" @change="renderChart">
      <option :value="1">1 día</option>
      <option :value="3">3 días</option>
      <option :value="7">7 días</option>
    </select>

    <canvas ref="chartCanvas" height="120"></canvas>
  </main>
</template>