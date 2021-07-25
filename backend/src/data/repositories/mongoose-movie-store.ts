import { Movie } from '@/domain/models/movie'
import { MovieStore } from '@/domain/protocols'
import { MongooseMovieSchema } from '@/infra/database/mongoose/schemas/mongoose-movie'
import { Model } from 'mongoose'

export class MongooseMovieStore implements MovieStore {
  constructor (private readonly movieRepository: Model<MongooseMovieSchema>) {}

  async store (movie: Movie): Promise<void> {
    return await new Promise((resolve, reject) => {
      (async () => {
        console.log(movie)
        const model = await this.movieRepository.create({
          name: movie.name,
          sentences: movie.sentences,
          user: {
            _id: movie.user.id,
            email: movie.user.email
          }
        })

        await model.save()

        resolve()
      })().catch(error => reject(error))
    })
  }
}
