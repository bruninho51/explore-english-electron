import { MouseEventHandler, ReactElement, useState } from 'react';
import { Button } from '../Button';
import { ActionFooter } from './ActionFooter';
import { Actions } from './Actions';
import { ExternalContainer } from './ExternalContainer';
import { RelativeBox } from './RelativeBox';
import { Track } from './Track';

export const SubtitleControl = ({ edit, subtitle, onCancel, onSave, onClick }: { edit: boolean, subtitle: string, onCancel: Function, onSave: Function, onClick: MouseEventHandler<HTMLDivElement> }): ReactElement => {
  const [word, setWord] = useState(-1);

  return (
    <RelativeBox onClick={onClick}>
      <ExternalContainer>
        <Track edit={edit} markedWord={word} changeWord={(index: number) => setWord(index)} >
          {subtitle}
        </Track>
      </ExternalContainer>
      <Actions edit={edit} >
        <ActionFooter>
          <Button
            theme="danger"
            onClick={(e) => {
              e.stopPropagation();
              setWord(-1);
              onCancel();
            }}>
            Cancel
          </Button>
          <Button
            disabled={word < 0}
            theme="success"
            onClick={(e) => {
              e.stopPropagation();
              onSave(word, subtitle);
              setWord(-1);
            }}>
            Save
          </Button>
        </ActionFooter>
      </Actions>
    </RelativeBox>
  );
};
