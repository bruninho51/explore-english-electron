export class UndefinedParentError extends Error {
  constructor () {
    super('The element\'s parent was not found')
    this.name = 'UndefinedParent'
  }
}
