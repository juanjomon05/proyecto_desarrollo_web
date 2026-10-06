// internal imports
import type { ActivityInterface } from '@/interfaces/ActivityInterface'

export type CreateActivityDTO = Pick<ActivityInterface, 'subjectId' | 'title' | 'type' | 'dueDate' | 'weight'>
