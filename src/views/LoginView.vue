<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { getItem, setItem, removeItem } from '@/services/storage'
import { REMEMBERED_EMAIL_KEY } from '@/services/storageKeys'
import AppLogo from '@/components/AppLogo.vue'

const router = useRouter()
const userStore = useUserStore()

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const showPassword = ref(false)
const errorMessage = ref('')

const benefits = [
  'Tus materias y tareas en un solo lugar',
  'Compara tus hábitos de estudio con tus notas',
  'Todo se guarda automáticamente'
]

onMounted(() => {
  const remembered = getItem<string>(REMEMBERED_EMAIL_KEY)
  if (remembered) {
    email.value = remembered
    rememberMe.value = true
  }
})

function handleSubmit(): void {
  if (!email.value || !password.value) {
    errorMessage.value = 'Completa correo y contraseña.'
    return
  }

  const success = userStore.login(email.value, password.value)
  if (!success) {
    errorMessage.value = 'Correo o contraseña incorrectos.'
    return
  }

  applyRememberMe()
  router.push('/subjects')
}

function loginAsDemo(role: 'student' | 'admin'): void {
  const account = role === 'student'
    ? { email: 'ana@studeasy.com', password: '1234' }
    : { email: 'admin@studeasy.com', password: 'admin' }

  const success = userStore.login(account.email, account.password)
  if (!success) return

  email.value = account.email
  password.value = account.password
  router.push('/subjects')
}

function applyRememberMe(): void {
  if (rememberMe.value) {
    setItem(REMEMBERED_EMAIL_KEY, email.value)
  } else {
    removeItem(REMEMBERED_EMAIL_KEY)
  }
}
</script>

<template>
  <div class="auth-screen">
    <div class="auth-panel auth-panel--brand">
      <AppLogo :size="40" />

      <span class="auth-badge">Bienvenido de nuevo</span>
      <h1>Organiza tu semestre sin esfuerzo</h1>

      <ul class="auth-benefits">
        <li v-for="benefit in benefits" :key="benefit">
          <span class="auth-benefits__check">✓</span>
          {{ benefit }}
        </li>
      </ul>
    </div>

    <div class="auth-panel auth-panel--form">
      <div class="auth-form-wrap">
        <div class="auth-form-wrap__mobile-brand">
          <AppLogo :size="36" />
        </div>

        <h1>Iniciar sesión</h1>
        <p class="auth-subtitle">Entra para seguir el ritmo de tus materias.</p>

        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="email">Correo</label>
            <input id="email" v-model="email" type="email" class="input" placeholder="tucorreo@studeasy.com" autocomplete="email" />
          </div>

          <div class="form-group">
            <label for="password">Contraseña</label>
            <div class="password-field">
              <input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                class="input"
                placeholder="••••••"
                autocomplete="current-password"
              />
              <button
                type="button"
                class="password-field__toggle"
                :aria-label="showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'"
                @click="showPassword = !showPassword"
              >
                <svg v-if="showPassword" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8M9.5 5.3A10.4 10.4 0 0112 5c5 0 9 4.5 10 7-.4 1.1-1.2 2.4-2.3 3.6M6.3 6.7C4.2 8 2.8 9.9 2 12c1 2.5 5 7 10 7 1.4 0 2.7-.3 3.9-.9" />
                </svg>
                <svg v-else viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </button>
            </div>
          </div>

          <div class="auth-row">
            <label class="checkbox-label">
              <input v-model="rememberMe" type="checkbox" />
              Recuérdame
            </label>
            <router-link to="/forgot-password" class="auth-link">¿Olvidaste tu contraseña?</router-link>
          </div>

          <p v-if="errorMessage" class="form-error">{{ errorMessage }}</p>

          <button type="submit" class="btn btn-primary auth-submit">Entrar</button>
        </form>

        <div class="auth-demo">
          <button type="button" class="btn btn-ghost btn-sm" @click="loginAsDemo('student')">Probar como estudiante</button>
          <button type="button" class="btn btn-ghost btn-sm" @click="loginAsDemo('admin')">Probar como administrador</button>
        </div>

        <p class="auth-switch">
          ¿No tienes cuenta? <router-link to="/register">Regístrate</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-screen {
  min-height: 100vh;
  display: flex;
}

.auth-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 48px clamp(24px, 5vw, 64px);
}

.auth-panel--brand {
  background: linear-gradient(160deg, var(--color-primary) 0%, var(--color-primary-dark) 55%, #232C7A 100%);
  color: #fff;
  gap: 22px;
  max-width: 480px;
}

.auth-panel--brand :deep(.app-logo__wordmark) {
  color: #fff;
}

.auth-badge {
  align-self: flex-start;
  background: rgba(255, 255, 255, 0.14);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 999px;
  padding: 6px 14px;
  font-size: 0.78rem;
  font-weight: 600;
}

.auth-panel--brand h1 {
  font-size: 2rem;
  line-height: 1.25;
  max-width: 380px;
}

.auth-benefits {
  list-style: none;
  margin: 8px 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.auth-benefits li {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.92);
}

.auth-benefits__check {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  border-radius: 50%;
  background: var(--color-accent);
  color: #1E2233;
  font-weight: 700;
  font-size: 0.75rem;
}

.auth-panel--form {
  max-width: 560px;
  margin: 0 auto;
}

.auth-form-wrap {
  width: 100%;
  max-width: 380px;
  margin: 0 auto;
}

.auth-form-wrap__mobile-brand {
  display: none;
  margin-bottom: 24px;
}

.auth-form-wrap h1 {
  font-size: 1.5rem;
}

.auth-subtitle {
  margin-top: 6px;
  margin-bottom: 26px;
  font-size: 0.88rem;
}

.password-field {
  position: relative;
}

.password-field .input {
  width: 100%;
  padding-right: 40px;
}

.password-field__toggle {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 4px;
  color: var(--color-text-muted);
  cursor: pointer;
  display: flex;
}

.password-field__toggle:hover {
  color: var(--color-text);
}

.auth-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 18px;
  flex-wrap: wrap;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  color: var(--color-text-muted);
  cursor: pointer;
}

.checkbox-label input {
  accent-color: var(--color-primary);
}

.auth-link {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-primary);
  text-decoration: none;
}

.auth-link:hover {
  text-decoration: underline;
}

.auth-submit {
  width: 100%;
  margin-top: 4px;
}

.auth-demo {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: 20px;
  flex-wrap: wrap;
}

.auth-switch {
  margin-top: 22px;
  font-size: 0.85rem;
  text-align: center;
}

.auth-switch a {
  color: var(--color-primary);
  font-weight: 600;
  text-decoration: none;
}

.auth-switch a:hover {
  text-decoration: underline;
}

@media (max-width: 860px) {
  .auth-panel--brand {
    display: none;
  }

  .auth-panel--form {
    max-width: none;
  }

  .auth-form-wrap__mobile-brand {
    display: flex;
    justify-content: center;
  }
}
</style>
