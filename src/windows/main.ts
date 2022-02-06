import { BrowserWindow, Menu, nativeImage as NativeImage } from 'electron';
import { makeTemplateMenu } from '../helpers/template-menu';
import { makeMP4Dialog, makeSrtDialog } from '../helpers/electron-dialog';
import { ExploreEnglishWindow } from '../interfaces/explore-english-window.interface';
import { getIcon } from '../helpers/get-icon';
import { getPreload } from '../helpers/get-preload';

export class MainWindow extends ExploreEnglishWindow {
  private readonly browserWindow: BrowserWindow

  constructor () {
    super('MAIN');

    this.browserWindow = this.make();
    this.configureWindowPage();
    this.configureContextMenu();

    this.browserWindow.on('close', function () {
      process.exit();
    });
  }

  getBrowserWindowInstance (): BrowserWindow {
    return this.browserWindow;
  }

  show (): void {
    return this.browserWindow.show();
  }

  private make (): BrowserWindow {
    return new BrowserWindow({
      width: 1200,
      height: 600,
      icon: NativeImage.createFromPath(getIcon('icon')),
      webPreferences: {
        nodeIntegration: false,
        webSecurity: false,
        contextIsolation: true,
        preload: getPreload('preload')
      },
      title: 'Explore English'
    });
  }

  private configureWindowPage (): void {
    const browserWindow = this.browserWindow;

    browserWindow.on('page-title-updated', (evt) => {
      evt.preventDefault();
    });

    if (process.env.NODE_ENV === 'production') {
      browserWindow.loadFile('index.html');
    } else {
      browserWindow.loadURL('http://localhost:3000');
    }
  }

  private configureContextMenu (): void {
    const browserWindow = this.browserWindow;
    const templateMenu = makeTemplateMenu(makeMP4Dialog(browserWindow), makeSrtDialog(browserWindow));
    const menu = Menu.buildFromTemplate(templateMenu);
    Menu.setApplicationMenu(menu);
  }
}
