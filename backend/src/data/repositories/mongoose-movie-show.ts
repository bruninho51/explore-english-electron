import { Movie } from '@/domain/models/movie'
import { MovieShow } from '@/domain/protocols/movie-show'
import { MongooseMovieSchema } from '@/infra/database/mongoose/schemas/mongoose-movie'
import { Model } from 'mongoose'

export class MongooseMovieShow implements MovieShow {
  constructor (
    private readonly movieRepository: Model<MongooseMovieSchema>
  ) {}

  async show (movieId: string): Promise<Movie> {
    return await new Promise((resolve, reject) => {
      (async () => {
        const movie = await this.movieRepository.findById(movieId)
        if (movie) {
          const result: MovieShow.Result = {
            id: movie._id,
            name: movie.name
          }
          resolve(result)
        }

        resolve(null)
      })().catch(error => reject(error))
    })
  }
}