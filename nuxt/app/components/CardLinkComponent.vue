<script setup lang="ts">
// props
defineProps<{
  to: string
  title: string
  description: string
  badge?: string
  meta?: string
}>()
</script>

<template>
  <NuxtLink :to="to" class="card-link">
    <span v-if="badge" class="badge">{{ badge }}</span>
    <h3 class="card-link__title">{{ title }}</h3>
    <p>{{ description }}</p>
    <small v-if="meta" class="card-link__meta">{{ meta }}</small>
  </NuxtLink>
</template>

<style scoped>
.card-link {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 22px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  text-decoration: none;
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;
}

.card-link:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.card-link:hover .card-link__title {
  color: var(--color-primary);
}

.card-link__meta {
  margin-top: auto;
  color: var(--color-text-muted);
  font-weight: 600;
}
</style>
