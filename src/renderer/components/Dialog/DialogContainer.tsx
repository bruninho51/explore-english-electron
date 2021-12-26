import { MouseEventHandler, ReactElement } from 'react';

export const DialogContainer = ({ children, onClick }: { children: any, onClick: MouseEventHandler<HTMLDivElement> }): ReactElement => {
  return (
    <div onClick={onClick} className="dialog-container" id="dialog-container">
      {children}
    </div>
  );
};
