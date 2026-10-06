// internal imports
import type { SubjectInterface } from '@/interfaces/SubjectInterface'

export type CreateSubjectDTO = Pick<SubjectInterface, 'name' | 'professor' | 'credits'> & {
  userId?: string
}
