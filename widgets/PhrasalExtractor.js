import React, { useState } from "react"
import styled from "styled-components"
import VideoPlayer from "./VideoPlayer"
import { v4 as uuidv4 } from 'uuid';
import { PhrasalList } from "./PhrasalList";
import { Button } from "./Button";
import { Dialog } from "./Dialog";
import { extractWordsFromSentence } from "../helpers/helpers";

export const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background: #F8F8F8;
  border-left: 3px solid #DCDCDC;
  border-right: 3px solid #DCDCDC;
  padding:  5px 5px 5px 5px;
  border-bottom: 3px solid #DCDCDC;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
`

const Section = styled.section`
  box-sizing: border-box;
  min-height: 100px;
  background: #DCDCDC;
  border-left: 3px solid #DCDCDC;
  border-right: 3px solid #DCDCDC;
  padding: 5px 5px 5px 5px;

  border-bottom: 3px solid #DCDCDC;
  border-radius: 5px;
  display: flex;
`

const VideoContainer = styled(Section)`
  width: 100%;
  height: 80vmin;
  flex-direction: column;
  justify-content: space-around;
  z-index: 1;
  background: transparent;
  border: 0px;
`

const SizedBox = styled.div`
  height: ${props => props.height};
  width: 100%;
  z-index: -2;
`

export const OptBar = ({ children }) => {
  return (
    <div style={{position: 'absolute', bottom: '40px', right: '40px'}}>
      { children }
    </div>
  )
}

export const PhrasalExtractor = (props) => {

  const [phrases, setPhrases] = useState([])
  const [dialog, setDialog] = useState(null)

    const saveSentences = (callback) => {
      const status = (index) => ({
        failed: () => {
          const newPhrases = [ ...phrases ]
          newPhrases[index].status = 'failed'
          setPhrases(newPhrases)
        },
        saved: () => {
          const newPhrases = [ ...phrases ]
          newPhrases[index].status = 'saved'
          setPhrases(newPhrases)
        }
      })

      for (let i = 0; i < phrases.length; i++) {
        const newPhrases = [ ...phrases ]
        if (newPhrases[i].status != 'saved')
          newPhrases[i].status = 'saving'
        setPhrases(newPhrases)
        callback(phrases[i], status(i))
      }
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
          
          <Container>
           <PhrasalList phrases={phrases} onDelete={(uuid) => {

            setDialog({
              title: 'Atention',
              body: 'Are you sure want to delete?',
              labelBtn1: 'Yes',
              labelBtn2: 'No',
              onClickBtn1: () => {
                setPhrases(phrases.filter(phrase => phrase.uuid !== uuid))
                setDialog(null)
              },
              onClickBtn2: () => {
                setDialog(null)
              }
            })
           }} />
            <VideoContainer>
                <VideoPlayer 
                    autoplay={props.videoPlayer.autoplay}
                    controls={props.videoPlayer.controls}
                    sources={[{
                      src: props.videoPlayer.sources[0].src,
                      type: props.videoPlayer.sources[0].type
                    }]}
                    balance={props.videoPlayer.balance}
                    subtitle={props.videoPlayer.subtitle}
                    onSave={(word, subtitle) => {
                        const newWord = {
                            uuid: uuidv4(),
                            wordIndex: word,
                            sentence: subtitle,
                            word: extractWordsFromSentence(subtitle)[word],
                        }
                        setPhrases([...phrases, newWord])
                        if (props.videoPlayer.onSave) 
                            props.videoPlayer.onSave(word, subtitle)
                    }}
                />
                <SizedBox height="120px" >
                  <p style={{fontSize: '22px', fontFamily: 'Roboto sans-serif' }}>{`Movie: ${props.title}`}</p>
                </SizedBox>
                <OptBar>
                  <Button size="large" style={{width: '200px'}} onClick={() => saveSentences(props.save)}>
                    Finish Studies
                  </Button>
                </OptBar>
            </VideoContainer>
        </Container>
        </React.Fragment>
    )
}
