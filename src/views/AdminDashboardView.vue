<script setup>
import { ref, onMounted, computed } from 'vue'
import Chart from 'chart.js/auto'
import ApexCharts from 'apexcharts'
import { getAllSubjects } from '@/services/subjectService'
import { getAllActivities } from '@/services/activityService'

const subjects = ref([])
const activities = ref([])
const selectedSubjectId = ref('')

const barCanvas = ref(null)
let barChart = null

const donutEl = ref(null)
let donutChart = null

onMounted(() => {
  subjects.value = getAllSubjects()
  activities.value = getAllActivities()
  renderCharts()
})

const filteredActivities = computed(() => {
  if (!selectedSubjectId.value) return activities.value
  return activities.value.filter(a => a.subjectId === selectedSubjectId.value)
})

function subjectName(subjectId) {
  return subjects.value.find(s => s.id === subjectId)?.name || 'Desconocida'
}

function statusCounts() {
  const counts = { pendiente: 0, 'en progreso': 0, completada: 0 }
  filteredActivities.value.forEach(a => { counts[a.status] = (counts[a.status] || 0) + 1 })
  return counts
}

function renderCharts() {
  const counts = statusCounts()

  if (barChart) barChart.destroy()
  barChart = new Chart(barCanvas.value, {
    type: 'bar',
    data: {
      labels: Object.keys(counts),
      datasets: [{ label: 'Actividades por estado', data: Object.values(counts) }]
    }
  })

  if (donutChart) donutChart.destroy()
  donutChart = new ApexCharts(donutEl.value, {
    chart: { type: 'donut', height: 280 },
    series: Object.values(counts),
    labels: Object.keys(counts),
    legend: { position: 'bottom' }
  })
  donutChart.render()
}
</script>

<template>
  <main>
    <h1>Dashboard de administrador</h1>

    <label for="subjectFilter">Filtrar por materia</label>
    <select id="subjectFilter" v-model="selectedSubjectId" @change="renderCharts">
      <option value="">Todas</option>
      <option v-for="s in subjects" :key="s.id" :value="s.id">{{ s.name }}</option>
    </select>

    <table>
      <thead><tr><th>Título</th><th>Materia</th><th>Estado</th><th>Nota</th></tr></thead>
      <tbody>
        <tr v-for="a in filteredActivities" :key="a.id">
          <td>{{ a.title }}</td>
          <td>{{ subjectName(a.subjectId) }}</td>
          <td>{{ a.status }}</td>
          <td>{{ a.grade ?? '—' }}</td>
        </tr>
      </tbody>
    </table>

    <div style="display: flex; gap: 32px; flex-wrap: wrap;">
      <div style="flex: 1; min-width: 280px;">
        <h2>Por estado (Chart.js)</h2>
        <canvas ref="barCanvas" height="200"></canvas>
      </div>
      <div style="flex: 1; min-width: 280px;">
        <h2>Distribución (ApexCharts)</h2>
        <div ref="donutEl"></div>
      </div>
    </div>
  </main>
</template>