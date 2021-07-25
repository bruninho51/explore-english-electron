import { NextFunction, Response, Request } from 'express'
import { makeJsonWebTokenDecrypter } from '@/main/factories/cryptography/json-web-token-decrypter-factory'
import { makeMongooseUserShow } from '@/main/factories/repositories/mongoose-user-show-factory'
import { User } from '@/domain/models/user'

export const mongooseAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decrypter = await makeJsonWebTokenDecrypter()
    const { id } = await decrypter.decrypt(token) as User
    const userRepository = await makeMongooseUserShow()
    const user: User = await userRepository.show(id)
    req.user = user
    next()
  } catch (error) {
    res.status(401).end()
  }
}
