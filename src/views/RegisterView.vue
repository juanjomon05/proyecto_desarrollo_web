<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import AppLogo from '@/components/AppLogo.vue'

const router = useRouter()
const userStore = useUserStore()

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMessage = ref('')

function handleSubmit(): void {
  errorMessage.value = ''

  if (!name.value || !email.value || !password.value || !confirmPassword.value) {
    errorMessage.value = 'Completa todos los campos.'
    return
  }

  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Las contraseñas no coinciden.'
    return
  }

  const result = userStore.register(name.value, email.value, password.value)
  if (!result.success) {
    errorMessage.value = result.message || 'No se pudo crear la cuenta.'
    return
  }

  router.push('/subjects')
}
</script>

<template>
  <div class="auth-screen">
    <div class="auth-card card">
      <div class="auth-card__brand">
        <AppLogo :size="44" />
      </div>

      <h1>Crear cuenta</h1>
      <p class="auth-card__subtitle">Regístrate para empezar a organizar tu semestre.</p>

      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="name">Nombre</label>
          <input id="name" v-model="name" type="text" class="input" placeholder="Tu nombre completo" />
        </div>
        <div class="form-group">
          <label for="email">Correo</label>
          <input id="email" v-model="email" type="email" class="input" placeholder="tucorreo@studeasy.com" />
        </div>
        <div class="form-group">
          <label for="password">Contraseña</label>
          <input id="password" v-model="password" type="password" class="input" placeholder="••••••" />
        </div>
        <div class="form-group">
          <label for="confirmPassword">Confirmar contraseña</label>
          <input id="confirmPassword" v-model="confirmPassword" type="password" class="input" placeholder="••••••" />
        </div>

        <p v-if="errorMessage" class="form-error">{{ errorMessage }}</p>

        <button type="submit" class="btn btn-primary auth-card__submit">Crear cuenta</button>
      </form>

      <p class="auth-card__switch">
        ¿Ya tienes cuenta? <router-link to="/login">Inicia sesión</router-link>
      </p>
    </div>
  </div>
</template>

<style scoped>
.auth-screen {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: linear-gradient(160deg, var(--color-primary) 0%, var(--color-primary-dark) 55%, #232C7A 100%);
}

.auth-card {
  width: 100%;
  max-width: 400px;
  padding: 36px 32px;
}

.auth-card__brand {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.auth-card h1 {
  text-align: center;
  font-size: 1.4rem;
}

.auth-card__subtitle {
  text-align: center;
  margin-top: 6px;
  margin-bottom: 26px;
  font-size: 0.88rem;
}

.auth-card__submit {
  width: 100%;
  margin-top: 4px;
}

.auth-card__switch {
  margin-top: 22px;
  font-size: 0.85rem;
  text-align: center;
}

.auth-card__switch a {
  color: var(--color-primary);
  font-weight: 600;
  text-decoration: none;
}

.auth-card__switch a:hover {
  text-decoration: underline;
}
</style>
