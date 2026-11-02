<script setup lang="ts">
// internal imports
import { FaqService } from '~/services/FaqService'

// variables
const faqs = FaqService.getFaqs()

useSeoMeta({ title: 'Preguntas frecuentes | StudEasy' })
</script>

<template>
  <section class="page-header">
    <NuxtLink to="/tools" class="back-link">← Volver a herramientas</NuxtLink>
    <h1>Preguntas frecuentes</h1>
    <p>Lo que más nos preguntan sobre StudEasy.</p>
  </section>

  <section class="faq-list">
    <details v-for="faq in faqs" :key="faq.id" class="panel faq">
      <summary class="faq__question">{{ faq.question }}</summary>
      <p class="faq__answer">{{ faq.answer }}</p>
    </details>
  </section>
</template>

<style scoped>
.faq-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 760px;
}

.faq {
  padding: 18px 22px;
}

.faq__question {
  font-weight: 700;
  cursor: pointer;
}

.faq__question:hover {
  color: var(--color-primary);
}

.faq__answer {
  margin-top: 12px;
}
</style>
