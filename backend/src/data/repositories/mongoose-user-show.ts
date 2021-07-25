import { User } from '@/domain/models/user'
import { UserShow } from '@/domain/protocols/user-show'
import { MongooseUserSchema } from '@/infra/database/mongoose/schemas/mongoose-user'
import { Model } from 'mongoose'

export class MongooseUserShow implements UserShow {
  constructor (
    private readonly userRepository: Model<MongooseUserSchema>
  ) {}

  async show (userId: string): Promise<User> {
    return await new Promise((resolve, reject) => {
      (async () => {
        const user = await this.userRepository.findById(userId)
        if (user) {
          const result: User = {
            id: user._id,
            name: user.name,
            email: user.email
          }
          resolve(result)
        }

        resolve(null)
      })().catch(error => reject(error))
    })
  }
}
