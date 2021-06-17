import { Sentence } from '@/domain/models'
import { SentenceStore } from '@/domain/protocols'

export class MongooseSentenceStoreSpy implements SentenceStore {
  public sentence: Sentence
  async store (sentence: Sentence): Promise<void> {
    this.sentence = sentence
  }
}
