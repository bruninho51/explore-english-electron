import { Controller } from '@/presentation/protocols'
import { makeMongooseLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { YupValidationErrorsParser } from '@/validation/helpers/yup-validation-errors-parser'
import { SignInValidation } from '@/validation/validators/sign-in-validation'
import { SignInController } from '@/presentation/controllers/sign-in'
import { makeMongooseSignIn } from '../repositories/mongoose-sign-in-factory'

export const makeMongooseSignInController = async (): Promise<Controller> => {
  const validation = new SignInValidation(new YupValidationErrorsParser())
  const signIn = await makeMongooseSignIn()
  const controller = new SignInController(validation, signIn)
  return await makeMongooseLogControllerDecorator(controller)
}
