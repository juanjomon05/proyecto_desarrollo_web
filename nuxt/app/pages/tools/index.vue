<script setup lang="ts">
// variables
const tools = [
  {
    to: '/tools/grade-calculator',
    title: 'Calculadora de nota',
    description: 'Ingresa tus notas y sus porcentajes y mira qué promedio necesitas para ganar.',
  },
  {
    to: '/tools/faqs',
    title: 'Preguntas frecuentes',
    description: 'Respuestas rápidas sobre cómo funciona StudEasy.',
  },
]

useSeoMeta({ title: 'Herramientas | StudEasy' })
</script>

<template>
  <section class="page-header">
    <h1>Herramientas</h1>
    <p>Utilidades que se ejecutan por completo en tu navegador.</p>
  </section>

  <section class="card-grid">
    <CardLinkComponent
      v-for="tool in tools"
      :key="tool.to"
      :to="tool.to"
      :title="tool.title"
      :description="tool.description"
    />
  </section>
</template>
