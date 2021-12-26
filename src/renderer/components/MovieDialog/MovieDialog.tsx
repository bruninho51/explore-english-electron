import React, { MouseEventHandler, RefObject, useState, ReactElement } from 'react';
import './MovieDialog.css';
import './Swing.css';
import { Button } from '../Button';
import { DialogContainer } from './DialogContainer';
import { Form } from './Form';
import { Header } from './Header';
import { TextInput } from './TextInput';

export const MovieDialog = ({ onCancel, onSave }: { onCancel: MouseEventHandler<HTMLButtonElement>, onSave: Function }): ReactElement => {
  const dialogRef: RefObject<any> = React.createRef();

  const [movie, setMovie] = useState<any>({});

  const swingAnimation = (): void => {
    const dialog = dialogRef.current;
    dialog.classList.remove('swing-animation');
    setTimeout(() => {
      dialog.classList.remove('swing-animation');
      dialog.classList.add('swing-animation');
    }, 100);
  };

  const handleChange = (event: any): void => {
    setMovie({
      ...movie,
      [event.target.name]: event.target.value

    });
  };

  return (
    <DialogContainer onClick={swingAnimation} >
      <div ref={dialogRef} className="dialog" id="dialog" onClick={e => e.stopPropagation()} style={{
        width: '500px',
        height: '90vmin'
      }}>
        <Header>
          <h1 id="dialog-title">Create a New Movie</h1>
        </Header>
        <div className="body" id="dialog-body">
          <Form>
            <TextInput type="text" name="name" label="Name" value={movie.name} onChange={handleChange} />
          </Form>
        </div>
        <footer>
          <Button theme="danger" style={{ marginRight: '5px' }} onClick={onCancel}>Cancel</Button>
          <Button theme="success" onClick={() => onSave(movie)}>Save</Button>
        </footer>
      </div>
    </DialogContainer>
  );
};
