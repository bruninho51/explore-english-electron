import { ReactElement } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { Sentence } from '../../../domain/models/sentence';
import { Card } from '../Card';
import { VerticalScroll } from '../MovieList/VerticalScroll';
import { NoContent } from './NoContent';
import { PhrasalListContainer } from './PhrasalListContainer';

export const PhrasalList = ({ phrases, onDelete }: { phrases: Sentence[], onDelete: Function }): ReactElement => {
  return (
    phrases?.length
      ? <PhrasalListContainer>
        <Scrollbars renderThumbVertical={() => (<VerticalScroll />)}>
          {phrases.map((phrase) => (
            <Card
              key={phrase.id}
              uuid={phrase.id}
              wordIndex={phrase.wordIndex}
              sentence={phrase.sentence}
              onDelete={onDelete}
              status={phrase.status}
            />
          ))}
        </Scrollbars>
      </PhrasalListContainer>
      : <NoContent />);
};
