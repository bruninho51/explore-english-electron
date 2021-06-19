import { Controller } from '@/presentation/protocols'
import { makeMongooseLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeMongooseMoviesShow } from '@/main/factories/repositories/mongoose-movies-show-factory'
import { MoviesShowController } from '@/presentation/controllers/movies-show'

export const makeMongooseMoviesShowController = async (): Promise<Controller> => {
  const moviesShow = await makeMongooseMoviesShow()
  const controller = new MoviesShowController(moviesShow)
  return await makeMongooseLogControllerDecorator(controller)
}
