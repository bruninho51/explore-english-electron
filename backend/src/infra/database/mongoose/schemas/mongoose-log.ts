import { MongooseModel } from '@/infra/database/mongoose/protocols'
import { Model, Mongoose } from 'mongoose'

export type MongooseLogSchema = {
  stack: string
}

export class MongooseLog implements MongooseModel<MongooseLogSchema> {
  public readonly collectionName = 'error-logs'

  constructor (private readonly mongoose: Mongoose) {}

  async getModel (): Promise<Model<MongooseLogSchema>> {
    const schema = new this.mongoose.Schema({
      stack: { type: String }
    }, { timestamps: true })

    return this.mongoose.model<MongooseLogSchema>(this.collectionName, schema)
  }
}
