import { Router } from 'express'
import { adaptRoute } from '@/main/facades/express-route-adapter'
import { makeAnkiDecksAvailableController } from '@/main/factories/controllers/anki-decks-available-factory'

export default async (router: Router): Promise<void> => {
  router.get('/anki/decks', adaptRoute(await makeAnkiDecksAvailableController()))
}
