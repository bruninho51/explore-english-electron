import { Sentence } from './sentence'

export interface Movie {
  id?: string
  name: string
  sentences?: Sentence[]
  user: {
    id: string
    email: string
  }
}
