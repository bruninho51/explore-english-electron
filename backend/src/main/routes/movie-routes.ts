import { Router } from 'express'
import { adaptRoute } from '@/main/facades/express-route-adapter'
import { makeMongooseMovieStoreController } from '@/main/factories/controllers/movie-store-factory'
import { makeMongooseSentenceMovieStoreController } from '@/main/factories/controllers/sentence-movie-store-factory'
import { makeMongooseMovieShowController } from '../factories/controllers/movie-show-factory'
import { makeMongooseSentenceMovieShowController } from '../factories/controllers/sentence-movie-show-factory'
import { makeMongooseMoviesShowController } from '../factories/controllers/movies-show-factory'
import { makeMongooseMovieDeleteController } from '../factories/controllers/movie-delete-factory'

export default async (router: Router): Promise<void> => {
  router.post('/movie', adaptRoute(await makeMongooseMovieStoreController()))
  router.get('/movie', adaptRoute(await makeMongooseMoviesShowController()))
  router.get('/movie/:movieId', adaptRoute(await makeMongooseMovieShowController()))
  router.delete('/movie/:movieId', adaptRoute(await makeMongooseMovieDeleteController()))
  router.post('/movie/:movieId/sentence', adaptRoute(await makeMongooseSentenceMovieStoreController()))
  router.get('/movie/:movieId/sentence', adaptRoute(await makeMongooseSentenceMovieShowController()))
}
