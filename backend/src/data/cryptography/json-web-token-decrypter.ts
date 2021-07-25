import { Decrypter } from '../protocols/decrypter'
import jwt from 'jsonwebtoken'

export class JsonWebTokenDecrypter implements Decrypter {
  constructor (private readonly secret: string) {}

  async decrypt (ciphertext: string): Promise<any> {
    return jwt.verify(ciphertext, this.secret) as any
  }
}
