import { Sentence } from '../models'
import { SentenceWordGetterUC } from '../usecases/protocols'
import faker from 'faker'

export class SentenceWordGetterSpy implements SentenceWordGetterUC {
  public sentence: Sentence[] = []
  public result: string[] = []
  getWord (sentence: Sentence): string {
    this.sentence.push(sentence)
    const fakeWord = faker.random.word()
    this.result.push(fakeWord)
    return fakeWord
  }
}
