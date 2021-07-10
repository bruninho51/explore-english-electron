import { makeMongooseMovieModel } from '@/main/factories/database/mongoose/models/mongoose-movie-model-factory'
import { MovieDelete } from '@/domain/protocols/movie-delete'
import { MongooseMovieDelete } from '@/data/repositories/mongoose-movie-delete'

export const makeMongooseMovieDelete = async (): Promise<MovieDelete> => {
  return new MongooseMovieDelete(await makeMongooseMovieModel())
}
