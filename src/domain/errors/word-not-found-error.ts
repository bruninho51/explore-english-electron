export class WordNotFoundError extends Error {
  constructor () {
    super('The requested word was not found');
    this.name = 'WordNotFoundError';
  }
}
