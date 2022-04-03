import { ReactElement } from 'react';
import { IoIosClose } from 'react-icons/io';
import { extractWordsFromSentence } from '../../../helpers/domain';
import { RelativeBox } from './RelativeBox';
import { CardStyle } from './CardStyle';
import { MarkableWord } from './MarkableWord';
import { DeleteButton } from './DeleteButton';
import { LoadStatus } from './LoadStatus';
import ankiImage from '../../images/anki.png';

export const Card = ({ wordIndex, sentence, uuid, status, savedOnAnki, onDelete, onClick }: { wordIndex: number, sentence: string, uuid: string, status: string, savedOnAnki: boolean, onDelete: Function, onClick: Function }): ReactElement => {
  const words = extractWordsFromSentence(sentence);
  return (
    <RelativeBox>
      <CardStyle status={status} onClick={() => onClick()}>
        <div style={{ padding: '5px 50px 0px 10px' }}>
          {words.map((word, index) => {
            return <MarkableWord key={index} marked={index === wordIndex} >{word}</MarkableWord>;
          })}
        </div>
        {onDelete && !status
          ? <DeleteButton onClick={() => { onDelete(uuid); }}>
            <IoIosClose />
          </DeleteButton>
          : null}
        <div style={{ height: '30px' }} />
        <div style={{ position: 'absolute', bottom: 0, height: '30px', display: 'flex', justifyContent: 'end', width: '100%', padding: '0px 5px 5px 0px' }}>
          {savedOnAnki
            ? <img style={{ width: '25px' }} src={ankiImage} />
            : null
          }
        </div>
      </CardStyle>
      {status
        ? <LoadStatus statusValue={status} />
        : null
      }

    </RelativeBox>
  );
};
