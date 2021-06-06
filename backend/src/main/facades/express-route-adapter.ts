import { Controller, HttpRequest } from '@/presentation/protocols'
import { Request, Response } from 'express'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      params: req.params
    }
    const httpReponse = await controller.handle(httpRequest)
    console.log(httpReponse)
    if (httpReponse.statusCode >= 200 && httpReponse.statusCode <= 299) {
      res.status(httpReponse.statusCode).json(httpReponse.body)
    } else if (httpReponse.statusCode === 400) {
      res.status(httpReponse.statusCode).json({
        errors: httpReponse.body
      })
    } else {
      res.status(httpReponse.statusCode).json({
        error: httpReponse.body.message
      })
    }
  }
}
