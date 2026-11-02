// internal imports
import type { FaqInterface } from '../interfaces/FaqInterface'

export const FAQS: FaqInterface[] = [
  {
    id: 1,
    question: '¿Qué es StudEasy?',
    answer:
      'Es una aplicación para organizar en un solo lugar tus materias, tus actividades (tareas, quizzes, exámenes y proyectos) y tus hábitos de estudio y sueño, y ver cómo esos hábitos se relacionan con tus notas.',
  },
  {
    id: 2,
    question: '¿Cómo empiezo a usarla?',
    answer:
      'Crea una cuenta con tu nombre, correo y contraseña. Después registra tus materias con su profesor y sus créditos, y agrega a cada una sus actividades con la fecha de entrega y el porcentaje que valen.',
  },
  {
    id: 3,
    question: '¿Cómo se calcula la nota que necesito para ganar una materia?',
    answer:
      'Cada nota se multiplica por su porcentaje para obtener los puntos acumulados. Lo que falta para llegar a 3.0 se divide entre el porcentaje que aún no se ha evaluado. Si el resultado es mayor a 5.0 ya no es posible ganar; si es 0 o menos, la materia ya está ganada.',
  },
  {
    id: 4,
    question: '¿Para qué sirve el seguimiento de estudio y sueño?',
    answer:
      'Cada día anotas cuántas horas estudiaste y cuántas dormiste. La aplicación compara el promedio de los días anteriores a cada actividad con la nota que sacaste, para que veas qué rutina te funciona mejor.',
  },
  {
    id: 5,
    question: '¿Qué puede hacer un administrador?',
    answer:
      'El administrador ve las materias de todos los estudiantes, puede crearlas, editarlas y eliminarlas, y tiene un panel con gráficas del estado de todas las actividades.',
  },
]
