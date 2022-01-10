import AnkiRepository from '../domain/card-repositories/anki';
import { DefaultAnkiCardTheme } from '../domain/card-themes/anki-card-theme';

export const ankiGetAvailableDecks = async (): Promise<string[]> => {
  const repository = new AnkiRepository('', new DefaultAnkiCardTheme());
  return await repository.getAvailableDecks();
};
