// internal imports
import type { ArticleInterface } from '../interfaces/ArticleInterface'

export const ARTICLES: ArticleInterface[] = [
  {
    id: 1,
    slug: 'organiza-tus-materias-del-semestre',
    title: 'Cómo organizar tus materias y actividades durante el semestre',
    summary: 'Un método sencillo para no perder de vista ninguna entrega ni ningún parcial.',
    author: 'Equipo StudEasy',
    publishedAt: '2026-08-10',
    content: [
      'Al inicio del semestre todo parece manejable, pero a mitad de periodo las entregas de varias materias empiezan a coincidir. La mejor defensa es tener todas tus actividades en un solo lugar.',
      'Registra cada materia con su profesor y sus créditos, y después agrega cada tarea, quiz, examen o proyecto con su fecha de entrega. Así puedes ver de un vistazo qué vence primero.',
      'Revisa tu lista una vez por semana. Marca lo que ya terminaste y mueve a "en progreso" lo que ya empezaste: ese pequeño ritual evita sorpresas de última hora.',
    ],
  },
  {
    id: 2,
    slug: 'habitos-de-estudio-y-sueno',
    title: 'Por qué dormir bien también sube tus notas',
    summary: 'Qué dicen las horas de estudio y de sueño sobre tu rendimiento académico.',
    author: 'Equipo StudEasy',
    publishedAt: '2026-08-24',
    content: [
      'Estudiar más horas no siempre significa estudiar mejor. Cuando duermes poco, tu concentración baja y necesitas más tiempo para aprender lo mismo.',
      'Llevar un registro diario de cuántas horas estudias y cuántas duermes te permite comparar esos hábitos con tus notas reales y descubrir qué rutina funciona para ti.',
      'Una regla práctica: en semana de parciales, protege tus horas de sueño antes que añadir una hora extra de estudio nocturno.',
    ],
  },
  {
    id: 3,
    slug: 'calcula-la-nota-que-necesitas',
    title: 'Cómo calcular la nota que necesitas para ganar una materia',
    summary: 'Una cuenta rápida para saber qué promedio necesitas en lo que te falta.',
    author: 'Equipo StudEasy',
    publishedAt: '2026-09-07',
    content: [
      'En la escala colombiana las notas van de 0.0 a 5.0 y la nota mínima para aprobar es 3.0. Cada actividad aporta según su porcentaje sobre el total de la materia.',
      'Multiplica cada nota por su porcentaje para saber cuántos puntos llevas acumulados. Después resta esos puntos de 3.0 y divide entre el porcentaje que aún no se ha evaluado.',
      'Si el resultado es mayor a 5.0, ya no es posible aprobar; si es menor o igual a 0, la materia ya está ganada. Puedes hacer esta cuenta en nuestra calculadora de la sección de herramientas.',
    ],
  },
]
