import { Controller } from '@/presentation/protocols'
import { makeMongooseLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { YupValidationErrorsParser } from '@/validation/helpers/yup-validation-errors-parser'
import { SentenceShowValidation } from '@/validation/validators/sentence-show-validation'
import { makeMongooseSentenceShow } from '../repositories/mongoose-sentence-show-factory'
import { SentenceShowController } from '@/presentation/controllers/sentence-show'

export const makeMongooseSentenceShowController = async (): Promise<Controller> => {
  const validation = new SentenceShowValidation(new YupValidationErrorsParser())
  const sentenceShow = await makeMongooseSentenceShow()
  const controller = new SentenceShowController(validation, sentenceShow)
  return await makeMongooseLogControllerDecorator(controller)
}
