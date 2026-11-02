// internal imports
import type { SubjectInterface } from '#shared/interfaces/SubjectInterface'

export class SubjectService {
  private static readonly API_URL = '/api/subjects'

  static getSubjects(): Promise<SubjectInterface[]> {
    return $fetch<SubjectInterface[]>(this.API_URL)
  }
}
