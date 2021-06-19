import { SentenceWordGetter } from '@/domain/usecases'
import { SentenceMovieShow } from '@/domain/protocols/sentence-movie-show'
import { MongooseSentenceMovieShow } from '@/data/repositories/mongoose-sentence-movie-show'
import { makeMongooseMovieModel } from '../database/mongoose/models/mongoose-movie-model-factory'

export const makeMongooseSentenceMovieShow = async (): Promise<SentenceMovieShow> => {
  return new MongooseSentenceMovieShow(new SentenceWordGetter(), await makeMongooseMovieModel())
}
