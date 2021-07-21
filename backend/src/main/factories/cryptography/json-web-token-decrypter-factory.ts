import { Decrypter } from '@/data/protocols/decrypter'
import { JsonWebTokenDecrypter } from '@/data/cryptography/json-web-token-decrypter'

export const makeJsonWebTokenDecrypter = async (): Promise<Decrypter> => {
  return new JsonWebTokenDecrypter(process.env.SECRET)
}
