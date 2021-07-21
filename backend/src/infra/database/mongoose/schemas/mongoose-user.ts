
import { MongooseModel } from '@/infra/database/mongoose/protocols'
import { Model, Mongoose } from 'mongoose'

export type MongooseUserSchema = {
  _id: string
  name: string
  email: string
  password: string
}

export class MongooseUser implements MongooseModel<MongooseUserSchema> {
  constructor (
    private readonly mongoose: Mongoose
  ) {}

  public readonly collectionName = 'users'

  async getModel (): Promise<Model<MongooseUserSchema>> {
    const schema = new this.mongoose.Schema({
      name: { type: String },
      email: { type: String },
      password: { type: String }
    }, { _id: true })

    return this.mongoose.models[this.collectionName] ||
      this.mongoose.model<MongooseUserSchema>(this.collectionName, schema)
  }
}
