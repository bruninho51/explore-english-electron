import { MouseEventHandler, ReactElement } from 'react';
import { TrashStyle } from './TrashStyle';

export const Trash = ({ onRemove }: { onRemove: MouseEventHandler<HTMLImageElement> }): ReactElement => {
  return (
    <TrashStyle>
      <span onClick={onRemove} className="material-icons md-18">delete</span>
    </TrashStyle>
  );
};
