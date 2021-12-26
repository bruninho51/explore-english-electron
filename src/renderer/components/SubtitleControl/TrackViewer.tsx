import { ReactElement } from 'react';
import { extractWordsFromSentence } from '../../../helpers/domain';
import { TrackStyle } from './TrackStyle';
import { Word } from './Word';

export const TrackViewer = ({ children }: { children: any }): ReactElement => {
  const words = extractWordsFromSentence(children);
  return (
    <TrackStyle>
      {words.map((word, index) => {
        return <Word key={index} >{word}</Word>;
      })}
    </TrackStyle>
  );
};
