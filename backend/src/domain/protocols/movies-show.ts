import { Movie } from '@/domain/models/movie'

export interface MoviesShow {
  show: () => Promise<Movie[]>
}
