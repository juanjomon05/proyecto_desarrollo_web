<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { getSubjectsByUser } from '@/services/subjectService'
import { getActivityById, getActivitySubjectId, createActivity, updateActivity } from '@/services/activityService'
import type { Subject } from '@/models/Subject'
import type { Activity } from '@/models/Activity'
import type { ActivityStatus, ActivityType } from '@/models/types'

const userStore = useUserStore()

const props = defineProps<{
  activityId?: string
  defaultSubjectId?: string
}>()

const emit = defineEmits<{
  saved: [activity: Activity]
}>()

const isEditMode = computed(() => !!props.activityId)

const subjects = ref<Subject[]>([])
const subjectId = ref('')
const title = ref('')
const type = ref<ActivityType>('tarea')
const dueDate = ref('')
const status = ref<ActivityStatus>('pendiente')
const grade = ref<number | string | null>(null)
const weight = ref<number | string | null>(null)
const errorMessage = ref('')

onMounted(() => {
  if (userStore.currentUser) {
    subjects.value = getSubjectsByUser(userStore.currentUser.id)
  }

  if (props.defaultSubjectId) {
    subjectId.value = props.defaultSubjectId
  }

  if (props.activityId) {
    const activity = getActivityById(props.activityId)
    if (activity) {
      subjectId.value = getActivitySubjectId(activity.id)
      title.value = activity.title
      type.value = activity.type
      dueDate.value = activity.dueDate
      status.value = activity.status
      grade.value = activity.grade
      weight.value = activity.weight
    }
  }
})

function handleSubmit(): void {
  if (!subjectId.value || !title.value || !dueDate.value) {
    errorMessage.value = 'Completa materia, título y fecha de entrega.'
    return
  }
  if (grade.value !== null && grade.value !== '' && (Number(grade.value) < 0 || Number(grade.value) > 5)) {
    errorMessage.value = 'La nota debe estar entre 0.0 y 5.0.'
    return
  }
  if (weight.value !== null && weight.value !== '' && (Number(weight.value) < 0 || Number(weight.value) > 100)) {
    errorMessage.value = 'El porcentaje debe estar entre 0 y 100.'
    return
  }
  errorMessage.value = ''

  const weightValue = weight.value === null || weight.value === '' ? null : Number(weight.value)

  const saved = props.activityId
    ? updateActivity(props.activityId, {
        subjectId: subjectId.value,
        title: title.value,
        type: type.value,
        dueDate: dueDate.value,
        status: status.value,
        grade: grade.value === null || grade.value === '' ? null : Number(grade.value),
        weight: weightValue
      })
    : createActivity({
        subjectId: subjectId.value,
        title: title.value,
        type: type.value,
        dueDate: dueDate.value,
        weight: weightValue
      })

  if (saved) emit('saved', saved)
}
</script>

<template>
  <form class="activity-form" @submit.prevent="handleSubmit">
    <p v-if="errorMessage" class="form-error">{{ errorMessage }}</p>

    <div class="form-group">
      <label for="af-subject">Materia</label>
      <select id="af-subject" v-model="subjectId" class="input">
        <option value="" disabled>Selecciona una materia</option>
        <option v-for="s in subjects" :key="s.id" :value="s.id">{{ s.name }}</option>
      </select>
    </div>

    <div class="form-group">
      <label for="af-title">Título</label>
      <input id="af-title" v-model="title" type="text" class="input" placeholder="Ej. Entregable 2" />
    </div>

    <div class="form-group">
      <label for="af-type">Tipo</label>
      <select id="af-type" v-model="type" class="input">
        <option value="tarea">Tarea</option>
        <option value="quiz">Quiz</option>
        <option value="examen">Examen</option>
        <option value="proyecto">Proyecto</option>
      </select>
    </div>

    <div class="form-group">
      <label for="af-dueDate">Fecha de entrega</label>
      <input id="af-dueDate" v-model="dueDate" type="date" class="input" />
    </div>

    <div class="form-group">
      <label for="af-weight">Porcentaje sobre la nota final (%)</label>
      <input id="af-weight" v-model="weight" type="number" min="0" max="100" step="1" class="input" placeholder="Ej. 30" />
    </div>

    <div v-if="isEditMode" class="form-group">
      <label for="af-status">Estado</label>
      <select id="af-status" v-model="status" class="input">
        <option value="pendiente">Pendiente</option>
        <option value="en progreso">En progreso</option>
        <option value="completada">Completada</option>
      </select>
    </div>

    <div v-if="isEditMode" class="form-group">
      <label for="af-grade">Nota (sobre 5.0)</label>
      <input id="af-grade" v-model="grade" type="number" min="0" max="5" step="0.1" class="input" placeholder="Ej. 4.2" />
    </div>

    <div class="form-actions">
      <button type="submit" class="btn btn-primary">{{ isEditMode ? 'Guardar cambios' : 'Crear actividad' }}</button>
    </div>
  </form>
</template>
