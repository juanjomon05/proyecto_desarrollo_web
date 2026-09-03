<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getAllSubjects } from '@/services/subjectService'
import { getActivityById, createActivity, updateActivity } from '@/services/activityService'

const route = useRoute()
const router = useRouter()

const isEditMode = computed(() => !!route.params.id)

const subjects = ref([])
const subjectId = ref('')
const title = ref('')
const type = ref('tarea')
const dueDate = ref('')
const status = ref('pendiente')
const grade = ref(null)

onMounted(() => {
  subjects.value = getAllSubjects()

  if (isEditMode.value) {
    const activity = getActivityById(route.params.id)
    if (activity) {
      subjectId.value = activity.subjectId
      title.value = activity.title
      type.value = activity.type
      dueDate.value = activity.dueDate
      status.value = activity.status
      grade.value = activity.grade
    }
  }
})

function handleSubmit() {
  if (!subjectId.value || !title.value || !dueDate.value) {
    alert('Completa materia, título y fecha de entrega.')
    return
  }

  if (isEditMode.value) {
    updateActivity(route.params.id, {
      subjectId: subjectId.value,
      title: title.value,
      type: type.value,
      dueDate: dueDate.value,
      status: status.value,
      grade: grade.value === null || grade.value === '' ? null : Number(grade.value)
    })
  } else {
    createActivity({
      subjectId: subjectId.value,
      title: title.value,
      type: type.value,
      dueDate: dueDate.value
    })
  }

  router.push('/activities')
}
</script>

<template>
  <main>
    <h1>{{ isEditMode ? 'Editar actividad' : 'Nueva actividad' }}</h1>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="subject">Materia</label>
        <select id="subject" v-model="subjectId">
          <option value="" disabled>Selecciona una materia</option>
          <option v-for="s in subjects" :key="s.id" :value="s.id">{{ s.name }}</option>
        </select>
      </div>

      <div>
        <label for="title">Título</label>
        <input id="title" v-model="title" type="text" />
      </div>

      <div>
        <label for="type">Tipo</label>
        <select id="type" v-model="type">
          <option value="tarea">Tarea</option>
          <option value="quiz">Quiz</option>
          <option value="examen">Examen</option>
          <option value="proyecto">Proyecto</option>
        </select>
      </div>

      <div>
        <label for="dueDate">Fecha de entrega</label>
        <input id="dueDate" v-model="dueDate" type="date" />
      </div>

      <div v-if="isEditMode">
        <label for="status">Estado</label>
        <select id="status" v-model="status">
          <option value="pendiente">Pendiente</option>
          <option value="en progreso">En progreso</option>
          <option value="completada">Completada</option>
        </select>
      </div>

      <div v-if="isEditMode">
        <label for="grade">Nota</label>
        <input id="grade" v-model="grade" type="number" min="0" max="100" />
      </div>

      <button type="submit">Guardar</button>
    </form>
  </main>
</template>