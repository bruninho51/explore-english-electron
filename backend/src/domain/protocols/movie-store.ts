import { Movie } from '../models/movie'

export interface MovieStore {
  store: (movie: Movie) => Promise<void>
}
