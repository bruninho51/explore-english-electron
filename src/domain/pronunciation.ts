import { Element } from './element';

export class Pronunciation extends Element {
  private readonly _pronunciation: string
  private readonly _sound: Buffer
  private readonly _soundUrl: string

  constructor (pronunciation: string, sound: Buffer, soundUrl: string) {
    super();
    this._pronunciation = pronunciation;
    this._sound = sound;
    this._soundUrl = soundUrl;
  }

  get pronunciation (): string {
    return this._pronunciation;
  }

  get sound (): Buffer {
    return this._sound;
  }

  get soundUrl (): string {
    return this._soundUrl;
  }
}
