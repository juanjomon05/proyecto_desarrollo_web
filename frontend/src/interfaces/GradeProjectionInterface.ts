// types
export type ProjectionStatus = 'no-data' | 'won' | 'lost' | 'possible'

// main interface
export interface GradeProjectionInterface {
  gradedWeight: number
  remainingWeight: number
  achievedPoints: number
  neededAverage: number | null
  status: ProjectionStatus
}
