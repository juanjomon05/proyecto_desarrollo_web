// internal imports
import type { GradeItemInterface } from '~/interfaces/GradeItemInterface'
import type { GradeProjectionInterface } from '~/interfaces/GradeProjectionInterface'

// Calcula cuanto se lleva acumulado en una materia y que promedio se necesita en el
// porcentaje que falta por evaluar para ganarla. Es la misma logica del
// GradeProjectionCalculator del frontend. Escala colombiana: 0.0 a 5.0, se gana con 3.0.
export class GradeProjectionCalculator {
  static readonly PASSING_GRADE = 3
  static readonly MAX_GRADE = 5

  static calculate(items: GradeItemInterface[]): GradeProjectionInterface {
    const graded = items.filter((item) => item.grade !== null && item.weight !== null)

    if (graded.length === 0) {
      return {
        gradedWeight: 0,
        remainingWeight: 0,
        achievedPoints: 0,
        neededAverage: null,
        status: 'no-data',
      }
    }

    const gradedWeight = graded.reduce((sum, item) => sum + (item.weight ?? 0), 0)
    const achievedPoints = graded.reduce(
      (sum, item) => sum + ((item.grade ?? 0) * (item.weight ?? 0)) / 100,
      0,
    )
    const remainingWeight = Math.max(0, 100 - gradedWeight)

    if (remainingWeight <= 0) {
      return {
        gradedWeight,
        remainingWeight,
        achievedPoints,
        neededAverage: null,
        status: achievedPoints >= this.PASSING_GRADE ? 'won' : 'lost',
      }
    }

    const neededAverage = (this.PASSING_GRADE - achievedPoints) / (remainingWeight / 100)

    if (neededAverage <= 0) {
      return { gradedWeight, remainingWeight, achievedPoints, neededAverage: 0, status: 'won' }
    }

    if (neededAverage > this.MAX_GRADE) {
      return { gradedWeight, remainingWeight, achievedPoints, neededAverage, status: 'lost' }
    }

    return { gradedWeight, remainingWeight, achievedPoints, neededAverage, status: 'possible' }
  }
}
