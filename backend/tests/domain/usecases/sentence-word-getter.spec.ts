import { Sentence } from '@/domain/models'
import { SentenceWordGetter } from '@/domain/usecases'

describe('SentenceWordGetter', () => {
  test('Should return "pay" to the next sentence: I always pay my bills on time.', () => {
    const sut = new SentenceWordGetter()
    const sentence: Sentence = { sentence: 'I always pay my bills on time.', wordIndex: 2 }
    const word = sut.getWord(sentence)
    expect(word).toBe('pay')
  })
  test('Should return null to the next sentence: I always pay my bills on time.', () => {
    const sut = new SentenceWordGetter()
    const sentence: Sentence = { sentence: 'I always pay my bills on time.', wordIndex: 200 }
    const word = sut.getWord(sentence)
    expect(word).toBeNull()
  })
  test('Should return "but", despite the spaces, to the next sentence: They quarreled     but later made up.', () => {
    const sut = new SentenceWordGetter()
    const sentence: Sentence = { sentence: 'They quarreled     but later made up.', wordIndex: 2 }
    const word = sut.getWord(sentence)
    expect(word).toBe('but')
  })
})
