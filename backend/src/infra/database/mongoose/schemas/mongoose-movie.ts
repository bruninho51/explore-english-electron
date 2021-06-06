
import { MongooseModel } from '@/infra/database/mongoose/protocols'
import { Model, Mongoose } from 'mongoose'
import { MongooseSentenceSchema } from './mongoose-sentence'

export type MongooseMovieSchema = {
  name: string
  sentences: MongooseSentenceSchema[]
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
      }]
    }, { _id: true })

    return this.mongoose.models[this.collectionName] ||
      this.mongoose.model<MongooseMovieSchema>(this.collectionName, schema)
  }
}
