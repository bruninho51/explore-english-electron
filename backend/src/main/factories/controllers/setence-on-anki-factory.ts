import { Controller } from '@/presentation/protocols'
import { makeMongooseLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeMongooseSentenceOnAnki } from '../repositories/mongoose-sentence-on-anki-factory'
import { SentenceOnAnkiController } from '@/presentation/controllers/sentence-on-anki'

export const makeMongooseSentenceOnAnkiController = async (): Promise<Controller> => {
  const sentenceOnAnki = await makeMongooseSentenceOnAnki()
  const controller = new SentenceOnAnkiController(sentenceOnAnki)
  return await makeMongooseLogControllerDecorator(controller)
}
