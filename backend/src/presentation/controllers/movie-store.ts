import { Controller, HttpRequest, HttpResponse, Validation } from '@/presentation/protocols'
import { serverError, created, badRequest } from '@/presentation/helpers/http/http-helper'
import { MovieStore } from '@/domain/protocols'

export class MovieStoreController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly movieStore: MovieStore
  ) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    const { user } = request
    try {
      const errors = await this.validation.validate(request.body)
      if (errors) {
        return badRequest(errors)
      }

      await this.movieStore.store({ ...request.body, user })
      return created()
    } catch (error) {
      return serverError(error)
    }
  }
}
