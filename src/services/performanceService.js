// src/services/performanceService.js
// Logica de analisis: cruza DailyLog (estudio/sueno) con Activity (notas).
// No es un CRUD, es la funcionalidad diferenciadora del proyecto.

import { ReporteRendimiento } from '@/models/ReporteRendimiento'

export function getPerformanceData(userId, daysWindow = 3) {
  return ReporteRendimiento.generarReporte(userId, daysWindow)
}
