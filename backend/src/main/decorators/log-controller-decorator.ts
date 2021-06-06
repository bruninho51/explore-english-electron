import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { Logger } from '@/data/protocols'

export class LogControllerDecorator implements Controller {
  constructor (
    private readonly controller: Controller,
    private readonly logger: Logger
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse: HttpResponse = await this.controller.handle(httpRequest)
    if (httpResponse.statusCode === 500) {
      const stack: string = httpResponse.body?.stack
      console.log(this.logger)
      await this.logger.logError(stack)
    }
    return httpResponse
  }
}
