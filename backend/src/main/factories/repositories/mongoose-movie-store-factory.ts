import { MongooseMovieStore } from '@/data/repositories/mongoose-movie-store'
import { MovieStore } from '@/domain/protocols'
import { makeMongooseMovieModel } from '../database/mongoose/models/mongoose-movie-model-factory'

export const makeMongooseMovieStore = async (): Promise<MovieStore> => {
  return new MongooseMovieStore(await makeMongooseMovieModel())
}
