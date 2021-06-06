import express from 'express'
import setupMiddleware from './middlewares'
import setupRoutes from './routes'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
setupMiddleware(app)
setupRoutes(app)

export default app
