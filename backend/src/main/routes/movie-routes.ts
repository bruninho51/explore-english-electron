import { Router } from 'express'
import { adaptRoute } from '@/main/facades/express-route-adapter'
import { makeMongooseMovieStoreController } from '@/main/factories/controllers/movie-store-factory'
import { makeMongooseSentenceMovieStoreController } from '@/main/factories/controllers/sentence-movie-store-factory'
import { makeMongooseMovieShowController } from '../factories/controllers/movie-show-factory'
import { makeMongooseSentenceMovieShowController } from '../factories/controllers/sentence-movie-show-factory'
import { makeMongooseMoviesShowController } from '../factories/controllers/movies-show-factory'
import { makeMongooseMovieDeleteController } from '../factories/controllers/movie-delete-factory'
import { auth } from '@/main/middlewares/auth'
import { makeMongooseSentenceOnAnkiController } from '../factories/controllers/setence-on-anki-factory'

export default async (router: Router): Promise<void> => {
  router.post('/movie', auth, adaptRoute(await makeMongooseMovieStoreController()))
  router.get('/movie', auth, adaptRoute(await makeMongooseMoviesShowController()))
  router.get('/movie/:movieId', auth, adaptRoute(await makeMongooseMovieShowController()))
  router.delete('/movie/:movieId', auth, adaptRoute(await makeMongooseMovieDeleteController()))
  router.post('/movie/:movieId/sentence', auth, adaptRoute(await makeMongooseSentenceMovieStoreController()))
  router.get('/movie/:movieId/sentence', auth, adaptRoute(await makeMongooseSentenceMovieShowController()))
  router.patch('/movie/:movieId/sentence/:sentenceId/onAnki', auth, adaptRoute(await makeMongooseSentenceOnAnkiController()))
}
