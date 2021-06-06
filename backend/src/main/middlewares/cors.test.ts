import { Request, Response } from 'express'
import request from 'supertest'
import app from '@/main/config/app'

describe('Cors Middleware', () => {
  test('Should parse CORS', async () => {
    app.get('/test_cors', (req: Request, res: Response) => {
      res.send()
    })
    await request(app)
      .post('/test_cors')
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-headers', '*')
      .expect('access-control-allow-methods', '*')
  })
})
