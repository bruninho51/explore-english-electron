import { Sentence } from './sentence'

export type Movie = {
  id?: string
  name: string
  sentences?: Sentence[]
}
