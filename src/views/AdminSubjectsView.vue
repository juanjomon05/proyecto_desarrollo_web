<script setup>
import { ref, onMounted } from 'vue'
import { getAllSubjects, createSubject, updateSubject, deleteSubject } from '@/services/subjectService'

const subjects = ref([])
const editingId = ref(null)

const form = ref({ name: '', professor: '', credits: '' })

onMounted(loadSubjects)

function loadSubjects() {
  subjects.value = getAllSubjects()
}

function startEdit(subject) {
  editingId.value = subject.id
  form.value = { name: subject.name, professor: subject.professor, credits: subject.credits }
}

function cancelEdit() {
  editingId.value = null
  form.value = { name: '', professor: '', credits: '' }
}

function handleSubmit() {
  if (!form.value.name || !form.value.professor) {
    alert('Completa nombre y profesor.')
    return
  }

  const payload = { ...form.value, credits: Number(form.value.credits) }

  if (editingId.value) {
    updateSubject(editingId.value, payload)
  } else {
    createSubject(payload)
  }

  cancelEdit()
  loadSubjects()
}

function handleDelete(id) {
  if (confirm('¿Eliminar esta materia?')) {
    deleteSubject(id)
    loadSubjects()
  }
}
</script>

<template>
  <main>
    <h1>Administrar materias</h1>

    <form @submit.prevent="handleSubmit">
      <h2>{{ editingId ? 'Editar materia' : 'Nueva materia' }}</h2>
      <div><label for="name">Nombre</label><input id="name" v-model="form.name" type="text" /></div>
      <div><label for="professor">Profesor</label><input id="professor" v-model="form.professor" type="text" /></div>
      <div><label for="credits">Créditos</label><input id="credits" v-model="form.credits" type="number" min="1" /></div>
      <button type="submit">{{ editingId ? 'Guardar cambios' : 'Crear materia' }}</button>
      <button v-if="editingId" type="button" @click="cancelEdit">Cancelar</button>
    </form>

    <table>
      <thead><tr><th>Nombre</th><th>Profesor</th><th>Créditos</th><th></th></tr></thead>
      <tbody>
        <tr v-for="subject in subjects" :key="subject.id">
          <td>{{ subject.name }}</td>
          <td>{{ subject.professor }}</td>
          <td>{{ subject.credits }}</td>
          <td>
            <button type="button" @click="startEdit(subject)">Editar</button>
            <button type="button" @click="handleDelete(subject.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </main>
</template>