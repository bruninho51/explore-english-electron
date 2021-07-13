import { Express, Router } from 'express'
// import fg from 'fast-glob'
import { readdirSync, lstatSync } from 'fs'
import path from 'path'

const loadRoutes = (directory: string, router: Router): void => {
  const absoluteDirectory = path.join(__dirname, directory)

  readdirSync(absoluteDirectory).map(async file => {
    const relativeFileDirectory = path.join(directory, file)
    const absoluteFileDirectory = path.join(absoluteDirectory, file)

    if (lstatSync(absoluteFileDirectory).isDirectory()) {
      loadRoutes(relativeFileDirectory, router)
    } else if (!file.includes('.test.') && !file.endsWith('.map')) {
      (await import(relativeFileDirectory)).default(router)
    }
  })
}

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  const directory = path.join('..', 'routes')
  loadRoutes(directory, router)
}
