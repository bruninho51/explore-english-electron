import { Sentence } from '@/domain/models'
import faker from 'faker'

export const mockSentence = (): Sentence => ({
  id: faker.datatype.uuid(),
  sentence: faker.random.words(5),
  wordIndex: Math.ceil(Math.random() * 5)
})
