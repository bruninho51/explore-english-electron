import { SignIn } from '@/domain/protocols/sign-in'
import { MongooseUserSchema } from '@/infra/database/mongoose/schemas/mongoose-user'
import { InvalidCredentialsError } from '@/presentation/errors/invalid-credentials-error'
import { Model } from 'mongoose'
import { Encrypter } from '../protocols/encrypter'
import { HashComparer } from '../protocols/hash-comparer'

export class MongooseSignIn implements SignIn {
  constructor (
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly userRepository: Model<MongooseUserSchema>
  ) {}

  async signIn (email: string, password: string): Promise<SignIn.Result> {
    return await new Promise((resolve, reject) => {
      (async () => {
        const user = await this.userRepository.findOne({ email })
        if (user) {
          const isEqual = await this.hashComparer.compare(password, user.password)
          if (isEqual) {
            const token = await this.encrypter.encrypt({ id: user.id })
            resolve({
              user: {
                id: user.id,
                email: user.email,
                name: user.name
              },
              token
            })
          }
        }
        reject(new InvalidCredentialsError())
      })().catch(error => reject(error))
    })
  }
}
