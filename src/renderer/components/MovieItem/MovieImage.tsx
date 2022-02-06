import { ReactElement } from 'react';
import cover from '../../images/movie.png';

export const MovieImage = ({ alt, src }: { alt: string, src: string }): ReactElement => {
  return (
    <img style={{ height: '100%', userSelect: 'none', pointerEvents: 'none' }} alt={alt} src={src ?? cover} />
  );
};
