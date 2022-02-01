import { Sentence } from '../../domain/models/sentence';
import { Dictionary } from '../../domain/protocols/dictionary';

export type CreateAnkiCardParams = {
  phrase: Sentence
  deckName: string
  dictionary: Dictionary
}
