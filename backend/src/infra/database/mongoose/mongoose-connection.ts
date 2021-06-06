import { Connection } from '@/infra/database/protocols'
import { Mongoose } from 'mongoose'

export class MongooseConnection implements Connection<Mongoose> {
  protected static mongoose: Mongoose

  async getConnection (): Promise<Mongoose> {
    if (!MongooseConnection.mongoose) {
      const mongoose = new Mongoose({ useUnifiedTopology: true, useNewUrlParser: true })
      MongooseConnection.mongoose = await mongoose.connect(process.env.MONGO_URL)
    }

    return MongooseConnection.mongoose
  }
}
