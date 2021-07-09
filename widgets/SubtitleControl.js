import React, { useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { extractWordsFromSentence } from "../helpers/helpers";
import { Button } from "./Button";

export const TrackStyle = styled.p`
  box-sizing: border-box;
  width: 99%;
  min-height: 100px;
  background: #FFF;
  border-radius: 5px;
  box-shadow: 0px 5px 15px 0px;
  padding: 5px;
  font: 24px Roboto, sans-serif;
  text-align: center;
  margin: 0;
`

const Word = styled.span`
  display: inline-block;
  margin-left: 7px;
`

const MarkableWord = styled(Word)`
  padding: 1px;
  border-radius: 5px;
  background: ${props => props.marked ? '#FFDE03' : 'transparent'};
  cursor: pointer;
  user-select: none;
`

export const ExternalContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  min-height: 100px;
  background: #F8F8F8;
  border-left: 3px solid #DCDCDC;
  border-right: 3px solid #DCDCDC;
  padding: 20px 2% 20px 2%;
  border-bottom: 3px solid #DCDCDC;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const slidein = keyframes`
    from {
      bottom: 0;
    }
  
    to {
      bottom: -80px;
    }
`

export const Actions = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 130px;
  border-radius: 5px;
  background: #F8F8F8;
  border: 3px solid #DCDCDC;
  align-items: bottom;
  font-family: Roboto sans-serif;
  text-align: center;
  padding: 20px;
  position: absolute;
  bottom: -80px;
  z-index: -1;
  ${props => {
      if (props.edit) {
        return css`
          animation: ${slidein} 2s;
        `
      } else {
        return css`
          top: 0px;
        `
      }
  }}
}
`

const ActionFooter = styled.footer`
  position: absolute;
  bottom: 10px;
  right: 10px;
  ${Button} {
    margin-left: 5px;
  }
`

const RelativeBox = styled.div`
  position: relative;
`

const TrackEditor = ({ children, markedWord, changeWord }) => {
    const words = extractWordsFromSentence(children)
    return (
      <TrackStyle>
          {words.map((word, index) => {
            return <MarkableWord key={index} marked={index === markedWord} onClick={() => changeWord(index)}>{word}</MarkableWord>
          })}
      </TrackStyle>
    )
}

const TrackViewer = ({ children }) => {
    const words = extractWordsFromSentence(children)
    return (
      <TrackStyle>
          {words.map((word, index) => {
            return <Word key={index} >{word}</Word>
          })}
      </TrackStyle>
    )
}

const Track = ({ edit, children, markedWord, changeWord }) => {
    return edit 
      ? <TrackEditor children={children} markedWord={markedWord} changeWord={changeWord} /> 
      : <TrackViewer children={children} />
}

export const SubtitleControl = ({ edit, subtitle, onCancel, onSave, onClick }) => {
    const [word, setWord] = useState(-1)

    return (
        <RelativeBox onClick={onClick}>
            <ExternalContainer edit={edit} >
                <Track edit={edit} markedWord={word} changeWord={(index) => setWord(index)}  >
                    {subtitle}
                </Track>
            </ExternalContainer>
            <Actions edit={edit} >
                <ActionFooter>
                    <Button 
                      theme="danger" 
                      onClick={(e) => {
                        e.stopPropagation()
                        setWord(-1)
                        onCancel()
                      }}>
                        Cancel
                    </Button>
                    <Button disabled={word < 0}
                      theme="success" 
                      onClick={(e) => {
                        e.stopPropagation()
                        onSave(word, subtitle)
                        setWord(-1)
                      }}>
                        Save
                    </Button>
                </ActionFooter>
            </Actions>
        </RelativeBox>
    )
}
