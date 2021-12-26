import { dialog, BrowserWindow } from 'electron';
import { srtToArray } from './srt';

export const makeMP4Dialog = (win: BrowserWindow) => {
  return async () => {
    const data = await dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [{ name: '.mp4 Files', extensions: ['mp4'] }]
    });

    if (!data.canceled) {
      const path = data.filePaths[0];
      win.setTitle(`Explore English - ${path.split('/').pop()}`);
      win.webContents.send('openMp4', path);
    }
  };
};

export const makeSrtDialog = (win: BrowserWindow) => {
  return async () => {
    const dialogResult = await dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [{ name: '.srt Files', extensions: ['srt'] }]
    });

    if (!dialogResult.canceled) {
      srtToArray(dialogResult.filePaths[0])
        .then(data => win.webContents.send('openSrt', data));
    }
  };
};
