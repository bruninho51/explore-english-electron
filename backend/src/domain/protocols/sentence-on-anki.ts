export interface SentenceOnAnki {
  setOnAnki: (movieId: string, sentenceId: string) => Promise<void>
}

export namespace SentenceOnAnki {
  export type SentenceDto = {
    id: string
    wordIndex: number
    sentence: string
    word: string
  }
  export type Result = SentenceDto
}
