const { BrowserWindow } = require("electron");
const { dist } = require("../helpers/helpers");
const path = require('path')

const createMainWindow = () => {
    const win = new BrowserWindow({
      width: 1200,
      height: 600,
      icon: path.join(__dirname, '..', 'assets', 'icon.png'),
      webPreferences: {
        nodeIntegration: false,
        webSecurity: true,
        enableRemoteModule: false,
        contextIsolation: true,
        preload: path.join(__dirname, '..', 'helpers', 'preload.js')
      },
      title: 'Explore English'
    });
  
    win.loadURL( `file://${dist(['index.html'])}`);
    win.webContents.openDevTools()
  
    return win
}

module.exports = { createMainWindow }