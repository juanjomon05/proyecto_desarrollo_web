<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<template>
  <div class="chart-card card">
    <div class="chart-card__header">
      <h3>{{ title }}</h3>
      <slot name="actions" />
    </div>
    <div class="chart-card__body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.chart-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
}

.chart-card__header h3 {
  font-size: 1rem;
}

.chart-card__body {
  min-height: 0;
}
</style>
