import { Logger } from '@/data/protocols'
import { MongooseLogSchema } from '@/infra/database/mongoose/schemas/mongoose-log'
import { Model } from 'mongoose'

export class MongooseLogger implements Logger {
  constructor (private readonly logRepository: Model<MongooseLogSchema>) {}

  async logError (stack: any): Promise<void> {
    const model = await this.logRepository.create({ stack })
    await model.save()
  }
}
