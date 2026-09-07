# StudEasy

SPA hecha en Vue 3 para que un estudiante organice sus materias, actividades y hábitos de estudio en un solo lugar. Los datos se guardan en el LocalStorage del navegador, no hay backend.

## Requisitos

- Node.js ^22.18.0 o >=24.12.0
- npm

## Cómo ejecutar el proyecto

Instalar dependencias:

```
npm install
```

Modo desarrollo (con hot-reload):

```
npm run dev
```

Por defecto queda disponible en `http://localhost:5173/`. Esa es la ruta principal que hay que abrir en el navegador.

Compilar para producción:

```
npm run build
```

Previsualizar el build de producción:

```
npm run preview
```

## Primer uso

La primera vez que se carga la aplicación se siembran datos ficticios en LocalStorage (usuarios, materias, actividades y registros diarios). Para entrar se puede usar cualquiera de estas cuentas, o registrar una nueva desde la pantalla de login:

- Estudiante: `ana@studeasy.com` / `1234`
- Administrador: `admin@studeasy.com` / `admin`

Si se quiere volver a ver la app como la primera vez (sin las materias/actividades que se hayan creado durante las pruebas), hay que borrar los datos del sitio en las herramientas de desarrollador del navegador (Application > Local Storage) y recargar.

## Rutas principales

- `/` - inicio, con resumen y gráficas del usuario logueado.
- `/login` y `/register` - inicio de sesión y registro.
- `/subjects` y `/subjects/:id` - materias del estudiante y detalle de cada una (con la proyección de nota).
- `/activities`, `/activities/new`, `/activities/:id/edit` - CRUD de actividades.
- `/tracking` - registro de horas de estudio y sueño, con gráfica de correlación contra las notas.
- `/admin/subjects`, `/admin/subjects/new`, `/admin/subjects/:id/edit` - CRUD de materias, solo para administradores.
- `/admin/dashboard` - panel de administrador con filtros y gráficas de todas las actividades.

## Estructura del proyecto

- `src/models` - clases del dominio (User, Subject, Activity, DailyLog) e interfaces en `types.ts`.
- `src/services` - acceso a LocalStorage y lógica de negocio; las vistas nunca llaman a LocalStorage directamente, solo a los services.
- `src/stores` - estado global con Pinia (sesión del usuario).
- `src/utils` - funciones auxiliares reutilizables (búsquedas, formateo, cálculo de proyección de nota).
- `src/components` - componentes reutilizables (tabla, selector de filtro, modal, formularios, tarjetas de gráfica, etc).
- `src/views` - una vista por ruta.
- `src/router` - definición de rutas y guards de autenticación/rol.

## Stack

Vue 3, TypeScript, Vue Router, Pinia, Vite, Chart.js y ApexCharts.
