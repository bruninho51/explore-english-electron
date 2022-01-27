import { BrowserWindow, app, ipcMain } from 'electron';
import AnkiRepository from './domain/card-repositories/anki';
import { DefaultAnkiCardTheme } from './domain/card-themes/anki-card-theme';
import { CollinsElectron } from './domain/dictionaries/collins';
import CardRepository from './domain/protocols/card-repository';
import { Dictionary } from './domain/protocols/dictionary';
import { Sentence as SentenceEntity } from './domain/sentence';
import { Sentence } from './domain/models/sentence';
import { SentenceWordGetterUC } from './domain/usecases/protocols/sentence-word-getter-uc';
import { SentenceWordGetter } from './domain/usecases/sentence-word-getter';
import windows from './windows';
import { Card } from './domain/card';

// app.commandLine.appendSwitch('ignore-certificate-errors');

app.whenReady().then(() => {
  const mainWindow = windows.createMainWindow();
  const scrapingWindow = windows.createScrapingWindow(mainWindow);

  ipcMain.handle('scrapeToAnki', async (event, json: string): Promise<string> => {
    const { movieTitle, phrase }: { movieTitle: string, phrase: Sentence } = JSON.parse(json);

    const deckName = `Explore English::${movieTitle}`;
    const sentenceWordGetter: SentenceWordGetterUC = new SentenceWordGetter();
    const dictionary: Dictionary = new CollinsElectron(scrapingWindow);
    const repository: CardRepository = new AnkiRepository(deckName, new DefaultAnkiCardTheme());

    try {
      await repository.createDeck(deckName);
      const sentenceEntity = new SentenceEntity(phrase, dictionary, sentenceWordGetter);
      const card: Card = await sentenceEntity.searchForWord();
      await card.save(repository);
      return await Promise.resolve(phrase.id);
    } catch (error) {
      return await Promise.reject(error);
    }
  });
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
