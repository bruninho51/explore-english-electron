import { Sentence } from '../models'

export interface SentenceMovieShow {
  show: (movieId: string) => Promise<Sentence[]>
}

export namespace SentenceMovieShow {
  export type SentenceDto = {
    id: string
    wordIndex: number
    sentence: string
    videoTime: number
    word: string
    savedOnAnki: boolean
  }
  export type Result = SentenceDto[]
}
