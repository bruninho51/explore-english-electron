import { ModelSpy } from '@/tests/infra/database/mongo/mocks/model-spy'
import { mockSentence } from '@/tests/domain/mocks/mock-sentence'
import { Model } from 'mongoose'
import { MongooseMovieSchema } from '@/infra/database/mongoose/schemas/mongoose-movie'
import { MongooseSentenceMovieStore } from '@/data/repositories/mongoose-sentence-movie-store'
import faker from 'faker'

type SutTypes = {
  sut: MongooseSentenceMovieStore
  modelSpy: ModelSpy
}

const makeSut = (): SutTypes => {
  const modelSpy = new ModelSpy()
  const sut = new MongooseSentenceMovieStore(modelSpy as unknown as Model<MongooseMovieSchema>)
  return {
    sut,
    modelSpy
  }
}

describe('MongoSentenceMovieStore', () => {
  test('Should call updateOne with correct values', async () => {
    const { sut, modelSpy } = makeSut()
    const sentence = mockSentence()
    const fakeId = faker.datatype.uuid()
    await sut.store(fakeId, sentence)
    expect(modelSpy.spy.updateOne.filter).toEqual({
      _id: fakeId
    })
    expect(modelSpy.spy.updateOne.update).toEqual({
      $push: {
        sentences: sentence
      }
    })
  })
  test('Should resolve promise if success', async () => {
    const { sut } = makeSut()
    const sentence = mockSentence()
    const fakeId = faker.datatype.uuid()
    const promise = sut.store(fakeId, sentence)
    await expect(promise).resolves.toBeUndefined()
  })
  test('Should reject promise if updateOne throws', async () => {
    const { sut, modelSpy } = makeSut()
    jest.spyOn(modelSpy, 'updateOne').mockReturnValueOnce(Promise.reject(new Error()))
    const sentence = mockSentence()
    const fakeId = faker.datatype.uuid()
    const promise = sut.store(fakeId, sentence)
    await expect(promise).rejects.toThrow()
  })
})
