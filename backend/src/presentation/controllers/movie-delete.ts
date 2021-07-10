import { Controller, HttpRequest, HttpResponse, Validation } from '@/presentation/protocols'
import { serverError, badRequest, ok, notFound } from '@/presentation/helpers/http/http-helper'
import { MovieDelete } from '@/domain/protocols/movie-delete'

export class MovieDeleteController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly movieDelete: MovieDelete
  ) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      const errors = await this.validation.validate({ ...request.params })
      if (errors) {
        return badRequest(errors)
      }
      const { movieId } = request.params
      await this.movieDelete.delete(movieId)

      return ok({})
    } catch (error) {
      if (error.name === 'CastError') {
        return notFound()
      }
      return serverError(error)
    }
  }
}
