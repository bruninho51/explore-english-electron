import { Controller } from '@/presentation/protocols'
import { AnkiDecksAvailableController } from '@/presentation/controllers/anki-decks-available'

export const makeAnkiDecksAvailableController = async (): Promise<Controller> => {
  return new AnkiDecksAvailableController()
}
