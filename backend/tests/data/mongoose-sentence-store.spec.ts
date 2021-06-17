import { MongooseSentenceStore } from '@/data/repositories'
import { ModelSpy } from '@/tests/infra/database/mongo/mocks/model-spy'
import { mockSentence } from '@/tests/domain/mocks/mock-sentence'
import { Model } from 'mongoose'
import { MongooseSentenceSchema } from '@/infra/database/mongoose/schemas/mongoose-sentence'

type SutTypes = {
  sut: MongooseSentenceStore
  modelSpy: ModelSpy
}

const makeSut = (): SutTypes => {
  const modelSpy = new ModelSpy()
  const sut = new MongooseSentenceStore(modelSpy as unknown as Model<MongooseSentenceSchema>)
  return {
    sut,
    modelSpy
  }
}

describe('MongoSentenceStore', () => {
  test('Should call create with correct values', async () => {
    const { sut, modelSpy } = makeSut()
    const sentence = mockSentence()
    await sut.store(sentence)
    expect(modelSpy.spy.create.data).toEqual({
      wordIndex: sentence.wordIndex,
      sentence: sentence.sentence
    })
  })
  test('Should call save', async () => {
    const { sut, modelSpy } = makeSut()
    const sentence = mockSentence()
    await sut.store(sentence)
    const createResult = modelSpy.spy.create.result
    expect(createResult.spy.save.calledSave).toBeTruthy()
  })
  test('Should resolve promise if success', async () => {
    const { sut } = makeSut()
    const sentence = mockSentence()
    const promise = sut.store(sentence)
    await expect(promise).resolves.toBeUndefined()
  })
  test('Should reject promise if create throws', async () => {
    const { sut, modelSpy } = makeSut()
    jest.spyOn(modelSpy, 'create').mockReturnValueOnce(Promise.reject(new Error()))
    const sentence = mockSentence()
    const promise = sut.store(sentence)
    await expect(promise).rejects.toThrow()
  })
  test('Should reject promise if save throws', async () => {
    const { sut, modelSpy } = makeSut()
    jest.spyOn(modelSpy, 'create').mockImplementationOnce(async (): Promise<any> => ({
      save: async (): Promise<void> => {
        return await Promise.reject(new Error())
      }
    }))
    const sentence = mockSentence()
    const promise = sut.store(sentence)
    await expect(promise).rejects.toThrow()
  })
})
