# Etapa 1: compila el proyecto Nuxt
FROM node:22-bookworm-slim AS builder

WORKDIR /app

# se copia todo antes de npm ci porque el postinstall (nuxt prepare)
# necesita nuxt.config.ts y la carpeta app/
COPY . .
RUN npm ci
RUN npm run build

# Etapa 2: solo el servidor Node generado en .output
FROM node:22-bookworm-slim

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/.output ./.output

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
