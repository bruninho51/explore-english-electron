import { MongooseSentenceMovieStore } from '@/data/repositories/mongoose-sentence-movie-store'
import { SentenceMovieStore } from '@/domain/protocols/sentence-movie-store'
import { makeMongooseMovieModel } from '../database/mongoose/models/mongoose-movie-model-factory'

export const makeMongooseSentenceMovieStore = async (): Promise<SentenceMovieStore> => {
  return new MongooseSentenceMovieStore(await makeMongooseMovieModel())
}
