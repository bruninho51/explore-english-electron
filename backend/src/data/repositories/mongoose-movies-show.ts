import { MoviesShow } from '@/domain/protocols/movies-show'
import { MongooseMovieSchema } from '@/infra/database/mongoose/schemas/mongoose-movie'
import { Model } from 'mongoose'

export class MongooseMoviesShow implements MoviesShow {
  constructor (
    private readonly movieRepository: Model<MongooseMovieSchema>
  ) {}

  async show (): Promise<MoviesShow.Result[]> {
    return await new Promise((resolve, reject) => {
      (async () => {
        const movies = await this.movieRepository.find()
        if (movies) {
          const result: MoviesShow.Result[] = movies.map(movie => ({
            id: movie._id,
            name: movie.name
          }))
          resolve(result)
        }

        resolve(null)
      })().catch(error => reject(error))
    })
  }
}
