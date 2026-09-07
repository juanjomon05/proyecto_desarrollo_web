<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { createSubject } from '@/services/subjectService'
import type { Subject } from '@/models/Subject'

const emit = defineEmits<{
  saved: [subject: Subject]
}>()

const userStore = useUserStore()

const name = ref('')
const professor = ref('')
const credits = ref('')
const errorMessage = ref('')

function handleSubmit(): void {
  if (!name.value || !professor.value || !credits.value) {
    errorMessage.value = 'Completa nombre, profesor y créditos.'
    return
  }
  if (!userStore.currentUser) return
  errorMessage.value = ''

  const saved = createSubject({
    name: name.value,
    professor: professor.value,
    credits: Number(credits.value),
    userId: userStore.currentUser.id
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
