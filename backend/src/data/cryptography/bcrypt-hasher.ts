import { Hasher } from '../protocols/hasher'
import bcrypt from 'bcrypt'

export class BcryptHasher implements Hasher {
  constructor (private readonly saltRounds: number) {}

  async hash (plaintext: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds)
    return await bcrypt.hash(plaintext, salt)
  }
}
