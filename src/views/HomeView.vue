<script setup>
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
</script>

<template>
  <main>
    <h1>StudEasy</h1>
    <p>Lleva el control de tus materias, actividades y hábitos de estudio en un solo lugar.</p>

    <p v-if="userStore.isLoggedIn">
      Hola, {{ userStore.currentUser.name }}.
      <router-link to="/subjects">Ver mis materias</router-link>
    </p>
    <p v-else>
      <router-link to="/login">Inicia sesión</router-link> para empezar.
    </p>
  </main>
</template>