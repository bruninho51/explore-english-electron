import { Router } from 'express'
import { adaptRoute } from '@/main/facades/express-route-adapter'
import { makeMongooseMovieStoreController } from '@/main/factories/controllers/movie-store-factory'
import { makeMongooseSentenceMovieStoreController } from '@/main/factories/controllers/sentence-movie-store-factory'
import { makeMongooseMovieShowController } from '../factories/controllers/movie-show-factory'

export default async (router: Router): Promise<void> => {
  router.post('/movie', adaptRoute(await makeMongooseMovieStoreController()))
  router.post('/movie/:movieId/sentence', adaptRoute(await makeMongooseSentenceMovieStoreController()))
  router.get('/movie/:movieId', adaptRoute(await makeMongooseMovieShowController()))
}
