import { createPinia } from 'pinia'
import { watch } from 'vue'
import { loadPiniaState } from '@/utils/piniaState'

export default class PiniaConfig {
  static init() {
    const pinia = createPinia()
    pinia.state.value = loadPiniaState()
    localStorage.setItem('piniaState', JSON.stringify(pinia.state.value))

    watch(
      pinia.state,
      (state) => {
        localStorage.setItem('piniaState', JSON.stringify(state))
      },
      { deep: true }
    )

    return pinia
  }
}
