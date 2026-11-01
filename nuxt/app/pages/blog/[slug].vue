<script setup lang="ts">
// internal imports
import { ArticleService } from '~/services/ArticleService'
import { DateUtil } from '~/utils/DateUtil'

// variables
const route = useRoute()
const article = ArticleService.getArticleBySlug(route.params.slug as string)

if (!article) {
  throw createError({ statusCode: 404, statusMessage: 'Artículo no encontrado', fatal: true })
}

useSeoMeta({ title: `${article.title} | StudEasy`, description: article.summary })
</script>

<template>
  <article v-if="article" class="panel article">
    <NuxtLink to="/blog" class="back-link">← Volver al blog</NuxtLink>
    <h1>{{ article.title }}</h1>
    <small class="article__meta">
      {{ article.author }} · {{ DateUtil.formatLong(article.publishedAt) }}
    </small>
    <p v-for="(paragraph, index) in article.content" :key="index">{{ paragraph }}</p>
  </article>
</template>

<style scoped>
.article {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 760px;
}

.article__meta {
  color: var(--color-text-muted);
  font-weight: 600;
}
</style>