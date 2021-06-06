import { Movie } from '@/domain/models/movie'

export interface MovieShow {
  show: (movieId: string) => Promise<Movie>
}

export namespace MovieShow {
  export type SentenceDto = {
    id: string
    wordIndex: number
    sentence: string
    word: string
  }
  export type Result = {
    id: string
    name: string
    sentences?: SentenceDto[]
  }
}
