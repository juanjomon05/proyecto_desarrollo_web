// external imports
import { defineStore } from 'pinia'
import { ref } from 'vue'

// internal imports
import type { SubjectInterface } from '@/interfaces/SubjectInterface'

export const useSubjectStore = defineStore('subject', () => {
  const subjects = ref<SubjectInterface[]>([])

  return { subjects }
})
