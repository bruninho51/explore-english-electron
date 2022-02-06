import React, { ReactElement, useState } from 'react';
import { MovieDialog } from '../MovieDialog';
import { MovieItem } from '../MovieItem';
import Scrollbars from 'react-custom-scrollbars';
import { MoviesList } from './MoviesList';
import { VerticalScroll } from './VerticalScroll';

export const MovieList = ({ movies }: { movies: any }): ReactElement => {
  const [createMovie, setCreateMovie] = useState(false);

  return (
    <React.Fragment>
      {createMovie ? <MovieDialog onCancel={() => setCreateMovie(false)} onSave={() => alert('movie criado')} /> : <div />}
      <MoviesList>
        <Scrollbars renderThumbVertical={() => (<VerticalScroll />)}>
          {movies.map((movie: any) => (
            <MovieItem
                title={movie.title}
                imageSrc={movie.imageSrc}
                imageAlt={movie.imageAlt}
                onRemove={movie.onRemove}
                onStudy={movie.onStudy}
              />
          ))}
        </Scrollbars>
      </MoviesList>
    </React.Fragment>
  );
};
