import { Sentence } from '@/domain/models'
import { SentenceMovieStore } from '@/domain/protocols/sentence-movie-store'
import { MongooseMovieSchema } from '@/infra/database/mongoose/schemas/mongoose-movie'
import { MongooseSentenceSchema } from '@/infra/database/mongoose/schemas/mongoose-sentence'
import { Model } from 'mongoose'

export class MongooseSentenceMovieStore implements SentenceMovieStore {
  constructor (private readonly movieRepository: Model<MongooseMovieSchema>) {}

  async store (movieId: string, sentence: Sentence): Promise<Sentence> {
    return await new Promise((resolve, reject) => {
      (async () => {
        await this.movieRepository.updateOne({
          _id: movieId
        }, {
          $push: {
            sentences: sentence,
          }
        })

        const result = await this.movieRepository.findById(movieId)
          .select({ "sentences": { "$slice": -1 }})

        const mongoSentence: MongooseSentenceSchema = result.sentences.pop()

        const newSentence: Sentence = {
          id: mongoSentence._id,
          sentence: mongoSentence.sentence,
          wordIndex: mongoSentence.wordIndex
        }
        
        resolve(newSentence)
      })().catch(error => reject(error))
    })
  }
}
