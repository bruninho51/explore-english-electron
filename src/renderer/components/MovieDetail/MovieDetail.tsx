import { ReactElement } from 'react';
import { FlexContainer } from './FlexContainer';
import { InlineBlockContainer } from './InlineBlockContainer';
import { MovieTumb } from './MovieTumb';

export const MovieDetail = ({ title, imageSrc, imageAlt }: { title: string, imageSrc: string, imageAlt: string }): ReactElement => {
  return (
    <InlineBlockContainer>
      <FlexContainer>
        <MovieTumb
          title={title}
          imageSrc={imageSrc}
          imageAlt={imageAlt}
        />
      </FlexContainer>
    </InlineBlockContainer>
  );
};
