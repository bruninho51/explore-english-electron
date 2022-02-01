import { AxiosError, AxiosResponse } from 'axios';
import { Sentence } from '../domain/models/sentence';
import api from './api';

export const markSentenceAnki = async (movieId: string, sentence: Sentence): Promise<void> => {
  return await new Promise((resolve, reject) => {
    api.patch(`/movie/${movieId}/sentence/${sentence.id}/onAnki`)
      .then((response: AxiosResponse<Sentence>) => {
        resolve();
      })
      .catch(function (error: AxiosError) {
        reject(error);
      });
  });
};
