import React, { useState } from 'react'
import styled from 'styled-components'
import { Button } from './Button'
import { CreateMovieDialog } from './CreateMovieDialog'
import { FaHome, FaFileExport, FaPlusSquare } from 'react-icons/fa';
import { RiLogoutBoxFill } from 'react-icons/ri'
import { Dialog } from "./Dialog";

export const Bar = styled.div`
  box-sizing: border-box;
  width: 4vmax;
  height: 100%;
  background: #F8F8F8;
  border-left: 3px solid #DCDCDC;
  border-right: 3px solid #DCDCDC;
  border-bottom: 3px solid #DCDCDC;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  top: 0px;
  ${Button} {
    width: 3vmax;
    height: 3vmax;
  }
`

export const MenuApp = ({ onHome, onCreateMovie, onExport, onLogout }) => {
    const [createMovie, setCreateMovie] = useState(false)
    const [dialog, setDialog] = useState(false)

    const onSave = (movie) => {
        onCreateMovie(movie)
        setCreateMovie(false)
    }

    return (
        <React.Fragment>
          {dialog ? <Dialog 
            title={dialog.title}
            labelBtn1={dialog.labelBtn1}
            labelBtn2={dialog.labelBtn2}
            onClickBtn1={dialog.onClickBtn1} 
            onClickBtn2={dialog.onClickBtn2} >
              {dialog.body}
            </Dialog> : <div />}
          {createMovie ? <CreateMovieDialog onCancel={() => setCreateMovie(false)} onSave={onSave} /> : <div />}
          <Bar>
            {onLogout 
                ? <Button style={{marginTop: '5px'}} onClick={onLogout}>
                    <RiLogoutBoxFill />
                  </Button>
                : <div />}
            {onHome 
              ? <Button style={{marginTop: '5px'}} onClick={onHome}>
                  <FaHome />
                </Button>
              : <div />}
            {onCreateMovie 
              ? <Button style={{marginTop: '5px'}} onClick={() => setCreateMovie(true)}>
                <FaPlusSquare />
              </Button>
              : <div />}
            {onExport 
              ? <Button style={{marginTop: '5px'}} onClick={() => {
                  onExport()
                    .then(() => {
                      setDialog({
                        title: 'Information',
                        body: 'The file was exported in the user directory.',
                        labelBtn1: 'Ok',
                        onClickBtn1: () => {
                          setDialog(false)
                        }
                      })
                    })
                  .catch(() => {
                    setDialog({
                      title: 'Error',
                      body: 'There was an error saving the file.',
                      labelBtn1: 'Ok',
                      onClickBtn1: () => {
                        setDialog(false)
                      }
                    })
                  })
                }}>
                  <FaFileExport />
                </Button>
              : <div />}
          </Bar>
        </React.Fragment>
    )
}
