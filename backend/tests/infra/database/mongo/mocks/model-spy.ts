type ModelSpyParameters = {
  findByIdResultCallback?: () => any
}

export class ModelSpy {
  constructor (private readonly modelSpyParameters?: ModelSpyParameters) {
    if (this.modelSpyParameters?.findByIdResultCallback) {
      this.spy.findById.result = this.modelSpyParameters.findByIdResultCallback()
    }
  }

  public spy: any = {
    create: {
      data: null,
      result: null
    },
    save: {
      calledSave: false
    },
    updateOne: {
      filter: null,
      update: null
    },
    findById: {
      id: null,
      result: null
    }
  }

  async create (data: any): Promise<ModelSpy> {
    this.spy.create.data = data
    this.spy.create.result = new ModelSpy()
    return this.spy.create.result
  }

  async save (): Promise<void> {
    this.spy.save.calledSave = true
  }

  async updateOne (filter: any, update: any): Promise<void> {
    this.spy.updateOne.filter = filter
    this.spy.updateOne.update = update
  }

  async findById (id: any): Promise<any> {
    this.spy.findById.id = id
    return this.spy.findById.result
  }
}
