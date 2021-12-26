import { ReactElement } from 'react';
import { IoIosClose } from 'react-icons/io';
import { extractWordsFromSentence } from '../../../helpers/domain';
import { RelativeBox } from './RelativeBox';
import { CardStyle } from './CardStyle';
import { MarkableWord } from './MarkableWord';
import { DeleteButton } from './DeleteButton';
import { LoadStatus } from './LoadStatus';

export const Card = ({ wordIndex, sentence, uuid, status, onDelete }: { wordIndex: number, sentence: string, uuid: string, status: string, onDelete: Function }): ReactElement => {
  const words = extractWordsFromSentence(sentence);
  return (
    <RelativeBox>
      <CardStyle status={status}>
        {words.map((word, index) => {
          return <MarkableWord key={index} marked={index === wordIndex} >{word}</MarkableWord>;
        })}
        {onDelete && !status
          ? <DeleteButton onClick={() => { onDelete(uuid); }}>
            <IoIosClose />
          </DeleteButton>
          : null}
      </CardStyle>
      {status
        ? <LoadStatus statusValue={status} />
        : null
      }
    </RelativeBox>
  );
};
