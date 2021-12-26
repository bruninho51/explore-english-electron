import { ReactElement } from 'react';
import movie from '../../images/movie.png';

export const MovieImage = ({ alt, src }: { alt: string, src: string }): ReactElement => {
  return (
    <img style={{ height: '100%', marginRight: '10px' }} alt={alt} src={src ?? movie} />
  );
};
