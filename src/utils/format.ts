// src/utils/format.ts
// Helpers de formateo de fecha/hora para mostrar en las vistas.
// Nota: al momento de crear este archivo no se encontro formateo de fecha/hora
// duplicado en las vistas (dueDate/date se muestran tal cual, en formato ISO
// yyyy-mm-dd). Se deja listo para cuando alguna vista necesite mostrar fechas
// en formato local en vez de ISO.

export function formatDate(isoDate: string, locale = 'es-CO'): string {
  if (!isoDate) return ''
  const date = new Date(`${isoDate}T00:00:00`)
  if (Number.isNaN(date.getTime())) return isoDate
  return date.toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric' })
}

export function formatHours(hours: number | null | undefined, decimals = 1): string {
  if (hours === null || hours === undefined || Number.isNaN(hours)) return '—'
  return `${hours.toFixed(decimals)} h`
}

// Fecha de hoy en formato yyyy-mm-dd, en hora LOCAL del navegador. No usar
// new Date().toISOString() para esto: convierte a UTC, y en zonas horarias
// negativas (como Colombia, UTC-5) puede dar el dia siguiente al que ve el
// usuario en su reloj, desfasando por un dia cualquier calculo que compare
// contra "hoy".
export function getTodayLocalDate(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
