import { Movie } from '@/domain/models/movie'

export interface MovieShow {
  show: (movieId: string) => Promise<Movie>
}

export namespace MovieShow {
  export type Result = {
    id: string
    name: string
  }
}
