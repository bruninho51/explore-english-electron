const { ipcRenderer, contextBridge } = require('electron')
const srtToArray = require('./srt-to-array')
const os = require('os')
const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

// react states
let setSrt = null
let setVideo = null
let setShowExportMessage = null

ipcRenderer.on('openSrt', (_event, subtitle) => setSrt(subtitle))
ipcRenderer.on('openMp4', (_event, path) => {
    setVideo(path)
    srtToArray(path.replace('.mp4', '.srt'))
        .then(data => setSrt(data))
        .catch(() => setSrt([]))
})

// Adds an object 'on' to the global window object
contextBridge.exposeInMainWorld('on', {
    openSrt: (setState) => {
        setSrt = setState
    },
    openVideo: (setState) => {
        setVideo = setState
    },
    showExportMessage: (setState) => {
        setShowExportMessage = setState
    },
    exportMovieData: (movieName, sentences) => {
        const fileName = `${movieName}.json`
        const dir = path.join(os.homedir(), 'exploreenglish')
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        const writeFile = promisify(fs.writeFile)
        return writeFile(path.join(dir, fileName), JSON.stringify(sentences), 'utf8')
    }
});
