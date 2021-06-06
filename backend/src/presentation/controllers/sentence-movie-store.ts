import { Controller, HttpRequest, HttpResponse, Validation } from '@/presentation/protocols'
import { serverError, created, badRequest } from '@/presentation/helpers/http/http-helper'
import { SentenceMovieStore } from '@/domain/protocols/sentence-movie-store'

export class SentenceMovieStoreController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly sentenceMovieStore: SentenceMovieStore
  ) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      const errors = await this.validation.validate({ ...request.body, ...request.params })
      if (errors) {
        return badRequest(errors)
      }
      const { movieId } = request.params
      await this.sentenceMovieStore.store(movieId, request.body)
      return created()
    } catch (error) {
      return serverError(error)
    }
  }
}
