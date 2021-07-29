import { Controller, HttpRequest, HttpResponse, Validation } from '@/presentation/protocols'
import { serverError, badRequest, ok } from '@/presentation/helpers/http/http-helper'
import { SentenceCardExport } from '@/domain/protocols/sentence-card-export'
import { Sentence } from '@/domain/models'

export class SentenceCardExportController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly sentenceCardExporter: SentenceCardExport
  ) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      const errors = await this.validation.validate({ ...request.body })
      if (errors) {
        return badRequest(errors)
      }
      const sentence: Sentence = request.body
      const card = await this.sentenceCardExporter.export(sentence)

      return ok(card)
    } catch (error) {
      return serverError(error)
    }
  }
}
