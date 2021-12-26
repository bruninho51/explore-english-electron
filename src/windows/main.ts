import { BrowserWindow, Menu, nativeImage as NativeImage } from 'electron';
import path from 'path';
import { makeTemplateMenu } from '../helpers/template-menu';
import { makeMP4Dialog, makeSrtDialog } from '../helpers/electron-dialog';

export const createMainWindow = (): BrowserWindow => {
  const win = new BrowserWindow({
    width: 1200,
    height: 600,
    icon: NativeImage.createFromPath(path.join(__dirname, '..', 'icons', 'icon.png')),
    webPreferences: {
      nodeIntegration: false,
      webSecurity: false,
      contextIsolation: true,
      preload: path.resolve(__dirname, 'preload.js')
    },
    title: 'Explore English'
  });

  const templateMenu = makeTemplateMenu(makeMP4Dialog(win), makeSrtDialog(win));
  const menu = Menu.buildFromTemplate(templateMenu);
  Menu.setApplicationMenu(menu);

  win.on('page-title-updated', (evt) => {
    evt.preventDefault();
  });

  if (process.env.NODE_ENV === 'production') {
    win.loadFile('index.html');
  } else {
    win.loadURL('http://localhost:3000');
  }

  return win;
};
