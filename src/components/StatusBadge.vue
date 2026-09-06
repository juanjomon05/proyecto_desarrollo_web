<script setup lang="ts">
import { computed } from 'vue'
import type { ActivityStatus } from '@/models/types'

const props = defineProps<{ status: ActivityStatus }>()

const labels: Record<ActivityStatus, string> = {
  pendiente: 'Pendiente',
  'en progreso': 'En progreso',
  completada: 'Completada'
}

const modifierClass = computed(() => `status-badge--${props.status.replace(' ', '-')}`)
</script>

<template>
  <span class="status-badge" :class="modifierClass">{{ labels[status] }}</span>
</template>

<style scoped>
.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 0.76rem;
  font-weight: 700;
}

.status-badge--pendiente {
  background: var(--color-warning-light);
  color: var(--color-warning);
}

.status-badge--en-progreso {
  background: var(--color-primary-light);
  color: var(--color-primary);
}

.status-badge--completada {
  background: var(--color-success-light);
  color: var(--color-success);
}
</style>
