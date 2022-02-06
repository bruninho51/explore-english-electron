import { ipcRenderer, contextBridge } from 'electron';
import { srtToArray } from './helpers/srt';
import os from 'os';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { Sentence } from './domain/models/sentence';
import { openSync } from 'original-fs';

// react states
let setSrt: Function = null;
let setVideo: Function = null;
// let setShowExportMessage: Function = null;

ipcRenderer.on('openSrt', (_event, subtitle) => setSrt(subtitle));
ipcRenderer.on('openMp4', (_event, path) => {
  setVideo(path);
  srtToArray(path.replace('.mp4', '.srt'))
    .then(data => setSrt(data))
    .catch(() => setSrt([]));
});

// Adds an object 'on' to the global window object
contextBridge.exposeInMainWorld('electron', {
  openSrt: (setState: Function) => {
    setSrt = setState;
  },
  openVideo: (setState: Function) => {
    setVideo = setState;
  },
  exportMovieData: async (movieName: string, sentences: Sentence[]): Promise<void> => {
    const fileName = `${movieName}.json`;
    const dir = path.join(os.homedir(), 'exploreenglish');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    const writeFile = promisify(fs.writeFile);
    return await writeFile(path.join(dir, fileName), JSON.stringify(sentences), 'utf8');
  },
  createCardsOnAnki: async (params: { movieTitle: string, phrase: Sentence }): Promise<string> => {
    return await ipcRenderer.invoke('scrapeToAnki', JSON.stringify(params));
  },
  getAbout: (): { osType: string, osRelease: string, osPlatform: string, electronVersion: string, arch: string } => {
    const osType = os.type();
    const osRelease = os.release();
    const osPlatform = os.platform();
    const electronVersion = process.versions.electron;
    const arch = process.arch;
    return {
      osType,
      osRelease,
      osPlatform,
      electronVersion,
      arch
    };
  }
});
