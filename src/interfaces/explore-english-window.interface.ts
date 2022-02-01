import { BrowserWindow } from 'electron';

export abstract class ExploreEnglishWindow {
  constructor (windowName: string) {
    this.WINDOW_NAME = windowName;
  }

  abstract getBrowserWindowInstance (): BrowserWindow;
  abstract show (): void;

  public readonly WINDOW_NAME: string
}
