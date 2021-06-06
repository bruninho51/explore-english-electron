import { Sentence } from '@/domain/models/sentence'

export interface SentenceWordGetterUC {
  getWord: (sentence: Sentence) => string
}
