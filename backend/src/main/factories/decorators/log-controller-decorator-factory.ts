import { Controller } from '@/presentation/protocols'
import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'
import { makeMongooseLogger } from '../repositories/mongoose-logger-factory'

export const makeMongooseLogControllerDecorator = async (controller: Controller): Promise<Controller> => {
  return new LogControllerDecorator(controller, await makeMongooseLogger())
}
