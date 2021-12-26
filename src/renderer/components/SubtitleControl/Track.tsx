import { ReactElement } from 'react';
import { TrackEditor } from './TrackEditor';
import { TrackViewer } from './TrackViewer';

export const Track = ({ edit, children, markedWord, changeWord }: { edit: boolean, children: any, markedWord: number, changeWord: Function }): ReactElement => {
  return edit
    ? <TrackEditor markedWord={markedWord} changeWord={changeWord} >
      {children}
    </TrackEditor>
    : <TrackViewer>
      {children}
    </TrackViewer>;
};
