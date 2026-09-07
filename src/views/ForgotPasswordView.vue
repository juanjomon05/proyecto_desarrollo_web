<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getUserByEmail, resetPassword } from '@/services/userService'
import AppLogo from '@/components/AppLogo.vue'

const router = useRouter()

const step = ref<'email' | 'reset' | 'done'>('email')
const email = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const errorMessage = ref('')

function handleCheckEmail(): void {
  errorMessage.value = ''

  if (!email.value) {
    errorMessage.value = 'Ingresa tu correo.'
    return
  }

  if (!getUserByEmail(email.value)) {
    errorMessage.value = 'No encontramos una cuenta con ese correo.'
    return
  }

  step.value = 'reset'
}

function handleResetPassword(): void {
  errorMessage.value = ''

  if (!newPassword.value || !confirmPassword.value) {
    errorMessage.value = 'Completa ambos campos.'
    return
  }

  if (newPassword.value !== confirmPassword.value) {
    errorMessage.value = 'Las contraseñas no coinciden.'
    return
  }

  resetPassword(email.value, newPassword.value)
  step.value = 'done'
}
</script>

<template>
  <div class="auth-screen">
    <div class="auth-card card">
      <div class="auth-card__brand">
        <AppLogo :size="44" />
      </div>

      <template v-if="step === 'email'">
        <h1>¿Olvidaste tu contraseña?</h1>
        <p class="auth-card__subtitle">Ingresa tu correo y te ayudamos a restablecerla.</p>

        <form @submit.prevent="handleCheckEmail">
          <div class="form-group">
            <label for="email">Correo</label>
            <input id="email" v-model="email" type="email" class="input" placeholder="tucorreo@studeasy.com" />
          </div>

          <p v-if="errorMessage" class="form-error">{{ errorMessage }}</p>

          <button type="submit" class="btn btn-primary auth-card__submit">Continuar</button>
        </form>
      </template>

      <template v-else-if="step === 'reset'">
        <h1>Define tu nueva contraseña</h1>
        <p class="auth-card__subtitle">
          Como este es un proyecto académico sin envío de correos, puedes definir tu nueva contraseña
          directamente aquí.
        </p>

        <form @submit.prevent="handleResetPassword">
          <div class="form-group">
            <label for="newPassword">Nueva contraseña</label>
            <input id="newPassword" v-model="newPassword" type="password" class="input" placeholder="••••••" />
          </div>
          <div class="form-group">
            <label for="confirmPassword">Confirmar contraseña</label>
            <input id="confirmPassword" v-model="confirmPassword" type="password" class="input" placeholder="••••••" />
          </div>

          <p v-if="errorMessage" class="form-error">{{ errorMessage }}</p>

          <button type="submit" class="btn btn-primary auth-card__submit">Guardar nueva contraseña</button>
        </form>
      </template>

      <template v-else>
        <h1>¡Listo!</h1>
        <p class="auth-card__subtitle">Tu contraseña se actualizó correctamente. Ya puedes iniciar sesión con ella.</p>
        <button type="button" class="btn btn-primary auth-card__submit" @click="router.push('/login')">
          Ir a iniciar sesión
        </button>
      </template>

      <p class="auth-card__switch">
        <router-link to="/login">Volver a iniciar sesión</router-link>
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
  line-height: 1.5;
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
