import { Encrypter } from '@/data/protocols/encrypter'
import { JsonWebTokenEncrypter } from '@/data/cryptography/json-web-token-encrypter'

export const makeJsonWebTokenEncrypter = async (): Promise<Encrypter> => {
  return new JsonWebTokenEncrypter(process.env.SECRET)
}
