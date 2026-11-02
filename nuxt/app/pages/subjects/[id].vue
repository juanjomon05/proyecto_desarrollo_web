<script setup lang="ts">
// internal imports
import { SubjectService } from '~/services/SubjectService'

// variables
const route = useRoute()
const subjectId = Number(route.params.id)

// reactive variables
const { data: subject, error } = await useAsyncData(`subject-${subjectId}`, () =>
  SubjectService.getSubjectById(subjectId),
)

if (error.value || !subject.value) {
  throw createError({
    statusCode: error.value?.statusCode ?? 404,
    statusMessage: 'Materia no encontrada',
    fatal: true,
  })
}

useSeoMeta({ title: `${subject.value.name} | StudEasy`, description: subject.value.description })
</script>

<template>
  <article v-if="subject" class="panel subject">
    <NuxtLink to="/subjects" class="back-link">← Volver a materias</NuxtLink>
    <h1>{{ subject.name }}</h1>
    <p>{{ subject.description }}</p>
  </article>
</template>

<style scoped>
.subject {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 760px;
}
</style>
