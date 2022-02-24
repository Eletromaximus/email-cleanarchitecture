import { Express } from 'express'
import 'express-async-errors'
import cors from 'cors'
import helmet from 'helmet'

export default (app: Express): void => {
  app.use(cors())
  app.use(helmet())
}
