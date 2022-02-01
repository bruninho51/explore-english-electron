import { SentenceOnAnki } from '@/domain/protocols/sentence-on-anki'
import { MongooseMovieSchema } from '@/infra/database/mongoose/schemas/mongoose-movie'
import { Model } from 'mongoose'

export class MongooseSentenceOnAnki implements SentenceOnAnki {
  constructor (
    private readonly movieRepository: Model<MongooseMovieSchema>
  ) {}

  async setOnAnki (movieId: string, sentenceId: string): Promise<void> {
    return await new Promise((resolve, reject) => {
      (async () => {

        await this.movieRepository.updateOne({
          _id: movieId,
          'sentences' : { $elemMatch:{ _id:sentenceId } }
        }, { 
          $set: { 
           'sentences.$.savedOnAnki': true
          } 
        }, { 
          new : false,
          overwrite : true,
          runValidators: true
         }).exec();

         resolve()
      })().catch(error => reject(error))
    })
  }
}
