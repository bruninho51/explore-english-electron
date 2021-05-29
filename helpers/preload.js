const { ipcRenderer, contextBridge } = require('electron')
const srtToArray = require('./srt-to-array')

// react states
let setSrt = null
let setVideo = null

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
    }
});
