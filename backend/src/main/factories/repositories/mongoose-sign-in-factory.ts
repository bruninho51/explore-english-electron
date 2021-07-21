import { SignIn } from '@/domain/protocols/sign-in'
import { MongooseSignIn } from '@/data/repositories/mongoose-sign-in'
import { makeBcryptHashComparer } from '../cryptography/bcrypt-hash-comparer-factory'
import { makeJsonWebTokenEncrypter } from '../cryptography/json-web-token-encrypter-factory'
import { makeMongooseUserModel } from '../database/mongoose/models/mongoose-user-model-factory'

export const makeMongooseSignIn = async (): Promise<SignIn> => {
  return new MongooseSignIn(
    await makeBcryptHashComparer(),
    await makeJsonWebTokenEncrypter(),
    await makeMongooseUserModel())
}
