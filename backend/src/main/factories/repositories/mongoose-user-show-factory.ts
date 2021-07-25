import { UserShow } from '@/domain/protocols/user-show'
import { MongooseUserShow } from '@/data/repositories/mongoose-user-show'
import { makeMongooseUserModel } from '@/main/factories/database/mongoose/models/mongoose-user-model-factory'

export const makeMongooseUserShow = async (): Promise<UserShow> => {
  return new MongooseUserShow(await makeMongooseUserModel())
}
