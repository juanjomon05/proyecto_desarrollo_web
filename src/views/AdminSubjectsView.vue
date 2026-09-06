<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getAllSubjects, createSubject, updateSubject, deleteSubject } from '@/services/subjectService'
import DataTable from '@/components/DataTable.vue'
import type { Materia } from '@/models/Materia'

const subjects = ref<Materia[]>([])
const editingId = ref<string | null>(null)
const errorMessage = ref('')

const form = ref({ name: '', professor: '', credits: '' })

const columns = [
  { key: 'name', label: 'Nombre' },
  { key: 'professor', label: 'Profesor' },
  { key: 'credits', label: 'Créditos' }
]

onMounted(loadSubjects)

function loadSubjects(): void {
  subjects.value = getAllSubjects()
}

function startEdit(subject: Materia): void {
  editingId.value = subject.id
  form.value = { name: subject.name, professor: subject.professor, credits: String(subject.credits) }
}

function cancelEdit(): void {
  editingId.value = null
  errorMessage.value = ''
  form.value = { name: '', professor: '', credits: '' }
}

function handleSubmit(): void {
  if (!form.value.name || !form.value.professor) {
    errorMessage.value = 'Completa nombre y profesor.'
    return
  }
  errorMessage.value = ''

  const payload = { ...form.value, credits: Number(form.value.credits) }

  if (editingId.value) {
    updateSubject(editingId.value, payload)
  } else {
    createSubject(payload)
  }

  cancelEdit()
  loadSubjects()
}

function handleDelete(id: string): void {
  if (confirm('¿Eliminar esta materia?')) {
    deleteSubject(id)
    loadSubjects()
  }
}
</script>

<template>
  <div class="page">
    <div class="page-header">
      <h1>Administrar materias</h1>
    </div>

    <div class="grid grid-2">
      <div class="card">
        <h2 class="section-title">{{ editingId ? 'Editar materia' : 'Nueva materia' }}</h2>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="name">Nombre</label>
            <input id="name" v-model="form.name" type="text" class="input" />
          </div>
          <div class="form-group">
            <label for="professor">Profesor</label>
            <input id="professor" v-model="form.professor" type="text" class="input" />
          </div>
          <div class="form-group">
            <label for="credits">Créditos</label>
            <input id="credits" v-model="form.credits" type="number" min="1" class="input" />
          </div>
          <p v-if="errorMessage" class="form-error">{{ errorMessage }}</p>
          <div class="form-actions">
            <button type="submit" class="btn btn-primary">{{ editingId ? 'Guardar cambios' : 'Crear materia' }}</button>
            <button v-if="editingId" type="button" class="btn btn-ghost" @click="cancelEdit">Cancelar</button>
          </div>
        </form>
      </div>

      <div class="card">
        <h2 class="section-title">Materias registradas</h2>
        <DataTable :columns="columns" :rows="subjects" row-key="id" empty-text="No hay materias registradas.">
          <template #actions="{ row }">
            <div class="actions-row">
              <button type="button" class="btn btn-ghost btn-sm" @click="startEdit(row)">Editar</button>
              <button type="button" class="btn btn-danger btn-sm" @click="handleDelete(row.id)">Eliminar</button>
            </div>
          </template>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<style scoped>
.section-title {
  font-size: 1rem;
  margin-bottom: 14px;
}

.actions-row {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}
</style>
