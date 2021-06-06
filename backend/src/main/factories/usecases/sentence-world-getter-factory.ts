import { SentenceWordGetter } from '@/domain/usecases'
import { SentenceWordGetterUC } from '@/domain/usecases/protocols'

export const makeSentenceWordGetter = (): SentenceWordGetterUC => {
  return new SentenceWordGetter()
}
