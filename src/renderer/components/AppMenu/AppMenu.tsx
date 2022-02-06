import React, { MouseEventHandler, ReactElement, useState } from 'react';
import { MovieDialog } from '../MovieDialog';
import { Dialog } from '../Dialog';
import { Button } from '../Button';
import { Bar } from './Bar';
import logo from '../../images/icon.png';

export const AppMenu = ({ onHome, onCreateMovie, onExport, onLogout }: { onHome?: MouseEventHandler<HTMLButtonElement>, onCreateMovie?: Function, onExport?: () => Promise<any>, onLogout?: MouseEventHandler<HTMLButtonElement> }): ReactElement => {
  const [createMovie, setCreateMovie] = useState(false);
  const [dialog, setDialog] = useState<any>(null);

  const onSave = (movie: any): void => {
    onCreateMovie(movie);
    setCreateMovie(false);
  };

  return (
    <React.Fragment>
      {dialog
        ? <Dialog
            title={dialog.title}
            labelBtn1={dialog.labelBtn1}
            labelBtn2={dialog.labelBtn2}
            onClickBtn1={dialog.onClickBtn1}
            onClickBtn2={dialog.onClickBtn2} >
          {dialog.body}
        </Dialog>
        : <div />}
      {createMovie ? <MovieDialog onCancel={() => setCreateMovie(false)} onSave={onSave} /> : <div />}
      <Bar>
        <img style={{ width: '50px' }} src={logo} />
        {onHome
          ? <Button style={{ marginTop: '5px', overflow: 'hidden' }} onClick={onHome}>
            <span style={{ color: 'black' }} className="material-icons md-18">home</span>
            <span style={{ marginLeft: '15px', whiteSpace: 'nowrap', display: 'block' }}>Home</span>
          </Button>
          : <div />}
        {onCreateMovie
          ? <Button style={{ marginTop: '5px', overflow: 'hidden' }} onClick={() => setCreateMovie(true)}>
            <span style={{ color: 'black' }} className="material-icons md-18">note_add</span>
            <span style={{ marginLeft: '15px', whiteSpace: 'nowrap', display: 'block' }}>Add a Movie</span>
          </Button>
          : <div />}
        {onExport
          ? <Button style={{ marginTop: '5px', overflow: 'hidden' }} onClick={() => {
            onExport()
              .then(() => {
                setDialog({
                  title: 'Information',
                  body: 'The file was exported in the user directory.',
                  labelBtn1: 'Ok',
                  onClickBtn1: () => {
                    setDialog(false);
                  }
                });
              })
              .catch(() => {
                setDialog({
                  title: 'Error',
                  body: 'There was an error saving the file.',
                  labelBtn1: 'Ok',
                  onClickBtn1: () => {
                    setDialog(false);
                  }
                });
              });
          }}>
            <span style={{ color: 'black' }} className="material-icons md-18">import_export</span>
            <span style={{ marginLeft: '15px', whiteSpace: 'nowrap', display: 'block' }}>Export Data</span>
          </Button>
          : <div />}
        {onLogout
          ? <Button style={{ marginTop: '5px', overflow: 'hidden' }} onClick={onLogout}>
            <span style={{ color: 'black' }} className="material-icons md-36">logout</span>
            <span style={{ marginLeft: '15px', whiteSpace: 'nowrap', display: 'block' }}>Logout</span>
          </Button>
          : <div />}
      </Bar>
    </React.Fragment>
  );
};
