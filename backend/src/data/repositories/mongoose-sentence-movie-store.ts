import { Sentence } from '@/domain/models'
import { SentenceMovieStore } from '@/domain/protocols/sentence-movie-store'
import { MongooseMovieSchema } from '@/infra/database/mongoose/schemas/mongoose-movie'
import { Model } from 'mongoose'

export class MongooseSentenceMovieStore implements SentenceMovieStore {
  constructor (private readonly movieRepository: Model<MongooseMovieSchema>) {}

  async store (movieId: string, sentence: Sentence): Promise<void> {
    return await new Promise((resolve, reject) => {
      (async () => {
        await this.movieRepository.updateOne({
          _id: movieId
        }, {
          $push: {
            sentences: sentence
          }
        })

        resolve()
      })().catch(error => reject(error))
    })
  }
}
