export class ModelSpy {
  public spy: any = {
    create: {
      data: null,
      result: null
    },
    save: {
      calledSave: false
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
}
