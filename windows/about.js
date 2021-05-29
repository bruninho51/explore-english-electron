const { BrowserWindow } = require("electron");
const { dist } = require("../helpers/helpers");
const path = require('path')

const createAboutWindow = () => {
  const win = new BrowserWindow({
    width: 400,
    height: 400,
    icon: path.join(__dirname, '..', 'assets', 'icon.png'),
    webPreferences: {
      nodeIntegration: false
    },
    resizable: false,
    title: 'About'
  });
  win.removeMenu()
  win.loadURL(`file://${dist(['layouts', 'about.html'])}`);
  win.webContents.openDevTools()

  return win
}

module.exports = { createAboutWindow }