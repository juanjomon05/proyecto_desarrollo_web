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

    <dl class="subject__facts">
      <div>
        <dt>Profesor</dt>
        <dd>{{ subject.professor }}</dd>
      </div>
      <div>
        <dt>Créditos</dt>
        <dd>{{ subject.credits }}</dd>
      </div>
    </dl>
  </article>
</template>

<style scoped>
.subject {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 760px;
}

.subject__facts {
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  margin: 0;
}

.subject__facts dt {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--color-text-muted);
}

.subject__facts dd {
  margin: 4px 0 0;
  font-size: 1.15rem;
  font-weight: 700;
}
</style>
