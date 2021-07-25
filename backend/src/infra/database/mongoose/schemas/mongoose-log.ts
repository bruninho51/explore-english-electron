import { MongooseModel } from '@/infra/database/mongoose/protocols'
import { ObjectId } from 'mongodb'
import { Model, Mongoose } from 'mongoose'

export type MongooseLogSchema = {
  stack: string
  user: {
    _id: string
    email: string
  }
}

export class MongooseLog implements MongooseModel<MongooseLogSchema> {
  public readonly collectionName = 'error-logs'

  constructor (private readonly mongoose: Mongoose) {}

  async getModel (): Promise<Model<MongooseLogSchema>> {
    const schema = new this.mongoose.Schema({
      stack: { type: String },
      user: {
        _id: { type: ObjectId },
        email: { type: String }
      }
    }, { timestamps: true })

    return this.mongoose.models[this.collectionName] ||
      this.mongoose.model<MongooseLogSchema>(this.collectionName, schema)
  }
}
