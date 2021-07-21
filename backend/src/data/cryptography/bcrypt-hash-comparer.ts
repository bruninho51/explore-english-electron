import { HashComparer } from '../protocols/hash-comparer'
import bcrypt from 'bcrypt'

export class BcryptHashComparer implements HashComparer {
  async compare (plaintext: string, digest: string): Promise<boolean> {
    return await bcrypt.compare(plaintext, digest)
  }
}
