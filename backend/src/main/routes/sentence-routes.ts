import { Router } from 'express'
import { adaptRoute } from '@/main/facades/express-route-adapter'
import { makeMongooseSentenceStoreController } from '@/main/factories/controllers/sentence-store-factory'
import { makeMongooseSentenceShowController } from '@/main/factories/controllers/sentence-show-factory'
import { auth } from '@/main/middlewares/auth'

export default async (router: Router): Promise<void> => {
  router.post('/sentence', auth, adaptRoute(await makeMongooseSentenceStoreController()))
  router.get('/sentence/:sentenceId', auth, adaptRoute(await makeMongooseSentenceShowController()))
}
