import { Hasher } from '@/data/protocols/hasher'
import { BcryptHasher } from '@/data/cryptography/bcrypt-hasher'

export const makeBcryptHasher = async (): Promise<Hasher> => {
  return new BcryptHasher(Number(process.env.SALT))
}
