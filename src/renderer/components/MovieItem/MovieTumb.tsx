import { MouseEventHandler, ReactElement } from 'react';
import { Button } from '../Button';
import { Header } from '../MovieDialog/Header';
import { Body } from './Body';
import { Footer } from './Footer';
import { MovieImage } from './MovieImage';
import { MovieTumbContainer } from './MovieTumbContainer';
import { Trash } from './Trash';

export const MovieTumb = ({ title, imageSrc, imageAlt, onStudy, onRemove }: { title: string, imageSrc: string, imageAlt: string, onStudy: MouseEventHandler<HTMLButtonElement>, onRemove: MouseEventHandler<HTMLImageElement> }): ReactElement => {
  return (
    <MovieTumbContainer>
      {onRemove
        ? <Trash onRemove={onRemove} />
        : <div />}

      <Header>
        <MovieImage alt={imageAlt} src={imageSrc} />
      </Header>
      <Body>
        {title}
      </Body>
      <Footer>
        {onStudy
          ? <Button onClick={onStudy}>
            <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
              <span className="material-icons md-18">book</span>
              <span style={{ paddingTop: '2px' }}>Learn</span>
            </div>
          </Button>
          : <div />}
      </Footer>
    </MovieTumbContainer>
  );
};
