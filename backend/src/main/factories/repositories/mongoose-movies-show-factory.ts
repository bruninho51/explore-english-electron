import { makeMongooseMovieModel } from '@/main/factories/database/mongoose/models/mongoose-movie-model-factory'
import { MoviesShow } from '@/domain/protocols/movies-show'
import { MongooseMoviesShow } from '@/data/repositories/mongoose-movies-show'

export const makeMongooseMoviesShow = async (): Promise<MoviesShow> => {
  return new MongooseMoviesShow(await makeMongooseMovieModel())
}
