<script setup lang="ts">
// external imports
import { ref } from 'vue'

// internal imports
import { SubjectService } from '@/services/subjectService'
import { UserService } from '@/services/userService'
import type { SubjectInterface } from '@/interfaces/SubjectInterface'

const emit = defineEmits<{
  saved: [subject: SubjectInterface]
}>()

const name = ref('')
const professor = ref('')
const credits = ref('')
const errorMessage = ref('')

function handleSubmit(): void {
  if (!name.value || !professor.value || !credits.value) {
    errorMessage.value = 'Completa nombre, profesor y créditos.'
    return
  }
  const user = UserService.getCurrentUser()
  if (!user) return
  errorMessage.value = ''

  const saved = SubjectService.createSubject({
    name: name.value,
    professor: professor.value,
    credits: Number(credits.value),
    userId: user.id
  })

  emit('saved', saved)
}
</script>

<template>
  <form class="subject-form" @submit.prevent="handleSubmit">
    <p v-if="errorMessage" class="form-error">{{ errorMessage }}</p>

    <div class="form-group">
      <label for="sf-name">Nombre</label>
      <input id="sf-name" v-model="name" type="text" class="input" placeholder="Ej. Cálculo III" />
    </div>

    <div class="form-group">
      <label for="sf-professor">Profesor</label>
      <input id="sf-professor" v-model="professor" type="text" class="input" placeholder="Ej. Ing. Vargas" />
    </div>

    <div class="form-group">
      <label for="sf-credits">Créditos</label>
      <input id="sf-credits" v-model="credits" type="number" min="1" class="input" />
    </div>

    <div class="form-actions">
      <button type="submit" class="btn btn-primary">Crear materia</button>
    </div>
  </form>
</template>
