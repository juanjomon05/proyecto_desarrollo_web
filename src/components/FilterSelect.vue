<script setup lang="ts">
defineProps<{
  modelValue: string
  options: { value: string; label: string }[]
  label?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

function onChange(event: Event): void {
  emit('update:modelValue', (event.target as HTMLSelectElement).value)
}
</script>

<template>
  <label class="filter-select">
    <span v-if="label" class="filter-select__label">{{ label }}</span>
    <div class="filter-select__control">
      <select class="filter-select__native" :value="modelValue" @change="onChange">
        <option v-for="opt in options" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
      </select>
      <span class="filter-select__chevron">⌄</span>
    </div>
  </label>
</template>

<style scoped>
.filter-select {
  display: inline-flex;
  flex-direction: column;
  gap: 6px;
  min-width: 180px;
}

.filter-select__label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.filter-select__control {
  position: relative;
}

.filter-select__native {
  width: 100%;
  appearance: none;
  font-family: inherit;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-text);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: 10px 34px 10px 14px;
  cursor: pointer;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.filter-select__native:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-light);
}

.filter-select__chevron {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-60%);
  pointer-events: none;
  color: var(--color-text-muted);
  font-size: 0.8rem;
}
</style>
