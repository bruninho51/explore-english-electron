import { Controller, HttpRequest, HttpResponse, Validation } from '@/presentation/protocols'
import { serverError, badRequest, ok, notFound } from '@/presentation/helpers/http/http-helper'
import { MovieShow } from '@/domain/protocols/movie-show'

export class MovieShowController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly movieShow: MovieShow
  ) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      const errors = await this.validation.validate({ ...request.params })
      if (errors) {
        return badRequest(errors)
      }
      const { movieId } = request.params
      const movie = await this.movieShow.show(movieId)

      if (!movie) {
        return notFound()
      }

      return ok(movie)
    } catch (error) {
      if (error.name === 'CastError') {
        return notFound()
      }
      return serverError(error)
    }
  }
}
