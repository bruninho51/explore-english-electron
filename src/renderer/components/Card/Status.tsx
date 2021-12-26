import { ReactElement } from 'react';
import { StatusStyle } from './StatusStyle';

export const Status = ({ value }: { value: string }): ReactElement => {
  return (
    <StatusStyle>
      {value}
    </StatusStyle>
  );
};
