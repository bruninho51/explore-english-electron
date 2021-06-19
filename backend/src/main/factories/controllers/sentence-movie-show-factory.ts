import { Controller } from '@/presentation/protocols'
import { makeMongooseLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { YupValidationErrorsParser } from '@/validation/helpers/yup-validation-errors-parser'
import { SentenceMovieShowValidation } from '@/validation/validators/sentence-movie-show-validation'
import { makeMongooseSentenceMovieShow } from '../repositories/mongoose-sentence-movie-show-factory'
import { SentenceMovieShowController } from '@/presentation/controllers/sentence-movie-show'

export const makeMongooseSentenceMovieShowController = async (): Promise<Controller> => {
  const validation = new SentenceMovieShowValidation(new YupValidationErrorsParser())
  const sentenceMovieShow = await makeMongooseSentenceMovieShow()
  const controller = new SentenceMovieShowController(validation, sentenceMovieShow)
  return await makeMongooseLogControllerDecorator(controller)
}
