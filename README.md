# StudEasy

Aplicación para que un estudiante organice sus materias, actividades y hábitos de estudio en un solo lugar. El repositorio tiene dos proyectos:

- `frontend/` - SPA en Vue 3 (Vite, Pinia, Vue Router).
- `backend/` - API REST en NestJS con TypeORM y SQLite.

El frontend consume la API del backend; los datos se guardan en una base de datos SQLite. Para usar la aplicación hay que levantar los dos proyectos.

## Requisitos

- Node.js ^22.18.0 o >=24.12.0
- npm

## Cómo ejecutar el backend

```
cd backend
npm install
npm run seed
npm run start:dev
```

`npm run seed` borra la base de datos y la llena con datos de prueba. Solo hace falta correrlo la primera vez o cuando se quiera volver a los datos iniciales.

Queda disponible en `http://localhost:3000/api`. La base de datos SQLite se crea en `backend/database.sqlite` (no se sube al repositorio).

Variables de entorno opcionales: `PORT` (por defecto 3000), `SQLITE_PATH` (ruta del archivo SQLite) y `CORS_ORIGIN` (orígenes permitidos separados por coma).

Otros comandos: `npm run build`, `npm run start:prod`, `npm run lint`, `npm run format`.

## Cómo ejecutar el frontend

Con el backend corriendo, en otra terminal:

```
cd frontend
npm install
npm run dev
```

Queda disponible en `http://localhost:5173/`. La URL del backend se configura en `frontend/.env` (`VITE_API_BASE_URL`). Cuentas de prueba (creadas por el seed):

- Estudiante: `ana@studeasy.com` / `1234`
- Administrador: `admin@studeasy.com` / `admin`

Otros comandos: `npm run build`, `npm run preview`, `npm run test`, `npm run lint`.

## Endpoints del backend (`/api`)

- `auth` - `POST /auth/login`, `POST /auth/register`.
- `users` - CRUD de usuarios.
- `subjects` - CRUD de materias y `GET /subjects/user/:userId`.
- `activities` - CRUD de actividades, `GET /activities/subject/:subjectId` y `GET /activities/user/:userId`.
- `daily-logs` - CRUD de registros diarios y `GET /daily-logs/user/:userId`.

## Despliegue con Docker Compose

Antes de desplegar, compile ambos proyectos:

```
cd backend
npm install
npm run build

cd ../frontend
npm install
npm run build
```

En la máquina virtual, ajuste `frontend/.env` para que `VITE_API_BASE_URL` apunte a la IP de la instancia, por ejemplo:

```
VITE_API_BASE_URL=http://IP_DE_LA_INSTANCIA:3000
```

Luego, desde la carpeta raíz del repositorio, ejecute:

```
docker compose up -d
```

El frontend queda publicado por el puerto `80` y el backend por el puerto `3000`.

## Estructura del backend (`backend/src`)

- Un módulo por entidad (`users`, `subjects`, `activities`, `daily-logs`), cada uno con `entities`, `dto`, service, controller y module.
- `auth` - login y registro.
- `seeders` - datos de prueba que carga `npm run seed`.

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
- `services` - clases con métodos estáticos que consumen la API del backend con axios. Son las únicas que usan el store.
- `stores` - `AuthStore` con el usuario logueado; `PiniaConfig` lo guarda en el navegador para no perder la sesión al recargar.
- `utils` - clases con cálculos reutilizables (proyección de nota, rendimiento, fechas).
- `components` - componentes reutilizables.
- `views` - una vista por ruta. Vistas y componentes solo usan services, nunca stores.
- `router` - rutas y guard de autenticación/rol (`accessControl.ts`).

## Stack

- Frontend: Vue 3, TypeScript, Vue Router, Pinia, axios, Vite, Chart.js y ApexCharts.
- Backend: NestJS, TypeORM, SQLite (better-sqlite3), oxlint y Prettier.
