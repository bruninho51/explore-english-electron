import { makeMongooseSentenceStore } from '@/main/factories/repositories/mongoose-sentence-store-factory'
import { SentenceStoreController } from '@/presentation/controllers/sentence-store'
import { Controller } from '@/presentation/protocols'
import { YupValidationErrorsParser } from '@/validation/helpers/yup-validation-errors-parser'
import { SentenceStoreValidation } from '@/validation/validators/sentence-store-validation'
import { makeMongooseLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'

export const makeMongooseSentenceStoreController = async (): Promise<Controller> => {
  const validation = new SentenceStoreValidation(new YupValidationErrorsParser())
  const sentenceStore = await makeMongooseSentenceStore()
  const controller = new SentenceStoreController(validation, sentenceStore)
  return await makeMongooseLogControllerDecorator(controller)
}
