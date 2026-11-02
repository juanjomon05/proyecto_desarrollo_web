// internal imports
import { ARTICLES } from './app/data/articles'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      htmlAttrs: { lang: 'es' },
      title: 'StudEasy',
    },
  },
  // modo de renderizado de cada grupo de rutas
  routeRules: {
    '/blog/**': { prerender: true }, // SSG: se genera en el build
    '/subjects/**': { ssr: true }, // SSR: se renderiza en el servidor en cada peticion
  },
  nitro: {
    prerender: {
      routes: ['/blog', ...ARTICLES.map((article) => `/blog/${article.slug}`)],
    },
  },
})
