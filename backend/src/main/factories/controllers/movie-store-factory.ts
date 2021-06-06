import { MovieStoreController } from '@/presentation/controllers/movie-store'
import { Controller } from '@/presentation/protocols'
import { MovieStoreValidation } from '@/validation/validators/movie-store-validation'
import { makeMongooseLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeMongooseMovieStore } from '@/main/factories/repositories/mongoose-movie-store-factory'

export const makeMongooseMovieStoreController = async (): Promise<Controller> => {
  const validation = new MovieStoreValidation()
  const movieStore = await makeMongooseMovieStore()
  const controller = new MovieStoreController(validation, movieStore)
  return await makeMongooseLogControllerDecorator(controller)
}
