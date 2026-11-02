<script setup lang="ts">
// internal imports
import { GradeProjectionCalculator } from '~/utils/GradeProjectionCalculator'
import type { GradeItemInterface } from '~/interfaces/GradeItemInterface'

// variables
const passingGrade = GradeProjectionCalculator.PASSING_GRADE

// reactive variables
const items = ref<GradeItemInterface[]>([
  { grade: 4.3, weight: 40 },
  { grade: null, weight: 60 },
])

// computed variables
const projection = computed(() => GradeProjectionCalculator.calculate(items.value))

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

function handleAddItem(): void {
  items.value.push({ grade: null, weight: null })
}

function handleRemoveItem(index: number): void {
  items.value.splice(index, 1)
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
      <button
        type="button"
        class="btn btn-ghost btn-sm"
        :disabled="items.length === 1"
        @click="handleRemoveItem(index)"
      >
        Quitar
      </button>
    </div>

    <button type="button" class="btn btn-ghost calculator__add" @click="handleAddItem">
      + Agregar actividad
    </button>
  </section>

  <section class="panel result">
    <h2>Resultado</h2>

    <p v-if="projection.status === 'no-data'">
      Escribe la nota y el porcentaje de al menos una actividad para ver el resultado.
    </p>

    <template v-else>
      <div class="result__stats">
        <div class="result__stat">
          <span class="result__label">Acumulado</span>
          <span class="result__value">{{ projection.achievedPoints.toFixed(2) }} / 5.0</span>
        </div>
        <div class="result__stat">
          <span class="result__label">Evaluado</span>
          <span class="result__value">{{ projection.gradedWeight }}%</span>
        </div>
        <div class="result__stat">
          <span class="result__label">Pendiente</span>
          <span class="result__value">{{ projection.remainingWeight }}%</span>
        </div>
      </div>

      <p v-if="projection.status === 'won'" class="result__message result__message--success">
        Ya aseguraste el {{ passingGrade.toFixed(1) }} en esta materia, sin importar lo que falte.
      </p>
      <p v-else-if="projection.status === 'lost'" class="result__message result__message--danger">
        Con lo que falta por evaluar ya no es posible llegar a {{ passingGrade.toFixed(1) }}.
      </p>
      <p v-else class="result__message">
        Necesitas un promedio de <strong>{{ projection.neededAverage?.toFixed(2) }}</strong> en el
        {{ projection.remainingWeight }}% restante para ganar la materia.
      </p>
    </template>
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

.calculator__add {
  align-self: flex-start;
}

.calculator__field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1 1 160px;
  font-size: 0.82rem;
  font-weight: 600;
}

.result {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 760px;
}

.result__stats {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}

.result__stat {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.result__label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: var(--color-text-muted);
}

.result__value {
  font-size: 1.2rem;
  font-weight: 700;
}

.result__message--success {
  color: var(--color-success);
  font-weight: 600;
}

.result__message--danger {
  color: var(--color-danger);
  font-weight: 600;
}
</style>
