import { Sentence } from '../domain/models/sentence';

export const saveSentenceAnki = async (movieTitle: string, phrase: Sentence): Promise<string> => {
  return await electron.createCardsOnAnki({ movieTitle, phrase });
  // chamar aqui o método para salvar status da frase no anki no servidor
};
