import { Sentence } from '../models'

export interface SentenceShow {
  show: (sentenceId: string) => Promise<Sentence>
}

export namespace SentenceShow {
  export type SentenceDto = {
    id: string
    wordIndex: number
    sentence: string
    videoTime: number
    word: string
  }
  export type Result = SentenceDto
}
