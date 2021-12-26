import { ReactElement } from 'react';
import { Button } from '../Button';
import { MovieTumbContainer } from '../MovieItem/MovieTumbContainer';

export const MovieTumb = ({ title }: { title: string }): ReactElement => {
  return (
    <MovieTumbContainer>
      <div style={{ width: '100%', height: '70%', display: 'flex', justifyContent: 'center' }}>
        <img style={{ height: '100%' }} alt="a cabana" src="https://images-na.ssl-images-amazon.com/images/I/71ydFW-qgQL.jpg" />
      </div>
      <div>{title}</div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button>Estudar</Button>
      </div>
    </MovieTumbContainer>
  );
};
