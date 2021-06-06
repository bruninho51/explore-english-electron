import { Router } from 'express'
import { adaptRoute } from '@/main/facades/express-route-adapter'
import { makeMongooseSentenceStoreController } from '@/main/factories/controllers/sentence-store-factory'

export default async (router: Router): Promise<void> => {
  router.post('/sentence', adaptRoute(await makeMongooseSentenceStoreController()))
}
