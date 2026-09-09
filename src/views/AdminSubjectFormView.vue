<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { SubjectService } from '@/services/subjectService'

const route = useRoute()
const router = useRouter()

const subjectId = computed<string | undefined>(() =>
  typeof route.params.id === 'string' ? route.params.id : undefined
)
const isEditMode = computed(() => !!subjectId.value)

const form = ref({ name: '', professor: '', credits: '' })
const errorMessage = ref('')

onMounted(() => {
  if (subjectId.value) {
    const subject = SubjectService.getSubjectById(subjectId.value)
    if (subject) {
      form.value = { name: subject.name, professor: subject.professor, credits: String(subject.credits) }
    }
  }
})

function handleSubmit(): void {
  if (!form.value.name || !form.value.professor) {
    errorMessage.value = 'Completa nombre y profesor.'
    return
  }
  errorMessage.value = ''

  const payload = { ...form.value, credits: Number(form.value.credits) }

  if (subjectId.value) {
    SubjectService.updateSubject(subjectId.value, payload)
  } else {
    SubjectService.createSubject(payload)
  }

  router.push('/admin/subjects')
}
</script>

<template>
  <div class="page">
    <div class="page-header">
      <h1>{{ isEditMode ? 'Editar materia' : 'Nueva materia' }}</h1>
    </div>

    <div class="card form-card">
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
          <button type="submit" class="btn btn-primary">{{ isEditMode ? 'Guardar cambios' : 'Crear materia' }}</button>
          <router-link to="/admin/subjects" class="btn btn-ghost">Cancelar</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.form-card {
  max-width: 480px;
}
</style>
