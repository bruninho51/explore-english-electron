import { Router } from 'express'
import { adaptRoute } from '@/main/facades/express-route-adapter'
import { makeMongooseSentenceStoreController } from '@/main/factories/controllers/sentence-store-factory'
import { makeMongooseSentenceShowController } from '../factories/controllers/sentence-show-factory'

export default async (router: Router): Promise<void> => {
  router.post('/sentence', adaptRoute(await makeMongooseSentenceStoreController()))
  router.get('/sentence/:sentenceId', adaptRoute(await makeMongooseSentenceShowController()))
}
