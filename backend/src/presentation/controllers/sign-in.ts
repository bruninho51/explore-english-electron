import { Controller, HttpRequest, HttpResponse, Validation } from '@/presentation/protocols'
import { serverError, badRequest, ok } from '@/presentation/helpers/http/http-helper'
import { SignIn } from '@/domain/protocols/sign-in'
import { InvalidCredentialsError } from '@/presentation/errors/invalid-credentials-error'

export class SignInController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly signIn: SignIn
  ) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      const errors = await this.validation.validate(request.body)
      if (errors) {
        return badRequest(errors)
      }

      const { email, password } = request.body
      const signInResult = await this.signIn.signIn(email, password)

      return ok(signInResult)
    } catch (error) {
      if (error instanceof InvalidCredentialsError) {
        return badRequest([{
          path: 'credentials',
          errors: [error.message]
        }])
      }
      return serverError(error)
    }
  }
}
