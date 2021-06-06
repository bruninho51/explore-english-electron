import { Movie } from '@/domain/models/movie'
import { MovieShow } from '@/domain/protocols/movie-show'
import { SentenceWordGetterUC } from '@/domain/usecases/protocols'
import { MongooseMovieSchema } from '@/infra/database/mongoose/schemas/mongoose-movie'
import { Model } from 'mongoose'

export class MongooseMovieShow implements MovieShow {
  constructor (
    private readonly sentenceWordGetter: SentenceWordGetterUC,
    private readonly movieRepository: Model<MongooseMovieSchema>
  ) {}

  async show (movieId: string): Promise<Movie> {
    return await new Promise((resolve, reject) => {
      (async () => {
        const movie = await this.movieRepository.findById(movieId)
        const result: MovieShow.Result = {
          id: movie._id,
          name: movie.name,
          sentences: []
        }
        if (Array.isArray(movie.sentences) && movie.sentences.length > 0) {
          result.sentences = movie.sentences.map((sentence): MovieShow.SentenceDto => ({
            id: sentence._id,
            wordIndex: sentence.wordIndex,
            sentence: sentence.sentence,
            word: this.sentenceWordGetter.getWord(sentence)
          }))
        }

        resolve(result)
      })().catch(error => reject(error))
    })
  }
}
