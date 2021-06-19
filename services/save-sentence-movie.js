import { post } from 'axios';

export const saveSentenceMovie = (movieId, sentence) => {
  return new Promise((resolve, reject) => {
    post(`http://localhost:3000/api/movie/${movieId}/sentence`, {
      wordIndex: sentence.wordIndex,
      sentence: sentence.sentence
    })
      .then(response => {
        resolve(response.body.id)
      })
      .catch(function (error) {
        reject(error)
      })
  })
}
