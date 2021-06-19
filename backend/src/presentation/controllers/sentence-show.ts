import { Controller, HttpRequest, HttpResponse, Validation } from '@/presentation/protocols'
import { serverError, badRequest, ok, notFound } from '@/presentation/helpers/http/http-helper'
import { SentenceShow } from '@/domain/protocols/sentence-show'

export class SentenceShowController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly sentenceShow: SentenceShow
  ) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      const errors = await this.validation.validate({ ...request.params })
      if (errors) {
        return badRequest(errors)
      }
      const { sentenceId } = request.params
      const sentence = await this.sentenceShow.show(sentenceId)

      if (!sentence) {
        return notFound()
      }

      return ok(sentence)
    } catch (error) {
      if (error.name === 'CastError') {
        return notFound()
      }
      return serverError(error)
    }
  }
}
