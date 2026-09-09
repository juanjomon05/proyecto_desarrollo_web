<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { getSubjectById } from '@/services/subjectService'
import { getActivitiesBySubject } from '@/services/activityService'
import { calculateGradeProjection, PASSING_GRADE } from '@/utils/gradeProjection'
import DataTable from '@/components/DataTable.vue'
import StatusBadge from '@/components/StatusBadge.vue'
import type { ActivityInterface } from '@/interfaces/ActivityInterface'
import type { SubjectInterface } from '@/interfaces/SubjectInterface'

const route = useRoute()
const subject = ref<SubjectInterface | null>(null)
const activities = ref<ActivityInterface[]>([])

const columns = [
  { key: 'title', label: 'Título' },
  { key: 'type', label: 'Tipo' },
  { key: 'dueDate', label: 'Vence' },
  { key: 'weight', label: '%' },
  { key: 'status', label: 'Estado' },
  { key: 'grade', label: 'Nota' }
]

onMounted(() => {
  const id = typeof route.params.id === 'string' ? route.params.id : ''
  subject.value = getSubjectById(id)
  activities.value = getActivitiesBySubject(id)
})

const projection = computed(() => calculateGradeProjection(activities.value))
</script>

<template>
  <div class="page" v-if="subject">
    <div class="page-header">
      <div>
        <h1>{{ subject.name }}</h1>
        <p>{{ subject.professor }} — {{ subject.credits }} créditos</p>
      </div>
      <router-link to="/activities/new" class="btn btn-primary">+ Nueva actividad</router-link>
    </div>

    <div class="card projection-card" v-if="projection.status !== 'no-data'">
      <h2 class="section-title">Proyección de nota</h2>
      <div class="projection-stats">
        <div class="projection-stat">
          <span class="projection-stat__label">Acumulado</span>
          <span class="projection-stat__value">{{ projection.achievedPoints.toFixed(2) }} / 5.0</span>
        </div>
        <div class="projection-stat">
          <span class="projection-stat__label">Evaluado</span>
          <span class="projection-stat__value">{{ projection.gradedWeight }}%</span>
        </div>
        <div class="projection-stat">
          <span class="projection-stat__label">Pendiente</span>
          <span class="projection-stat__value">{{ projection.remainingWeight }}%</span>
        </div>
      </div>

      <p v-if="projection.status === 'won'" class="projection-message projection-message--success">
        Ya aseguraste el {{ PASSING_GRADE.toFixed(1) }} en esta materia, sin importar lo que falte.
      </p>
      <p v-else-if="projection.status === 'lost'" class="projection-message projection-message--danger">
        Con lo que falta por evaluar ya no es posible llegar a {{ PASSING_GRADE.toFixed(1) }}.
      </p>
      <p v-else class="projection-message">
        Necesitas un promedio de <strong>{{ projection.neededAverage?.toFixed(2) }}</strong> en el
        {{ projection.remainingWeight }}% restante para ganar la materia.
      </p>
    </div>
    <div class="card projection-card projection-card--empty" v-else>
      <p class="text-muted">Registra la nota y el porcentaje de al menos una actividad para ver la proyección de nota.</p>
    </div>

    <div class="card">
      <h2 class="section-title">Actividades</h2>
      <DataTable :columns="columns" :rows="activities" row-key="id" empty-text="Esta materia no tiene actividades todavía.">
        <template #cell-weight="{ row }">
          {{ row.weight !== null ? `${row.weight}%` : '—' }}
        </template>
        <template #cell-status="{ row }">
          <StatusBadge :status="row.status" />
        </template>
        <template #cell-grade="{ row }">
          {{ row.grade ?? '—' }}
        </template>
      </DataTable>
    </div>
  </div>

  <div class="page" v-else>
    <div class="card empty-state">Materia no encontrada.</div>
  </div>
</template>

<style scoped>
.section-title {
  font-size: 1.05rem;
  margin-bottom: 14px;
}

.projection-stats {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.projection-stat {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.projection-stat__label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: var(--color-text-muted);
}

.projection-stat__value {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--color-text);
}

.projection-message {
  font-size: 0.9rem;
  margin: 0;
}

.projection-message--success {
  color: var(--color-success);
  font-weight: 600;
}

.projection-message--danger {
  color: var(--color-danger);
  font-weight: 600;
}

.projection-card--empty {
  padding: 18px 24px;
}
</style>
