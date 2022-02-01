import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { serverError, ok, notFound } from '@/presentation/helpers/http/http-helper'
import { SentenceOnAnki } from '@/domain/protocols/sentence-on-anki'

export class SentenceOnAnkiController implements Controller {
  constructor (
    private readonly sentenceOnAnki: SentenceOnAnki
  ) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      const { movieId, sentenceId } = request.params
      await this.sentenceOnAnki.setOnAnki(movieId, sentenceId)
      return ok(null)
    } catch (error) {
      if (error.name === 'CastError') {
        return notFound()
      }
      return serverError(error)
    }
  }
}
