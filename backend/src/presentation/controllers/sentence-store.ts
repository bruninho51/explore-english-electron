import { Controller, HttpRequest, HttpResponse, Validation } from '@/presentation/protocols'
import { serverError, created, badRequest } from '@/presentation/helpers/http/http-helper'
import { SentenceStore } from '@/domain/protocols'

export class SentenceStoreController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly sentenceStore: SentenceStore
  ) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      const errors = await this.validation.validate(request.body)
      if (errors) {
        return badRequest(errors)
      }

      await this.sentenceStore.store(request.body)
      return created()
    } catch (error) {
      return serverError(error)
    }
  }
}
