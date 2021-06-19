import express from 'express'
import setupMiddleware from './middlewares'
import setupRoutes from './routes'
import setupSwagger from './swagger'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
setupMiddleware(app)
setupRoutes(app)
setupSwagger(app)

export default app
