export class DateUtils {
  // Fecha de hoy en formato yyyy-mm-dd, en hora LOCAL del navegador. No usar
  // new Date().toISOString() para esto: convierte a UTC, y en zonas horarias
  // negativas (como Colombia, UTC-5) puede dar el dia siguiente al que ve el
  // usuario en su reloj, desfasando por un dia cualquier calculo que compare
  // contra "hoy".
  static getTodayLocalDate(): string {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }
}
