import { Model } from 'mongoose'

export interface MongooseModel<T> {
  getModel: () => Promise<Model<T>>
}
