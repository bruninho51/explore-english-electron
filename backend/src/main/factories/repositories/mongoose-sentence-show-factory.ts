import { SentenceWordGetter } from '@/domain/usecases'
import { SentenceShow } from '@/domain/protocols/sentence-show'
import { MongooseSentenceShow } from '@/data/repositories/mongoose-sentence-show'
import { makeMongooseSentenceModel } from '../database/mongoose/models/mongoose-sentence-model-factory'

export const makeMongooseSentenceShow = async (): Promise<SentenceShow> => {
  return new MongooseSentenceShow(new SentenceWordGetter(), await makeMongooseSentenceModel())
}
