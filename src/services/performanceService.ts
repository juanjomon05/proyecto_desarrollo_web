// src/services/performanceService.ts
// Logica de analisis: cruza DailyLog (estudio/sueno) con Activity (notas).
// No es un CRUD, es la funcionalidad diferenciadora del proyecto.

import { ReporteRendimiento } from '@/models/ReporteRendimiento'

export function getPerformanceData(userId: string, daysWindow = 3): ReporteRendimiento[] {
  return ReporteRendimiento.generarReporte(userId, daysWindow)
}
