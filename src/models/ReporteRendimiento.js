import { Actividad } from './Actividad.js'
import { RegistroDiario } from './RegistroDiario.js'

export class ReporteRendimiento {
  constructor({
    activityId,
    activityTitle,
    dueDate,
    grade,
    avgStudyHours,
    avgSleepHours
  }) {
    this.activityId = activityId
    this.activityTitle = activityTitle
    this.dueDate = dueDate
    this.grade = grade
    this.avgStudyHours = avgStudyHours
    this.avgSleepHours = avgSleepHours
  }

  static calcularPromedios(logs, endDate, days) {
    const end = new Date(endDate)
    const start = new Date(end)
    start.setDate(start.getDate() - (days - 1))

    const inRange = logs.filter(log => {
      const date = new Date(log.date)
      return date >= start && date <= end
    })

    if (inRange.length === 0) {
      return { avgStudyHours: null, avgSleepHours: null }
    }

    const avgStudyHours = inRange.reduce((sum, log) => sum + log.studyHours, 0) / inRange.length
    const avgSleepHours = inRange.reduce((sum, log) => sum + log.sleepHours, 0) / inRange.length
    return { avgStudyHours, avgSleepHours }
  }

  static generarReporte(userId, daysWindow = 3) {
    const logs = RegistroDiario.obtenerPorUsuario(userId)
    const gradedActivities = Actividad.obtenerTodas().filter(activity => activity.grade !== null)

    return gradedActivities.map(activity => {
      const { avgStudyHours, avgSleepHours } = ReporteRendimiento.calcularPromedios(
        logs,
        activity.dueDate,
        daysWindow
      )

      return new ReporteRendimiento({
        activityId: activity.id,
        activityTitle: activity.title,
        dueDate: activity.dueDate,
        grade: activity.grade,
        avgStudyHours,
        avgSleepHours
      })
    })
  }
}
