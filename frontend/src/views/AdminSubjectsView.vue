<script setup lang="ts">
// external imports
import { ref, onMounted } from 'vue'

// internal imports
import { SubjectService } from '@/services/SubjectService'
import DataTable from '@/components/DataTable.vue'
import type { SubjectInterface } from '@/interfaces/SubjectInterface'

// reactive variables
const subjects = ref<SubjectInterface[]>([])

// variables
const columns = [
  { key: 'name', label: 'Nombre' },
  { key: 'professor', label: 'Profesor' },
  { key: 'credits', label: 'Créditos' }
]

// lifecycle
onMounted(loadSubjects)

// functions
function loadSubjects(): void {
  subjects.value = SubjectService.getSubjects()
}

// handlers
function handleDelete(id: number): void {
  if (confirm('¿Eliminar esta materia?')) {
    SubjectService.deleteSubject(id)
    loadSubjects()
  }
}
</script>

<template>
  <div class="page">
    <div class="page-header">
      <h1>Administrar materias</h1>
      <router-link to="/admin/subjects/new" class="btn btn-primary">+ Nueva materia</router-link>
    </div>

    <div class="card">
      <DataTable :columns="columns" :rows="subjects" row-key="id" empty-text="No hay materias registradas.">
        <template #actions="{ row }">
          <div class="actions-row">
            <router-link :to="`/admin/subjects/${row.id}/edit`" class="btn btn-ghost btn-sm">Editar</router-link>
            <button type="button" class="btn btn-danger btn-sm" @click="handleDelete(row.id)">Eliminar</button>
          </div>
        </template>
      </DataTable>
    </div>
  </div>
</template>

<style scoped>
.actions-row {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}
</style>
