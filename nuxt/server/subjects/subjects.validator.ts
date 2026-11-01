// external imports
import { createError } from 'h3'

export class SubjectsValidator {
  static parseId(rawId: string | undefined): number {
    const id = Number(rawId)

    if (!Number.isInteger(id) || id <= 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'El id de la materia debe ser un entero positivo',
      })
    }

    return id
  }
}