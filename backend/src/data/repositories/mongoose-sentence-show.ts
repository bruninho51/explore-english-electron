import { Sentence } from '@/domain/models'
import { SentenceShow } from '@/domain/protocols/sentence-show'
import { SentenceWordGetterUC } from '@/domain/usecases/protocols'
import { MongooseSentenceSchema } from '@/infra/database/mongoose/schemas/mongoose-sentence'
import { Model } from 'mongoose'

export class MongooseSentenceShow implements SentenceShow {
  constructor (
    private readonly sentenceWordGetter: SentenceWordGetterUC,
    private readonly sentenceRepository: Model<MongooseSentenceSchema>
  ) {}

  async show (sentenceId: string): Promise<Sentence> {
    return await new Promise((resolve, reject) => {
      (async () => {
        const sentence = await this.sentenceRepository.findById(sentenceId)
        if (sentence) {
          const result: SentenceShow.Result = {
            id: sentence._id,
            wordIndex: sentence.wordIndex,
            sentence: sentence.sentence,
            word: this.sentenceWordGetter.getWord(sentence)
          }
          resolve(result)
        }
        resolve(null)
      })().catch(error => reject(error))
    })
  }
}
