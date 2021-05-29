const { app, BrowserWindow, Menu } = require('electron');
const windows = require('./windows/index')
const makeTemplateMenu = require('./helpers/template-menu')
const { makeMP4Dialog, makeSrtDialog } = require("./helpers/open-dialog")

const main = () => {
  const win = windows.main()
  const templateMenu = makeTemplateMenu(makeMP4Dialog(win), makeSrtDialog(win))
  const menu = Menu.buildFromTemplate(templateMenu);
  Menu.setApplicationMenu(menu);
}

app.whenReady().then(() => {
  main()
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    main()
  }
});
