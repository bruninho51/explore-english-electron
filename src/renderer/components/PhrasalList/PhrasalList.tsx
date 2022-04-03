import { ReactElement } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { Sentence } from '../../../domain/models/sentence';
import { Card } from '../Card';
import { VerticalScroll } from '../MovieList/VerticalScroll';
import { NoContent } from './NoContent';
import { PhrasalListContainer } from './PhrasalListContainer';

export const PhrasalList = ({ phrases, onDelete, changeVideoTime }: { phrases: Sentence[], onDelete: Function, changeVideoTime: Function }): ReactElement => {
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
              onClick={() => {
                changeVideoTime(0)
                setTimeout(() => changeVideoTime(phrase.videoTime), 50)
              }}
              onDelete={onDelete}
              status={phrase.status}
              savedOnAnki={phrase.savedOnAnki}
            />
          ))}
        </Scrollbars>
      </PhrasalListContainer>
      : <NoContent />);
};
