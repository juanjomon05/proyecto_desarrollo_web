<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

function handleLogout() {
  userStore.logout()
}
</script>

<template>
  <header>
    <nav>
      <router-link to="/">Home</router-link>

      <template v-if="userStore.isLoggedIn">
        <router-link to="/subjects">Materias</router-link>
        <router-link to="/activities">Actividades</router-link>
        <router-link to="/tracking">Seguimiento</router-link>

        <template v-if="userStore.isAdmin">
          <router-link to="/admin/subjects">Admin: materias</router-link>
          <router-link to="/admin/dashboard">Admin: dashboard</router-link>
        </template>

        <span>{{ userStore.currentUser.name }}</span>
        <button type="button" @click="handleLogout">Cerrar sesión</button>
      </template>

      <router-link v-else to="/login">Iniciar sesión</router-link>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
nav {
  display: flex;
  gap: 16px;
  align-items: center;
  padding: 12px 20px;
  border-bottom: 1px solid #ddd;
}
</style>