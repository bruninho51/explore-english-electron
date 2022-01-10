import { Element } from './element';

export class GrammarClass extends Element {
  _grammarClass: string

  constructor (grammarClass: string) {
    super();
    this._grammarClass = grammarClass;
  }

  get grammarClass (): string {
    return this._grammarClass;
  }
}
