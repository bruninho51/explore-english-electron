import { SentenceOnAnki } from '@/domain/protocols/sentence-on-anki'
import { MongooseSentenceOnAnki } from '@/data/repositories/mongoose-sentence-on-anki'
import { makeMongooseMovieModel } from '../database/mongoose/models/mongoose-movie-model-factory'

export const makeMongooseSentenceOnAnki = async (): Promise<SentenceOnAnki> => {
  return new MongooseSentenceOnAnki(await makeMongooseMovieModel())
}
