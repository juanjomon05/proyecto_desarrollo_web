<script setup lang="ts">
withDefaults(
  defineProps<{
    icon?: string
    value: string | number
    label: string
    accent?: 'primary' | 'accent' | 'success'
  }>(),
  { accent: 'primary' }
)
</script>

<template>
  <div class="stat-card card" :class="`stat-card--${accent}`">
    <div v-if="icon" class="stat-card__icon">{{ icon }}</div>
    <div class="stat-card__text">
      <p class="stat-card__value">{{ value }}</p>
      <p class="stat-card__label">{{ label }}</p>
    </div>
  </div>
</template>

<style scoped>
.stat-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
}

.stat-card__icon {
  width: 46px;
  height: 46px;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  flex-shrink: 0;
}

.stat-card--primary .stat-card__icon {
  background: var(--color-primary-light);
}

.stat-card--accent .stat-card__icon {
  background: #FFF3DC;
}

.stat-card--success .stat-card__icon {
  background: var(--color-success-light);
}

.stat-card__text {
  min-width: 0;
}

.stat-card__value {
  font-size: 1.6rem;
  font-weight: 800;
  color: var(--color-text);
  line-height: 1.1;
}

.stat-card__label {
  font-size: 0.82rem;
  color: var(--color-text-muted);
  margin-top: 2px;
}
</style>
