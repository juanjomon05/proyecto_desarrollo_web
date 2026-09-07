// src/utils/gradeProjection.ts
// Calcula, para las actividades de una materia, cuanto se lleva acumulado y que
// promedio se necesita en las actividades pendientes para ganar la materia.
// Escala colombiana: notas de 0.0 a 5.0, minimo para ganar = 3.0.

import type { Activity } from '@/models/Activity'

export const PASSING_GRADE = 3
export const MAX_GRADE = 5

export type ProjectionStatus = 'no-data' | 'won' | 'lost' | 'possible'

export interface GradeProjection {
  gradedWeight: number
  remainingWeight: number
  achievedPoints: number
  neededAverage: number | null
  status: ProjectionStatus
}

export function calculateGradeProjection(
  activities: Activity[],
  passingGrade = PASSING_GRADE,
  maxGrade = MAX_GRADE
): GradeProjection {
  const graded = activities.filter(a => a.weight !== null && a.weight !== undefined && a.grade !== null)

  if (graded.length === 0) {
    return { gradedWeight: 0, remainingWeight: 0, achievedPoints: 0, neededAverage: null, status: 'no-data' }
  }

  const gradedWeight = graded.reduce((sum, a) => sum + (a.weight ?? 0), 0)
  const achievedPoints = graded.reduce((sum, a) => sum + ((a.grade ?? 0) * (a.weight ?? 0)) / 100, 0)

  // Se asume que la materia se evalua sobre 100% en total, sin importar cuantas
  // actividades pendientes existan (o si aun no tienen % asignado). Antes solo se
  // sumaba el % de las actividades pendientes YA creadas y YA con peso asignado,
  // asi que calificar una sola actividad hacia parecer que no quedaba nada
  // pendiente y siempre marcaba "perdida".
  const remainingWeight = Math.max(0, 100 - gradedWeight)

  if (remainingWeight <= 0) {
    return {
      gradedWeight,
      remainingWeight,
      achievedPoints,
      neededAverage: null,
      status: achievedPoints >= passingGrade ? 'won' : 'lost'
    }
  }

  const neededAverage = (passingGrade - achievedPoints) / (remainingWeight / 100)

  if (neededAverage <= 0) {
    return { gradedWeight, remainingWeight, achievedPoints, neededAverage: 0, status: 'won' }
  }

  if (neededAverage > maxGrade) {
    return { gradedWeight, remainingWeight, achievedPoints, neededAverage, status: 'lost' }
  }

  return { gradedWeight, remainingWeight, achievedPoints, neededAverage, status: 'possible' }
}
