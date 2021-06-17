import { ModelSpy } from '@/tests/infra/database/mongo/mocks/model-spy'
import { Model } from 'mongoose'
import { MongooseLogger } from '@/data/repositories'
import { MongooseLogSchema } from '@/infra/database/mongoose/schemas/mongoose-log'

type SutTypes = {
  sut: MongooseLogger
  modelSpy: ModelSpy
}

const makeSut = (): SutTypes => {
  const modelSpy = new ModelSpy()
  const sut = new MongooseLogger(modelSpy as unknown as Model<MongooseLogSchema>)
  return {
    sut,
    modelSpy
  }
}

describe('MongooseLogger', () => {
  test('Should call create with correct values', async () => {
    const { sut, modelSpy } = makeSut()
    const stack = (new Error()).stack
    await sut.logError(stack)
    expect(modelSpy.spy.create.data).toEqual({
      stack
    })
  })
  test('Should call save', async () => {
    const { sut, modelSpy } = makeSut()
    const stack = (new Error()).stack
    await sut.logError(stack)
    const createResult = modelSpy.spy.create.result
    expect(createResult.spy.save.calledSave).toBeTruthy()
  })
  test('Should resolve promise if success', async () => {
    const { sut } = makeSut()
    const stack = (new Error()).stack
    const promise = sut.logError(stack)
    await expect(promise).resolves.toBeUndefined()
  })
  test('Should reject promise if create throws', async () => {
    const { sut, modelSpy } = makeSut()
    jest.spyOn(modelSpy, 'create').mockReturnValueOnce(Promise.reject(new Error()))
    const stack = (new Error()).stack
    const promise = sut.logError(stack)
    await expect(promise).rejects.toThrow()
  })
  test('Should reject promise if save throws', async () => {
    const { sut, modelSpy } = makeSut()
    jest.spyOn(modelSpy, 'create').mockImplementationOnce(async (): Promise<any> => ({
      save: async (): Promise<void> => {
        return await Promise.reject(new Error())
      }
    }))
    const stack = (new Error()).stack
    const promise = sut.logError(stack)
    await expect(promise).rejects.toThrow()
  })
})
