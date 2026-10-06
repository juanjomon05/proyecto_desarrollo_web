// external imports
import { createPinia } from 'pinia'
import { watch } from 'vue'

export default class PiniaConfig {
  // Solo se guarda la sesion (AuthStore); los datos se consultan al backend.
  // Se cambia el nombre cuando cambia la forma del estado guardado, para que el
  // navegador no cargue datos con el formato anterior.
  private static readonly STORAGE_KEY = 'piniaState_v3'

  public static init() {
    const pinia = createPinia()

    const savedState = localStorage.getItem(this.STORAGE_KEY)

    if (savedState) {
      pinia.state.value = JSON.parse(savedState)
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
