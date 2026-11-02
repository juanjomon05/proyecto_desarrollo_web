<script setup lang="ts">
// internal imports
import { SubjectService } from '~/services/SubjectService'

// reactive variables
const { data: subjects, error } = await useAsyncData('subjects', () => SubjectService.getSubjects())

useSeoMeta({ title: 'Materias | StudEasy' })
</script>

<template>
  <section class="page-header">
    <h1>Materias</h1>
    <p>
      Materias del semestre, servidas desde la capa server de Nuxt y renderizadas en el servidor.
    </p>
  </section>

  <p v-if="error" class="state-message">No se pudieron cargar las materias.</p>

  <section v-else class="card-grid">
    <CardLinkComponent
      v-for="subject in subjects"
      :key="subject.id"
      :to="`/subjects/${subject.id}`"
      :title="subject.name"
      :description="subject.description"
      :meta="`${subject.professor} · ${subject.credits} créditos`"
    />
  </section>
</template>
