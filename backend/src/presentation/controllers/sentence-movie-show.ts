import { Controller, HttpRequest, HttpResponse, Validation } from '@/presentation/protocols'
import { serverError, badRequest, ok, notFound } from '@/presentation/helpers/http/http-helper'
import { SentenceMovieShow } from '@/domain/protocols/sentence-movie-show'

export class SentenceMovieShowController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly sentenceMovieShow: SentenceMovieShow
  ) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      const errors = await this.validation.validate({ ...request.params })
      if (errors) {
        return badRequest(errors)
      }
      const { movieId } = request.params
      const sentences = await this.sentenceMovieShow.show(movieId)

      if (!sentences) {
        return notFound()
      }

      return ok(sentences)
    } catch (error) {
      if (error.name === 'CastError') {
        return notFound()
      }
      return serverError(error)
    }
  }
}
