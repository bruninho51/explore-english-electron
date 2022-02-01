import { BrowserWindow, app } from 'electron';
import { ExploreEnglishWindow } from './interfaces/explore-english-window.interface';
import { MainWindow } from './windows/main';
import { ScrappingWindow } from './windows/scraping';

const initializeScrapper = (): ExploreEnglishWindow => {
  return new ScrappingWindow();
};

app.whenReady().then(() => {
  initializeScrapper();
  const main = new MainWindow();
  main.show();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    const main = new MainWindow();
    main.show();
  }
});
