import { Model } from 'mongoose'
import { makeMongooseConnection } from '@/main/factories/database/mongoose/mongoose-connection-factory'
import { MongooseLog, MongooseLogSchema } from '@/infra/database/mongoose/schemas/mongoose-log'

export const makeMongooseLoggerModel = async (): Promise<Model<MongooseLogSchema>> => {
  const mongooseLog = new MongooseLog(await makeMongooseConnection())
  return await mongooseLog.getModel()
}
