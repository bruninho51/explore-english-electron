import React, { useState, useEffect, ReactElement } from 'react';
import { VideoPlayer } from '../VideoPlayer';
import { v4 as uuidv4 } from 'uuid';
import { PhrasalList } from '../PhrasalList';
import { Dialog } from '../Dialog';
import { extractWordsFromSentence } from '../../../helpers/domain';
import { Container } from './Container';
import { OptBar } from './OptBar';
import { VideoContainer } from './VideoContainer';
import { Sentence } from '../../../domain/models/sentence';
import saveImage from '../../images/save.svg';

export const PhrasalExtractor = (props: { phrases: Sentence[], videoPlayer: any, title: string, save: Function }): ReactElement => {
  const [phrases, setPhrases] = useState(Array.isArray(props.phrases) ? props.phrases : []);
  const [dialog, setDialog] = useState(null);

  useEffect(() => {
    setPhrases(props.phrases);
  }, [props]);

  const saveSentences = (callback: Function): void => {
    const status = (index: number): { failed: Function, saved: Function } => ({
      failed: () => {
        const newPhrases = [...phrases];
        newPhrases[index].status = 'failed';
        setPhrases(newPhrases);
      },
      saved: () => {
        const newPhrases = [...phrases];
        newPhrases[index].status = 'saved';
        setPhrases(newPhrases);
      }
    });

    for (let i = 0; i < phrases.length; i++) {
      const newPhrases = [...phrases];
      if (newPhrases[i].status !== 'saved') { newPhrases[i].status = 'saving'; };
      setPhrases(newPhrases);
      callback(phrases[i], status(i));
    }
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

      <Container>
        <PhrasalList phrases={phrases} onDelete={(uuid: string) => {
          setDialog({
            title: 'Atention',
            body: 'Are you sure want to delete?',
            labelBtn1: 'Yes',
            labelBtn2: 'No',
            onClickBtn1: () => {
              setPhrases(phrases.filter(phrase => phrase.id !== uuid));
              setDialog(null);
            },
            onClickBtn2: () => {
              setDialog(null);
            }
          });
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
            onSave={(word: number, subtitle: string) => {
              const newWord = {
                id: uuidv4(),
                wordIndex: word,
                sentence: subtitle,
                word: extractWordsFromSentence(subtitle)[word]
              };
              setPhrases([...phrases, newWord]);
              if (props.videoPlayer.onSave) { props.videoPlayer.onSave(word, subtitle); };
            }}
          />

          <OptBar>
            <img style={{ width: '50px', cursor: 'pointer' }} src={saveImage} onClick={() => saveSentences(props.save)} />
          </OptBar>
        </VideoContainer>
      </Container>
    </React.Fragment>
  );
};
