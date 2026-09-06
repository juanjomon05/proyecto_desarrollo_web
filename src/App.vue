<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import AppLogo from '@/components/AppLogo.vue'

const userStore = useUserStore()
const isMobileMenuOpen = ref(false)

function handleLogout(): void {
  userStore.logout()
  isMobileMenuOpen.value = false
}

function closeMobileMenu(): void {
  isMobileMenuOpen.value = false
}

function initials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase())
    .join('')
}
</script>

<template>
  <div class="shell" :class="{ 'shell--with-sidebar': userStore.isLoggedIn }">
    <header v-if="userStore.isLoggedIn" class="topbar">
      <button type="button" class="topbar__toggle" @click="isMobileMenuOpen = !isMobileMenuOpen" aria-label="Abrir menú">
        <span />
        <span />
        <span />
      </button>
      <AppLogo :size="30" />
    </header>

    <aside v-if="userStore.isLoggedIn" class="sidebar" :class="{ 'sidebar--open': isMobileMenuOpen }">
      <div class="sidebar__brand">
        <AppLogo :size="34" />
      </div>

      <nav class="sidebar__nav">
        <router-link to="/" class="sidebar__link" @click="closeMobileMenu">Inicio</router-link>
        <router-link to="/subjects" class="sidebar__link" @click="closeMobileMenu">Materias</router-link>
        <router-link to="/activities" class="sidebar__link" @click="closeMobileMenu">Actividades</router-link>
        <router-link to="/tracking" class="sidebar__link" @click="closeMobileMenu">Seguimiento</router-link>

        <template v-if="userStore.isAdmin">
          <p class="sidebar__section">
            Administración <span class="admin-badge">Admin</span>
          </p>
          <router-link to="/admin/subjects" class="sidebar__link" @click="closeMobileMenu">Materias</router-link>
          <router-link to="/admin/dashboard" class="sidebar__link" @click="closeMobileMenu">Dashboard</router-link>
        </template>
      </nav>

      <div class="sidebar__user">
        <div class="sidebar__avatar">{{ initials(userStore.currentUser?.name ?? '') }}</div>
        <div class="sidebar__user-info">
          <strong>{{ userStore.currentUser?.name }}</strong>
          <span class="text-muted">{{ userStore.isAdmin ? 'Administrador' : 'Estudiante' }}</span>
        </div>
        <button type="button" class="btn btn-ghost btn-sm" @click="handleLogout">Salir</button>
      </div>
    </aside>

    <div v-if="isMobileMenuOpen" class="sidebar__scrim" @click="closeMobileMenu" />

    <main class="content">
      <template v-if="!userStore.isLoggedIn">
        <RouterView />
      </template>
      <template v-else>
        <RouterView />
      </template>
    </main>
  </div>
</template>

<style scoped>
.shell {
  min-height: 100vh;
}

.topbar {
  display: none;
}

/* ---------- Sidebar ---------- */
.sidebar {
  display: none;
}

.shell--with-sidebar {
  display: flex;
}

.shell--with-sidebar .sidebar {
  display: flex;
  flex-direction: column;
  width: 240px;
  min-height: 100vh;
  background: var(--color-surface);
  border-right: 1px solid var(--color-border);
  padding: 20px 16px;
  position: sticky;
  top: 0;
  flex-shrink: 0;
}

.sidebar__brand {
  padding: 8px 8px 20px;
}

.sidebar__nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

.sidebar__link {
  display: block;
  padding: 10px 12px;
  border-radius: var(--radius-sm);
  color: var(--color-text-muted);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.92rem;
}

.sidebar__link:hover {
  background: var(--color-bg);
  color: var(--color-text);
}

.sidebar__link.router-link-exact-active {
  background: var(--color-primary-light);
  color: var(--color-primary);
}

.sidebar__section {
  margin: 18px 0 4px;
  padding: 0 12px;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-muted);
  display: flex;
  align-items: center;
  gap: 8px;
}

.admin-badge {
  background: var(--color-accent);
  color: #1E2233;
  border-radius: 999px;
  padding: 1px 8px;
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: none;
  letter-spacing: normal;
}

.sidebar__user {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 8px 4px;
  border-top: 1px solid var(--color-border);
  margin-top: 12px;
}

.sidebar__avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--color-primary);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.85rem;
  flex-shrink: 0;
}

.sidebar__user-info {
  display: flex;
  flex-direction: column;
  gap: 1px;
  flex: 1;
  min-width: 0;
  font-size: 0.85rem;
}

.sidebar__user-info strong {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.content {
  flex: 1;
  min-width: 0;
}

.sidebar__scrim {
  display: none;
}

/* ---------- Mobile ---------- */
@media (max-width: 860px) {
  .shell--with-sidebar {
    display: block;
  }

  .topbar {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 12px 16px;
    background: var(--color-surface);
    border-bottom: 1px solid var(--color-border);
    position: sticky;
    top: 0;
    z-index: 20;
  }

  .topbar__toggle {
    display: flex;
    flex-direction: column;
    gap: 4px;
    background: none;
    border: none;
    padding: 6px;
    cursor: pointer;
  }

  .topbar__toggle span {
    width: 20px;
    height: 2px;
    background: var(--color-text);
    border-radius: 2px;
  }

  .shell--with-sidebar .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 30;
    transform: translateX(-100%);
    transition: transform 0.2s ease;
    box-shadow: var(--shadow-md);
  }

  .shell--with-sidebar .sidebar.sidebar--open {
    transform: translateX(0);
  }

  .sidebar__scrim {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(30, 34, 51, 0.4);
    z-index: 25;
  }
}
</style>
