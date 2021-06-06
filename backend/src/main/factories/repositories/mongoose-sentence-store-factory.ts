import { MongooseSentenceStore } from '@/data/repositories'
import { SentenceStore } from '@/domain/protocols'
import { makeMongooseSentenceModel } from '@/main/factories/database/mongoose/models/mongoose-sentence-model-factory'

export const makeMongooseSentenceStore = async (): Promise<SentenceStore> => {
  return new MongooseSentenceStore(await makeMongooseSentenceModel())
}
