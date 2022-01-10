import { Element } from './element';

export class Example extends Element {
  private readonly _example: string
  private readonly _sound: Buffer
  private readonly _soundUrl: string

  constructor (example: string, sound: Buffer, soundUrl: string) {
    super();
    this._example = example;
    this._sound = sound;
    this._soundUrl = soundUrl;
  }

  get example (): string {
    return this._example;
  }

  get sound (): Buffer {
    return this._sound;
  }

  get soundUrl (): string {
    return this._soundUrl;
  }
}
