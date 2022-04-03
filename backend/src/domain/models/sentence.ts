export interface Sentence {
  id?: string
  wordIndex: number
  sentence: string
  videoTime: number
  user?: {
    id: string
    email: string
  }
}
