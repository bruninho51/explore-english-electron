import React, { MouseEventHandler, ReactElement, useState } from 'react';
import { MovieDialog } from '../MovieDialog';
import { FaHome, FaFileExport, FaPlusSquare } from 'react-icons/fa';
import { RiLogoutBoxFill } from 'react-icons/ri';
import { Dialog } from '../Dialog';
import { Button } from '../Button';
import { Bar } from './Bar';

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
        {onLogout
          ? <Button style={{ marginTop: '5px' }} onClick={onLogout}>
            <RiLogoutBoxFill />
          </Button>
          : <div />}
        {onHome
          ? <Button style={{ marginTop: '5px' }} onClick={onHome}>
            <FaHome />
          </Button>
          : <div />}
        {onCreateMovie
          ? <Button style={{ marginTop: '5px' }} onClick={() => setCreateMovie(true)}>
            <FaPlusSquare />
          </Button>
          : <div />}
        {onExport
          ? <Button style={{ marginTop: '5px' }} onClick={() => {
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
            <FaFileExport />
          </Button>
          : <div />}
      </Bar>
    </React.Fragment>
  );
};
