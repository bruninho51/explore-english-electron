import { Sentence } from '@/domain/models'
import { SentenceStore } from '@/domain/protocols'
import { MongooseSentenceSchema } from '@/infra/database/mongoose/schemas/mongoose-sentence'
import { Model } from 'mongoose'

export class MongooseSentenceStore implements SentenceStore {
  constructor (private readonly sentenceRepository: Model<MongooseSentenceSchema>) {}

  async store (sentence: Sentence): Promise<void> {
    return await new Promise((resolve, reject) => {
      (async () => {
        const model = await this.sentenceRepository.create({
          wordIndex: sentence.wordIndex,
          sentence: sentence.sentence
        })

        await model.save()

        resolve()
      })().catch(error => reject(error))
    })
  }
}
