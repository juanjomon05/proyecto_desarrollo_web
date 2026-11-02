// internal imports
import { FAQS } from '~/data/faqs'
import type { FaqInterface } from '~/interfaces/FaqInterface'

export class FaqService {
  static getFaqs(): FaqInterface[] {
    return FAQS
  }
}
