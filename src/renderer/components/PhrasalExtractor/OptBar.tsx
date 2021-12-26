import { ReactElement } from 'react';
import { CSSProperties } from 'styled-components';

const bar: CSSProperties = {
  float: 'right',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'end'
};

export const OptBar = ({ children }: { children: any }): ReactElement => {
  return (
    <div style={bar}>
      { children }
    </div>
  );
};
