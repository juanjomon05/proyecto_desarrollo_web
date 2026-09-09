import type { StateTree } from 'pinia'
import type { ActivityInterface } from '@/interfaces/ActivityInterface'
import type { DailyLogInterface } from '@/interfaces/DailyLogInterface'
import type { SubjectInterface } from '@/interfaces/SubjectInterface'
import type { UserInterface } from '@/interfaces/UserInterface'

export interface PiniaStateInterface extends Record<string, StateTree> {
  user: {
    users: UserInterface[]
    currentUser: UserInterface | null
  }
  subject: {
    subjects: SubjectInterface[]
  }
  activity: {
    activities: ActivityInterface[]
  }
  dailyLog: {
    dailyLogs: DailyLogInterface[]
  }
}
