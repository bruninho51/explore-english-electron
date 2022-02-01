import { StringPattern } from 'copy-webpack-plugin';
import { Sentence } from '../domain/models/sentence';
import { markSentenceAnki } from './mark-sentence-anki';

export const saveSentenceAnki = async (movieId: StringPattern, movieTitle: string, phrase: Sentence): Promise<string> => {
  const result = await electron.createCardsOnAnki({ movieTitle, phrase });
  console.log(result);
  await markSentenceAnki(movieId, phrase);
  return result;
};
