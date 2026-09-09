import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { DailyLogInterface } from '@/interfaces/DailyLogInterface'

export const useDailyLogStore = defineStore('dailyLog', () => {
  const dailyLogs = ref<DailyLogInterface[]>([])

  return { dailyLogs }
})
