import { Controller } from '@/presentation/protocols'
import { makeMongooseLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { YupValidationErrorsParser } from '@/validation/helpers/yup-validation-errors-parser'
import { MovieDeleteValidation } from '@/validation/validators/movie-delete-validation'
import { makeMongooseMovieDelete } from '../repositories/mongoose-movie-delete-factory'
import { MovieDeleteController } from '@/presentation/controllers/movie-delete'

export const makeMongooseMovieDeleteController = async (): Promise<Controller> => {
  const validation = new MovieDeleteValidation(new YupValidationErrorsParser())
  const movieDelete = await makeMongooseMovieDelete()
  const controller = new MovieDeleteController(validation, movieDelete)
  return await makeMongooseLogControllerDecorator(controller)
}
