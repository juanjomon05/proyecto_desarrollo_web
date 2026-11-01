<script setup lang="ts">
// internal imports
import { ArticleService } from '~/services/ArticleService'
import { DateUtil } from '~/utils/DateUtil'

// variables
const articles = ArticleService.getArticles()

useSeoMeta({ title: 'Blog | StudEasy' })
</script>

<template>
  <section class="page-header">
    <h1>Blog</h1>
    <p>Consejos para organizar tu semestre y mejorar tus notas.</p>
  </section>

  <section class="card-grid">
    <CardLinkComponent
      v-for="article in articles"
      :key="article.id"
      :to="`/blog/${article.slug}`"
      :title="article.title"
      :description="article.summary"
      :meta="DateUtil.formatLong(article.publishedAt)"
    />
  </section>
</template>