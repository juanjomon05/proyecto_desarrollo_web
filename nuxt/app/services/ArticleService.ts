// internal imports
import { ARTICLES } from '~/data/articles'
import type { ArticleInterface } from '~/interfaces/ArticleInterface'

export class ArticleService {
  static getArticles(): ArticleInterface[] {
    return ARTICLES
  }

  static getArticleBySlug(slug: string): ArticleInterface | null {
    return ARTICLES.find((article) => article.slug === slug) ?? null
  }
}
