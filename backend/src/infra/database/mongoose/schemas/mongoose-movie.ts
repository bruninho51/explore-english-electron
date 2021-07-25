
import { MongooseModel } from '@/infra/database/mongoose/protocols'
import { ObjectId } from 'mongodb'
import { Model, Mongoose } from 'mongoose'
import { MongooseSentenceSchema } from './mongoose-sentence'

export type MongooseMovieSchema = {
  _id: string
  name: string
  sentences: MongooseSentenceSchema[]
  user: {
    _id: string
    email: string
  }
}

export class MongooseMovie implements MongooseModel<MongooseMovieSchema> {
  constructor (
    private readonly mongoose: Mongoose
  ) {}

  public readonly collectionName = 'movies'

  async getModel (): Promise<Model<MongooseMovieSchema>> {
    const schema = new this.mongoose.Schema({
      name: { type: String },
      sentences: [{
        wordIndex: { type: Number },
        sentence: { type: String }
      }],
      user: {
        _id: { type: ObjectId },
        email: { type: String }
      }
    }, { _id: true })

    return this.mongoose.models[this.collectionName] ||
      this.mongoose.model<MongooseMovieSchema>(this.collectionName, schema)
  }
}
