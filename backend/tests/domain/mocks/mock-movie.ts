import faker from 'faker'
import { Movie } from '../models/movie'
import { mockSentence } from './mock-sentence'

export const mockMovie = (): Movie => ({
  id: faker.datatype.uuid(),
  name: faker.name.title(),
  sentences: [mockSentence(), mockSentence()]
})
