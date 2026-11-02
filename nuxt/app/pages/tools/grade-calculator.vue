<script setup lang="ts">
// internal imports
import type { GradeItemInterface } from '~/interfaces/GradeItemInterface'

// reactive variables
const items = ref<GradeItemInterface[]>([
  { grade: 4.3, weight: 40 },
  { grade: null, weight: 60 },
])

// functions
function toNumberOrNull(value: string): number | null {
  return value === '' ? null : Number(value)
}

// handlers
function handleGradeInput(index: number, event: Event): void {
  items.value[index]!.grade = toNumberOrNull((event.target as HTMLInputElement).value)
}

function handleWeightInput(index: number, event: Event): void {
  items.value[index]!.weight = toNumberOrNull((event.target as HTMLInputElement).value)
}

useSeoMeta({ title: 'Calculadora de nota | StudEasy' })
</script>

<template>
  <section class="page-header">
    <NuxtLink to="/tools" class="back-link">← Volver a herramientas</NuxtLink>
    <h1>Calculadora de nota</h1>
    <p>
      Escribe la nota (0.0 a 5.0) y el porcentaje de cada actividad. Deja la nota vacía en las que
      aún no tienen calificación.
    </p>
  </section>

  <section class="panel calculator">
    <div v-for="(item, index) in items" :key="index" class="calculator__row">
      <label class="calculator__field">
        Nota
        <input
          class="input"
          type="number"
          min="0"
          max="5"
          step="0.1"
          placeholder="Sin nota"
          :value="item.grade ?? ''"
          @input="handleGradeInput(index, $event)"
        />
      </label>
      <label class="calculator__field">
        Porcentaje (%)
        <input
          class="input"
          type="number"
          min="0"
          max="100"
          step="1"
          :value="item.weight ?? ''"
          @input="handleWeightInput(index, $event)"
        />
      </label>
    </div>
  </section>
</template>

<style scoped>
.calculator {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 760px;
}

.calculator__row {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 12px;
}

.calculator__field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1 1 160px;
  font-size: 0.82rem;
  font-weight: 600;
}
</style>
