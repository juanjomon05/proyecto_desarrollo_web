# StudEasy

Aplicación para que un estudiante organice sus materias, actividades y hábitos de estudio en un solo lugar. El repositorio tiene dos proyectos:

- `frontend/` - SPA en Vue 3 (Vite, Pinia, Vue Router).
- `backend/` - API REST en NestJS con TypeORM y SQLite.

> Estado actual: el backend tiene la configuración base (TypeORM, SQLite, prefijo `/api`, CORS). El frontend todavía guarda los datos en el LocalStorage del navegador mientras se migra a consumir la API.

## Requisitos

- Node.js ^22.18.0 o >=24.12.0
- npm

## Cómo ejecutar el frontend

```
cd frontend
npm install
npm run dev
```

Queda disponible en `http://localhost:5173/`. Cuentas de prueba:

- Estudiante: `ana@studeasy.com` / `1234`
- Administrador: `admin@studeasy.com` / `admin`

Otros comandos: `npm run build`, `npm run preview`, `npm run test`, `npm run lint`.

## Cómo ejecutar el backend

```
cd backend
npm install
npm run start:dev
```

Queda disponible en `http://localhost:3000/api`. La base de datos SQLite se crea en `backend/database.sqlite` (no se sube al repositorio).

Variables de entorno opcionales: `PORT` (por defecto 3000), `SQLITE_PATH` (ruta del archivo SQLite) y `CORS_ORIGIN` (orígenes permitidos separados por coma).

Otros comandos: `npm run build`, `npm run start:prod`, `npm run lint`, `npm run format`.

## Rutas principales del frontend

- `/` - inicio, con resumen y gráficas del usuario logueado.
- `/login` y `/register` - inicio de sesión y registro.
- `/subjects` y `/subjects/:id` - materias del estudiante y detalle de cada una (con la proyección de nota).
- `/activities`, `/activities/new`, `/activities/:id/edit` - CRUD de actividades.
- `/tracking` - registro de horas de estudio y sueño, con gráfica de correlación contra las notas.
- `/admin/subjects`, `/admin/subjects/new`, `/admin/subjects/:id/edit` - CRUD de materias, solo para administradores.
- `/admin/dashboard` - panel de administrador con filtros y gráficas de todas las actividades.

## Estructura del frontend (`frontend/src`)

- `interfaces` - interfaces del dominio (User, Subject, Activity, DailyLog).
- `dtos` - tipos para crear y actualizar entidades.
- `services` - clases con métodos estáticos con el CRUD de cada entidad. Son las únicas que usan los stores.
- `stores` - un store de Pinia por entidad, más `AuthStore` para la sesión.
- `seeders` - datos iniciales que carga `PiniaConfig`.
- `utils` - clases con cálculos reutilizables (proyección de nota, rendimiento, fechas).
- `components` - componentes reutilizables.
- `views` - una vista por ruta. Vistas y componentes solo usan services, nunca stores.
- `router` - rutas y guard de autenticación/rol (`accessControl.ts`).

## Stack

- Frontend: Vue 3, TypeScript, Vue Router, Pinia, Vite, Chart.js y ApexCharts.
- Backend: NestJS, TypeORM, SQLite (better-sqlite3), oxlint y Prettier.
