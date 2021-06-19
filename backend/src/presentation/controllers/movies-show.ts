import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { serverError, ok, notFound } from '@/presentation/helpers/http/http-helper'
import { MoviesShow } from '@/domain/protocols/movies-show'

export class MoviesShowController implements Controller {
  constructor (
    private readonly moviesShow: MoviesShow
  ) {}

  async handle (_request: HttpRequest): Promise<HttpResponse> {
    try {
      const movies = await this.moviesShow.show()

      if (!movies) {
        return notFound()
      }

      return ok(movies)
    } catch (error) {
      if (error.name === 'CastError') {
        return notFound()
      }
      return serverError(error)
    }
  }
}
