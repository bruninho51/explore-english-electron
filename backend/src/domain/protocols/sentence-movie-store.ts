import { Sentence } from '@/domain/models'

export interface SentenceMovieStore {
  store: (movieId: string, sentence: Sentence) => Promise<void>
}
