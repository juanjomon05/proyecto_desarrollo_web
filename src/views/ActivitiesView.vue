<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { getAllActivities, updateActivity } from '@/services/activityService'
import { getAllSubjects } from '@/services/subjectService'
import DataTable from '@/components/DataTable.vue'
import StatusBadge from '@/components/StatusBadge.vue'
import FilterSelect from '@/components/FilterSelect.vue'
import Modal from '@/components/Modal.vue'
import ActivityForm from '@/components/ActivityForm.vue'
import type { Actividad } from '@/models/Actividad'
import type { Materia } from '@/models/Materia'
import type { ActivityStatus } from '@/models/types'

const activities = ref<Actividad[]>([])
const subjects = ref<Materia[]>([])
const selectedSubjectId = ref('')
const selectedStatus = ref<ActivityStatus | ''>('')
const isModalOpen = ref(false)

const columns = [
  { key: 'title', label: 'Título' },
  { key: 'subjectId', label: 'Materia' },
  { key: 'type', label: 'Tipo' },
  { key: 'dueDate', label: 'Vence' },
  { key: 'status', label: 'Estado' },
  { key: 'grade', label: 'Nota' }
]

const statusFilters: { value: ActivityStatus | ''; label: string }[] = [
  { value: '', label: 'Todas' },
  { value: 'pendiente', label: 'Pendiente' },
  { value: 'en progreso', label: 'En progreso' },
  { value: 'completada', label: 'Completada' }
]

function loadData(): void {
  activities.value = getAllActivities()
  subjects.value = getAllSubjects()
}

onMounted(loadData)

const subjectOptions = computed(() => [
  { value: '', label: 'Todas las materias' },
  ...subjects.value.map(s => ({ value: s.id, label: s.name }))
])

const filteredActivities = computed(() => {
  return activities.value.filter(a => {
    const matchesSubject = !selectedSubjectId.value || a.subjectId === selectedSubjectId.value
    const matchesStatus = !selectedStatus.value || a.status === selectedStatus.value
    return matchesSubject && matchesStatus
  })
})

function subjectName(subjectId: string): string {
  return subjects.value.find(s => s.id === subjectId)?.name || 'Desconocida'
}

function markAsDone(id: string): void {
  updateActivity(id, { status: 'completada' })
  loadData()
}

function handleSaved(): void {
  isModalOpen.value = false
  loadData()
}
</script>

<template>
  <div class="page">
    <div class="page-header">
      <h1>Actividades</h1>
      <button type="button" class="btn btn-primary" @click="isModalOpen = true">+ Nueva actividad</button>
    </div>

    <div class="filters card">
      <FilterSelect v-model="selectedSubjectId" :options="subjectOptions" label="Materia" />

      <div class="status-pills">
        <span class="status-pills__label">Estado</span>
        <div class="status-pills__group">
          <button
            v-for="filter in statusFilters"
            :key="filter.value"
            type="button"
            class="status-pill"
            :class="{ 'status-pill--active': selectedStatus === filter.value }"
            @click="selectedStatus = filter.value"
          >
            {{ filter.label }}
          </button>
        </div>
      </div>
    </div>

    <div class="card">
      <DataTable :columns="columns" :rows="filteredActivities" row-key="id" empty-text="No hay actividades para este filtro.">
        <template #cell-subjectId="{ row }">
          {{ subjectName(row.subjectId) }}
        </template>
        <template #cell-status="{ row }">
          <StatusBadge :status="row.status" />
        </template>
        <template #cell-grade="{ row }">
          {{ row.grade ?? '—' }}
        </template>
        <template #actions="{ row }">
          <div class="actions-row">
            <button
              v-if="row.status !== 'completada'"
              type="button"
              class="btn btn-secondary btn-sm"
              @click="markAsDone(row.id)"
            >
              Marcar entregada
            </button>
            <router-link :to="`/activities/${row.id}/edit`" class="btn btn-ghost btn-sm">Editar</router-link>
          </div>
        </template>
      </DataTable>
    </div>

    <Modal v-if="isModalOpen" title="Nueva actividad" @close="isModalOpen = false">
      <ActivityForm @saved="handleSaved" />
    </Modal>
  </div>
</template>

<style scoped>
.filters {
  display: flex;
  align-items: flex-end;
  gap: 24px;
  flex-wrap: wrap;
}

.status-pills {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.status-pills__label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.status-pills__group {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.status-pill {
  font-family: inherit;
  font-size: 0.82rem;
  font-weight: 600;
  padding: 8px 14px;
  border-radius: 999px;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-text-muted);
  cursor: pointer;
}

.status-pill:hover {
  border-color: var(--color-primary);
}

.status-pill--active {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: #fff;
}

.actions-row {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}
</style>
