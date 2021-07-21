import { Router } from 'express'
import { adaptRoute } from '@/main/facades/express-route-adapter'
import { makeMongooseSignInController } from '../factories/controllers/sign-in-factory'

export default async (router: Router): Promise<void> => {
  router.post('/auth/login', adaptRoute(await makeMongooseSignInController()))
}
