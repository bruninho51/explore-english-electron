import { AxiosError, AxiosResponse } from 'axios';
import { Sentence } from '../domain/models/sentence';
import api from './api';

export const saveSentenceMovie = async (movieId: string, sentence: Sentence): Promise<string> => {
  return await new Promise((resolve, reject) => {
    api.post<{wordIndex: number, sentence: string}>(`/movie/${movieId}/sentence`, {
      wordIndex: sentence.wordIndex,
      sentence: sentence.sentence,
      videoTime: sentence.videoTime,
    })
      .then((response: AxiosResponse<Sentence>) => {
        console.log(response);
        resolve(response.data.id);
      })
      .catch(function (error: AxiosError) {
        reject(error);
      });
  });
};
