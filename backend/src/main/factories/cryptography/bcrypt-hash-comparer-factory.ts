import { HashComparer } from '@/data/protocols/hash-comparer'
import { BcryptHashComparer } from '@/data/cryptography/bcrypt-hash-comparer'

export const makeBcryptHashComparer = async (): Promise<HashComparer> => {
  return new BcryptHashComparer()
}
