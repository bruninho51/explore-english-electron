import { Card } from '../domain/card';
import AnkiRepository from '../domain/card-repositories/anki';
import { DefaultAnkiCardTheme } from '../domain/card-themes/anki-card-theme';

export const ankiSaveCard = async (deckName: string, card: Card): Promise<void> => {
  const repository = new AnkiRepository(deckName, new DefaultAnkiCardTheme());
  await repository.save(card);
};
