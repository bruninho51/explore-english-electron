const { BrowserWindow } = require("electron");
const path = require('path')
const NativeImage = require('electron').nativeImage

const createMainWindow = () => {
    const win = new BrowserWindow({
      width: 1200,
      height: 600,
      icon: NativeImage.createFromPath(path.join(__dirname, '..', 'assets', 'icon.png')),
      webPreferences: {
        nodeIntegration: false,
        webSecurity: true,
        enableRemoteModule: false,
        contextIsolation: true,
        preload: path.join(__dirname, '..', 'helpers', 'preload.js')
      },
      title: 'Explore English'
    });
  
    win.loadURL(`file://${__dirname}/../index.html`);

    if (process.env.NODE_ENV === 'development') {
      win.webContents.openDevTools()
    }
  
    return win
}

module.exports = { createMainWindow }