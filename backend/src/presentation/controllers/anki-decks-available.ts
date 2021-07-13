import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { serverError, ok, badGateway } from '@/presentation/helpers/http/http-helper'
import CardRepository from '@/domain/protocols/card-repository'
import Anki from '@/data/repositories/anki'
import { DefaultAnkiCardTheme } from '@/data/card-themes/anki-card-theme'
import { AnkiConnectionError } from '../errors/anki-connection-error'

export class AnkiDecksAvailableController implements Controller {
  async handle (_request: HttpRequest): Promise<HttpResponse> {
    try {
      const anki: CardRepository = new Anki('', new DefaultAnkiCardTheme())
      const decks: string[] = await anki.getAvailableDecks()

      return ok({ decks })
    } catch (error) {
      if (error instanceof AnkiConnectionError) {
        return badGateway(error)
      }
      return serverError(error)
    }
  }
}
