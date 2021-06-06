import { Controller } from '@/presentation/protocols'
import { makeMongooseLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeMongooseSentenceMovieStore } from '../repositories/mongoose-sentence-movie-store-factory'
import { SentenceMovieStoreController } from '@/presentation/controllers/sentence-movie-store'
import { SentenceMovieStoreValidation } from '@/validation/validators/sentence-movie-store-validation'

export const makeMongooseSentenceMovieStoreController = async (): Promise<Controller> => {
  const validation = new SentenceMovieStoreValidation()
  const sentenceMovieStore = await makeMongooseSentenceMovieStore()
  const controller = new SentenceMovieStoreController(validation, sentenceMovieStore)
  return await makeMongooseLogControllerDecorator(controller)
}
