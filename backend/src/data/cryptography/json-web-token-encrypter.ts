import { Encrypter } from '../protocols/encrypter'
import jwt from 'jsonwebtoken'

export class JsonWebTokenEncrypter implements Encrypter {
  constructor (private readonly secret: string) {}

  async encrypt (data: any): Promise<string> {
    return jwt.sign(data, this.secret)
  }
}
