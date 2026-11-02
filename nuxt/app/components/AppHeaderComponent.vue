<script setup lang="ts">
// variables
const links = [
  { label: 'Blog', to: '/blog' },
  { label: 'Materias', to: '/subjects' },
  { label: 'Herramientas', to: '/tools' },
]
</script>

<template>
  <header class="app-header">
    <div class="app-header__inner">
      <NuxtLink to="/" class="app-header__brand">StudEasy</NuxtLink>
      <nav class="app-header__nav">
        <NuxtLink v-for="link in links" :key="link.to" :to="link.to" class="app-header__link">
          {{ link.label }}
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
}

.app-header__inner {
  max-width: 1160px;
  margin: 0 auto;
  padding: 16px clamp(16px, 4vw, 40px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
}

.app-header__brand {
  font-weight: 800;
  font-size: 1.15rem;
  text-decoration: none;
  color: var(--color-primary);
}

.app-header__nav {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.app-header__link {
  padding: 8px 14px;
  border-radius: var(--radius-sm);
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: none;
  color: var(--color-text-muted);
}

.app-header__link:hover,
.app-header__link.router-link-active {
  background: var(--color-primary-light);
  color: var(--color-primary);
}
</style>
