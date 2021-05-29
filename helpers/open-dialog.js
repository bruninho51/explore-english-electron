const { dialog } = require('electron')
const srtToArray = require('./srt-to-array')

const makeMP4Dialog = (win) => {

  return async () => {
    const data = await dialog.showOpenDialog({ 
      properties: ['openFile'],
      filters: [{ name: '.mp4 Files', extensions: ['mp4'] }]
    })

    if (!data.canceled) {
      win.webContents.send('openMp4', data.filePaths[0])
    }
  }
}

const makeSrtDialog = (win) => {

  return async () => {
    const dialogResult = await dialog.showOpenDialog({ 
      properties: ['openFile'],
      filters: [{ name: '.srt Files', extensions: ['srt'] }]
    })

    if (!dialogResult.canceled) {
      srtToArray(dialogResult.filePaths[0])
        .then(data => win.webContents.send('openSrt', data))
    }
  }
    
}

module.exports = { makeMP4Dialog, makeSrtDialog }
