import React, { useState, useEffect } from 'react'
import { PhrasalExtractor } from  './PhrasalExtractor'
import { MovieList } from './MovieList'
import { MenuApp } from './MenuApp'
import { MainContainer } from './MainContainer'
import { saveSentenceMovie } from '../services/save-sentence-movie'
import '../assets/css/App.css'
import { useAuth } from '../contexts/auth'

function Player({ movieId, movieName, onHome }) {
  const [video, setVideo] = useState('file:///home/bruno/Downloads/Pitch Atomon.mp4')
  const [subtitle, setSubtitle] = useState([])
  const [phrases, setPhrases] = useState([])

  window.on.openSrt(setSubtitle)
  window.on.openVideo(setVideo)

  useEffect(() => {
    getPhrasesFromMovie()
  }, [])

  const onExport = () => {
    return fetch(`http://localhost:3000/api/movie/${movieId}/sentence`)
      .then((response) => response.json())
      .then((sentences) => window.on.exportMovieData(movieName, sentences))
  }

  const getPhrasesFromMovie = () => {
    fetch(`http://localhost:3000/api/movie/${movieId}/sentence`)
      .then(response => response.json())
      .then((sentences) => { 
        setPhrases(sentences.map(sentence => ({
          ...sentence,
          status: 'saved'
        })))
      })
  }

  return (
      <React.Fragment>
        <MenuApp onHome={onHome} onExport={onExport} />
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
        phrases={phrases}
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
      </React.Fragment>
  );
}

function Home({ movies, removeMovie, selectMovie, onCreateMovie }) {
  const context = useAuth()
  return (
    <React.Fragment>
      <MenuApp onCreateMovie={onCreateMovie} onLogout={context.Logout} />
      <MovieList movies={movies.map(movie => ({
        title: movie.name,
        imageAlt: movie.name,
        onRemove: () => removeMovie(movie.id),
        onStudy: () => selectMovie(movie)
      }))} />
    </React.Fragment>
  )
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

  const onCreateMovie = (movie) => {
    console.log(movie)
    fetch('http://localhost:3000/api/movie', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(movie)
    })
      .then(() => {
        getMovies()
      })
  }

  useEffect(() => {
    getMovies()
  }, []);

  const removeMovie = (id) => {
    fetch(`http://localhost:3000/api/movie/${id}`, {
      method: 'delete',
    })
      .then(() => getMovies())
  }

  return (
    <MainContainer>
      {Object.values(selectedMovie).length
        ? <Player 
          movieId={selectedMovie.id} 
          movieName={selectedMovie.name}
          onHome={goHome} />
        : <Home 
            movies={movies} 
            removeMovie={removeMovie} 
            selectMovie={selectMovie}
            onCreateMovie={onCreateMovie} />}
    </MainContainer>
  );
}

export default App;
