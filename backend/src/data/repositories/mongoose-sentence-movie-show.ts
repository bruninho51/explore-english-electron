import { Sentence } from '@/domain/models'
import { SentenceMovieShow } from '@/domain/protocols/sentence-movie-show'
import { SentenceWordGetterUC } from '@/domain/usecases/protocols'
import { MongooseMovieSchema } from '@/infra/database/mongoose/schemas/mongoose-movie'
import { Model } from 'mongoose'

export class MongooseSentenceMovieShow implements SentenceMovieShow {
  constructor (
    private readonly sentenceWordGetter: SentenceWordGetterUC,
    private readonly movieRepository: Model<MongooseMovieSchema>
  ) {}

  async show (movieId: string): Promise<Sentence[]> {
    return await new Promise((resolve, reject) => {
      (async () => {
        const movie = await this.movieRepository.findById(movieId)
        if (movie && Array.isArray(movie.sentences) && movie.sentences.length > 0) {
          const result: SentenceMovieShow.Result = movie.sentences.map(sentence => ({
            id: sentence._id,
            wordIndex: sentence.wordIndex,
            sentence: sentence.sentence,
            word: this.sentenceWordGetter.getWord({
              id: sentence._id,
              sentence: sentence.sentence,
              wordIndex: sentence.wordIndex,
              user: {
                id: sentence.user?._id,
                email: sentence.user?.email
              }
            })
          }))
          resolve(result)
        }
        resolve(null)
      })().catch(error => reject(error))
    })
  }
}
