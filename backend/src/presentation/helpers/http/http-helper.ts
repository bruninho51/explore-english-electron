import { ValidationError } from '@/validation/protocols'
import { ServerError, UnauthorizedError } from '../../errors'
import { HttpResponse } from '../../protocols'

export const badRequest = (errors: ValidationError[]): HttpResponse => ({
  statusCode: 400,
  body: errors
})

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: null
})

export const forbidden = (error: Error): HttpResponse => ({
  statusCode: 403,
  body: error
})

export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError()
})

export const ok = (body: any): HttpResponse => ({
  statusCode: 200,
  body: body
})

export const created = (): HttpResponse => ({
  statusCode: 201
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack)
})
