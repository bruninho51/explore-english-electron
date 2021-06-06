import { MongooseConnection } from '@/infra/database/mongoose/mongoose-connection'
import { Mongoose } from 'mongoose'

export const makeMongooseConnection = async (): Promise<Mongoose> => {
  const connection = new MongooseConnection()
  return await connection.getConnection()
}
