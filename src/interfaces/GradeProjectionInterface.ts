export type ProjectionStatus = 'no-data' | 'won' | 'lost' | 'possible'

export interface GradeProjectionInterface {
  gradedWeight: number
  remainingWeight: number
  achievedPoints: number
  neededAverage: number | null
  status: ProjectionStatus
}
