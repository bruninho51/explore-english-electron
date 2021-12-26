import { BrowserWindow, nativeImage as NativeImage } from 'electron';
import path from 'path';

export const createAboutWindow = (): BrowserWindow => {
  const win = new BrowserWindow({
    width: 400,
    height: 400,
    icon: NativeImage.createFromPath(path.join(__dirname, '..', 'icons', 'icon.png')),
    webPreferences: {
      nodeIntegration: false,
      webSecurity: true,
      contextIsolation: true,
      preload: path.resolve(__dirname, 'preload.js')
    },
    resizable: false,
    title: 'About'
  });

  win.removeMenu();

  win.on('page-title-updated', (evt) => {
    evt.preventDefault();
  });

  win.loadFile('about.html');

  return win;
};
