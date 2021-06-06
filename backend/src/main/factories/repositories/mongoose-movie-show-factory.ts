import { MovieShow } from '@/domain/protocols/movie-show'
import { MongooseMovieShow } from '@/data/repositories/mongoose-movie-show'
import { SentenceWordGetter } from '@/domain/usecases'
import { makeMongooseMovieModel } from '@/main/factories/database/mongoose/models/mongoose-movie-model-factory'

export const makeMongooseMovieShow = async (): Promise<MovieShow> => {
  return new MongooseMovieShow(new SentenceWordGetter(), await makeMongooseMovieModel())
}
