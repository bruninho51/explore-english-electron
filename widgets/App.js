import React, { useState, useEffect } from 'react'
import { PhrasalExtractor } from  './PhrasalExtractor'
import { saveSentence } from '../services/save-sentence'
import { MovieList } from './MovieList'
import { MenuApp } from './MenuApp'
import { MainContainer } from './MainContainer'
import { saveSentenceMovie } from '../services/save-sentence-movie'

function Player({ movieId, movieName }) {
  const [video, setVideo] = useState('file:///home/bruno/Downloads/Pitch Atomon.mp4')
  const [subtitle, setSubtitle] = useState([])

  window.on.openSrt(setSubtitle)
  window.on.openVideo(setVideo)

  return (
      <PhrasalExtractor videoPlayer={{
        autoplay: true,
        controls: true,
        sources: [{
          src: video,
          type: 'video/mp4'
        }],
        balance: 500,
        subtitle: subtitle,
      }} 
      title={movieName}
      save={(phrase, status) => {

        if (phrase.status !== 'saved') {
          saveSentenceMovie(movieId, phrase)
          .then(() => {
            status.saved()
          })
          .catch((error) => {
            console.log(error)
            status.failed()
          })
        }
          
      }} />
  );
}

function App() {

  const [selectedMovie, selectMovie] = useState({})
  const [movies, setMovies] = useState([])

  const goHome = () => selectMovie({})

  const getMovies = () => {
    fetch('http://localhost:3000/api/movie')
      .then(response => response.json())
      .then((data) => setMovies(data))
  }

  useEffect(() => {
    getMovies()
  });

  const removeMovie = (id) => {
    alert(id)
  }

  return (
    <MainContainer>
      <MenuApp onHome={goHome} />
        {Object.values(selectedMovie).length
          ? <Player movieId={selectedMovie.id} movieName={selectedMovie.name} />
          : <MovieList movies={movies.map(movie => ({
              title: movie.name,
              imageAlt: movie.name,
              onRemove: () => removeMovie(movie.id),
              onStudy: () => selectMovie(movie)
          }))} />}
    </MainContainer>
  );
}

export default App;
