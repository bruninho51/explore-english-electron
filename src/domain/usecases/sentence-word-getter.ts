import { Sentence } from '../models/sentence';
import { SentenceWordGetterUC } from './protocols/sentence-word-getter-uc';

export class SentenceWordGetter implements SentenceWordGetterUC {
  public getWord (sentence: Sentence): string {
    const words = this.extractWordsFromSentence(sentence.sentence);
    return words[sentence.wordIndex] ?? null;
  }

  private extractWordsFromSentence (sentence: string): string[] {
    return sentence.split(' ').map(word => word.trim()).filter(word => !!word);
  }
}
