export class DateUtil {
  // convierte una fecha ISO (AAAA-MM-DD) en un texto legible, por ejemplo "10 de agosto de 2026"
  static formatLong(isoDate: string): string {
    return new Date(isoDate).toLocaleDateString('es-CO', { dateStyle: 'long', timeZone: 'UTC' })
  }
}