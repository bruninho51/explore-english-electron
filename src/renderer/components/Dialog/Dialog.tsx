import React, { MouseEventHandler, ReactElement, RefObject } from 'react';
import './Dialog.css';
import './Swing.css';
import { DialogContainer } from '../MovieDialog/DialogContainer';

export const Dialog = ({ children, title, labelBtn1, labelBtn2, onClickBtn1, onClickBtn2 }: { children: any, title: string, labelBtn1: string, labelBtn2: string, onClickBtn1: MouseEventHandler<HTMLInputElement>, onClickBtn2: MouseEventHandler<HTMLInputElement> }): ReactElement => {
  const dialogRef: RefObject<HTMLDivElement> = React.createRef();

  const swingAnimation = (): void => {
    const dialog = dialogRef.current;
    dialog.classList.remove('swing-animation');
    setTimeout(() => {
      dialog.classList.remove('swing-animation');
      dialog.classList.add('swing-animation');
    }, 100);
  };

  return (
    <DialogContainer onClick={swingAnimation}>
      <div ref={dialogRef} className="dialog" id="dialog" onClick={e => e.stopPropagation()}>
        <header>
          <h1 id="dialog-title">{title}</h1>
        </header>
        <section className="body" id="dialog-body">{children}</section>
        <footer>
          {labelBtn1 ? <input type="button" id="dialog-button1" onClick={onClickBtn1} value={labelBtn1} /> : <span />}
          {labelBtn2 ? <input type="button" id="dialog-button2" onClick={onClickBtn2} value={labelBtn2} /> : <span />}
        </footer>
      </div>
    </DialogContainer>
  );
};
