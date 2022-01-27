import { BrowserWindow } from 'electron';

export const createScrapingWindow = (mainWindow: BrowserWindow): BrowserWindow => {
  const childWindow = new BrowserWindow({
    parent: mainWindow,
    center: true,
    minWidth: 800,
    minHeight: 600,
    show: false,
    webPreferences: {
      nodeIntegration: false
    }
  });

  return childWindow;
};
