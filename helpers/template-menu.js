const windows = require('../windows')

const makeTemplateMenu = (openMP4Dialog, openSrtDialog) => {
  return [
    {
      label: "Media",
      submenu: [
        { label: "Open a MP4 video file...              ", click: () => { openMP4Dialog() } }
      ]
    },
    {
      label: "Subtitle",
      submenu: [
        { label: "Open a custom SRT subtitle file...    ", click: () => { openSrtDialog() } }
      ]
    },
    {
      label: "Movie",
      submenu: [
        { label: "Create a Movie                        ", click: () => { openSrtDialog() } }
      ]
    },
    {
      label: "Help",
      submenu: [
        { 
          label: "About                                 ", 
          click: () => {
            windows.about()
          } 
      }
      ]
    }
  ];
}

module.exports = makeTemplateMenu