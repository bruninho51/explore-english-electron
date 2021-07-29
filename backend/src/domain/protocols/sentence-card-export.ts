import { Card } from '../card'
import { Sentence } from '../models'

export interface SentenceCardExport {
  export: (sentence: Sentence) => Promise<Card>
}
