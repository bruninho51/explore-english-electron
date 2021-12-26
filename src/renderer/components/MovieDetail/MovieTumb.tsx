import { ReactElement } from 'react';
import { Body } from '../MovieItem/Body';
import { MovieImage } from '../MovieItem/MovieImage';
import { MovieTumbContainer } from '../MovieItem/MovieTumbContainer';
import { ImageContainer } from './ImageContainer';

export const MovieTumb = ({ title, imageSrc, imageAlt }: { title: string, imageSrc: string, imageAlt: string }): ReactElement => {
  return (
    <MovieTumbContainer>
      <ImageContainer>
        <MovieImage alt={imageAlt} src={imageSrc} />
      </ImageContainer>
      <Body>
        {title}
      </Body>
    </MovieTumbContainer>
  );
};
