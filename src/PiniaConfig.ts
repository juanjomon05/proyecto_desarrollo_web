import { createPinia } from 'pinia'
import { watch } from 'vue'
import { activitySeeder } from '@/seeders/activitySeeder'
import { dailyLogSeeder } from '@/seeders/dailyLogSeeder'
import { subjectSeeder } from '@/seeders/subjectSeeder'
import { userSeeder } from '@/seeders/userSeeder'

export default class PiniaConfig {
  static init() {
    const pinia = createPinia()
    const savedState = localStorage.getItem('piniaState')

    if (savedState) {
      pinia.state.value = JSON.parse(savedState)
    } else {
      pinia.state.value = {
        user: {
          users: userSeeder,
          currentUser: null
        },
        subject: {
          subjects: subjectSeeder
        },
        activity: {
          activities: activitySeeder
        },
        dailyLog: {
          dailyLogs: dailyLogSeeder
        }
      }
      localStorage.setItem('piniaState', JSON.stringify(pinia.state.value))
    }

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
