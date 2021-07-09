import React, { useState } from 'react'
import styled from 'styled-components'
import { Button } from './Button'
import { CreateMovieDialog } from './CreateMovieDialog'
import { FaHome } from 'react-icons/fa';

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
  justify-content: center;
  top: 0px;
  ${Button} {
    width: 3vmax;
    height: 3vmax;
  }
`

export const MenuApp = ({ onHome, onCreateMovie }) => {
    const [createMovie, setCreateMovie] = useState(false)

    const onSave = (movie) => {
        onCreateMovie(movie)
        setCreateMovie(false)
    }

    return (
        <React.Fragment>
          {createMovie ? <CreateMovieDialog onCancel={() => setCreateMovie(false)} onSave={onSave} /> : <div />}
          <Bar>
            {onHome 
              ? <Button style={{marginTop: '5px'}} onClick={onHome}>
                  <FaHome />
                </Button>
              : <div />}
            {onCreateMovie 
              ? <Button style={{marginTop: '5px'}} onClick={() => setCreateMovie(true)}>+</Button>
              : <div />}
          </Bar>
        </React.Fragment>
    )
}
