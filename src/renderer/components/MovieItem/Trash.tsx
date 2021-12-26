import { MouseEventHandler, ReactElement } from 'react';
import { TrashStyle } from './TrashStyle';
import trash from '../../images/trash.svg';

export const Trash = ({ onRemove }: { onRemove: MouseEventHandler<HTMLImageElement> }): ReactElement => {
  return (
    <TrashStyle>
      <img width="30px" src={trash} alt="trash" onClick={onRemove} />
    </TrashStyle>
  );
};
