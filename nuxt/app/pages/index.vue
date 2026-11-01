<script setup lang="ts">
// variables
const sections = [
  {
    to: '/blog',
    title: 'Blog',
    description: 'Artículos sobre organización, hábitos de estudio y notas.',
    badge: 'SSG',
  },
  {
    to: '/subjects',
    title: 'Materias',
    description: 'Listado de materias servido desde la capa server de Nuxt.',
    badge: 'SSR',
  },
  {
    to: '/tools',
    title: 'Herramientas',
    description: 'Calculadora de nota y preguntas frecuentes.',
    badge: 'CSR',
  },
]

useSeoMeta({ title: 'StudEasy' })
</script>

<template>
  <section class="page-header">
    <h1>StudEasy</h1>
    <p>Organiza tus materias, actividades y hábitos de estudio en un solo lugar.</p>
  </section>

  <section class="card-grid">
    <CardLinkComponent
      v-for="section in sections"
      :key="section.to"
      :to="section.to"
      :title="section.title"
      :description="section.description"
      :badge="section.badge"
    />
  </section>
</template>