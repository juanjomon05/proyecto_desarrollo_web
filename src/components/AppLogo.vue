<script setup lang="ts">
withDefaults(defineProps<{ withWordmark?: boolean; size?: number }>(), {
  withWordmark: true,
  size: 36
})
</script>

<template>
  <div class="app-logo">
    <img src="@/assets/logo.png" alt="StudEasy" :width="size" :height="size" class="app-logo__icon" />
    <span v-if="withWordmark" class="app-logo__wordmark">StudEasy</span>
  </div>
</template>

<style scoped>
.app-logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.app-logo__icon {
  border-radius: 9px;
  display: block;
  object-fit: cover;
}

.app-logo__wordmark {
  font-weight: 800;
  font-size: 1.15rem;
  letter-spacing: -0.01em;
  color: var(--color-text);
}
</style>
