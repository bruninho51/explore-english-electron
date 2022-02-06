import { BrowserWindow, nativeImage as NativeImage } from 'electron';
import { getIcon } from '../helpers/get-icon';
import { getPreload } from '../helpers/get-preload';
import { ExploreEnglishWindow } from '../interfaces/explore-english-window.interface';

export class AboutWindow extends ExploreEnglishWindow {
  private readonly browserWindow: BrowserWindow

  constructor () {
    super('About');

    this.browserWindow = this.make();
    this.configureWindowPage();
    this.configureContextMenu();
  }

  getBrowserWindowInstance (): BrowserWindow {
    return this.browserWindow;
  }

  show (): void {
    this.browserWindow.show();
  }

  make (): BrowserWindow {
    return new BrowserWindow({
      width: 400,
      height: 600,
      icon: NativeImage.createFromPath(getIcon('icon')),
      webPreferences: {
        nodeIntegration: false,
        webSecurity: true,
        contextIsolation: true,
        preload: getPreload('preload')
      },
      show: false,
      resizable: false,
      title: 'About'
    });
  }

  private configureWindowPage (): void {
    const browserWindow = this.browserWindow;
    browserWindow.on('page-title-updated', (evt) => {
      evt.preventDefault();
    });

    browserWindow.loadFile('about.html');
  }

  private configureContextMenu (): void {
    const browserWindow = this.browserWindow;
    browserWindow.removeMenu();
  }
}
