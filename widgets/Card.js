import React from 'react';
import styled from "styled-components"
import { IoIosClose } from 'react-icons/io'
import { ImSpinner } from 'react-icons/im'
import { extractWordsFromSentence } from "../helpers/helpers"

export const CardStyle = styled.div`
  box-sizing: border-box;
  width: 100%;
  min-height: 100px;
  background: #FFF;
  border-radius: 5px;
  box-shadow: 0px 5px 15px 0px;
  padding: 5px 50px 5px 10px;
  font: 24px Roboto, sans-serif;
  text-align: center;
  margin: ${props => props.status ? '5px 0px 30px 0px;' : '5px 0px 5px 0px;'};
`

const Word = styled.span`
  display: inline-block;
  margin-left: 7px;
`

const MarkableWord = styled(Word)`
  padding: 1px;
  border-radius: 5px;
  background: ${props => props.marked ? '#FFDE03' : 'transparent'};
`

export const DeleteButton = styled.div`
    width: 32px;
    height: 32px;
    font-size: 24px;
    border-radius: 200px;
    border: 1px solid #000;
    &:hover {
      background: #E44352;
      background: rgba(220, 53, 69, 1);
  }
    position: absolute;
    top: 5px;
    right: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`

const RelativeBox = styled.div`
  position: relative;
  margin: 2px 5px 2px 5px;
`

const LoadStatusStyle = styled.div`
  box-sizing: border-box;
  position: relative;
  width: 100%;
  min-height: 20px;
  background: ${props => props.color ? props.color : '#FFF'};
  position: absolute;
  bottom: -28px;
  border-radius: 5px;
  box-shadow: 0px 5px 15px 0px;
  padding: 2px 10px 2px 10px;
  font: 24px Roboto, sans-serif;
  text-align: center;
  margin: 5px 0px 5px 0px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const SpinnerAnimation = styled.div`
  width: 15px;
  height: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: spin infinite 2s linear;
  @keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
`

const StatusStyle = styled.div`
  font-size: 12px;
  font-weight: 900;
`

const Status = ({ value }) => {
  return (
    <StatusStyle>
      {value}
    </StatusStyle>
  )
}

const LoadStatus = ({statusValue}) => {
  const status = {
    saved: {
      statusText: 'Saved!',
      color: '#449a56',
      spinner: false
    },
    failed: {
      statusText: 'Failed!',
      color: '#E44352',
      spinner: false
    },
    saving: {
      statusText: 'Saving...',
      color: '#46a3b3',
      spinner: true
    }
  }
  return (
    <LoadStatusStyle color={status[statusValue].color}>
      <Status value={status[statusValue].statusText} />
      {status[statusValue].spinner ? 
        <SpinnerAnimation>
          <ImSpinner size={22} />
        </SpinnerAnimation> : null }
    </LoadStatusStyle>
  )
}

export const Card = ({ wordIndex, sentence, uuid, status, onDelete }) => {
    const words = extractWordsFromSentence(sentence)
    return (
      <RelativeBox>
        <CardStyle status={status}>
            {words.map((word, index) => {
              return <MarkableWord key={index} marked={index === wordIndex} >{word}</MarkableWord>
            })}
            {onDelete && !status ?
              <DeleteButton onClick={() => { onDelete(uuid) }}>
                  <IoIosClose />
              </DeleteButton> : null}
        </CardStyle>
        {status ? 
          <LoadStatus statusValue={status} /> : null
        }
      </RelativeBox>
    )
}