<script setup lang="ts" generic="T extends Record<string, unknown>">
defineProps<{
  columns: { key: string; label: string }[]
  rows: T[]
  rowKey: keyof T
  emptyText?: string
}>()
</script>

<template>
  <div class="table-wrap">
    <table class="data-table">
      <thead>
        <tr>
          <th v-for="col in columns" :key="col.key">{{ col.label }}</th>
          <th v-if="$slots.actions" class="data-table__actions-head"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="String(row[rowKey])">
          <td v-for="col in columns" :key="col.key">
            <slot :name="`cell-${col.key}`" :row="row">{{ row[col.key] }}</slot>
          </td>
          <td v-if="$slots.actions" class="data-table__actions">
            <slot name="actions" :row="row" />
          </td>
        </tr>
        <tr v-if="rows.length === 0">
          <td :colspan="columns.length + ($slots.actions ? 1 : 0)" class="empty-state">
            {{ emptyText || 'No hay datos para mostrar.' }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.data-table__actions,
.data-table__actions-head {
  text-align: right;
  white-space: nowrap;
}
</style>
