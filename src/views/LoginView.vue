<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

const router = useRouter()
const userStore = useUserStore()

const email = ref('')
const password = ref('')
const errorMessage = ref('')

function handleSubmit() {
  if (!email.value || !password.value) {
    errorMessage.value = 'Completa correo y contraseña.'
    return
  }

  const success = userStore.login(email.value, password.value)
  if (!success) {
    errorMessage.value = 'Correo o contraseña incorrectos.'
    return
  }

  router.push('/subjects')
}
</script>

<template>
  <main>
    <h1>Iniciar sesión</h1>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="email">Correo</label>
        <input id="email" v-model="email" type="email" />
      </div>
      <div>
        <label for="password">Contraseña</label>
        <input id="password" v-model="password" type="password" />
      </div>
      <p v-if="errorMessage">{{ errorMessage }}</p>
      <button type="submit">Entrar</button>
    </form>
    <p>Prueba con: ana@studeasy.com / 1234 (estudiante) o admin@studeasy.com / admin</p>
  </main>
</template> 