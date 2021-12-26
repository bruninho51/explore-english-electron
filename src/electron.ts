import { BrowserWindow, app } from 'electron';
import windows from './windows';

app.whenReady().then(() => {
  windows.createMainWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    windows.createMainWindow();
  }
});
