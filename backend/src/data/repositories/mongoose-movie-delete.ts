import { MovieDelete } from '@/domain/protocols/movie-delete'
import { MongooseMovieSchema } from '@/infra/database/mongoose/schemas/mongoose-movie'
import { Model } from 'mongoose'

export class MongooseMovieDelete implements MovieDelete {
  constructor (
    private readonly movieRepository: Model<MongooseMovieSchema>
  ) {}

  async delete (movieId: string): Promise<void> {
    return await new Promise((resolve, reject) => {
      (async () => {
        try {
          await this.movieRepository.deleteOne({ _id: movieId })
          resolve()
        } catch (err) {
          reject(err)
        }
      })().catch(error => reject(error))
    })
  }
}
