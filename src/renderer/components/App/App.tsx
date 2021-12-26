import React, { useState, useEffect, ReactElement, MouseEventHandler } from 'react';
import { PhrasalExtractor } from '../PhrasalExtractor';
import { MovieList } from '../MovieList';
import { AppMenu } from '../AppMenu';
import { MainContainer } from '../MainContainer';
import { saveSentenceMovie } from '../../../services/save-sentence-movie';
import './App.css';
import { useAuth } from '../../contexts/auth';
import api from '../../../services/api';
import { Sentence } from '../../../domain/models/sentence';
import { AxiosResponse, AxiosError } from 'axios';
import { Movie } from '../../../domain/models/movie';

function Player ({ movieId, movieName, onHome }: { movieId: string, movieName: string, onHome: MouseEventHandler<HTMLButtonElement> }): ReactElement {
  const [video, setVideo] = useState('file:///home/bruno/Downloads/Pitch Atomon.mp4');
  const [subtitle, setSubtitle] = useState([]);
  const [phrases, setPhrases] = useState<Sentence[]>([]);

  electron.openSrt(setSubtitle);
  electron.openVideo(setVideo);

  useEffect(() => {
    getPhrasesFromMovie();
  }, []);

  const onExport = async (): Promise<void> => {
    return await api.get<Sentence[]>(`/movie/${movieId}/sentence`)
      .then(async (response: AxiosResponse<Sentence[]>) => await electron.exportMovieData(movieName, response.data));
  };

  const getPhrasesFromMovie = (): void => {
    api.get<Sentence[]>(`/movie/${movieId}/sentence`)
      .then((response: AxiosResponse<Sentence[]>) => {
        setPhrases(response.data.map((sentence: Sentence) => ({
          ...sentence,
          status: 'saved'
        })));
      }).catch((error: AxiosError) => console.log(error));
  };

  return (
    <React.Fragment>
      <AppMenu onHome={onHome} onExport={onExport} />
      <PhrasalExtractor videoPlayer={{
        autoplay: true,
        controls: true,
        sources: [{
          src: video,
          type: 'video/mp4'
        }],
        balance: 500,
        subtitle: subtitle
      }}
        phrases={phrases}
        title={movieName}
        save={(phrase: Sentence, status: { saved: Function, failed: Function }) => {
          if (phrase.status !== 'saved') {
            saveSentenceMovie(movieId, phrase)
              .then(() => {
                status.saved();
              })
              .catch((error) => {
                console.log(error);
                status.failed();
              });
          }
        }} />
    </React.Fragment>
  );
}

function Home ({ movies, removeMovie, selectMovie, onCreateMovie }: { movies: Movie[], removeMovie: Function, selectMovie: Function, onCreateMovie: Function }): ReactElement {
  const context = useAuth();
  return (
    <React.Fragment>
      <AppMenu onCreateMovie={onCreateMovie} onLogout={context.Logout} />
      <MovieList movies={movies.map(movie => ({
        title: movie.name,
        imageAlt: movie.name,
        onRemove: () => removeMovie(movie.id),
        onStudy: () => selectMovie(movie)
      }))} />
    </React.Fragment>
  );
}

function App (): ReactElement {
  const [selectedMovie, selectMovie] = useState<Partial<Movie>>({});
  const [movies, setMovies] = useState<Movie[]>([]);

  const goHome = (): void => selectMovie({});

  const getMovies = (): void => {
    api.get<Movie[]>('/movie')
      .then((response: AxiosResponse<Movie[]>) => setMovies(response.data));
  };

  const onCreateMovie = (movie: Movie): void => {
    api.post('/movie', movie)
      .then(() => {
        getMovies();
      });
  };

  useEffect(() => {
    getMovies();
  }, []);

  const removeMovie = (id: string): void => {
    api.delete(`/movie/${id}`)
      .then(() => getMovies());
  };

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
            onCreateMovie={(movie: Movie) => onCreateMovie(movie)} />}
    </MainContainer>
  );
}

export default App;