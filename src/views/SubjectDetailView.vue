<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getSubjectById } from '@/services/subjectService'
import { getActivitiesBySubject } from '@/services/activityService'
import DataTable from '@/components/DataTable.vue'
import StatusBadge from '@/components/StatusBadge.vue'
import type { Materia } from '@/models/Materia'
import type { Actividad } from '@/models/Actividad'

const route = useRoute()
const subject = ref<Materia | null>(null)
const activities = ref<Actividad[]>([])

const columns = [
  { key: 'title', label: 'Título' },
  { key: 'type', label: 'Tipo' },
  { key: 'dueDate', label: 'Vence' },
  { key: 'status', label: 'Estado' },
  { key: 'grade', label: 'Nota' }
]

onMounted(() => {
  const id = typeof route.params.id === 'string' ? route.params.id : ''
  subject.value = getSubjectById(id)
  activities.value = getActivitiesBySubject(id)
})
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

    <div class="card">
      <h2 class="section-title">Actividades</h2>
      <DataTable :columns="columns" :rows="activities" row-key="id" empty-text="Esta materia no tiene actividades todavía.">
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
</style>
