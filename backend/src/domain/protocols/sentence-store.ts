import { Sentence } from '@/domain/models'

export interface SentenceStore {
  store: (sentence: Sentence) => Promise<void>
}
