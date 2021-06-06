import { MongooseModel } from '@/infra/database/mongoose/protocols'
import { Model, Mongoose } from 'mongoose'

export type MongooseSentenceSchema = {
  _id: string
  wordIndex: number
  sentence: string
}

export class MongooseSentence implements MongooseModel<MongooseSentenceSchema> {
  public readonly collectionName = 'sentences'

  constructor (private readonly mongoose: Mongoose) {}

  async getModel (): Promise<Model<MongooseSentenceSchema>> {
    const schema = new this.mongoose.Schema({
      wordIndex: { type: Number },
      sentence: { type: String }
    })

    return this.mongoose.models[this.collectionName] ||
      this.mongoose.model<MongooseSentenceSchema>(this.collectionName, schema)
  }
}
