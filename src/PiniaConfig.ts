// external imports
import { createPinia } from 'pinia'
import { watch } from 'vue'

// internal imports
import { activitySeeder } from '@/seeders/ActivitySeeder'
import { dailyLogSeeder } from '@/seeders/DailyLogSeeder'
import { subjectSeeder } from '@/seeders/SubjectSeeder'
import { userSeeder } from '@/seeders/UserSeeder'

export default class PiniaConfig {
  public static init() {
    const pinia = createPinia()

    const savedState = localStorage.getItem('piniaState')

    if (savedState) {
      pinia.state.value = JSON.parse(savedState)
    } else {
      pinia.state.value = {
        user: {
          users: userSeeder
        },
        auth: {
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
