import { MongooseLogger } from '@/data/repositories'
import { Logger } from '@/data/protocols'
import { makeMongooseLoggerModel } from '@/main/factories/database/mongoose/models/mongoose-logger-model-factory'

export const makeMongooseLogger = async (): Promise<Logger> => {
  return new MongooseLogger(await makeMongooseLoggerModel())
}
