import { post } from 'axios';

export const saveMovie = (movieName) => {
  return new Promise((resolve, reject) => {
    post('/localhost:3000/api/movie', {
      name: movieName
    })
      .then(response => {
        resolve(response.body.id)
      })
      .catch(function (error) {
        reject(error)
      })
  })
}
