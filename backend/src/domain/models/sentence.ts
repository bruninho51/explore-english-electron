export interface Sentence {
  id?: string
  wordIndex: number
  sentence: string
  user?: {
    id: string
    email: string
  }
}
