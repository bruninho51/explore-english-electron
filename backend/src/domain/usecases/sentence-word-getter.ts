import { Sentence } from '@/domain/models'
import { SentenceWordGetterUC } from '@/domain/usecases/protocols'

export class SentenceWordGetter implements SentenceWordGetterUC {
  public getWord (sentence: Sentence): string {
    const words = this.extractWordsFromSentence(sentence.sentence)
    return words[sentence.wordIndex] ?? null
  }

  private extractWordsFromSentence (sentence: string): string[] {
    return sentence.split(' ').map(word => word.trim()).filter(word => !!word)
  }
}
