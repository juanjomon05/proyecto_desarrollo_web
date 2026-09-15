// internal imports
import { activitySeeder } from '@/stores/activitySeeder'
import { dailyLogSeeder } from '@/stores/dailyLogSeeder'
import { subjectSeeder } from '@/stores/subjectSeeder'
import { userSeeder } from '@/stores/userSeeder'
import type { ActivityInterface } from '@/interfaces/ActivityInterface'
import type { DailyLogInterface } from '@/interfaces/DailyLogInterface'
import type { PiniaStateInterface } from '@/interfaces/PiniaStateInterface'
import type { SubjectInterface } from '@/interfaces/SubjectInterface'
import type { UserInterface } from '@/interfaces/UserInterface'

function cloneItems<T>(items: T[]): T[] {
  return items.map(item => ({ ...item }))
}

function safeParse(value: string | null): unknown {
  if (!value) return null

  try {
    return JSON.parse(value)
  } catch {
    return null
  }
}

function readLegacyArray<T>(key: string): T[] | null {
  const value = safeParse(localStorage.getItem(key))
  return Array.isArray(value) ? value as T[] : null
}

function readLegacyCurrentUser(users: UserInterface[]): UserInterface | null {
  const value = safeParse(localStorage.getItem('studeasy_session')) as Partial<UserInterface> | null
  if (!value?.id) return null

  return users.find(user => user.id === value.id) || null
}

function defaultState(): PiniaStateInterface {
  return {
    user: {
      users: cloneItems(userSeeder),
      currentUser: null
    },
    subject: {
      subjects: cloneItems(subjectSeeder)
    },
    activity: {
      activities: cloneItems(activitySeeder)
    },
    dailyLog: {
      dailyLogs: cloneItems(dailyLogSeeder)
    }
  }
}

function normalizeState(value: unknown): PiniaStateInterface | null {
  if (!value || typeof value !== 'object') return null

  const rawState = value as Partial<PiniaStateInterface>
  const fallback = defaultState()
  const users = Array.isArray(rawState.user?.users) ? rawState.user.users : fallback.user.users

  return {
    user: {
      users,
      currentUser: rawState.user?.currentUser || null
    },
    subject: {
      subjects: Array.isArray(rawState.subject?.subjects) ? rawState.subject.subjects : fallback.subject.subjects
    },
    activity: {
      activities: Array.isArray(rawState.activity?.activities) ? rawState.activity.activities : fallback.activity.activities
    },
    dailyLog: {
      dailyLogs: Array.isArray(rawState.dailyLog?.dailyLogs) ? rawState.dailyLog.dailyLogs : fallback.dailyLog.dailyLogs
    }
  }
}

function legacyState(): PiniaStateInterface | null {
  const users = readLegacyArray<UserInterface>('studeasy_users')
  const subjects = readLegacyArray<SubjectInterface>('studeasy_subjects')
  const activities = readLegacyArray<ActivityInterface>('studeasy_activities')
  const dailyLogs = readLegacyArray<DailyLogInterface>('studeasy_dailyLogs')

  if (!users && !subjects && !activities && !dailyLogs && !localStorage.getItem('studeasy_session')) {
    return null
  }

  const fallback = defaultState()
  const finalUsers = users ?? fallback.user.users

  return {
    user: {
      users: finalUsers,
      currentUser: readLegacyCurrentUser(finalUsers)
    },
    subject: {
      subjects: subjects ?? fallback.subject.subjects
    },
    activity: {
      activities: activities ?? fallback.activity.activities
    },
    dailyLog: {
      dailyLogs: dailyLogs ?? fallback.dailyLog.dailyLogs
    }
  }
}

export function loadPiniaState(): PiniaStateInterface {
  return normalizeState(safeParse(localStorage.getItem('piniaState'))) ?? legacyState() ?? defaultState()
}
