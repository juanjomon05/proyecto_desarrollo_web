<script setup lang="ts">
// external imports
import { ref, onMounted, computed, watch } from 'vue'
import Chart from 'chart.js/auto'
import ApexCharts from 'apexcharts'

// internal imports
import { ActivityService } from '@/services/ActivityService'
import { SubjectService } from '@/services/SubjectService'
import DataTable from '@/components/DataTable.vue'
import StatusBadge from '@/components/StatusBadge.vue'
import FilterSelect from '@/components/FilterSelect.vue'
import ChartCard from '@/components/ChartCard.vue'
import type { ActivityInterface, ActivityStatus } from '@/interfaces/ActivityInterface'
import type { SubjectInterface } from '@/interfaces/SubjectInterface'

// reactive variables
const subjects = ref<SubjectInterface[]>([])
const activities = ref<ActivityInterface[]>([])
const selectedSubjectId = ref('')

// variables
const columns = [
  { key: 'title', label: 'Título' },
  { key: 'subjectName', label: 'Materia' },
  { key: 'status', label: 'Estado' },
  { key: 'grade', label: 'Nota' }
]

// charts
const barCanvas = ref<HTMLCanvasElement | null>(null)
let barChart: Chart | null = null

const donutEl = ref<HTMLDivElement | null>(null)
let donutChart: ApexCharts | null = null

// lifecycle
onMounted(() => {
  subjects.value = SubjectService.getSubjects()
  activities.value = ActivityService.getActivities()
  renderCharts()
})

// watchers
watch(selectedSubjectId, renderCharts)

// computed variables
const subjectOptions = computed(() => [
  { value: '', label: 'Todas las materias' },
  ...subjects.value.map(s => ({ value: String(s.id), label: s.name }))
])

const filteredActivities = computed(() => {
  if (!selectedSubjectId.value) return activities.value
  return activities.value.filter(a => String(a.subjectId) === selectedSubjectId.value)
})

// functions
function subjectName(subjectId: number): string {
  return subjects.value.find(s => s.id === subjectId)?.name || 'Desconocida'
}

function statusCounts(): Record<ActivityStatus, number> {
  const counts: Record<ActivityStatus, number> = { pendiente: 0, 'en progreso': 0, completada: 0 }
  filteredActivities.value.forEach(a => { counts[a.status] = (counts[a.status] || 0) + 1 })
  return counts
}

function renderCharts(): void {
  const counts = statusCounts()

  if (barChart) barChart.destroy()
  if (barCanvas.value) {
    barChart = new Chart(barCanvas.value, {
      type: 'bar',
      data: {
        labels: Object.keys(counts),
        datasets: [{ label: 'Actividades por estado', data: Object.values(counts) }]
      }
    })
  }

  if (donutChart) donutChart.destroy()
  if (donutEl.value) {
    donutChart = new ApexCharts(donutEl.value, {
      chart: { type: 'donut', height: 280 },
      series: Object.values(counts),
      labels: Object.keys(counts),
      legend: { position: 'bottom' }
    })
    donutChart.render()
  }
}
</script>

<template>
  <div class="page">
    <div class="page-header">
      <h1>Dashboard de administrador</h1>
      <FilterSelect v-model="selectedSubjectId" :options="subjectOptions" label="Materia" />
    </div>

    <div class="card">
      <DataTable :columns="columns" :rows="filteredActivities" row-key="id" empty-text="No hay actividades para este filtro.">
        <template #cell-subjectName="{ row }">
          {{ subjectName(row.subjectId) }}
        </template>
        <template #cell-status="{ row }">
          <StatusBadge :status="row.status" />
        </template>
        <template #cell-grade="{ row }">
          {{ row.grade ?? '—' }}
        </template>
      </DataTable>
    </div>

    <div class="grid charts-grid">
      <ChartCard title="Por estado (Chart.js)">
        <canvas ref="barCanvas" height="220"></canvas>
      </ChartCard>
      <ChartCard title="Distribución (ApexCharts)">
        <div ref="donutEl"></div>
      </ChartCard>
    </div>
  </div>
</template>

<style scoped>
.charts-grid {
  grid-template-columns: 1fr;
}

@media (min-width: 860px) {
  .charts-grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
