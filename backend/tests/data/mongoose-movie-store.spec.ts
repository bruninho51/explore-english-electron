import { ModelSpy } from '@/tests/infra/database/mongo/mocks/model-spy'
import { Model } from 'mongoose'
import { MongooseMovieStore } from '@/data/repositories/mongoose-movie-store'
import { MongooseMovieSchema } from '@/infra/database/mongoose/schemas/mongoose-movie'
import { mockMovie } from '@/tests/domain/mocks/mock-movie'

type SutTypes = {
  sut: MongooseMovieStore
  modelSpy: ModelSpy
}

const makeSut = (): SutTypes => {
  const modelSpy = new ModelSpy()
  const sut = new MongooseMovieStore(modelSpy as unknown as Model<MongooseMovieSchema>)
  return {
    sut,
    modelSpy
  }
}

describe('MongoMovieStore', () => {
  test('Should call create with correct values', async () => {
    const { sut, modelSpy } = makeSut()
    const movie = mockMovie()
    await sut.store(movie)
    expect(modelSpy.spy.create.data).toEqual({
      name: movie.name,
      sentences: movie.sentences
    })
  })
  test('Should call save', async () => {
    const { sut, modelSpy } = makeSut()
    const movie = mockMovie()
    await sut.store(movie)
    const createResult = modelSpy.spy.create.result
    expect(createResult.spy.save.calledSave).toBeTruthy()
  })
  test('Should resolve promise if success', async () => {
    const { sut } = makeSut()
    const movie = mockMovie()
    const promise = sut.store(movie)
    await expect(promise).resolves.toBeUndefined()
  })
  test('Should reject promise if create throws', async () => {
    const { sut, modelSpy } = makeSut()
    jest.spyOn(modelSpy, 'create').mockReturnValueOnce(Promise.reject(new Error()))
    const movie = mockMovie()
    const promise = sut.store(movie)
    await expect(promise).rejects.toThrow()
  })
  test('Should reject promise if save throws', async () => {
    const { sut, modelSpy } = makeSut()
    jest.spyOn(modelSpy, 'create').mockImplementationOnce(async (): Promise<any> => ({
      save: async (): Promise<void> => {
        return await Promise.reject(new Error())
      }
    }))
    const movie = mockMovie()
    const promise = sut.store(movie)
    await expect(promise).rejects.toThrow()
  })
})
