import { BrowserWindow } from 'electron';

export const createScrapingWindow = (mainWindow: BrowserWindow): BrowserWindow => {
  const childWindow = new BrowserWindow({
    parent: mainWindow,
    center: true,
    minWidth: 800,
    minHeight: 600,
    show: true,
    webPreferences: {
      nodeIntegration: false // https://electronjs.org/docs/tutorial/security#2-d%C3%A9sactiver-lint%C3%A9gration-de-nodejs-dans-tous-les-renderers-affichant-des-contenus-distants
    }
  });

  return childWindow;
};
