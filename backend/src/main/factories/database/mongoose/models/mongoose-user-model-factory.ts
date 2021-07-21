import { Model } from 'mongoose'
import { makeMongooseConnection } from '@/main/factories/database/mongoose/mongoose-connection-factory'
import { MongooseUser, MongooseUserSchema } from '@/infra/database/mongoose/schemas/mongoose-user'

export const makeMongooseUserModel = async (): Promise<Model<MongooseUserSchema>> => {
  const mongooseUser = new MongooseUser(await makeMongooseConnection())
  return await mongooseUser.getModel()
}
