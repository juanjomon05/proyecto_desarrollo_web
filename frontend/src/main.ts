// external imports
import { createApp } from 'vue'

// internal imports
import './assets/main.css'
import App from './App.vue'
import router from './router'
import PiniaConfig from './PiniaConfig'
import { AuthService } from '@/services/AuthService'

const app = createApp(App)

app.use(PiniaConfig.init())
app.use(router)

AuthService.restoreSession(() => router.push({ name: 'login' }))

app.mount('#app')
