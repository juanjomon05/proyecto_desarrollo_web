<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { UserService } from '@/services/userService'
import AppLogo from '@/components/AppLogo.vue'

const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMessage = ref('')

function handleSubmit(): void {
  if (!name.value || !email.value || !password.value) {
    errorMessage.value = 'Completa nombre, correo y contraseña.'
    return
  }
  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Las contraseñas no coinciden.'
    return
  }

  const success = UserService.registerUser({ name: name.value, email: email.value, password: password.value })
  if (!success) {
    errorMessage.value = 'Ese correo ya está registrado.'
    return
  }

  router.push('/subjects')
}
</script>

<template>
  <div class="login-screen">
    <div class="login-card card">
      <div class="login-card__brand">
        <AppLogo :size="44" />
      </div>

      <h1>Crear cuenta</h1>
      <p class="login-card__subtitle">Regístrate para empezar a organizar tus materias.</p>

      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="name">Nombre</label>
          <input id="name" v-model="name" type="text" class="input" placeholder="Tu nombre" />
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

        <button type="submit" class="btn btn-primary login-card__submit">Crear cuenta</button>
      </form>

      <p class="login-card__hint">
        ¿Ya tienes cuenta? <router-link to="/login">Inicia sesión</router-link>
      </p>
    </div>
  </div>
</template>

<style scoped>
.login-screen {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: linear-gradient(160deg, var(--color-primary) 0%, var(--color-primary-dark) 55%, #232C7A 100%);
}

.login-card {
  width: 100%;
  max-width: 400px;
  padding: 36px 32px;
}

.login-card__brand {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.login-card h1 {
  text-align: center;
  font-size: 1.4rem;
}

.login-card__subtitle {
  text-align: center;
  margin-top: 6px;
  margin-bottom: 26px;
  font-size: 0.88rem;
}

.login-card__submit {
  width: 100%;
  margin-top: 4px;
}

.login-card__hint {
  margin-top: 22px;
  font-size: 0.78rem;
  text-align: center;
  line-height: 1.5;
}
</style>
