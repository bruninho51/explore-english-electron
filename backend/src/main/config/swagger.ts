import { noCache } from '@/main/middlewares'
import { serve, setup } from 'swagger-ui-express'
import { Express } from 'express'
import yaml from 'js-yaml'
import fs from 'fs'
import path from 'path'

export default (app: Express): void => {
  app.use('/api-docs', noCache, serve, setup(
    yaml.load(
      fs.readFileSync(
        path.join(
          process.cwd(), 'swagger.yml'
        ), 'utf8'
      )
    ) as object
  ))
}
