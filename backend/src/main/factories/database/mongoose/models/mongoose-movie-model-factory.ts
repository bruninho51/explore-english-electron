import { Model } from 'mongoose'
import { makeMongooseConnection } from '@/main/factories/database/mongoose/mongoose-connection-factory'
import { MongooseMovie, MongooseMovieSchema } from '@/infra/database/mongoose/schemas/mongoose-movie'

export const makeMongooseMovieModel = async (): Promise<Model<MongooseMovieSchema>> => {
  const connection = await makeMongooseConnection()
  const mongooseMovie = new MongooseMovie(connection)
  return await mongooseMovie.getModel()
}
