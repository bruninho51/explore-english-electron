const { BrowserWindow } = require("electron");
const path = require('path')
const NativeImage = require('electron').nativeImage

const createAboutWindow = () => {
  const win = new BrowserWindow({
    width: 400,
    height: 400,
    icon: NativeImage.createFromPath(__dirname, '..', 'assets', 'icon.png'),
    webPreferences: {
      nodeIntegration: false
    },
    resizable: false,
    title: 'About'
  });
  win.removeMenu()
  win.loadURL(`file://${__dirname}/../layouts/about.html`);

  if (process.env.NODE_ENV === 'development') {
    win.webContents.openDevTools()
  }

  return win
}

module.exports = { createAboutWindow }