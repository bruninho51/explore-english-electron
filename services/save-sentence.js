import { post } from 'axios';

export const saveSentence = (sentence) => {
  return new Promise((resolve, reject) => {
    post(`http://localhost:3000/api/sentence`, {
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
