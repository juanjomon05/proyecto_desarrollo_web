<script setup lang="ts">
defineProps<{ title?: string }>()
const emit = defineEmits<{ close: [] }>()
</script>

<template>
  <Teleport to="body">
    <div class="modal-overlay" @click.self="emit('close')">
      <div class="modal-panel" role="dialog" aria-modal="true">
        <div class="modal-panel__header">
          <h2 v-if="title">{{ title }}</h2>
          <button type="button" class="modal-panel__close" aria-label="Cerrar" @click="emit('close')">✕</button>
        </div>
        <div class="modal-panel__body">
          <slot />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(30, 34, 51, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  z-index: 50;
}

.modal-panel {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  width: 100%;
  max-width: 520px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-panel__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px 0;
}

.modal-panel__close {
  background: var(--color-bg);
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  cursor: pointer;
  font-size: 0.9rem;
  color: var(--color-text-muted);
}

.modal-panel__close:hover {
  background: var(--color-border);
}

.modal-panel__body {
  padding: 20px 24px 24px;
}
</style>
