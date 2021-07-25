import { User } from '../../src/domain/models/user'

declare global{
  namespace Express {
    interface Request {
      user?: User
    }
  }
}
