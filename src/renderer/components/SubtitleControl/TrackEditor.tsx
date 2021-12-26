import { ReactElement } from 'react';
import { extractWordsFromSentence } from '../../../helpers/domain';
import { MarkableWord } from './MarkableWord';
import { TrackStyle } from './TrackStyle';

export const TrackEditor = ({ children, markedWord, changeWord }: { children: any, markedWord: number, changeWord: Function }): ReactElement => {
  const words = extractWordsFromSentence(children);
  return (
    <TrackStyle>
      {words.map((word, index) => {
        return <MarkableWord key={index} marked={index === markedWord} onClick={() => changeWord(index)}>{word}</MarkableWord>;
      })}
    </TrackStyle>
  );
};
