import { MouseEventHandler, ReactElement } from 'react';
import { FlexContainer } from './FlexContainer';
import { InlineBlockContainer } from './InlineBlockContainer';
import { MovieTumb } from './MovieTumb';

export const MovieItem = ({ title, imageSrc, imageAlt, onStudy, onRemove }: { title: string, imageSrc: string, imageAlt: string, onStudy: MouseEventHandler<HTMLButtonElement>, onRemove: MouseEventHandler<HTMLImageElement> }): ReactElement => {
  return (
    <InlineBlockContainer>

      <FlexContainer>
        <MovieTumb
          title={title}
          imageSrc={imageSrc}
          imageAlt={imageAlt}
          onStudy={onStudy}
          onRemove={onRemove}
        />
      </FlexContainer>
    </InlineBlockContainer>
  );
};
