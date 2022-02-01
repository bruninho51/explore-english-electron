import { BrowserWindow, ipcMain } from 'electron';
import { CollinsElectron } from '../domain/dictionaries/collins';
import { Sentence } from '../domain/models/sentence';
import { Dictionary } from '../domain/protocols/dictionary';
import { createAnkiCard } from '../helpers/create-anki-card';
import { ExploreEnglishWindow } from '../interfaces/explore-english-window.interface';

export class ScrappingWindow extends ExploreEnglishWindow {
  private readonly browserWindow: BrowserWindow

  constructor () {
    super('SCRAPPING');

    this.browserWindow = this.makeBrowserWindow();

    ipcMain.handle('scrapeToAnki', async (_, json: string): Promise<string> => {
      const { movieTitle, phrase }: { movieTitle: string, phrase: Sentence } = JSON.parse(json);
      return await this.scrapeToAnki(movieTitle, phrase);
    });
  }

  getBrowserWindowInstance (): BrowserWindow {
    return this.browserWindow;
  }

  show (): void {
    return this.browserWindow.show();
  }

  private makeBrowserWindow (): BrowserWindow {
    return new BrowserWindow({
      center: true,
      minWidth: 800,
      minHeight: 600,
      show: false,
      webPreferences: {
        nodeIntegration: false
      }
    });
  }

  private async scrapeToAnki (movieTitle: string, phrase: Sentence): Promise<string> {
    const dictionary: Dictionary = new CollinsElectron(this.browserWindow);
    const deckName = `Explore English::${movieTitle}`;

    const phraseId = await createAnkiCard({
      deckName,
      dictionary,
      phrase
    });

    return phraseId;
  }
}
