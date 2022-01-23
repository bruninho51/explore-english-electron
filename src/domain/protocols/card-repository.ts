import { Card } from '../card';

interface CardRepository {
  save: (card: Card) => Promise<boolean>
  getAvailableDecks: () => Promise<string[]>
  createDeck: (deckName: string) => Promise<boolean>
}

export default CardRepository;
