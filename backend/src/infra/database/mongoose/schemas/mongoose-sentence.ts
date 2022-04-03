import { MongooseModel } from '@/infra/database/mongoose/protocols'
import { ObjectId } from 'mongodb'
import { Model, Mongoose } from 'mongoose'

export type MongooseSentenceSchema = {
  _id: string
  wordIndex: number
  sentence: string
  savedOnAnki?: boolean
  videoTime: number
  user?: {
    _id: string
    email: string
  }
}

export class MongooseSentence implements MongooseModel<MongooseSentenceSchema> {
  public readonly collectionName = 'sentences'

  constructor (private readonly mongoose: Mongoose) {}

  async getModel (): Promise<Model<MongooseSentenceSchema>> {
    const schema = new this.mongoose.Schema({
      wordIndex: { type: Number },
      sentence: { type: String },
      videoTime: { type: Number },
      savedOnAnki: { type: Boolean },
      user: {
        _id: { type: ObjectId },
        email: { type: String }
      }
    })

    return this.mongoose.models[this.collectionName] ||
      this.mongoose.model<MongooseSentenceSchema>(this.collectionName, schema)
  }
}
