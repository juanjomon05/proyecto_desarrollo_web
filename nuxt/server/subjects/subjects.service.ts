// external imports
import { createError } from 'h3'

// internal imports
import type { SubjectInterface } from '#shared/interfaces/SubjectInterface'
import { SUBJECTS } from './subjects.data'

export class SubjectsService {
  static findAll(): SubjectInterface[] {
    return SUBJECTS
  }

  static findOne(id: number): SubjectInterface {
    const subject = SUBJECTS.find((item) => item.id === id)

    if (!subject) {
      throw createError({
        statusCode: 404,
        statusMessage: `No existe la materia con id ${id}`,
      })
    }

    return subject
  }
}