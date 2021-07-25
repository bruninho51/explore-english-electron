import api from './api';

export const saveSentenceMovie = (movieId, sentence) => {
  return new Promise((resolve, reject) => {

    api.post(`/movie/${movieId}/sentence`, {
      wordIndex: sentence.wordIndex,
      sentence: sentence.sentence
    })
      .then(response => {
        resolve(response.data.id)
      })
      .catch(function (error) {
        reject(error)
      })
  })
}
