import CardRepository from './protocols/card-repository';
import { Element } from './element';

export class Card extends Element {
  async save (repository: CardRepository): Promise<boolean> {
    return await repository.save(this);
  }
}
