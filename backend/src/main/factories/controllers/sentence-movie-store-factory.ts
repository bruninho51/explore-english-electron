import { Controller } from '@/presentation/protocols'
import { makeMongooseLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeMongooseSentenceMovieStore } from '@/main/factories/repositories/mongoose-sentence-movie-store-factory'
import { SentenceMovieStoreController } from '@/presentation/controllers/sentence-movie-store'
import { SentenceMovieStoreValidation } from '@/validation/validators/sentence-movie-store-validation'
import { YupValidationErrorsParser } from '@/validation/helpers/yup-validation-errors-parser'

export const makeMongooseSentenceMovieStoreController = async (): Promise<Controller> => {
  const validation = new SentenceMovieStoreValidation(new YupValidationErrorsParser())
  const sentenceMovieStore = await makeMongooseSentenceMovieStore()
  const controller = new SentenceMovieStoreController(validation, sentenceMovieStore)
  return await makeMongooseLogControllerDecorator(controller)
}
