import { Sentence } from '../../models/sentence';

export interface SentenceWordGetterUC {
  getWord: (sentence: Sentence) => string
}
