// external imports
import { createPinia } from 'pinia'
import { watch } from 'vue'

// internal imports
import { dailyLogSeeder } from '@/seeders/DailyLogSeeder'

export default class PiniaConfig {
  // Se cambia el nombre cuando cambia la forma del estado guardado, para que el
  // navegador no cargue datos con el formato anterior y se usen los seeders.
  private static readonly STORAGE_KEY = 'piniaState_v2'

  public static init() {
    const pinia = createPinia()

    const savedState = localStorage.getItem(this.STORAGE_KEY)

    if (savedState) {
      pinia.state.value = JSON.parse(savedState)
    } else {
      pinia.state.value = {
        auth: {
          currentUser: null
        },
        dailyLog: {
          dailyLogs: dailyLogSeeder
        }
      }

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(pinia.state.value))
    }

    watch(
      pinia.state,
      (state) => {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(state))
      },
      { deep: true }
    )

    return pinia
  }
}
