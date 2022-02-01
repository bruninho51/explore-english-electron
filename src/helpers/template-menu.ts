import { MenuItem, MenuItemConstructorOptions } from 'electron';
import { AboutWindow } from '../windows/about';

export const makeTemplateMenu = (openMP4Dialog: Function, openSrtDialog: Function): Array<(MenuItemConstructorOptions) | (MenuItem)> => {
  const menu: any = [];

  menu.push({
    label: 'Media',
    submenu: [
      { label: 'Open a MP4 video file...'.padEnd(38, ' '), click: () => { openMP4Dialog(); } }
    ]
  });

  menu.push({
    label: 'Subtitle',
    submenu: [
      { label: 'Open a custom SRT subtitle file...'.padEnd(38, ' '), click: () => { openSrtDialog(); } }
    ]
  });

  if (process.env.NODE_ENV === 'development') {
    menu.push({
      label: 'Development',
      submenu: [
        { role: 'reload' },
        { role: 'toggleDevTools' }
      ]
    });
  }

  menu.push({
    label: 'Help',
    submenu: [
      {
        label: 'About'.padEnd(38, ' '),
        click: () => {
          const about = new AboutWindow();
          about.show();
        }
      }
    ]
  });

  return menu;
};
