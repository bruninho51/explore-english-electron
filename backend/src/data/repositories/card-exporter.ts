import { Dictionary } from '@/domain/dictionary'
import CardRepository from '@/domain/protocols/card-repository'
import { SentenceCardExport } from '@/domain/protocols/sentence-card-export'
import { Sentence } from '@/domain/models/sentence'
import { SentenceWordGetterUC } from '@/domain/usecases/protocols'
import { Sentence as SentenceElement } from '@/domain/sentence'
import { Card } from '@/domain/card'

export class SentenceCardExporter implements SentenceCardExport {
  constructor (
    private readonly dictionary: Dictionary,
    private readonly repository: CardRepository,
    private readonly sentenceWordGetter: SentenceWordGetterUC
  ) {}

  async export (sentence: Sentence): Promise<Card> {
    const { dictionary, repository, sentenceWordGetter } = this
    const sentenceElement = new SentenceElement(sentence, dictionary, sentenceWordGetter)
    const card: Card = await sentenceElement.searchForWord()
    await card.save(repository)

    return card
  }
}
