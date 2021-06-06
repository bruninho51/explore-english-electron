import { Controller } from '@/presentation/protocols'
import { makeMongooseLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { MovieShowValidation } from '@/validation/validators'
import { YupValidationErrorsParser } from '@/validation/helpers/yup-validation-errors-parser'
import { MovieShowController } from '@/presentation/controllers/movie-show'
import { makeMongooseMovieShow } from '@/main/factories/repositories/mongoose-movie-show-factory'

export const makeMongooseMovieShowController = async (): Promise<Controller> => {
  const validation = new MovieShowValidation(new YupValidationErrorsParser())
  const movieShow = await makeMongooseMovieShow()
  const controller = new MovieShowController(validation, movieShow)
  return await makeMongooseLogControllerDecorator(controller)
}
