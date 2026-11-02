// internal imports
import type { SubjectInterface } from '#shared/interfaces/SubjectInterface'

export const SUBJECTS: SubjectInterface[] = [
  {
    id: 1,
    name: 'Arquitectura de Software',
    professor: 'Ing. Rodríguez',
    credits: 4,
    description: 'Patrones de diseño, capas, estilos arquitectónicos y despliegue de aplicaciones.',
  },
  {
    id: 2,
    name: 'Bases de Datos',
    professor: 'Ing. Solano',
    credits: 3,
    description: 'Modelo relacional, SQL, normalización y uso de un ORM.',
  },
  {
    id: 3,
    name: 'Cálculo III',
    professor: 'Ing. Vargas',
    credits: 4,
    description: 'Funciones de varias variables, derivadas parciales e integrales múltiples.',
  },
]
