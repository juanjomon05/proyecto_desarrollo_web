import type { SubjectInterface } from '@/interfaces/SubjectInterface'

export type UpdateSubjectDTO = Partial<Pick<SubjectInterface, 'name' | 'professor' | 'credits'>>
