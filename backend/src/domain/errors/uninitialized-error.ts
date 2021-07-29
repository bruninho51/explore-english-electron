export class UninitializedError extends Error {
  constructor () {
    super('Uninitialized error')
    this.name = 'UninitializedError'
  }
}
