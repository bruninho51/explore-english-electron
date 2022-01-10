import { Element } from './element';

export class Definition extends Element {
  private readonly _definition: string

  constructor (definition: string) {
    super();
    this._definition = definition;
  }

  get definition (): string {
    return this._definition;
  }
}
