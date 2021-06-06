import { MovieStoreController } from '@/presentation/controllers/movie-store'
import { Controller } from '@/presentation/protocols'
import { MovieStoreValidation } from '@/validation/validators/movie-store-validation'
import { makeMongooseLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeMongooseMovieStore } from '@/main/factories/repositories/mongoose-movie-store-factory'
import { YupValidationErrorsParser } from '@/validation/helpers/yup-validation-errors-parser'

export const makeMongooseMovieStoreController = async (): Promise<Controller> => {
  const validation = new MovieStoreValidation(new YupValidationErrorsParser())
  const movieStore = await makeMongooseMovieStore()
  const controller = new MovieStoreController(validation, movieStore)
  return await makeMongooseLogControllerDecorator(controller)
}
