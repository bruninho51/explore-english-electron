import { ModelSpy } from '@/tests/infra/database/mongo/mocks/model-spy'
import { Model } from 'mongoose'
import { MongooseMovieSchema } from '@/infra/database/mongoose/schemas/mongoose-movie'
import { mockMovie } from '@/tests/domain/mocks/mock-movie'
import { SentenceWordGetterSpy } from '@/tests/domain/mocks/sentence-word-getter-spy'
import { MongooseMovieShow } from '@/data/repositories/mongoose-movie-show'
import faker from 'faker'

type SutTypes = {
  sut: MongooseMovieShow
  modelSpy: ModelSpy
  sentenceWordGetterSpy: SentenceWordGetterSpy
}

const makeSut = (): SutTypes => {
  const modelSpy = new ModelSpy({
    findByIdResultCallback: () => mockMovie()
  })
  const sentenceWordGetterSpy = new SentenceWordGetterSpy()
  const sut = new MongooseMovieShow(sentenceWordGetterSpy, modelSpy as unknown as Model<MongooseMovieSchema>)
  return {
    sut,
    modelSpy,
    sentenceWordGetterSpy
  }
}

describe('MongooseMovieShow', () => {
  test('Should call findById with correct values', async () => {
    const { sut, modelSpy } = makeSut()
    const movieId = faker.datatype.uuid()
    await sut.show(movieId)
    expect(modelSpy.spy.findById.id).toEqual(movieId)
  })
  test('Should call SentenceWordGetter with correct values', async () => {
    const { sut, sentenceWordGetterSpy, modelSpy } = makeSut()
    const movieId = faker.datatype.uuid()
    await sut.show(movieId)
    expect(sentenceWordGetterSpy.sentence).toEqual(
      modelSpy.spy.findById.result.sentences
    )
  })
  test('Should return movie with correct sentence format', async () => {
    const { sut, modelSpy, sentenceWordGetterSpy } = makeSut()
    const movieId = faker.datatype.uuid()
    const result = await sut.show(movieId)
    expect(result).toEqual({
      id: modelSpy.spy.findById.result._id,
      name: modelSpy.spy.findById.result.name,
      sentences: [{
        id: modelSpy.spy.findById.result.sentences[0]._id,
        wordIndex: modelSpy.spy.findById.result.sentences[0].wordIndex,
        sentence: modelSpy.spy.findById.result.sentences[0].sentence,
        word: sentenceWordGetterSpy.result[0]
      },
      {
        id: modelSpy.spy.findById.result.sentences[1]._id,
        wordIndex: modelSpy.spy.findById.result.sentences[1].wordIndex,
        sentence: modelSpy.spy.findById.result.sentences[1].sentence,
        word: sentenceWordGetterSpy.result[1]
      }]
    })
  })
  test('Should return movie with sentences equal []', async () => {
    const { sut, modelSpy } = makeSut()
    modelSpy.spy.findById.result.sentences = []
    const movieId = faker.datatype.uuid()
    const result = await sut.show(movieId)
    expect(result).toEqual({
      id: modelSpy.spy.findById.result._id,
      name: modelSpy.spy.findById.result.name,
      sentences: []
    })
  })
  test('Should return movie with sentences is null', async () => {
    const { sut, modelSpy } = makeSut()
    modelSpy.spy.findById.result.sentences = null
    const movieId = faker.datatype.uuid()
    const result = await sut.show(movieId)
    expect(result).toEqual({
      id: modelSpy.spy.findById.result._id,
      name: modelSpy.spy.findById.result.name,
      sentences: []
    })
  })
  test('Should reject promise if findById throws', async () => {
    const { sut, modelSpy } = makeSut()
    jest.spyOn(modelSpy, 'findById').mockReturnValueOnce(Promise.reject(new Error()))
    const movieId = faker.datatype.uuid()
    const promise = sut.show(movieId)
    await expect(promise).rejects.toThrow()
  })
})
