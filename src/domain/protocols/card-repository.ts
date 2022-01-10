import { Card } from '../card';

interface CardRepository {
  save: (card: Card) => Promise<boolean>
  getAvailableDecks: () => Promise<string[]>
}

export default CardRepository;
