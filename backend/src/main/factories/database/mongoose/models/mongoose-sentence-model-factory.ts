import { MongooseSentence, MongooseSentenceSchema } from '@/infra/database/mongoose/schemas/mongoose-sentence'
import { Model } from 'mongoose'
import { makeMongooseConnection } from '@/main/factories/database/mongoose/mongoose-connection-factory'

export const makeMongooseSentenceModel = async (): Promise<Model<MongooseSentenceSchema>> => {
  const mongooseSentence = new MongooseSentence(await makeMongooseConnection())
  return await mongooseSentence.getModel()
}
